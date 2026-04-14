import CodeBlock from '../components/ui/CodeBlock';
import EndpointBlock from '../components/ui/EndpointBlock';
import Callout from '../components/ui/Callout';

export default function Webhooks() {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>Webhooks</h1>
      <p className="lead">
        Webhooks allow you to receive real-time notifications when events happen in your CaspiaPay account.
      </p>

      <h2>What are webhooks?</h2>
      <p>
        Webhooks are HTTP callbacks sent to a URL you specify whenever an event occurs (e.g., a payment succeeds or fails).
        This allows you to respond to events immediately without polling the API.
      </p>

      <Callout type="info">
        Configure your webhook URL in the dashboard under Settings → Webhooks
      </Callout>

      <h2>Available events</h2>
      <ul>
        <li><code>charge.succeeded</code> — A charge was successfully processed</li>
        <li><code>charge.failed</code> — A charge attempt failed</li>
        <li><code>refund.created</code> — A refund was issued</li>
        <li><code>payout.completed</code> — A payout was successfully delivered</li>
        <li><code>payout.failed</code> — A payout failed</li>
        <li><code>merchant.activated</code> — A merchant was approved and activated</li>
      </ul>

      <h2>Webhook payload</h2>
      <p>
        When an event occurs, CaspiaPay sends a POST request to your webhook URL with the following format:
      </p>

      <CodeBlock
        language="json"
        code={`{
  "id": "evt_1a2b3c4d5e",
  "type": "charge.succeeded",
  "created_at": "2026-04-13T14:30:00Z",
  "data": {
    "id": "ch_1a2b3c4d5e",
    "amount": 5000,
    "currency": "AZN",
    "status": "succeeded",
    "description": "Order #1234"
  }
}`}
      />

      <h2>Handling webhooks</h2>
      <p>
        Create an endpoint in your application to receive webhook events:
      </p>

      <CodeBlock
        tabs={[
          {
            label: 'Node.js',
            language: 'javascript',
            code: `app.post('/webhook', (req, res) => {
  const event = req.body;

  switch (event.type) {
    case 'charge.succeeded':
      console.log('Payment succeeded:', event.data.id);
      // Fulfill the order, send confirmation email, etc.
      fulfillOrder(event.data);
      break;

    case 'charge.failed':
      console.log('Payment failed:', event.data.id);
      // Notify customer, log failure, etc.
      notifyCustomer(event.data);
      break;

    case 'refund.created':
      console.log('Refund issued:', event.data.id);
      // Update order status, etc.
      updateOrderStatus(event.data);
      break;
  }

  // Always respond with 200 to acknowledge receipt
  res.sendStatus(200);
});`
          },
          {
            label: 'Python',
            language: 'python',
            code: `@app.route('/webhook', methods=['POST'])
def webhook():
    event = request.json

    if event['type'] == 'charge.succeeded':
        print(f"Payment succeeded: {event['data']['id']}")
        fulfill_order(event['data'])

    elif event['type'] == 'charge.failed':
        print(f"Payment failed: {event['data']['id']}")
        notify_customer(event['data'])

    elif event['type'] == 'refund.created':
        print(f"Refund issued: {event['data']['id']}")
        update_order_status(event['data'])

    return '', 200`
          },
        ]}
      />

      <h2>Verifying webhook signatures</h2>
      <p>
        CaspiaPay signs each webhook payload with a signature in the <code>X-CaspiaPay-Signature</code> header.
        Verify this signature to ensure the webhook came from CaspiaPay:
      </p>

      <CodeBlock
        language="javascript"
        code={`const crypto = require('crypto');

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-caspiapay-signature'];
  const payload = JSON.stringify(req.body);
  const secret = 'whsec_xxxxxxxxxx'; // From dashboard

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  if (signature !== expectedSignature) {
    return res.status(400).send('Invalid signature');
  }

  // Process the webhook
  // ...
});`}
      />

      <h2>Retry policy</h2>
      <p>
        If your endpoint doesn't respond with a 2xx status code, CaspiaPay will retry the webhook:
      </p>
      <ul>
        <li>1st retry: Immediately</li>
        <li>2nd retry: After 5 minutes</li>
        <li>3rd retry: After 1 hour</li>
      </ul>

      <Callout type="warning">
        Make sure your webhook handler responds quickly (within 5 seconds) and returns a 200 status code.
        Perform long-running tasks asynchronously.
      </Callout>

      <h2>Testing webhooks</h2>
      <p>
        You can manually trigger webhook events from the dashboard for testing purposes.
      </p>
    </div>
  );
}
