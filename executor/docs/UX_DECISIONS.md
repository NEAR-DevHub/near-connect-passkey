# Passkey UX decisions

Rationale for the passkey wallet's user-facing flow. Written for whoever
touches `src/ui.ts`, `src/index.ts`, `src/errors.ts`, or `src/i18n.ts` next —
the *why* behind choices that otherwise look arbitrary or safe to "simplify".

## Audience

Web2 users with no crypto background. They have never seen a seed phrase, do
not know what "resident key" or "assertion" means, and read the buttons, not
the docs. Every decision below trades crypto-native precision for that user's
comprehension and safety.

## 1. Web2-familiar entry: "Sign up" / "Sign in"

The entry dialog (`ui.promptSignInChoice`) uses **Sign up** (create a new
account) and **Sign in** (use an existing passkey) — not "Create new account"
/ "Use existing passkey". These are the two words every Web2 user already
maps to "I'm new here" vs "I've been here before". The internal choice values
stay `create` / `existing`; only the labels changed.

Tagline: "No password, no seed phrase — just your device." Names the benefit
in the user's terms, not the mechanism (WebAuthn/passkey).

## 2. Zero-friction first sign-up

On **Sign up**, if there are **no** local passkey records
(`passkey:known` empty), we do **not** prompt for anything. The passkey is
labelled with the default `DEFAULT_PASSKEY_LABEL` ("My NEAR Account") and we
go straight to the device ceremony (Face ID / fingerprint / PIN).

Why: a first-time user asked to "name your passkey" has no idea what to type,
what it affects, or whether it is public. The field is pure confusion tax at
the exact moment we want the funnel frictionless. The label is only ever shown
in the OS passkey manager, so a sensible default costs the user nothing.

## 3. Label prompt only for additional accounts

We ask for a label (`ui.promptPasskeyLabel`, a username or email) **only** when
the user already has a passkey on this device and is creating **another**
account. Now the label earns its keep: it is the only thing distinguishing two
Passkey entries in the device's passkey manager. Empty input still falls back to
the default label.

Decision gate: `Object.keys(await storage.getKnownCredentials()).length === 0`
→ first account (no prompt) vs additional (prompt).

## 3b. Cold sign-in via `resolveAuth` = two device confirmations

When a dApp asks for a NEP-641 authorization (`resolveAuth`) and no passkey is
active locally, the "existing passkey" path runs **two** ceremonies: a
discovery `get()` (random challenge) that reveals which credential — and so
which wallet account — the user picked, then a targeted `get()` signing the
`OffchainMessage` for that account. The wallet contract verifies
`signer_id == current_account_id()` on the signed message, so the account id
has to be known *before* the signing ceremony. The screens between the two
make it explicit
(`lookingUp…` → `confirmSignInAgainSubtitle`). Returning users (active
passkey) and fresh sign-ups still confirm once for the authorization itself.

## 4. Resident keys + user verification are non-negotiable

Not cosmetic, but they shape the UX, so they belong here:

- **Resident (discoverable) keys required.** A non-resident key has no
  recovery path (nothing to hand to `allowCredentials`, discovery can't find
  it) — the account would silently vanish. We reject `credProps.rk === false`.
- **User verification required** on every ceremony, and the UV flag is
  re-checked on each assertion. A wallet must never sign on a bare
  security-key touch (presence only). This can turn away PIN-less security
  keys — an intentional trade of reach for safety. (The deployed wallet
  contracts are built with `IgnoreUserVerification` for U2F compatibility;
  this stricter check is an executor-side policy on top.)

**Edge / Microsoft Password Manager quirk.** Edge's synced passkey provider
(new in Edge 142) *performs the biometric* on a **targeted** `get`
(`allowCredentials` set) but returns the assertion with **UV=0** — a provider
bug. Only a **discovery** `get` (no `allowCredentials`, which shows the OS
account chooser) sets UV correctly there. So `webauthnGet` (`index.ts`) goes
**discovery-first on desktop Edge** (UA token `Edg/`) to get UV=1 in a single
biometric; every other platform keeps the fast targeted path (direct biometric,
no chooser) and only falls back to a discovery *retry* if some other provider
also returns UV=0. When discovery is used for a known account, the credential
the user picks must match (`errWrongPasskey`). This keeps strict UV without the
double-biometric a naive targeted→discovery retry causes on Edge. If Edge fixes
the provider, the UA special-case can be removed.

These constraints surface to the user only as errors, which is why the error
copy (below) must be actionable.

## 5. Errors speak human, and never blame the user's device by default

`src/errors.ts` maps every WebAuthn `DOMException` to a short, plain sentence
that says what to DO. Guiding rules:

- The common case (`NotAllowedError`) is cancel/timeout — phrase it as "try
  again", never "your device failed". Users cancel far more often than
  hardware breaks.
- `InvalidStateError` (duplicate passkey) routes the user to **Sign in**, not
  a dead end.
- Missing PIN / screen lock (`ConstraintError`) tells them exactly which
  setting to enable.
- Raw `DOMException.name`/`.message` never reach the user.

## 6. Confirm button vs. straight-to-ceremony

Some dApp-initiated ceremonies show a one-button `ui.promptConfirm` first (sign
a message, confirm a returning sign-in); the **transaction "Approve" flow does
NOT** — it goes straight to the ceremony (`showProgress` biometric screen →
`webauthnGet`), because the OS prompt (Face ID / Windows Hello / the account
chooser) is itself the confirmation and the extra tap was pure friction.

