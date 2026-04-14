import CodeBlock from '../components/ui/CodeBlock';
import Callout from '../components/ui/Callout';

export default function Authentication() {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>Authentication</h1>
      <p className="lead">
        All CaspiaPay API requests require authentication using your secret API key.
      </p>

      <h2>API Keys</h2>
      <p>
        Your API keys are available in your dashboard under Settings → API Keys.
        CaspiaPay provides two types of keys:
      </p>

      <ul>
        <li>
          <strong>Test keys</strong> (<code>sk_test_xxxxxxxxxx</code>) — Use these for development and testing.
          No real charges are made.
        </li>
        <li>
          <strong>Live keys</strong> (<code>sk_live_xxxxxxxxxx</code>) — Use these in production to process real
          payments.
        </li>
      </ul>

      <Callout type="warning">
        <strong>Keep your keys secure:</strong> Never expose your secret keys in client-side code, public
        repositories, or shared documents. Always use environment variables.
      </Callout>

      <h2>Making authenticated requests</h2>
      <p>
        Include your API key in the <code>Authorization</code> header as a Bearer token:
      </p>

      <CodeBlock
        tabs={[
          {
            label: 'cURL',
            language: 'bash',
            code: `curl https://api.caspiapay.az/v1/charges \\
  -H "Authorization: Bearer sk_test_4RjY9xK2mP8nQ1wL6vB3hT7cF5dG9sA0" \\
  -d amount=5000 \\
  -d currency=AZN \\
  -d card_token=tok_visa_4242`
          },
          {
            label: 'Node.js',
            language: 'javascript',
            code: `const caspiapay = require('caspiapay')('sk_test_xxx');

// All requests are automatically authenticated
const charge = await caspiapay.charges.create({
  amount: 5000,
  currency: 'AZN',
  card_token: 'tok_visa_4242'
});`
          },
          {
            label: 'Python',
            language: 'python',
            code: `import caspiapay
caspiapay.api_key = "sk_test_xxx"

# All requests are automatically authenticated
charge = caspiapay.Charge.create(
    amount=5000,
    currency="AZN",
    card_token="tok_visa_4242"
)`
          },
        ]}
      />

      <h2>Error responses</h2>
      <p>
        If authentication fails, you'll receive a 401 Unauthorized response:
      </p>

      <CodeBlock
        language="json"
        code={`{
  "error": {
    "type": "authentication_error",
    "message": "Invalid API key provided"
  }
}`}
      />

      <h2>Best practices</h2>
      <ul>
        <li>Store keys in environment variables, not in code</li>
        <li>Use test keys during development</li>
        <li>Rotate keys regularly for security</li>
        <li>Never commit keys to version control</li>
        <li>Use separate keys for different environments (dev, staging, production)</li>
      </ul>

      <Callout type="info">
        Need help? Contact support at support@caspiapay.az
      </Callout>
    </div>
  );
}
