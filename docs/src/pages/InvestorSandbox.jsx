export default function InvestorSandbox() {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <p className="text-teal-600 font-semibold">LOCAL DEVELOPMENT SANDBOX</p>
      <h1>One transaction. The complete money flow.</h1>
      <p>
        Connect onboarding, routing, allocations, refunds, settlement and
        accounting in one shared state. All providers and financial records are
        simulated.
      </p>
      <h2>Run locally</h2>
      <pre>
        cd dashboard{`\n`}npm ci{`\n`}npm run dev -- --host 127.0.0.1
      </pre>
      <p>
        Sign in with the existing demo form and select Investor sandbox. Vite
        serves real local HTTP endpoints. Static hosting uses browser storage,
        clearly labelled Browser simulation, with no HTTP API.
      </p>
      <h2>Create a merchant and payment</h2>
      <pre className="overflow-x-auto">{`curl http://127.0.0.1:5173/api/sandbox/merchant -H 'Authorization: Bearer sk_test_caspiapay_investor_only' -H 'Content-Type: application/json' -d '{"name":"Caspian Market"}'

curl http://127.0.0.1:5173/api/sandbox/payments -H 'Authorization: Bearer sk_test_caspiapay_investor_only' -H 'Content-Type: application/json' -H 'Idempotency-Key: investor-001' -d '{"amount":10000,"currency":"AZN","payment_method":"auto","policy":"approval"}'`}</pre>
      <p>
        Refresh the dashboard to see external API requests. This public demo key
        is not production authentication. Bind to localhost and never submit
        sensitive data.
      </p>
      <h2>Endpoint contract</h2>
      <table>
        <thead>
          <tr>
            <th>After /api/sandbox</th>
            <th>Request</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["GET /state", "Current shared state"],
            ["POST /merchant", "name; simulated KYB approval"],
            ["POST /providers", "id: A or B, online: boolean"],
            [
              "POST /payments",
              "Integer minor-unit amount, AZN, auto, policy approval or cost. Idempotency-Key required.",
            ],
            [
              "POST /refunds",
              "payment_id and positive integer minor-unit amount",
            ],
            ["POST /settlements", "payment_id"],
            ["POST /payouts", "payment_id"],
            ["POST /exports", "payment_id; generic accounting JSON"],
            ["POST /exceptions", "id: ex_fee or ex_bank"],
            [
              "POST /billing",
              "First call fails invoice, second advances retry and pays",
            ],
            ["POST /reset", "Clear the entire sandbox"],
          ].map(([a, b]) => (
            <tr key={a}>
              <td>
                <code>{a}</code>
              </td>
              <td>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Behaviour and limitations</h2>
      <ul>
        <li>
          10000 minor units = AZN 100. Allocations sum to the net amount,
          including rounding.
        </li>
        <li>
          Same payment key returns the original payment. Different payload with
          that key returns 409.
        </li>
        <li>
          Failover happens before dispatch, not after an ambiguous timeout.
        </li>
        <li>
          Refunds cannot exceed remaining funds. Post-payout recovery is outside
          this demo.
        </li>
        <li>Settlement is required for payout scheduling and export.</li>
        <li>
          Webhook delivery is an internal simulation, not an HTTP callback.
        </li>
        <li>
          Routing costs are synthetic comparison inputs. This ledger assumes
          zero processing fees.
        </li>
        <li>
          No live bank, AZQR, Open Banking, 1C or e-Qaimə connector exists.
        </li>
      </ul>
      <h2>Eight-minute walkthrough</h2>
      <ol>
        <li>Approve demo KYB.</li>
        <li>Create AZN 100 with approval policy: B wins.</li>
        <li>Turn B offline and create a second payment: A handles failover.</li>
        <li>Inspect the 10 / 75 / 10 / 5 split. Refund AZN 20.</li>
        <li>Match settlement: seller has AZN 60 available.</li>
        <li>Schedule payout and inspect the transaction timeline.</li>
        <li>Resolve the two historical exceptions explaining AZN 117.</li>
        <li>
          Download accounting JSON and demonstrate a subscription decline/retry.
        </li>
      </ol>
      <p>
        Other API pages describe the proposed product. Only the local endpoints
        above are implemented here. Server memory resets on restart; browser
        mode persists until reset or storage is cleared. Existing historical
        dashboard mock records are separate from this ledger.
      </p>
    </article>
  );
}
