import CodeBlock from '../components/ui/CodeBlock';
import Callout from '../components/ui/Callout';

export default function Testing() {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>Testing</h1>
      <p className="lead">
        CaspiaPay provides a test mode for safely testing your integration without processing real payments.
      </p>

      <h2>Test mode vs Live mode</h2>
      <p>
        All API requests use either test or live mode depending on the API key:
      </p>
      <ul>
        <li><strong>Test mode</strong> (<code>sk_test_xxxxxxxxxx</code>) — No real charges. Use test cards.</li>
        <li><strong>Live mode</strong> (<code>sk_live_xxxxxxxxxx</code>) — Real charges. Use real cards.</li>
      </ul>

      <Callout type="info">
        Test mode and live mode are completely separate. Data created in test mode won't appear in live mode and vice versa.
      </Callout>

      <h2>Test card numbers</h2>
      <p>
        Use these card numbers in test mode to simulate different scenarios:
      </p>

      <div className="not-prose my-6">
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Card Number</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Behavior</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <code className="text-sm font-mono text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 px-2 py-1 rounded">4242 4242 4242 4242</code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">Visa</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                  <span className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Always succeeds
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <code className="text-sm font-mono text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 px-2 py-1 rounded">5555 5555 5555 4444</code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300">Mastercard</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                  <span className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Always succeeds
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <code className="text-sm font-mono text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 px-2 py-1 rounded">4000 0000 0000 0002</code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">Visa</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                  <span className="flex items-center gap-2">
                    <span className="text-red-500">✗</span>
                    Declines (generic failure)
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <code className="text-sm font-mono text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 px-2 py-1 rounded">4000 0000 0000 9995</code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">Visa</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                  <span className="flex items-center gap-2">
                    <span className="text-red-500">✗</span>
                    Declines (insufficient funds)
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <code className="text-sm font-mono text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 px-2 py-1 rounded">4000 0000 0000 3220</code>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">Visa</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                  <span className="flex items-center gap-2">
                    <span className="text-yellow-500">⚠</span>
                    Requires 3D Secure authentication
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Callout type="warning">
        For test cards, use any future expiry date (e.g., <code>12/27</code>) and any 3-digit CVC (e.g., <code>123</code>).
      </Callout>

      <h2>Testing with card tokens</h2>
      <p>
        In test mode, you can use these pre-generated card tokens:
      </p>

      <CodeBlock
        language="javascript"
        code={`// Always succeeds
const charge = await caspiapay.charges.create({
  amount: 5000,
  currency: 'AZN',
  card_token: 'tok_visa_4242'  // Test token - always succeeds
});

// Always declines
const charge = await caspiapay.charges.create({
  amount: 5000,
  currency: 'AZN',
  card_token: 'tok_visa_decline'  // Test token - always fails
});`}
      />

      <h2>Testing webhooks</h2>
      <p>
        To test webhooks locally, you'll need to expose your local server to the internet. We recommend using{' '}
        <a href="https://ngrok.com" target="_blank" rel="noopener noreferrer">ngrok</a>:
      </p>

      <CodeBlock
        language="bash"
        code={`# Start your local server
npm run dev

# In another terminal, expose it
ngrok http 3000

# Use the ngrok URL as your webhook URL
# Example: https://abc123.ngrok.io/webhook`}
      />

      <p>
        You can also manually trigger webhook events from the dashboard for testing.
      </p>

      <h2>Testing 3D Secure</h2>
      <p>
        Use card <code>4000 0000 0000 3220</code> to test 3D Secure authentication flow:
      </p>

      <CodeBlock
        language="javascript"
        code={`const charge = await caspiapay.charges.create({
  amount: 5000,
  currency: 'AZN',
  card_token: 'tok_3ds_required',
  return_url: 'https://yoursite.com/payment/complete'
});

if (charge.status === 'requires_action') {
  // Redirect customer to charge.next_action.redirect_url
  // They'll complete 3D Secure and return to your return_url
  window.location.href = charge.next_action.redirect_url;
}`}
      />

      <h2>Sandbox environment</h2>
      <p>
        The test environment is a complete sandbox with:
      </p>
      <ul>
        <li>Separate database from live mode</li>
        <li>Simulated bank responses</li>
        <li>Instant settlement (no waiting for bank processing)</li>
        <li>Unlimited test transactions</li>
      </ul>

      <h2>Going live checklist</h2>
      <p>
        Before switching to live mode:
      </p>
      <ol>
        <li>Test all payment flows with test cards</li>
        <li>Verify webhook handling works correctly</li>
        <li>Test error scenarios (declined cards, timeouts, etc.)</li>
        <li>Replace <code>sk_test_xxx</code> with <code>sk_live_xxx</code></li>
        <li>Update webhook URL to production endpoint</li>
        <li>Verify SSL certificate is valid on your site</li>
        <li>Test a small live transaction to confirm everything works</li>
      </ol>

      <Callout type="success">
        Once you've thoroughly tested your integration, you're ready to accept real payments!
      </Callout>
    </div>
  );
}
