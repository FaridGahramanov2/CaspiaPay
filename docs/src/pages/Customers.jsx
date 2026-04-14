import CodeBlock from '../components/ui/CodeBlock';
import EndpointBlock from '../components/ui/EndpointBlock';
import ParamTable from '../components/ui/ParamTable';

export default function Customers() {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>Customers</h1>
      <p className="lead">
        The Customers API allows you to create and manage customer records and save payment methods for future use.
      </p>

      <h2>Create a customer</h2>
      <EndpointBlock method="POST" path="/v1/customers" />

      <h3>Parameters</h3>
      <ParamTable
        params={[
          { name: 'email', type: 'string', required: true, description: 'Customer email address' },
          { name: 'name', type: 'string', required: false, description: 'Customer name' },
          { name: 'phone', type: 'string', required: false, description: 'Customer phone number' },
          { name: 'metadata', type: 'object', required: false, description: 'Custom key-value data' },
        ]}
      />

      <h3>Example Request</h3>
      <CodeBlock
        tabs={[
          {
            label: 'Node.js',
            language: 'javascript',
            code: `const customer = await caspiapay.customers.create({
  email: 'customer@example.com',
  name: 'Aysel Mammadova',
  phone: '+994501234567'
});`
          },
          {
            label: 'Python',
            language: 'python',
            code: `customer = caspiapay.Customer.create(
    email="customer@example.com",
    name="Aysel Mammadova",
    phone="+994501234567"
)`
          },
        ]}
      />

      <h3>Response</h3>
      <CodeBlock
        language="json"
        code={`{
  "id": "cus_abc123",
  "email": "customer@example.com",
  "name": "Aysel Mammadova",
  "phone": "+994501234567",
  "created_at": "2026-04-13T14:30:00Z"
}`}
      />

      <hr />

      <h2>Save a card</h2>
      <p>
        Save a customer's card for future charges without requiring them to re-enter card details.
      </p>

      <EndpointBlock method="POST" path="/v1/customers/:id/cards" />

      <h3>Parameters</h3>
      <ParamTable
        params={[
          { name: 'card_token', type: 'string', required: true, description: 'Token representing the card to save' },
        ]}
      />

      <h3>Example Request</h3>
      <CodeBlock
        tabs={[
          {
            label: 'Node.js',
            language: 'javascript',
            code: `const card = await caspiapay.customers.saveCard('cus_abc123', {
  card_token: 'tok_visa_4242'
});

// Charge the saved card later
const charge = await caspiapay.charges.create({
  amount: 5000,
  currency: 'AZN',
  customer: 'cus_abc123',
  card: card.id
});`
          },
        ]}
      />

      <hr />

      <h2>Retrieve a customer</h2>
      <EndpointBlock method="GET" path="/v1/customers/:id" />

      <h3>Example Request</h3>
      <CodeBlock
        language="bash"
        code={`curl https://api.caspiapay.az/v1/customers/cus_abc123 \\
  -H "Authorization: Bearer sk_test_xxx"`}
      />

      <hr />

      <h2>Delete a saved card</h2>
      <EndpointBlock method="DELETE" path="/v1/customers/:id/cards/:card_id" />

      <h3>Example Request</h3>
      <CodeBlock
        language="javascript"
        code={`await caspiapay.customers.deleteCard('cus_abc123', 'card_xyz789');`}
      />
    </div>
  );
}
