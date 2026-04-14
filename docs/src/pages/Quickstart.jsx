import CodeBlock from '../components/ui/CodeBlock';
import Callout from '../components/ui/Callout';

export default function Quickstart() {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>Quickstart Guide</h1>
      <p className="lead">
        Get started with CaspiaPay in under 15 minutes. This guide will walk you through creating your first charge.
      </p>

      <h2>1. Create an account & get API keys</h2>
      <p>
        Sign up for an CaspiaPay account and retrieve your API keys from the dashboard.
        You'll get two keys:
      </p>
      <ul>
        <li><code>sk_test_xxxxxxxxxx</code> — For testing (no real charges)</li>
        <li><code>sk_live_xxxxxxxxxx</code> — For live transactions (use after going live)</li>
      </ul>

      <Callout type="warning">
        Never share your secret keys or commit them to version control. Always use environment variables.
      </Callout>

      <h2>2. Install the SDK</h2>
      <p>Choose your preferred language and install the CaspiaPay SDK:</p>

      <CodeBlock
        tabs={[
          { label: 'Node.js', language: 'bash', code: 'npm install caspiapay' },
          { label: 'Python', language: 'bash', code: 'pip install caspiapay' },
          { label: 'PHP', language: 'bash', code: 'composer require caspiapay/caspiapay-php' },
        ]}
      />

      <h2>3. Create your first charge</h2>
      <p>
        A charge represents a payment from a customer. Here's how to create one:
      </p>

      <CodeBlock
        tabs={[
          {
            label: 'Node.js',
            language: 'javascript',
            code: `const caspiapay = require('caspiapay')('sk_test_xxx');

const charge = await caspiapay.charges.create({
  amount: 5000,        // ₼50.00 in qəpik
  currency: 'AZN',
  card_token: 'tok_visa_4242',
  description: 'Order #1234'
});

console.log(charge.status); // 'succeeded'`
          },
          {
            label: 'Python',
            language: 'python',
            code: `import caspiapay
caspiapay.api_key = "sk_test_xxx"

charge = caspiapay.Charge.create(
    amount=5000,         # ₼50.00 in qəpik
    currency="AZN",
    card_token="tok_visa_4242",
    description="Order #1234"
)

print(charge.status)  # 'succeeded'`
          },
          {
            label: 'PHP',
            language: 'php',
            code: `$caspiapay = new \\CaspiaPay\\Client('sk_test_xxx');

$charge = $caspiapay->charges->create([
    'amount' => 5000,        // ₼50.00 in qəpik
    'currency' => 'AZN',
    'card_token' => 'tok_visa_4242',
    'description' => 'Order #1234'
]);

echo $charge->status;  // 'succeeded'`
          },
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
        ]}
      />

      <Callout type="info">
        Amounts are always in qəpik (1/100 of AZN). So <code>5000</code> = ₼50.00
      </Callout>

      <h2>4. Handle the response</h2>
      <p>
        The API will return a charge object with the payment status:
      </p>

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
  "created_at": "2026-04-13T14:30:00Z"
}`}
      />

      <h2>5. Listen for webhooks (optional but recommended)</h2>
      <p>
        Set up a webhook endpoint to receive real-time notifications about payment events:
      </p>

      <CodeBlock
        language="javascript"
        code={`app.post('/webhook', (req, res) => {
  const event = req.body;

  switch (event.type) {
    case 'charge.succeeded':
      console.log('Payment succeeded:', event.data.id);
      // Fulfill the order
      break;
    case 'charge.failed':
      console.log('Payment failed:', event.data.id);
      // Notify customer
      break;
  }

  res.sendStatus(200);
});`}
      />

      <h2>6. Go live</h2>
      <p>
        When you're ready to accept real payments:
      </p>
      <ol>
        <li>Replace your test API key with your live key (<code>sk_live_xxxxxxxxxx</code>)</li>
        <li>Use real card details (no more test cards)</li>
        <li>Monitor transactions in your dashboard</li>
      </ol>

      <Callout type="success">
        That's it! You're now ready to accept payments with CaspiaPay. Check out the full API reference for more advanced features.
      </Callout>
    </div>
  );
}
