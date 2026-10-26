import {
  STORAGE_ACTIVE,
  STORAGE_KNOWN,
  STORAGE_NONCE,
  STORAGE_PENDING_REGISTRATION,
} from "./constants";
import type {
  ActiveCredential,
  KnownCredential,
  KnownCredentialMap,
  PendingRegistration,
} from "./types";
import { selector } from "./types";

async function getJson<T>(key: string): Promise<T | null> {
  const raw = await selector().storage.get(key);
  if (raw == null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function setJson(key: string, value: unknown): Promise<void> {
  await selector().storage.set(key, JSON.stringify(value));
}

export const getActiveCredential = (): Promise<ActiveCredential | null> =>
  getJson<ActiveCredential>(STORAGE_ACTIVE);

export const setActiveCredential = (credential: ActiveCredential): Promise<void> =>
  setJson(STORAGE_ACTIVE, credential);

export const clearActiveCredential = (): Promise<void> =>
  selector().storage.remove(STORAGE_ACTIVE);

export const getKnownCredentials = async (): Promise<KnownCredentialMap> =>
  (await getJson<KnownCredentialMap>(STORAGE_KNOWN)) ?? {};

export async function addKnownCredential(
  rawIdB64: string,
  credential: KnownCredential,
): Promise<void> {
  const known = await getKnownCredentials();
  // Merge: re-verifying a credential must not drop its label / lastUsedAt.
  known[rawIdB64] = { ...known[rawIdB64], ...credential };
  await setJson(STORAGE_KNOWN, known);
}

/** Stamp `lastUsedAt` so the "Welcome back" list offers the latest account first. */
export async function touchKnownCredential(rawIdB64: string): Promise<void> {
  const known = await getKnownCredentials();
  const entry = known[rawIdB64];
  if (!entry) return;
  entry.lastUsedAt = Date.now();
  await setJson(STORAGE_KNOWN, known);
}

/** Known credentials, most recently used first (then most recently added). */
export async function listKnownCredentials(): Promise<
  Array<KnownCredential & { rawIdB64: string }>
> {
  const entries = Object.entries(await getKnownCredentials()).map(([rawIdB64, c]) => ({
    ...c,
    rawIdB64,
  }));
  // Object key order is insertion order: reverse for newest-added first, then
  // a stable sort by lastUsedAt keeps that order among never-used entries.
  return entries.reverse().sort((a, b) => (b.lastUsedAt ?? 0) - (a.lastUsedAt ?? 0));
}

export const getPendingRegistration = (): Promise<PendingRegistration | null> =>
  getJson<PendingRegistration>(STORAGE_PENDING_REGISTRATION);

export const setPendingRegistration = (pending: PendingRegistration): Promise<void> =>
  setJson(STORAGE_PENDING_REGISTRATION, pending);

export const clearPendingRegistration = (): Promise<void> =>
  selector().storage.remove(STORAGE_PENDING_REGISTRATION);

/**
 * Semi-sequential u32 nonce (persisted counter, randomized base every 32
 * values) — keeps the wallet-contract nonce bitmap storage minimal.
 */
export async function nextNonce(): Promise<number> {
  let nonce = (await getJson<number>(STORAGE_NONCE)) ?? 0;
  if (!Number.isInteger(nonce) || nonce <= 0 || nonce > 0xffffffff || (nonce & 31) === 0) {
    const random = new Uint32Array(1);
    crypto.getRandomValues(random);
    nonce = ((random[0] as number) & ~31) >>> 0;
    if (nonce === 0) nonce = 32;
  }
  await setJson(STORAGE_NONCE, (nonce + 1) >>> 0);
  return nonce;
}
