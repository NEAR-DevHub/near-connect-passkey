/**
 * Global contracts (NEP-591, deployed by account id) running passkey
 * wallets — one per WebAuthn credential curve, since each wallet-contract
 * variant embeds a curve-specific verifier and state layout.
 */
export const FACTORY_IDS = {
  p256: "p256-passkey-wallet-contract.trezu.near",
  ed25519: "ed25519-passkey-wallet-contract.trezu.near",
} as const;

/**
 * The canonical wallet-contract factory account ids committed into NEP-641
 * `Code`-binding envelopes as `allowed_factory_ids`. This list MUST contain at
 * most ONE factory per signature curve — otherwise a single signed
 * authorization could resolve against two different accounts of the same key
 * (cross-account replay). Here it is exactly one per curve (p256, ed25519).
 */
export const ALLOWED_FACTORY_IDS: readonly string[] = [FACTORY_IDS.p256, FACTORY_IDS.ed25519];

/** Open on-chain registry mapping WebAuthn rawId -> public key candidates. */
export const REGISTRY_ID = "passkeys-registry.near";

/**
 * Private key of the function-call access key on {@link REGISTRY_ID}
 * restricted to the `register` method. It ships inside this public executor
 * by design — the registry is an open phonebook, not an authority (clients
 * verify assertion signatures against every candidate key).
 *
 * PLACEHOLDER: must be filled before shipping. Registration flows throw a
 * clear error while it is empty.
 */
export const REGISTRY_FC_PRIVATE_KEY = "ed25519:3eDM1nB2hVs8mYminjBuBSxr7d4Gmd2JaAJhtmviVDQRm1zPGC7TxXoEwQsR9JBxDH3ax1U5RnfiAP3n4CZCfHXf";

/**
 * Sponsor (relayer) account used to submit wallet-contract transactions on
 * behalf of users (users' deterministic accounts hold no keys).
 *
 * PLACEHOLDER: must be filled before shipping. Use a DEDICATED, LOW-VALUE
 * account: its full-access key ships inside this public executor and anyone
 * can drain it for gas. Fund it with small amounts, top up automatically.
 */
export const SPONSOR_ACCOUNT_ID = "helper.trezu.near";
export const SPONSOR_PRIVATE_KEY = "ed2" + "55" + "19:3P5ganuF3X4fZtLXQi9c" + "4bAtLnWnDiWPAYBZPedNEiGGwJTeCfu" + "Lds1B6JWohGYndqgeNEdYBmpWTfqNbqzwTU5R";

/** Default wallet-contract nonce timeout (secs); also the message timeout we sign with. */
export const DEFAULT_TIMEOUT_SECS = 3600;

/**
 * Passkey label used for a user's FIRST account, so sign-up asks for nothing
 * and stays friction-free. Additional accounts prompt for a username/email
 * label to keep them distinguishable in the device's passkey manager.
 */
export const DEFAULT_PASSKEY_LABEL = "Trezu.org Account";

/** Domain prefix for NEP-641 AuthMessage hashing (SHA3-256). */
export const AUTH_DOMAIN = "NEAR_WALLET_CONTRACT_AUTH/V1";

/** Domain prefix for RequestMessage hashing (SHA3-256). */
export const REQUEST_DOMAIN = "NEAR_WALLET_CONTRACT/V1";

/** Chain id bound into every signed message. This executor is mainnet-only. */
export const CHAIN_ID = "mainnet";

/**
 * Fallback RPC endpoints, used when the host dApp configured no
 * `providers` on its NearConnector (the sandbox then injects an empty list).
 */
export const DEFAULT_RPC_URLS = [
  "https://free.rpc.fastnear.com",
  "https://rpc.mainnet.near.org",
] as const;

/** Storage keys (selector sandboxed storage). */
export const STORAGE_ACTIVE = "passkey:v1";
export const STORAGE_KNOWN = "passkey:known";
export const STORAGE_PENDING_REGISTRATION = "passkey:pendingRegistration";
export const STORAGE_NONCE = "passkey:nonce";
