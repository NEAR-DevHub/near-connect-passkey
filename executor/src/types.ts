// ─── near-connect wallet interface (subset used by this executor) ───────────

export type Network = "mainnet" | "testnet";

export interface Account {
  accountId: string;
  publicKey?: string;
}

export interface SignedMessage {
  accountId: string;
  publicKey: string;
  signature: string;
}

export interface AccountWithSignedMessage extends Account {
  signedMessage: SignedMessage;
}

export interface SignMessageParams {
  message: string;
  recipient: string;
  nonce: Uint8Array | number[];
  network?: Network;
  signerId?: string;
}

export interface SignInParams {
  network?: Network;
  addFunctionCallKey?: AddFunctionCallKeyParams;
}

export interface AddFunctionCallKeyParams {
  contractId: string;
  publicKey: string;
  allowMethods: { anyMethod: true } | { anyMethod: false; methodNames: string[] };
  gasAllowance?: { kind: "unlimited" } | { kind: "limited"; amount: string };
}

export interface SignInAndSignMessageParams extends SignInParams {
  messageParams: Omit<SignMessageParams, "signerId" | "network">;
}

export interface SignAndSendTransactionParams {
  network?: Network;
  signerId?: string;
  receiverId: string;
  actions: ConnectorAction[];
}

export interface SignAndSendTransactionsParams {
  network?: Network;
  signerId?: string;
  transactions: Array<{ receiverId: string; actions: ConnectorAction[] }>;
}

export interface SignDelegateActionsParams {
  network?: Network;
  signerId?: string;
  delegateActions: Array<{ receiverId: string; actions: ConnectorAction[] }>;
}

export interface SignDelegateActionsResponse {
  signedDelegateActions: string[];
}

export type ResolveAuthPurpose = "PROVE_OWNERSHIP" | "APPROVE_OFFCHAIN_ACTION";

export interface ResolveAuthParams {
  network?: Network;
  purpose: ResolveAuthPurpose;
  recipient: string;
  payload: string;
}

export interface ResolveAuthResponse {
  accountId: string;
  /** JSON-stringified authorization to pass to `w_resolve_auth`. */
  authorization: string;
}

/** Opaque RPC final execution outcome, returned as-is from the node. */
export type FinalExecutionOutcome = unknown;

// ─── ConnectorAction (near-connect actions/types) ────────────────────────────

export interface FunctionCallConnectorAction {
  type: "FunctionCall";
  params: { methodName: string; args: object; gas: string; deposit: string };
}

export interface TransferConnectorAction {
  type: "Transfer";
  params: { deposit: string };
}

/** Other action types exist upstream but are unsupported by wallet contracts. */
export interface UnsupportedConnectorAction {
  type:
    | "CreateAccount"
    | "DeployContract"
    | "Stake"
    | "AddKey"
    | "DeleteKey"
    | "DeleteAccount"
    | "UseGlobalContract"
    | "DeployGlobalContract";
  params?: unknown;
}

export type ConnectorAction =
  | FunctionCallConnectorAction
  | TransferConnectorAction
  | UnsupportedConnectorAction;

// ─── Passkey credential model ────────────────────────────────────────────────

export type PasskeyCurve = "p256" | "ed25519";

/** Active signed-in credential (`passkey:v1`). */
export interface ActiveCredential {
  /** base64url-unpadded WebAuthn credential id. */
  rawId: string;
  /** "p256:<base58(33B)>" or "ed25519:<base58(32B)>". */
  publicKey: string;
  curve: PasskeyCurve;
  accountId: string;
  registeredAt: number;
}

/** Verified rawId -> key cache entry (`passkey:known`). */
export interface KnownCredential {
  publicKey: string;
  curve: PasskeyCurve;
  accountId: string;
  /** Passkey name given at sign-up on this device (absent for discovered ones). */
  label?: string;
  /** Last sign-in with this credential here — orders the "Welcome back" list. */
  lastUsedAt?: number;
}

export type KnownCredentialMap = Record<string, KnownCredential>;

/** Registration that must reach the registry before anything else (`passkey:pendingRegistration`). */
export interface PendingRegistration {
  rawIdB64: string;
  publicKey: string;
  curve: PasskeyCurve;
}

// ─── window.selector sandbox bridge ──────────────────────────────────────────

export interface WebauthnCreateResult {
  rawId: number[];
  clientDataJSON: number[];
  attestationObject: number[];
  publicKey?: number[] | null;
  /**
   * `navigator.credentials.create().getClientExtensionResults()`, when the
   * sandbox bridge forwards it. `credProps.rk` reports whether a discoverable
   * (resident) credential was actually created — the only client-visible
   * signal that the resident-key requirement was honored.
   */
  clientExtensionResults?: { credProps?: { rk?: boolean } } | null;
}

export interface WebauthnGetResult {
  rawId: number[];
  signature: number[];
  authenticatorData: number[];
  clientDataJSON: number[];
}

export interface SelectorApi {
  location: string;
  providers: { mainnet: string[]; testnet: string[] };
  webauthn: {
    create(options: Record<string, unknown>): Promise<WebauthnCreateResult>;
    get(options: Record<string, unknown>): Promise<WebauthnGetResult>;
  };
  storage: {
    set(key: string, value: string): Promise<void>;
    get(key: string): Promise<string | null>;
    remove(key: string): Promise<void>;
    keys(): Promise<string[]>;
  };
  ui: {
    showIframe(): Promise<void>;
    hideIframe(): Promise<void>;
  };
  ready(wallet: object): Promise<void>;
}

declare global {
  interface Window {
    selector: SelectorApi;
  }
}

export function selector(): SelectorApi {
  return window.selector;
}
