/**
 * Plain-language WebAuthn error mapping.
 *
 * Browsers surface `create()` / `get()` failures as `DOMException`s whose
 * `.name` is a terse code (`NotAllowedError`, `InvalidStateError`, …) and whose
 * `.message` is developer-facing jargon. A wallet's users are not developers —
 * they see these during Face ID / fingerprint / security-key prompts and need
 * to know what to DO, not what the spec calls the failure. This maps every
 * WebAuthn failure mode to a short, actionable, non-technical sentence,
 * localized via {@link t}.
 */

import { t } from "./i18n";

export type WebauthnCeremony = "create" | "get";

/**
 * A failed WebAuthn ceremony: the user-facing message plus the raw
 * `DOMException.name` — "" when unknown (near-connect's sandbox bridge
 * currently forwards only `error.message`, not the name).
 */
export class WebauthnCeremonyError extends Error {
  readonly domName: string;

  constructor(message: string, domName: string) {
    super(message);
    this.name = "WebauthnCeremonyError";
    this.domName = domName;
  }
}

/** Wrap a raw ceremony failure in a {@link WebauthnCeremonyError}. */
export function webauthnCeremonyError(
  error: unknown,
  ceremony: WebauthnCeremony,
): WebauthnCeremonyError {
  return new WebauthnCeremonyError(friendlyWebauthnError(error, ceremony), errorName(error));
}

/**
 * A failed `get()` this fast never showed the user a system prompt — nobody
 * cancels Face ID / Windows Hello in under 1.5 s. It means the browser refused
 * the ceremony up front (typically iOS Safari wanting a fresh user activation
 * after a network-bound step), not that the user declined.
 */
export const BLOCKED_CEREMONY_MS = 1500;

export function ceremonyWasBlocked(e: unknown, elapsedMs: number): boolean {
  return (
    elapsedMs < BLOCKED_CEREMONY_MS &&
    e instanceof WebauthnCeremonyError &&
    // "" = name unknown (the near-connect bridge forwards only the message).
    (e.domName === "NotAllowedError" || e.domName === "")
  );
}

/** Best-effort extraction of a DOMException-style error name. */
function errorName(error: unknown): string {
  if (error && typeof error === "object" && "name" in error) {
    const name = (error as { name?: unknown }).name;
    if (typeof name === "string") return name;
  }
  return "";
}

/**
 * A human-readable, non-technical explanation for a WebAuthn ceremony failure.
 * `create` = making a new passkey, `get` = signing with an existing one.
 */
export function friendlyWebauthnError(error: unknown, ceremony: WebauthnCeremony): string {
  switch (errorName(error)) {
    case "NotAllowedError":
    case "AbortError":
      // The overwhelmingly common case: user dismissed the prompt or it
      // timed out. Never blame the user's hardware here.
      return t(ceremony === "create" ? "waCancelledCreate" : "waCancelledGet");

    case "InvalidStateError":
      // excludeCredentials matched: a passkey for this wallet already exists
      // on this device. Route the user to "sign in" instead of creating.
      return t("waDuplicate");

    case "NotSupportedError":
      return t(ceremony === "create" ? "waNotSupportedCreate" : "waNotSupportedGet");

    case "ConstraintError":
      // Resident-key or user-verification requirement could not be met —
      // most often a security key with no PIN / no biometric set up.
      return t(ceremony === "create" ? "waConstraintCreate" : "waConstraintGet");

    case "SecurityError":
      return t("waSecurity");

    default:
      return t(ceremony === "create" ? "waGenericCreate" : "waGenericGet");
  }
}
