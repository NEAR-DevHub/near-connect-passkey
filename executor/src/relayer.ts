import type { Client } from "near-api-ts";
import { keyPair } from "near-api-ts";
import { ed25519 } from "@noble/curves/ed25519.js";
import { base58, base64 } from "@scure/base";

import { SPONSOR_ACCOUNT_ID, SPONSOR_PRIVATE_KEY } from "./constants";
import {
  assertOutcomeSuccess,
  delegateActionSignHash,
  sendRawTransaction,
  serializeDelegateAction,
  serializeFunctionCallAction,
  serializeSignedDelegateAction,
  serializeSignedTransaction,
  serializeTransaction,
  transactionHash,
} from "./protocol";
import type { RequestMessageJson, StateInitJson } from "./walletContract";
import type { FinalExecutionOutcome } from "./types";

const EXECUTE_GAS = 330_000_000_000_000n; // 330 TGas (300 TGas used to be the max possible value, but since nearcore 2.12 it was bumped to 1000 TGas, and wallet-contract usually consumes ~16 Tgas)
const EXECUTE_DEPOSIT = 1n; // 1 yoctoNEAR (w_execute_signed is #[payable])
const CREATE_ACCOUNT_GAS = 30_000_000_000_000n; // 30 TGas

function sponsorKeyPair() {
  if (!SPONSOR_ACCOUNT_ID || !SPONSOR_PRIVATE_KEY) {
    throw new Error(
      "Sponsor is not configured (SPONSOR_ACCOUNT_ID / SPONSOR_PRIVATE_KEY are empty in " +
        "constants.ts).",
    );
  }
  return keyPair(SPONSOR_PRIVATE_KEY);
}

/**
 * Call a method of the sponsor contract on helper.trezu.near with its public
 * function-call key. Every user shares that key, so the nonce is re-read and
 * the call retried when another user took it first.
 */
async function callSponsor(
  client: Client,
  rpcUrl: string,
  methodName: string,
  args: unknown,
  gas: bigint,
): Promise<FinalExecutionOutcome> {
  const sponsor = sponsorKeyPair();
  const action = serializeFunctionCallAction(methodName, args, gas, 0n);
  for (let attempt = 0; ; attempt++) {
    const [blockHashB58, accessKey] = await Promise.all([
      client.getRecentBlockHash(),
      client.getAccountAccessKey({
        accountId: SPONSOR_ACCOUNT_ID,
        publicKey: sponsor.publicKey,
      }),
    ]);

    const txBytes = serializeTransaction({
      signerId: SPONSOR_ACCOUNT_ID,
      publicKey: sponsor.publicKeyU8,
      nonce:
        BigInt(accessKey.accountAccessKey.nonce) + 1n + BigInt(Math.floor(Math.random() * 1000)),
      receiverId: SPONSOR_ACCOUNT_ID,
      blockHash: base58.decode(blockHashB58),
      actions: [action],
    });

    const { signatureU8 } = await sponsor.signData({ dataU8: transactionHash(txBytes) });
    let outcome: FinalExecutionOutcome;
    try {
      outcome = (await sendRawTransaction(
        rpcUrl,
        serializeSignedTransaction(txBytes, signatureU8),
      )) as FinalExecutionOutcome;
    } catch (e) {
      if (attempt < 3 && /InvalidNonce|nonce/i.test(e instanceof Error ? e.message : String(e))) {
        continue;
      }
      throw e;
    }
    assertOutcomeSuccess(outcome);
    return outcome;
  }
}

/**
 * Relay `w_execute_signed(msg, proof)` to the user's wallet account through the
 * sponsor's `relay_execute_signed`. The wallet's StateInit always goes along:
 * it creates the account if needed and is a no-op otherwise, and the sponsor
 * derives the wallet account id from it. The `{msg, proof}` JSON is forwarded
 * byte for byte.
 */
export async function relayExecuteSigned(
  client: Client,
  rpcUrl: string,
  msg: RequestMessageJson,
  proof: string,
  stateInit: StateInitJson,
): Promise<FinalExecutionOutcome> {
  const args = new TextEncoder().encode(JSON.stringify({ msg, proof }));
  return callSponsor(
    client,
    rpcUrl,
    "relay_execute_signed",
    { state_init: { deterministic: stateInit }, args: base64.encode(args) },
    EXECUTE_GAS,
  );
}

// The delegate action built below is never submitted as a meta-transaction,
// so its sender-side fields are placeholders.
const DUMMY_DELEGATE_NONCE = 0n;
const DUMMY_DELEGATE_MAX_BLOCK_HEIGHT = 0n;

/**
 * Build a borsh `SignedDelegateAction` (NEP-461) whose sole action is
 * `w_execute_signed(msg, proof)` on the user's wallet account, returned as
 * base64 for a dApp relayer (e.g. Trezu's nt-be) to submit.
 *
 * The delegate is only an envelope: the relayer never submits it as a
 * meta-transaction. It takes the receiver (the wallet account) and the
 * `w_execute_signed` action out of it and sends them from its own account.
 * The user's authorization is the WebAuthn `proof` inside the call, which the
 * wallet contract verifies. The outer sender fields are therefore never
 * checked, so they are filled offline:
 *
 * - signed with a throwaway ed25519 key generated here, not the sponsor's key,
 *   so it works whether or not any particular key exists on the sponsor
 *   account;
 * - `nonce` and `max_block_height` are placeholders (0), so no RPC calls are
 *   needed.
 *
 * `sender_id` stays the sponsor account so the payload keeps the shape relayers
 * expect.
 *
 * The deterministic wallet account MUST already exist on-chain: the delegate
 * action carries no `DeterministicStateInit` (the relayer only accepts
 * `w_execute_signed` actions).
 */
export async function buildSignedDelegateAction(
  walletAccountId: string,
  msg: RequestMessageJson,
  proof: string,
): Promise<string> {
  const action = serializeFunctionCallAction(
    "w_execute_signed",
    { msg, proof },
    EXECUTE_GAS,
    EXECUTE_DEPOSIT,
  );
  const secretKey = ed25519.utils.randomSecretKey();
  const delegateAction = serializeDelegateAction({
    senderId: SPONSOR_ACCOUNT_ID,
    receiverId: walletAccountId,
    actions: [action],
    nonce: DUMMY_DELEGATE_NONCE,
    maxBlockHeight: DUMMY_DELEGATE_MAX_BLOCK_HEIGHT,
    publicKey: ed25519.getPublicKey(secretKey),
  });
  const signature = ed25519.sign(delegateActionSignHash(delegateAction), secretKey);
  return base64.encode(serializeSignedDelegateAction(delegateAction, signature));
}

/** Create the user's deterministic wallet account (sponsor's `create_deterministic_account`). */
export async function relayStateInit(
  client: Client,
  rpcUrl: string,
  stateInit: StateInitJson,
): Promise<FinalExecutionOutcome> {
  return callSponsor(
    client,
    rpcUrl,
    "create_deterministic_account",
    { state_init: stateInit },
    CREATE_ACCOUNT_GAS,
  );
}
