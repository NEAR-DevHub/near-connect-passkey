# near-connect-passkey executor

A single-file sandboxed [NEAR Connect](https://github.com/hot-dao/near-selector)
executor implementing Passkey (WebAuthn) wallets:

- User identity = deterministic **NEP-616** account
  (`"0s" + hex(keccak256(borsh(StateInit))[12..32])`) running the WebAuthn
  wallet contract deployed as a **NEP-591** global contract by account id
  (one per credential curve: `p256-passkey-wallet-contract.trezu.near` /
  `ed25519-passkey-wallet-contract.trezu.near`). The passkey public key IS
  the identity. The NEP-641 envelope commits to no code identity — the
  contract reconstructs the StateInit from the code it currently runs
  under — so authorization stays a single ceremony regardless of curve.
- Requests are signed by the passkey (WebAuthn assertion over the canonical
  message hash as challenge) and relayed via `w_execute_signed`; off-chain
  authorization uses **NEP-641** (`resolveAuth` / `w_resolve_auth`). The
  envelope binds to the exact account (`SignerId`) whenever the account id is
  known, and only falls back to the curve-independent `Code` binding for the
  cold "identify by passkey" discovery flow — where it pins the accepting set
  to the canonical factories (one per curve) via `allowed_factory_ids`.
- Supports both COSE algorithms: ES256 / P-256 (`p256:<base58(33B SEC-1 compressed)>`)
  and EdDSA / Ed25519 (`ed25519:<base58(32B)>`).
- **Resident (discoverable) keys only** — `create()` requests
  `residentKey: "required"` + legacy `requireResidentKey: true`, and rejects the
  credential when `credProps.rk === false`. A non-resident key would be
  unrecoverable (no rawId to feed `allowCredentials`, and discovery can't find
  it). Multiple accounts per device are supported — each additional sign-up is
  deliberate and labelled (see `docs/UX_DECISIONS.md`), so `create()` does NOT
  set `excludeCredentials` (which would make the authenticator reject every
  additional account with `InvalidStateError`).
- **User verification is mandatory** — both ceremonies request
  `userVerification: "required"`, and every assertion is additionally checked
  for the UV flag in `authenticatorData` before its proof is trusted. A wallet
  never signs on mere user-presence (a bare security-key touch).
- WebAuthn failures are mapped to short, non-technical, actionable messages
  (`src/errors.ts`) instead of raw `DOMException` codes.
- **Web2-familiar flow** ("Sign up" / "Sign in", zero-friction first sign-up)
  and full **i18n** (en/zh/hi/es/fr). Rationale and rules:
  [`docs/UX_DECISIONS.md`](docs/UX_DECISIONS.md).
- `rawId -> publicKey` recovery goes through the open on-chain registry
  `passkeys-registry.near`; every candidate key is verified locally against
  the assertion signature — only the credential's true key is accepted.

## Build / test

```bash
npm install
npm run typecheck   # tsc --noEmit
npm run test        # vitest (known-answer vectors, see below)
npm run build       # vite -> ../passkey-executor.js (single-file IIFE)
```

Tests pin the wire formats against authoritative vectors:

- `fixtures/nep641-auth.json` — shared NEP-641 `AuthMessage` vectors
  (also consumed by the Rust wallet-contract tests; keep in sync),
- the two `RequestMessage` known-answer vectors from
  `near-intents/contracts/wallet/src/message.rs` (empty request + mainnet
  function-call transaction),
- the `NearPromise` borsh pin from `defuse-near-promise`,
- the NEP-616 `derive_account_id` vectors from `near-global-contracts`,
- fabricated WebAuthn attestations/assertions for both curves.

## Constants to fill before shipping (`src/constants.ts`)

| Constant | Purpose |
|---|---|
| `REGISTRY_FC_PRIVATE_KEY` | Private key of the function-call access key on `passkeys-registry.near`, restricted to `register`. Ships inside the public executor by design (the registry is an open phonebook; wrong mappings cannot forge anything). Registration flows throw a clear error while empty. |
| `SPONSOR_ACCOUNT_ID` / `SPONSOR_PRIVATE_KEY` | Account sponsor: `helper.trezu.near` runs [near-account-sponsor](https://github.com/NEAR-DevHub/near-account-sponsor), which creates users' deterministic wallet accounts (`create_deterministic_account`) and relays `w_execute_signed` to them (`relay_execute_signed`). The key is a **public function-call key** limited to those two methods; the contract only touches wallets running allowlisted code and rate-limits both. |

## near-api-ts gap: `DeterministicStateInit`

`near-api-ts@0.10.0` covers RPC views, function-call/transfer actions and
NEP-413 message helpers, but has **no `DeterministicStateInit` action**
(NEP-616, protocol `Action` enum variant `11`). Transactions that must carry a
`StateInit` (account initialization, `w_execute_signed` on a not-yet-created
account) are therefore borsh-encoded by hand in `src/protocol.ts`
(`Transaction`/`SignedTransaction`/`Action` layout per nearcore
`near-primitives`) and broadcast over plain JSON-RPC
(`send_tx`, falling back to `broadcast_tx_commit`) against
`selector.providers.mainnet[0]`.

This is an **upstream-contribution candidate**: adding a
`deterministicStateInit({ stateInit, deposit })` action creator to near-api-ts
would let this executor drop `src/protocol.ts` entirely.

## rpId scoping note

The sandbox bridge executes `navigator.credentials.create/get` in the **host
dApp's top window**, so credentials are scoped to the dApp's origin (rpId =
dApp domain). A passkey created on `dapp-a.example` is not discoverable on
`dapp-b.example`; the account itself is portable (the registry + deterministic
derivation recover it from any origin where the same credential exists, e.g.
via passkey syncing), but the credential must be usable on that origin. A
shared wallet-owned rpId would require running the ceremonies on a common
domain, which the sandboxed executor deliberately does not do.

## Storage keys (sandboxed selector storage)

- `passkey:v1` — active credential `{rawId, publicKey, curve, accountId, registeredAt}`
- `passkey:known` — verified `rawIdB64 -> {publicKey, curve, accountId}` cache
  (write-through after local signature verification; survives signOut)
- `passkey:pendingRegistration` — registration that must reach the registry
  before any new `create()` (retried on next signIn)
- `passkey:nonce` — persisted semi-sequential u32 nonce counter

## Module map

| Module | Responsibility |
|---|---|
| `constants.ts` | ids, domains, placeholders, storage keys |
| `types.ts` | near-connect wallet interface + `window.selector` bridge types |
| `borsh.ts` | minimal borsh writer |
| `walletContract.ts` | AuthMessage/RequestMessage JSON wire types, borsh encoders, SHA3-256 domain hashes, RFC-3339 codec, ConnectorAction conversion |
| `stateInit.ts` | wallet `State` defaults, `StateInit` borsh, NEP-616 account id derivation |
| `authEnvelope.ts` | NEP-641 message building (`SignerId` when the account is known, else `Code` binding with `allowed_factory_ids`), authorization blob |
| `protocol.ts` | raw NEAR protocol tx encoder (StateInit support) + JSON-RPC broadcast |
| `webauthn.ts` | CBOR/COSE/SPKI key extraction, DER→raw low-S, local assertion verify, UV-flag check, proof blob |
| `errors.ts` | WebAuthn `DOMException` → plain-language, non-technical user messages (via `i18n`) |
| `i18n.ts` | localized user-facing strings (19 languages), `navigator`-detected with smart fallbacks + RTL |
| `registry.ts` | `passkeys-registry.near` get/register (retry + backoff) |
| `relayer.ts` | calls to the account sponsor (`relay_execute_signed`, `create_deterministic_account`) and offline delegate actions |
| `storage.ts` | typed sandboxed-storage accessors, nonce counter |
| `ui.ts` | sign-in / naming / retry / error dialogs |
| `index.ts` | wallet object assembly, `window.selector.ready(wallet)` |