Note the button was never a functional *user-activation* source: the sandbox
runs `navigator.credentials.get()` in the **host window off a postMessage**
(`SandboxedWallet/executor.ts`), not off the in-iframe click, so the click's
transient activation never reaches the real ceremony. WebAuthn `get()` works in
that host-window context without it. The button is therefore only an explicit
"you're about to sign" affordance — keep it where a deliberate confirmation adds
value, drop it (as on Approve) where the OS prompt already confirms.

## 7. Device-neutral wording

Prompts say "your device", not "Face ID / Touch ID", because the wallet runs
on Windows Hello, Android screen lock, and security keys too. Concrete
mechanisms are listed only inside error messages, where enumerating the
options ("Face ID, a fingerprint, a screen lock, or a PIN") helps the user
find the setting.

## 8. Motion & visual design — native biometric hand-off

The overlay should feel like the system's own Face ID / Touch ID / Windows
Hello / Android screen-lock sheet, not a web modal bolted on. All of it lives
in one injected stylesheet in `ui.ts` (no runtime deps), so it renders
identically on every host.

- **No card of our own — conform to the host modal.** The near-connect sandbox
  already renders this executor inside its own modal, which is **dark-only**
  (no light/dark theming). Drawing our own themed card inside it produced a
  light card floating in their dark panel: a nested-modal, mismatched-theme
  scene (see the pre-fix screenshots). So our content is **transparent** and
  sits directly on their dark surface as one modal, and we **do not follow
  `prefers-color-scheme`** — everything is styled light-on-dark to match the
  host chrome. A solid dark panel is restored only under
  `prefers-reduced-transparency` / `prefers-contrast`, where we can't rely on
  the host surface for legibility. If near-connect ever ships a light theme,
  revisit this (detect it and theme accordingly).
- **Calm entrance.** Content fades and rises 8px on the iOS spring ease
  `cubic-bezier(0.32, 0.72, 0, 1)` (~380 ms). Deliberately understated (no
  scale/overshoot) because the host modal already plays its own entrance —
  a second "materialize" on top read as double-animation jank.
- **Biometric glyph.** A Face ID–style bracket-corner + face mark (inline
  SVG) draws its corners in, then *breathes* (slow 2.6 s scale, ~0.38 Hz —
  deliberately outside the ~0.2 Hz vestibular-trigger range) with a soft glow.
  It appears on the entry screen and every ceremony hand-off screen so the
  wallet's UI reads as continuous with the incoming system prompt.
- **Activation scan.** On the confirm button press, a scan line sweeps the
  glyph and it does a quick confirm-pulse. Critically, `promptConfirm`
  resolves **synchronously** on that press (see §6) — the animation is CSS
  only and never delays `navigator.credentials.get()`.
- **Ring spinner** for pure network steps (publishing the key, account setup),
  kept distinct from the biometric glyph so the two states read differently.
- **Press feedback** on pointer-down: buttons scale to `0.97` and dim
  slightly, immediately (Response — kill latency).

Accessibility is baked in, not optional:

- `prefers-reduced-motion: reduce` → drops every transform/loop/spring, keeps
  short opacity cross-fades, and freezes the glyph in its drawn state.
- `prefers-reduced-transparency: reduce` → solid card, no blur.
- `prefers-contrast: more` → solid card with a contrasting border.

When editing: animate only `transform`/`opacity`, keep the click→ceremony path
free of `await`, and never add a looping animation near 0.2 Hz or a
full-viewport moving background.

## 9. Internationalization

All user-facing strings live in `src/i18n.ts`, translated into 19 of the most
widely spoken languages: English, Mandarin Chinese, Hindi, Spanish, French,
Arabic, Persian, Russian, Ukrainian, Portuguese, German, Italian, Polish,
Dutch, Turkish, Indonesian, Vietnamese, Japanese, Korean. Language is
auto-detected from `navigator.languages` and overridable via `setLang`.

- **Smart fallbacks** (`LANG_FALLBACKS`): an unsupported locale maps to the
  closest supported language a user likely reads, not English — e.g.
  Belarusian/Kazakh/Uzbek → Russian, Malay → Indonesian, Catalan/Galician →
  Spanish, Afrikaans → Dutch, Marathi/Nepali/Punjabi → Hindi, Azerbaijani →
  Turkish, Pashto/Dari → Persian. Only then does it fall back to English.
- **RTL**: Arabic and Persian are marked in `RTL_LANGS`; `openDialog` in
  `ui.ts` sets the dialog `dir` from `dir()`. Add a language to `RTL_LANGS`
  and RTL just works.

Rules for future edits:

- **No user-facing string literals** in `ui.ts` / `index.ts` / `errors.ts` —
  add a key to every catalog and use `t("key")`. The `i18n` test asserts every
  supported language defines the full English key set, so a half-added key
  fails CI.
- Adding a language: extend `Lang` + `SUPPORTED_LANGS`, add the catalog, and
  (if RTL) add it to `RTL_LANGS`. Consider whether related unsupported locales
  should now fall back to it via `LANG_FALLBACKS`.
- Placeholders use `{name}` and are filled from `t(key, { name })`.

**Not yet translated (needs native review before shipping):** several strict
top-25 languages remain — Bengali, Urdu, Tamil, Telugu, Thai, Tagalog, plus
Marathi/Punjabi (currently fall back to Hindi). Their error copy is
security-relevant, so add them with native-speaker review rather than
unreviewed machine output.
