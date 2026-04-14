import CodeBlock from '../components/ui/CodeBlock';
import EndpointBlock from '../components/ui/EndpointBlock';
import ParamTable from '../components/ui/ParamTable';
import Callout from '../components/ui/Callout';

export default function Charges() {
  const createParams = [
    { name: 'amount', type: 'integer', required: true, description: 'Amount in qəpik (e.g., 5000 = ₼50.00)' },
    { name: 'currency', type: 'string', required: true, description: 'Three-letter ISO currency code (AZN)' },
    { name: 'card_token', type: 'string', required: true, description: 'Token representing the card to charge' },
    { name: 'description', type: 'string', required: false, description: 'Description of the charge' },
    { name: 'merchant_id', type: 'string', required: false, description: 'ID of sub-merchant (for Connect)' },
    { name: 'metadata', type: 'object', required: false, description: 'Custom key-value data' },
  ];

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>Charges</h1>
      <p className="lead">
        The Charges API allows you to create, retrieve, and refund payments.
      </p>

      <h2>Create a charge</h2>
      <p>
        Creates a new charge object and processes the payment immediately.
      </p>

      <EndpointBlock method="POST" path="/v1/charges" />

      <h3>Parameters</h3>
      <ParamTable params={createParams} />

      <Callout type="info">
        Amounts are always in qəpik (1/100 of AZN). To charge ₼50.00, use <code>amount: 5000</code>
      </Callout>

      <h3>Example Request</h3>
      <CodeBlock
        tabs={[
          {
            label: 'cURL',
            language: 'bash',
            code: `curl https://api.caspiapay.az/v1/charges \\
  -H "Authorization: Bearer sk_test_xxx" \\
  -d amount=5000 \\
  -d currency=AZN \\
  -d card_token=tok_visa_4242 \\
  -d description="Order #1234"`
          },
          {
            label: 'Node.js',
            language: 'javascript',
            code: `const charge = await caspiapay.charges.create({
  amount: 5000,
  currency: 'AZN',
  card_token: 'tok_visa_4242',
  description: 'Order #1234',
  metadata: {
    order_id: '1234',
    customer_email: 'user@example.com'
  }
});`
          },
          {
            label: 'Python',
            language: 'python',
            code: `charge = caspiapay.Charge.create(
    amount=5000,
    currency="AZN",
    card_token="tok_visa_4242",
    description="Order #1234",
    metadata={
        "order_id": "1234",
        "customer_email": "user@example.com"
    }
)`
          },
          {
            label: 'PHP',
            language: 'php',
            code: `$charge = $caspiapay->charges->create([
    'amount' => 5000,
    'currency' => 'AZN',
    'card_token' => 'tok_visa_4242',
    'description' => 'Order #1234',
    'metadata' => [
        'order_id' => '1234',
        'customer_email' => 'user@example.com'
    ]
]);`
          },
        ]}
      />

      <h3>Response</h3>
      <CodeBlock
        language="json"
        code={`{
  "id": "ch_1a2b3c4d5e",
  "amount": 5000,
  "currency": "AZN",
  "status": "succeeded",
  "card": {
    "brand": "visa",
    "last4": "4242",
    "exp_month": 12,
    "exp_year": 2027,
    "three_d_secure": "authenticated"
  },
  "description": "Order #1234",
  "metadata": {
    "order_id": "1234",
    "customer_email": "user@example.com"
  },
  "created_at": "2026-04-13T14:30:00Z"
}`}
      />

      <hr />

      <h2>Retrieve a charge</h2>
      <p>
        Retrieves the details of a charge that has previously been created.
      </p>

      <EndpointBlock method="GET" path="/v1/charges/:id" />

      <h3>Example Request</h3>
      <CodeBlock
        tabs={[
          {
            label: 'cURL',
            language: 'bash',
            code: `curl https://api.caspiapay.az/v1/charges/ch_1a2b3c4d5e \\
  -H "Authorization: Bearer sk_test_xxx"`
          },
          {
            label: 'Node.js',
            language: 'javascript',
            code: `const charge = await caspiapay.charges.retrieve('ch_1a2b3c4d5e');`
          },
          {
            label: 'Python',
            language: 'python',
            code: `charge = caspiapay.Charge.retrieve('ch_1a2b3c4d5e')`
          },
        ]}
      />

      <hr />

      <h2>Refund a charge</h2>
      <p>
        Refunds a charge that has previously been created but not yet refunded.
      </p>

      <EndpointBlock method="POST" path="/v1/charges/:id/refund" />

      <h3>Parameters</h3>
      <ParamTable
        params={[
          { name: 'amount', type: 'integer', required: false, description: 'Amount to refund in qəpik. Defaults to full charge amount.' },
          { name: 'reason', type: 'string', required: false, description: 'Reason for refund (optional)' },
        ]}
      />

      <h3>Example Request</h3>
      <CodeBlock
        tabs={[
          {
            label: 'cURL',
            language: 'bash',
            code: `curl https://api.caspiapay.az/v1/charges/ch_1a2b3c4d5e/refund \\
  -H "Authorization: Bearer sk_test_xxx" \\
  -d amount=5000`
          },
          {
            label: 'Node.js',
            language: 'javascript',
            code: `const refund = await caspiapay.charges.refund('ch_1a2b3c4d5e', {
  amount: 5000,
  reason: 'Customer requested refund'
});`
          },
        ]}
      />

      <hr />

      <h2>List all charges</h2>
      <p>
        Returns a list of charges you've created, with the most recent charges appearing first.
      </p>

      <EndpointBlock method="GET" path="/v1/charges" />

      <h3>Parameters</h3>
      <ParamTable
        params={[
          { name: 'limit', type: 'integer', required: false, description: 'Number of charges to return (1-100, default 10)' },
          { name: 'starting_after', type: 'string', required: false, description: 'ID for pagination' },
        ]}
      />

      <h3>Example Request</h3>
      <CodeBlock
        tabs={[
          {
            label: 'cURL',
            language: 'bash',
            code: `curl https://api.caspiapay.az/v1/charges?limit=20 \\
  -H "Authorization: Bearer sk_test_xxx"`
          },
          {
            label: 'Node.js',
            language: 'javascript',
            code: `const charges = await caspiapay.charges.list({ limit: 20 });`
          },
        ]}
      />
    </div>
  );
}
