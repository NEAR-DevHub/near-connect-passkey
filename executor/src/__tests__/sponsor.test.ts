import { base58, base64 } from "@scure/base";
import type { Client } from "near-api-ts";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SPONSOR_ACCOUNT_ID } from "../constants";
import { relayExecuteSigned, relayStateInit } from "../relayer";
import type { RequestMessageJson, StateInitJson } from "../walletContract";

const STATE_INIT: StateInitJson = {
  V1: { code: { account_id: "p256-passkey-wallet-contract.trezu.near" }, data: { "": "AQID" } },
};
const MSG = { signer_id: "0s00", nonce: 7 } as unknown as RequestMessageJson;

const fakeClient = {
  getRecentBlockHash: async () => base58.encode(new Uint8Array(32).fill(7)),
  getAccountAccessKey: async () => ({ accountAccessKey: { nonce: 10 }, blockHeight: 1 }),
} as unknown as Client;

/** Read the single FunctionCall out of a borsh SignedTransaction. */
function decodeCall(signedTxBase64: string) {
  const b = base64.decode(signedTxBase64);
  const view = new DataView(b.buffer, b.byteOffset, b.byteLength);
  let o = 0;
  const str = () => {
    const n = view.getUint32(o, true);
    o += 4;
    const v = new TextDecoder().decode(b.slice(o, o + n));
    o += n;
    return v;
  };
  const signer = str();
  o += 1 + 32 + 8; // public key, nonce
  const receiver = str();
  o += 32; // block hash
  expect(view.getUint32(o, true)).toBe(1);
  o += 4;
  expect(b[o]).toBe(2); // FunctionCall
  o += 1;
  const method = str();
  const args = JSON.parse(str());
  const gas = view.getBigUint64(o, true);
  o += 8;
  const deposit = view.getBigUint64(o, true) + (view.getBigUint64(o + 8, true) << 64n);
  return { signer, receiver, method, args, gas, deposit };
}

function stubRpc() {
  const sent: string[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url: string, init: { body: string }) => {
      const body = JSON.parse(init.body);
      sent.push(body.params.signed_tx_base64);
      return new Response(JSON.stringify({ jsonrpc: "2.0", id: 1, result: { status: { SuccessValue: "" } } }));
    }),
  );
  return sent;
}

describe("sponsor calls", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("relays w_execute_signed through relay_execute_signed with the StateInit and exact args", async () => {
    const sent = stubRpc();
    await relayExecuteSigned(fakeClient, "https://rpc", MSG, "proof", STATE_INIT);
    const call = decodeCall(sent[0]!);
    expect(call.signer).toBe(SPONSOR_ACCOUNT_ID);
    expect(call.receiver).toBe(SPONSOR_ACCOUNT_ID);
    expect(call.method).toBe("relay_execute_signed");
    expect(call.deposit).toBe(0n);
    expect(call.args.state_init).toEqual({ deterministic: STATE_INIT });
    const forwarded = new TextDecoder().decode(base64.decode(call.args.args));
    expect(forwarded).toBe(JSON.stringify({ msg: MSG, proof: "proof" }));
  });

  it("creates the wallet account through create_deterministic_account", async () => {
    const sent = stubRpc();
    await relayStateInit(fakeClient, "https://rpc", STATE_INIT);
    const call = decodeCall(sent[0]!);
    expect(call.method).toBe("create_deterministic_account");
    expect(call.args).toEqual({ state_init: STATE_INIT });
  });

  it("surfaces a failed outcome", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(JSON.stringify({ jsonrpc: "2.0", id: 1, result: { status: { Failure: { x: 1 } } } })),
      ),
    );
    await expect(relayStateInit(fakeClient, "https://rpc", STATE_INIT)).rejects.toThrow(/failed/);
  });
});
