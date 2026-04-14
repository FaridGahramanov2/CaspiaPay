import CodeBlock from '../components/ui/CodeBlock';
import EndpointBlock from '../components/ui/EndpointBlock';
import ParamTable from '../components/ui/ParamTable';

export default function Payouts() {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>Payouts</h1>
      <p className="lead">
        The Payouts API allows you to send funds to your merchants' bank accounts.
      </p>

      <h2>Create a payout</h2>
      <EndpointBlock method="POST" path="/v1/payouts" />

      <h3>Parameters</h3>
      <ParamTable
        params={[
          { name: 'amount', type: 'integer', required: true, description: 'Amount in qəpik' },
          { name: 'currency', type: 'string', required: true, description: 'Three-letter ISO currency code (AZN)' },
          { name: 'merchant_id', type: 'string', required: true, description: 'ID of the merchant to pay out to' },
          { name: 'description', type: 'string', required: false, description: 'Description of the payout' },
        ]}
      />

      <h3>Example Request</h3>
      <CodeBlock
        tabs={[
          {
            label: 'Node.js',
            language: 'javascript',
            code: `const payout = await caspiapay.payouts.create({
  amount: 50000,  // ₼500.00
  currency: 'AZN',
  merchant_id: 'merch_baku_eats',
  description: 'Weekly payout'
});`
          },
          {
            label: 'Python',
            language: 'python',
            code: `payout = caspiapay.Payout.create(
    amount=50000,
    currency="AZN",
    merchant_id="merch_baku_eats",
    description="Weekly payout"
)`
          },
        ]}
      />

      <h3>Response</h3>
      <CodeBlock
        language="json"
        code={`{
  "id": "po_xyz789",
  "amount": 50000,
  "currency": "AZN",
  "merchant_id": "merch_baku_eats",
  "status": "pending",
  "description": "Weekly payout",
  "scheduled_date": "2026-04-14T00:00:00Z",
  "created_at": "2026-04-13T14:30:00Z"
}`}
      />

      <hr />

      <h2>Retrieve a payout</h2>
      <EndpointBlock method="GET" path="/v1/payouts/:id" />

      <h3>Example Request</h3>
      <CodeBlock
        language="bash"
        code={`curl https://api.caspiapay.az/v1/payouts/po_xyz789 \\
  -H "Authorization: Bearer sk_test_xxx"`}
      />

      <hr />

      <h2>Payout statuses</h2>
      <ul>
        <li><code>pending</code> — Payout is queued for processing</li>
        <li><code>in_transit</code> — Payout is being sent to the bank</li>
        <li><code>completed</code> — Payout has been successfully delivered</li>
        <li><code>failed</code> — Payout failed (e.g., invalid bank details)</li>
      </ul>
    </div>
  );
}
