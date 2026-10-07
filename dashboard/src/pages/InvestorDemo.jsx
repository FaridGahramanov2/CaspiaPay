import { useEffect, useState } from "react";
import {
  ArrowRight,
  RotateCcw,
  Check,
  Activity,
  Download,
  Terminal,
  Play,
  AlertCircle,
} from "lucide-react";
import { initialState, money, reconciliation, KEY } from "../sandbox/engine";
import { command, stateRequest } from "../sandbox/client";
import "./InvestorDemo.css";
const TABS = [
  "Overview",
  "Routing & API",
  "Marketplace",
  "Reconciliation",
  "Onboarding & billing",
];
export default function InvestorDemo() {
  const [state, setState] = useState(initialState),
    [mode, setMode] = useState("connecting"),
    [tab, setTab] = useState("Overview"),
    [policy, setPolicy] = useState("approval"),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [response, setResponse] = useState(null),
    [selected, setSelected] = useState(""),
    [refund, setRefund] = useState("20"),
    [name, setName] = useState("Caspian Market"),
    [exception, setException] = useState(null),
    [confirmReset, setConfirmReset] = useState(false);
  useEffect(() => {
    let active = true;
    stateRequest()
      .then((data) => {
        if (active) {
          setState(data.state);
          setMode(data.mode);
        }
      })
      .catch((e) => {
        if (active) setError(e.message);
      });
    return () => {
      active = false;
    };
  }, []);
  const payment =
    state.payments.find((p) => p.id === selected) || state.payments.at(-1);
  const totals = reconciliation(state),
    remaining = payment ? payment.amount - payment.refunded : 0;
  const request = {
    amount: 10000,
    currency: "AZN",
    payment_method: "auto",
    policy,
  };
  async function run(path, body = {}, key = "") {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const result = await command(path, body, key);
      const fresh = await stateRequest();
      setState(fresh.state);
      setMode(fresh.mode);
      setResponse(result);
      setNotice("Sandbox updated. No real funds moved.");
      if (path === "/payments") setSelected(result.id);
      return result;
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  async function create() {
    await run("/payments", request, crypto.randomUUID());
  }
  async function exportData() {
    const data = await run("/exports", { payment_id: payment.id });
    if (!data) return;
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `${payment.id}-accounting.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
  const steps = [
    ["PAY", !!payment],
    ["ROUTE", !!payment],
    ["ALLOCATE", !!payment],
    ["SETTLE", payment?.settled],
    ["RECONCILE", payment?.settled],
  ];
  const button = (label, fn, disabled = false, secondary = false) => (
    <button
      className={secondary ? "demo-button secondary" : "demo-button"}
      disabled={busy || mode === "connecting" || disabled}
      onClick={fn}
    >
      {label}
    </button>
  );
  return (
    <div className="investor-demo">
      <div className="demo-disclosure">
        <span className="demo-dot" /> SANDBOX · All providers, balances, KYB and
        settlement files are simulated.{" "}
        <span>
          {mode === "http"
            ? "Local HTTP API connected"
            : mode === "browser"
              ? "Browser simulation · no HTTP backend"
              : "Connecting…"}
        </span>
      </div>
      <section className="demo-hero">
        <div>
          <p className="demo-eyebrow">CASPIAPAY / FINANCIAL OPERATIONS</p>
          <h2>
            Every payment.
            <br />
            <em>The whole story.</em>
          </h2>
          <p>
            Follow one marketplace payment from routing to seller balances,
            settled cash and accounting.
          </p>
          <div className="demo-hero-actions">
            {button(
              <>
                <Play size={15} /> Create AZN 100 payment
              </>,
              create,
              state.merchant.kyb === "pending",
            )}
            {state.merchant.kyb === "pending" &&
              button(
                "Start demo onboarding",
                () => setTab("Onboarding & billing"),
                false,
                true,
              )}
          </div>
        </div>
        <div className="demo-hero-summary">
          <span>ONE INTEGRATION</span>
          <strong>{money(remaining)}</strong>
          <p>
            {payment
              ? "Net amount after refunds"
              : "Ready for your first transaction"}
          </p>
          <div>
            {payment?.id || "POST /payments"} <ArrowRight size={18} />
          </div>
          <small>Illustrative marketplace · no bank affiliation</small>
        </div>
      </section>
      <div className="demo-toolbar">
        <div className="demo-tabs" role="tablist" aria-label="Demo sections">
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              className={tab === t ? "active" : ""}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <button className="demo-reset" onClick={() => setConfirmReset(true)}>
          <RotateCcw size={15} /> Reset
        </button>
      </div>
      {confirmReset && (
        <div className="demo-alert">
          Reset all investor demo payments, events and onboarding?{" "}
          {button("Confirm reset", async () => {
            await run("/reset");
            setSelected("");
            setResponse(null);
            setException(null);
            setConfirmReset(false);
          })}
          {button("Cancel", () => setConfirmReset(false), false, true)}
        </div>
      )}
      {error && (
        <div className="demo-alert error" role="alert">
          <AlertCircle size={18} />
          {error}
        </div>
      )}
      {notice && (
        <p className="demo-notice" role="status">
          {notice}
        </p>
      )}
      <div className="demo-flow">
        {steps.map(([label, done], i) => (
          <div key={label} className={done ? "done" : ""}>
            <span>
              {done ? <Check size={15} /> : String(i + 1).padStart(2, "0")}
            </span>
            {label}
            {i < 4 && <ArrowRight size={16} />}
          </div>
        ))}
      </div>
      {state.payments.length > 0 && (
        <label className="demo-select-payment">
          Transaction{" "}
          <select
            value={payment?.id || ""}
            onChange={(e) => setSelected(e.target.value)}
          >
            {state.payments.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id} · {money(p.amount)} · Provider {p.provider}
              </option>
            ))}
          </select>
        </label>
      )}
      {tab === "Overview" && (
        <div className="demo-columns">
          <section className="demo-panel">
            <p className="demo-eyebrow">A CONNECTED WORKFLOW</p>
            <h3>Where is my money?</h3>
            <p className="demo-muted">
              A payment status alone is not the answer. See which provider
              handled it, who owns each share and whether the cash arrived.
            </p>
            <div className="demo-metrics">
              <div>
                <small>Payments created</small>
                <strong>{state.payments.length}</strong>
              </div>
              <div>
                <small>Open exceptions</small>
                <strong>
                  {state.exceptions.filter((e) => !e.resolved).length}
                </strong>
              </div>
            </div>
            <ol className="demo-guide">
              <li>Complete simulated merchant onboarding.</li>
              <li>Choose a route and create a payment.</li>
              <li>Refund AZN 20 and inspect the seller ledger.</li>
              <li>Match settlement, schedule payout and export.</li>
            </ol>
            {button(
              "Explore routing",
              () => setTab("Routing & API"),
              false,
              true,
            )}
          </section>
          <Timeline state={state} payment={payment} />
        </div>
      )}
      {tab === "Routing & API" && (
        <>
          <div className="demo-columns">
            <section className="demo-panel">
              <p className="demo-eyebrow">TRANSPARENT ORCHESTRATION</p>
              <h3>Choose the rule. See the reason.</h3>
              <label>
                Merchant policy
                <select
                  value={policy}
                  onChange={(e) => setPolicy(e.target.value)}
                >
                  <option value="approval">Maximize approval rate</option>
                  <option value="cost">Minimize processing cost</option>
                </select>
              </label>
              <div className="demo-providers">
                {state.providers.map((p) => (
                  <div key={p.id} className="demo-provider">
                    <div>
                      <strong>Processor {p.id}</strong>
                      <button
                        disabled={busy}
                        aria-pressed={p.online}
                        onClick={() =>
                          run("/providers", { id: p.id, online: !p.online })
                        }
                        className={
                          p.online ? "provider-online" : "provider-offline"
                        }
                      >
                        {p.online ? "Online" : "Offline"} · toggle
                      </button>
                    </div>
                    <dl>
                      <div>
                        <dt>Approval</dt>
                        <dd>{p.approval}%</dd>
                      </div>
                      <div>
                        <dt>Latency</dt>
                        <dd>{p.latency}ms</dd>
                      </div>
                      <div>
                        <dt>Cost</dt>
                        <dd>{p.cost}%</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
              <p className="demo-muted">
                Synthetic comparison metrics. Turn B offline to demonstrate
                pre-dispatch failover. Approval rates do not predict individual
                demo outcomes. Provider costs are not deducted from this ledger.
              </p>
              {button(
                "Run payment through selected policy",
                create,
                state.merchant.kyb === "pending",
              )}
            </section>
            <section className="demo-panel code-panel">
              <p className="demo-eyebrow">
                <Terminal size={15} /> DEVELOPER SANDBOX
              </p>
              <h3>One request. One payment.</h3>
              <pre>{`POST ${mode === "http" ? "/api/sandbox/payments" : "/payments (browser simulation)"}\nAuthorization: Bearer ${KEY}\nIdempotency-Key: <unique-request-id>\n\n${JSON.stringify(request, null, 2)}`}</pre>
              <p>Amounts use minor units: 10000 = AZN 100.00.</p>
              <h4>Last response</h4>
              <pre aria-live="polite">
                {response
                  ? JSON.stringify(response, null, 2)
                  : "Run a request to see its response."}
              </pre>
            </section>
          </div>
          <section className="demo-panel demo-spaced">
            <h3>Webhook event log</h3>
            <p className="demo-muted">
              Simulated delivery to an internal receiver. No external webhook
              requests are sent.
            </p>
            {state.webhooks.length ? (
              state.webhooks
                .slice(-5)
                .reverse()
                .map((w) => (
                  <div className="demo-log" key={w.id}>
                    <code>{w.type}</code>
                    <span>{w.payment_id}</span>
                    <small>{w.delivery}</small>
                  </div>
                ))
            ) : (
              <p>No events yet. Create a payment to emit payment.succeeded.</p>
            )}
          </section>
        </>
      )}
      {tab === "Marketplace" && (
        <div className="demo-columns">
          <section className="demo-panel">
            <p className="demo-eyebrow">ONE PAYMENT, FOUR PARTICIPANTS</p>
            <h3>The money follows the rules.</h3>
            {payment ? (
              <>
                <div className="demo-allocation-bar">
                  {payment.allocations.map((a, i) => (
                    <div
                      key={a.name}
                      style={{ flex: a.amount || 1 }}
                      className={`allocation-${i}`}
                      title={`${a.name}: ${money(a.amount)}`}
                    />
                  ))}
                </div>
                {payment.allocations.map((a) => (
                  <div className="demo-ledger-row" key={a.name}>
                    <span>{a.name}</span>
                    <strong>{money(a.amount)}</strong>
                    <small>
                      {payment.payout && a.name === "Seller"
                        ? "Payout scheduled"
                        : payment.settled
                          ? "Available"
                          : "Pending"}
                    </small>
                  </div>
                ))}
                <p className="demo-muted">
                  Illustrative allocation: 10% platform / 75% seller / 10%
                  courier / 5% affiliate. Operational records, not real wallet
                  accounts.
                </p>
                <label>
                  Partial refund (AZN)
                  <input
                    inputMode="decimal"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={refund}
                    onChange={(e) => setRefund(e.target.value)}
                  />
                </label>
                {button(
                  "Apply proportional refund",
                  () => {
                    if (!/^\d+(\.\d{1,2})?$/.test(refund)) {
                      setError(
                        "Enter an amount with at most two decimal places.",
                      );
                      return;
                    }
                    run("/refunds", {
                      payment_id: payment.id,
                      amount: Math.round(Number(refund) * 100),
                    });
                  },
                  remaining === 0 || payment.payout,
                )}
                <p className="demo-muted">
                  Refunded: {money(payment.refunded)}. Refunds after payout
                  scheduling are outside this demo.
                </p>
              </>
            ) : (
              <Empty />
            )}
          </section>
          <section className="demo-panel">
            <p className="demo-eyebrow">SELLER SETTLEMENT</p>
            <h3>Know what is ready to pay.</h3>
            <div className="demo-metrics">
              <div>
                <small>Pending</small>
                <strong>
                  {money(
                    payment && !payment.settled
                      ? payment.allocations[1].amount
                      : 0,
                  )}
                </strong>
              </div>
              <div>
                <small>Available</small>
                <strong>
                  {money(
                    payment?.settled && !payment.payout
                      ? payment.allocations[1].amount
                      : 0,
                  )}
                </strong>
              </div>
            </div>
            <p>Schedule: next demo business day after matched settlement.</p>
            {button(
              "Match processor + bank settlement",
              () => run("/settlements", { payment_id: payment.id }),
              !payment || payment?.settled,
            )}
            {button(
              "Schedule seller payout",
              () => run("/payouts", { payment_id: payment.id }),
              !payment?.settled || payment?.payout || remaining === 0,
              true,
            )}
            {payment?.payout && (
              <p className="demo-notice">
                Seller payout scheduled. No actual transfer has occurred.
              </p>
            )}
            <Timeline state={state} payment={payment} compact />
          </section>
        </div>
      )}
      {tab === "Reconciliation" && (
        <>
          <div className="demo-recon-stats">
            <Metric
              label="Expected settlement"
              value={money(totals.expected)}
            />
            <Metric
              label="Matched bank receipts"
              value={money(totals.actual)}
            />
            <Metric
              label="Unresolved difference"
              value={money(totals.difference)}
              warn={totals.difference > 0}
            />
          </div>
          <p className="demo-muted">
            Illustrative historical batch plus matched demo payments. Posting
            the AZN 17 fee reduces expected settlement; matching the AZN 100
            receipt increases matched bank receipts.
          </p>
          <div className="demo-columns">
            <section className="demo-panel">
              <p className="demo-eyebrow">EXCEPTION WORKSPACE</p>
              <h3>
                {state.exceptions.filter((e) => !e.resolved).length} exceptions
                to review
              </h3>
              {state.exceptions.map((e) => (
                <button
                  className="demo-exception"
                  key={e.id}
                  onClick={() => setException(e.id)}
                >
                  <span>
                    {e.resolved ? (
                      <Check size={18} />
                    ) : (
                      <AlertCircle size={18} />
                    )}{" "}
                    {e.reason}
                  </span>
                  <strong>{money(e.amount)}</strong>
                  <small>{e.resolved ? "Resolved" : "Review evidence"}</small>
                </button>
              ))}
              {exception && (
                <div className="demo-evidence">
                  <h4>Evidence · {exception}</h4>
                  <p>
                    {exception === "ex_fee"
                      ? "Processor batch: gross and net differ by AZN 17. The missing fee entry explains the variance."
                      : "Bank receipt: AZN 100 arrived without a matching payment reference. Simulated operator confirmation supplies the reference."}
                  </p>
                  <ol>
                    <li>Historical payment record imported</li>
                    <li>Processor settlement event inspected</li>
                    <li>Bank receipt and fee/refund records compared</li>
                    <li>Operator confirms source evidence</li>
                  </ol>
                  {button(
                    "Confirm evidence and resolve",
                    () => run("/exceptions", { id: exception }),
                    state.exceptions.find((e) => e.id === exception)?.resolved,
                  )}
                </div>
              )}
            </section>
            <section className="demo-panel">
              <p className="demo-eyebrow">LOCAL ACCOUNTING WORKFLOW</p>
              <h3>From payment to accounting entry.</h3>
              <p>
                Payment received · invoice updated · bank settlement matched ·
                accounting export generated.
              </p>
              {button(
                "Match selected payment",
                () => run("/settlements", { payment_id: payment.id }),
                !payment || payment?.settled,
              )}
              {button(
                <>
                  <Download size={16} /> Download accounting JSON
                </>,
                exportData,
                !payment?.settled,
                true,
              )}
              <p className="demo-muted">
                Real downloadable data for this transaction. Generic schema for
                ERP mapping; no live 1C or e-Qaimə connection or electronic
                signature.
              </p>
              <Timeline state={state} payment={payment} compact />
            </section>
          </div>
        </>
      )}
      {tab === "Onboarding & billing" && (
        <div className="demo-columns">
          <section className="demo-panel">
            <p className="demo-eyebrow">MERCHANT WORKSPACE</p>
            <h3>One business. A connected setup.</h3>
            <label>
              Business name
              <input
                value={name}
                maxLength={80}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            {button("Create business & approve demo KYB", () =>
              run("/merchant", { name }),
            )}
            <dl className="demo-profile">
              <dt>Business</dt>
              <dd>{state.merchant.name}</dd>
              <dt>KYB</dt>
              <dd>
                {state.merchant.kyb === "pending"
                  ? "Awaiting demo onboarding"
                  : "Verified in simulation only"}
              </dd>
              <dt>Settlement account</dt>
              <dd>{state.merchant.account}</dd>
              <dt>Enabled</dt>
              <dd>Cards (simulated)</dd>
              <dt>Future rails</dt>
              <dd>AZQR, IPS, Open Banking · not connected</dd>
            </dl>
            <label>
              Sandbox key
              <input readOnly value={KEY} />
            </label>
            <p className="demo-muted">
              Public demo key. Not a secret and not production authentication.
              Never enter real identity documents or banking data.
            </p>
          </section>
          <section className="demo-panel">
            <p className="demo-eyebrow">SUBSCRIPTIONS</p>
            <h3>A failed payment is a workflow.</h3>
            <p>Demo education customer · Monthly platform plan · AZN 29.00</p>
            <p className="demo-muted">
              Illustrative billing amount, not CaspiaPay pricing. Advance the
              retry clock without waiting days.
            </p>
            {button(
              state.subscription
                ? "Run scheduled retry now"
                : "Create subscription & simulate decline",
              () => run("/billing"),
              state.subscription?.status === "paid",
            )}
            <div className="demo-billing-status">
              <Activity size={22} />
              <strong>
                {state.subscription?.status === "paid"
                  ? "Invoice paid"
                  : state.subscription
                    ? "Past due · retry queued"
                    : "No invoice yet"}
              </strong>
              <span>
                {state.subscription
                  ? `${state.subscription.attempts} attempt(s)`
                  : "Create the first billing cycle"}
              </span>
            </div>
            {state.events
              .filter((e) => e.type.startsWith("invoice."))
              .map((e) => (
                <div className="demo-log" key={e.id}>
                  <code>{e.type}</code>
                  <small>{e.detail}</small>
                </div>
              ))}
          </section>
        </div>
      )}
    </div>
  );
}
function Empty() {
  return (
    <p className="demo-empty">
      Create your first payment to see allocations and settlement activity here.
    </p>
  );
}
function Metric({ label, value, warn }) {
  return (
    <div className={`demo-panel ${warn ? "metric-warning" : ""}`}>
      <small>{label}</small>
      <strong className="demo-big-number">{value}</strong>
    </div>
  );
}
function Timeline({ state, payment, compact = false }) {
  const events = state.events.filter((e) => e.paymentId === payment?.id);
  return (
    <section
      className={compact ? "demo-timeline compact" : "demo-panel demo-timeline"}
    >
      <p className="demo-eyebrow">UNIFIED TRANSACTION TIMELINE</p>
      <h3>{payment ? payment.id : "The full story starts here."}</h3>
      {!events.length ? (
        <Empty />
      ) : (
        <ol>
          {events.map((e) => (
            <li key={e.id}>
              <span className="timeline-dot">
                <Check size={11} />
              </span>
              <div>
                <strong>{e.type.replaceAll(".", " · ")}</strong>
                <p>{e.detail}</p>
                <time>{new Date(e.at).toLocaleTimeString("en-GB")}</time>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
