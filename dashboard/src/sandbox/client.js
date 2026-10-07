import { initialState, execute, KEY } from "./engine";
const STORAGE = "caspiapay-investor-sandbox-v1";
let mode = null;
function localState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE));
    if (s?.version === 1 && Array.isArray(s.payments)) return s;
  } catch {
    /* A reset recovers corrupt storage. */
  }
  return initialState();
}
export function resetConnection() {
  mode = null;
}
export async function stateRequest() {
  if (mode === "browser") return { state: localState(), mode };
  try {
    const r = await fetch("/api/sandbox/state", {
      headers: { Authorization: `Bearer ${KEY}` },
      signal: AbortSignal.timeout(2500),
    });
    if (r.headers.get("content-type")?.includes("application/json")) {
      if (!r.ok) throw new Error("Local API unavailable");
      const state = await r.json();
      mode = "http";
      return { state, mode };
    }
    if (mode === "http") throw new Error("Local API disconnected");
  } catch (e) {
    if (mode === "http") throw e;
  }
  mode = "browser";
  return { state: localState(), mode };
}
export async function command(path, body = {}, key = "") {
  if (!mode) await stateRequest();
  if (mode === "http") {
    const r = await fetch(`/api/sandbox${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KEY}`,
        "Idempotency-Key": key,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10000),
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.error);
    return data;
  }
  const output = execute(localState(), path, body, key);
  localStorage.setItem(STORAGE, JSON.stringify(output.state));
  return output.result;
}
