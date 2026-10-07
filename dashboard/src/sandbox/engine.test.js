import { test } from "node:test";
import assert from "node:assert/strict";
import { initialState, execute, reconciliation } from "./engine.js";
const request = {
  amount: 10000,
  currency: "AZN",
  payment_method: "auto",
  policy: "approval",
};
function ready() {
  return execute(initialState(), "/merchant", { name: "Test marketplace" })
    .state;
}
function paid(amount = 10000) {
  return execute(ready(), "/payments", { ...request, amount }, "key").state;
}
test("onboarding, idempotency, validation and policy selection", () => {
  assert.throws(
    () => execute(initialState(), "/payments", request, "x"),
    /onboarding/,
  );
  const s = paid();
  assert.equal(s.payments[0].provider, "B");
  assert.deepEqual(
    s.payments[0].allocations.map((a) => a.amount),
    [1000, 7500, 1000, 500],
  );
  assert.equal(s.webhooks[0].type, "payment.succeeded");
  assert.equal(
    execute(s, "/payments", request, "key").state.payments.length,
    1,
  );
  assert.throws(
    () => execute(s, "/payments", { ...request, amount: 20000 }, "key"),
    /different request/,
  );
  assert.equal(
    execute(ready(), "/payments", { ...request, policy: "cost" }, "cheap")
      .result.provider,
    "A",
  );
  assert.throws(
    () => execute(ready(), "/payments", { ...request, amount: 1.1 }, "bad"),
    /integer/,
  );
});
test("healthy-provider failover and total outage", () => {
  let s = execute(ready(), "/providers", { id: "B", online: false }).state;
  s = execute(s, "/payments", request, "failover").state;
  assert.equal(s.payments[0].provider, "A");
  assert.ok(s.events.some((e) => e.type === "route.failover"));
  s = execute(s, "/providers", { id: "A", online: false }).state;
  assert.throws(
    () => execute(s, "/payments", request, "outage"),
    /unavailable/,
  );
  assert.equal(s.payments.length, 1);
});
test("refund conservation and over-refund protection", () => {
  let s = paid(10001);
  s = execute(s, "/refunds", {
    payment_id: s.payments[0].id,
    amount: 2000,
  }).state;
  assert.equal(
    s.payments[0].allocations.reduce((n, a) => n + a.amount, 0),
    8001,
  );
  assert.throws(
    () =>
      execute(s, "/refunds", { payment_id: s.payments[0].id, amount: 8002 }),
    /remaining/,
  );
  s = execute(s, "/refunds", {
    payment_id: s.payments[0].id,
    amount: 8001,
  }).state;
  assert.equal(s.payments[0].status, "refunded");
  assert.equal(
    s.payments[0].allocations.reduce((n, a) => n + a.amount, 0),
    0,
  );
});
test("settlement gates, payout protection and accounting export", () => {
  let s = paid();
  const body = { payment_id: s.payments[0].id };
  assert.throws(() => execute(s, "/payouts", body), /settlement/);
  assert.throws(() => execute(s, "/exports", body), /settlement/);
  s = execute(s, "/refunds", { ...body, amount: 2000 }).state;
  s = execute(s, "/settlements", body).state;
  assert.equal(s.payments[0].allocations[1].amount, 6000);
  const exported = execute(s, "/exports", body).result;
  assert.equal(exported.settlement, 8000);
  assert.equal(
    exported.allocations.reduce((n, a) => n + a.amount, 0),
    8000,
  );
  const count = s.events.length;
  assert.equal(execute(s, "/settlements", body).state.events.length, count);
  s = execute(s, "/payouts", body).state;
  assert.throws(
    () => execute(s, "/refunds", { ...body, amount: 100 }),
    /before payout/,
  );
});
test("reconciliation, subscription retry, reset", () => {
  let s = paid();
  assert.deepEqual(reconciliation(s), {
    expected: 12743000,
    actual: 12731300,
    difference: 11700,
  });
  for (const id of ["ex_fee", "ex_bank"])
    s = execute(s, "/exceptions", { id }).state;
  assert.deepEqual(reconciliation(s), {
    expected: 12741300,
    actual: 12741300,
    difference: 0,
  });
  s = execute(s, "/billing").state;
  assert.equal(s.subscription.status, "past_due");
  s = execute(s, "/billing").state;
  assert.equal(s.subscription.status, "paid");
  assert.equal(s.subscription.attempts, 2);
  assert.equal(execute(s, "/billing").state.subscription.attempts, 2);
  assert.deepEqual(execute(s, "/reset").state, initialState());
});
