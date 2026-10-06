export const KEY = "sk_test_caspiapay_investor_only";
export const money = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "AZN" }).format(
    value / 100,
  );
export function initialState() {
  return {
    version: 1,
    merchant: {
      name: "Caspian Market",
      kyb: "pending",
      account: "DEMO settlement account",
      methods: ["Cards (simulated)"],
    },
    providers: [
      { id: "A", online: true, approval: 94, latency: 180, cost: 1.2 },
      { id: "B", online: true, approval: 98.7, latency: 240, cost: 1.8 },
    ],
    payments: [],
    events: [],
    webhooks: [],
    keys: {},
    subscription: null,
    exceptions: [
      {
        id: "ex_fee",
        amount: 1700,
        reason: "Processor fee not yet posted",
        resolved: false,
      },
      {
        id: "ex_bank",
        amount: 10000,
        reason: "Bank receipt awaiting reference match",
        resolved: false,
      },
    ],
  };
}
function fail(message, status = 409) {
  const error = new Error(message);
  error.status = status;
  throw error;
}
function event(s, paymentId, type, detail) {
  const e = {
    id: `evt_${s.events.length + 1}`,
    paymentId,
    type,
    detail,
    at: new Date().toISOString(),
  };
  s.events.push(e);
  return e;
}
function webhook(s, p, type) {
  s.webhooks.push({
    id: `wh_${s.webhooks.length + 1}`,
    type,
    payment_id: p.id,
    amount: p.amount,
    refunded: p.refunded,
    delivery: "Simulated receiver acknowledged",
    attempts: 1,
  });
}
const split = (amount) => {
  const platform = Math.floor(amount * 0.1),
    courier = Math.floor(amount * 0.1),
    affiliate = Math.floor(amount * 0.05);
  return [
    { name: "Platform", amount: platform },
    { name: "Seller", amount: amount - platform - courier - affiliate },
    { name: "Courier", amount: courier },
    { name: "Affiliate", amount: affiliate },
  ];
};
export function reconciliation(s) {
  const matched = s.payments
    .filter((p) => p.settled)
    .reduce((n, p) => n + p.amount - p.refunded, 0);
  const feePosted = s.exceptions.find((e) => e.id === "ex_fee")?.resolved
    ? 1700
    : 0;
  const receiptMatched = s.exceptions.find((e) => e.id === "ex_bank")?.resolved
    ? 10000
    : 0;
  const expected = 12743000 + matched - feePosted;
  const actual = 12731300 + matched + receiptMatched;
  return { expected, actual, difference: expected - actual };
}
export function execute(state, path, body = {}, idempotencyKey = "") {
  const s = structuredClone(state);
  if (path === "/reset")
    return { state: initialState(), result: { reset: true } };
  if (path === "/merchant") {
    const name = String(body.name || "").trim();
    if (!name || name.length > 80)
      fail("Enter a business name of 1–80 characters.", 400);
    s.merchant = { ...s.merchant, name, kyb: "verified_demo" };
    event(
      s,
      null,
      "merchant.verified",
      "Simulated KYB approved. No real verification.",
    );
  } else if (path === "/providers") {
    const p = s.providers.find((p) => p.id === body.id);
    if (!p || typeof body.online !== "boolean")
      fail("Invalid provider update.", 400);
    p.online = body.online;
  } else if (path === "/payments") {
    if (s.merchant.kyb !== "verified_demo")
      fail("Complete demo onboarding first.");
    if (
      !Number.isSafeInteger(body.amount) ||
      body.amount < 100 ||
      body.amount > 100000000 ||
      body.currency !== "AZN" ||
      body.payment_method !== "auto"
    )
      fail(
        "Use integer minor units (100–100000000), AZN and payment_method auto.",
        400,
      );
    if (!["approval", "cost"].includes(body.policy))
      fail("Policy must be approval or cost.", 400);
    if (!idempotencyKey || idempotencyKey.length > 100)
      fail("Supply an Idempotency-Key of 1–100 characters.", 400);
    const fingerprint = JSON.stringify(body);
    if (Object.hasOwn(s.keys, idempotencyKey)) {
      if (s.keys[idempotencyKey].fingerprint !== fingerprint)
        fail("Idempotency key already used with a different request.");
      return {
        state: s,
        result: s.payments.find((p) => p.id === s.keys[idempotencyKey].id),
      };
    }
    const sorted = [...s.providers].sort((a, b) =>
      body.policy === "cost" ? a.cost - b.cost : b.approval - a.approval,
    );
    const route = sorted.find((p) => p.online);
    if (!route) fail("Both simulated providers are unavailable.", 503);
    const p = {
      id: `pay_demo_${s.payments.length + 1}`,
      amount: body.amount,
      currency: "AZN",
      refunded: 0,
      provider: route.id,
      policy: body.policy,
      status: "succeeded",
      settled: false,
      payout: false,
      allocations: split(body.amount),
      createdAt: new Date().toISOString(),
    };
    s.payments.push(p);
    s.keys = { ...s.keys, [idempotencyKey]: { fingerprint, id: p.id } };
    event(
      s,
      p.id,
      "payment.received",
      `${money(p.amount)} received through the unified API`,
    );
    if (route.id !== sorted[0].id)
      event(
        s,
        p.id,
        "route.failover",
        `Provider ${sorted[0].id} offline before dispatch. Selected ${route.id}; no duplicate attempt.`,
      );
    event(
      s,
      p.id,
      "payment.routed",
      `Provider ${route.id}: ${body.policy === "cost" ? "lowest available cost" : "highest available approval rate"} policy`,
    );
    event(
      s,
      p.id,
      "payment.authenticated",
      "Simulated 3DS authentication completed",
    );
    event(
      s,
      p.id,
      "payment.authorized",
      "Simulated issuer authorization accepted",
    );
    event(
      s,
      p.id,
      "allocation.created",
      "10% platform, 75% seller, 10% courier, 5% affiliate. Pending settlement.",
    );
    webhook(s, p, "payment.succeeded");
    return { state: s, result: p };
  } else if (path === "/refunds") {
    const p = s.payments.find((p) => p.id === body.payment_id);
    if (!p) fail("Payment not found.", 404);
    if (p.payout)
      fail(
        "This demo only supports refunds before payout. Post-payout recovery requires a separate workflow.",
      );
    if (
      !Number.isSafeInteger(body.amount) ||
      body.amount <= 0 ||
      body.amount > p.amount - p.refunded
    )
      fail(
        "Refund must be positive and no greater than the remaining amount.",
        400,
      );
    p.refunded += body.amount;
    p.allocations = split(p.amount - p.refunded);
    p.status = p.refunded === p.amount ? "refunded" : "partially_refunded";
    event(
      s,
      p.id,
      "refund.succeeded",
      `${money(body.amount)} reversed proportionally; remaining allocations recomputed in integer minor units.`,
    );
    webhook(s, p, "refund.succeeded");
  } else if (
    path === "/settlements" ||
    path === "/payouts" ||
    path === "/exports"
  ) {
    const p = s.payments.find((p) => p.id === body.payment_id);
    if (!p) fail("Payment not found.", 404);
    if (path === "/settlements") {
      if (!p.settled) {
        p.settled = true;
        event(
          s,
          p.id,
          "processor.settled",
          `${money(p.amount - p.refunded)} expected (demo fee assumption: zero)`,
        );
        event(
          s,
          p.id,
          "bank.matched",
          "Simulated bank receipt matched to processor reference",
        );
      }
    }
    if (path === "/payouts") {
      if (!p.settled) fail("Match settlement before scheduling payout.");
      if (p.refunded === p.amount)
        fail("Fully refunded payments have no payout.");
      if (!p.payout) {
        p.payout = true;
        event(
          s,
          p.id,
          "payout.scheduled",
          `${money(p.allocations.find((a) => a.name === "Seller").amount)} seller payout scheduled for next demo business day. No funds moved.`,
        );
      }
    }
    if (path === "/exports") {
      if (!p.settled) fail("Match settlement before exporting.");
      event(
        s,
        p.id,
        "accounting.exported",
        "Generic accounting JSON prepared; not a certified 1C or e-Qaimə connector.",
      );
      return {
        state: s,
        result: {
          format: "caspiapay-accounting-demo-v1",
          payment_id: p.id,
          currency: "AZN",
          unit: "minor",
          invoice_status:
            p.refunded === p.amount
              ? "refunded"
              : p.refunded
                ? "partially_refunded"
                : "paid",
          settlement: p.amount - p.refunded,
          allocations: p.allocations,
          connector: "Generic JSON; map to your ERP schema",
        },
      };
    }
  } else if (path === "/exceptions") {
    const e = s.exceptions.find((e) => e.id === body.id);
    if (!e) fail("Exception not found.", 404);
    e.resolved = true;
    event(
      s,
      null,
      "exception.resolved",
      `${e.id}: simulated source evidence confirmed and discrepancy cleared`,
    );
  } else if (path === "/billing") {
    if (!s.subscription) {
      s.subscription = {
        customer: "Demo education customer",
        plan: "Monthly platform subscription",
        amount: 2900,
        status: "past_due",
        attempts: 1,
      };
      event(
        s,
        null,
        "invoice.payment_failed",
        "Illustrative AZN 29 subscription. First attempt declined; retry queued.",
      );
    } else if (s.subscription.status === "past_due") {
      s.subscription.status = "paid";
      s.subscription.attempts++;
      event(
        s,
        null,
        "invoice.paid",
        "Scheduled retry executed in accelerated demo time; invoice paid.",
      );
    }
  } else fail("Unknown sandbox endpoint.", 404);
  return { state: s, result: { ok: true } };
}
