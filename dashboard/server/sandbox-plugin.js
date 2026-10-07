import { execute, initialState, KEY } from "../src/sandbox/engine.js";
export default function sandboxPlugin() {
  let state = initialState();
  function middleware(req, res, next) {
    const path = (req.url || "").split("?")[0];
    if (!path.startsWith("/api/sandbox/")) return next();
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-store");
    const send = (status, data) => {
      res.statusCode = status;
      res.end(JSON.stringify(data));
    };
    if (req.headers.authorization !== `Bearer ${KEY}`)
      return send(401, {
        error: "Use the documented demo key. Never use production credentials.",
      });
    if (req.method === "GET" && path === "/api/sandbox/state")
      return send(200, state);
    if (req.method !== "POST")
      return send(405, { error: "Method not allowed" });
    let input = "";
    let large = false;
    req.on("data", (chunk) => {
      input += chunk;
      if (input.length > 16384 && !large) {
        large = true;
        send(413, { error: "Request too large" });
      }
    });
    req.on("end", () => {
      if (large) return;
      try {
        const output = execute(
          state,
          path.slice("/api/sandbox".length),
          JSON.parse(input || "{}"),
          req.headers["idempotency-key"],
        );
        state = output.state;
        send(200, output.result);
      } catch (e) {
        send(e.status || 400, { error: e.message });
      }
    });
  }
  return {
    name: "caspiapay-local-sandbox",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}
