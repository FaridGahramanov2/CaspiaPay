import CodeBlock from '../components/ui/CodeBlock';
import EndpointBlock from '../components/ui/EndpointBlock';
import ParamTable from '../components/ui/ParamTable';
import Callout from '../components/ui/Callout';

export default function Merchants() {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>Merchants (Connect)</h1>
      <p className="lead">
        The Merchants API allows you to onboard sub-merchants and manage their accounts. This is part of CaspiaPay Connect.
      </p>

      <Callout type="info">
        CaspiaPay Connect enables you to create marketplace platforms where you can onboard multiple merchants
        and split payments between them.
      </Callout>

      <h2>Create a merchant</h2>
      <EndpointBlock method="POST" path="/v1/merchants" />

      <h3>Parameters</h3>
      <ParamTable
        params={[
          { name: 'business_name', type: 'string', required: true, description: 'Legal business name' },
          { name: 'email', type: 'string', required: true, description: 'Business email address' },
          { name: 'phone', type: 'string', required: true, description: 'Business phone number' },
          { name: 'category', type: 'string', required: true, description: 'Business category (e.g., "restaurant", "ecommerce")' },
          { name: 'bank_account', type: 'object', required: true, description: 'Bank account details for payouts' },
        ]}
      />

      <h3>Example Request</h3>
      <CodeBlock
        tabs={[
          {
            label: 'Node.js',
            language: 'javascript',
            code: `const merchant = await caspiapay.merchants.create({
  business_name: 'Baku Eats',
  email: 'admin@bakueats.az',
  phone: '+994501234567',
  category: 'food_delivery',
  bank_account: {
    bank: 'Kapital Bank',
    account_number: 'AZ12KAPI12345678901234567890',
    account_holder: 'Baku Eats MMC'
  }
});`
          },
          {
            label: 'Python',
            language: 'python',
            code: `merchant = caspiapay.Merchant.create(
    business_name="Baku Eats",
    email="admin@bakueats.az",
    phone="+994501234567",
    category="food_delivery",
    bank_account={
        "bank": "Kapital Bank",
        "account_number": "AZ12KAPI12345678901234567890",
        "account_holder": "Baku Eats MMC"
    }
)`
          },
        ]}
      />

      <h3>Response</h3>
      <CodeBlock
        language="json"
        code={`{
  "id": "merch_baku_eats",
  "business_name": "Baku Eats",
  "email": "admin@bakueats.az",
  "phone": "+994501234567",
  "category": "food_delivery",
  "status": "pending",
  "created_at": "2026-04-13T14:30:00Z"
}`}
      />

      <hr />

      <h2>Retrieve a merchant</h2>
      <EndpointBlock method="GET" path="/v1/merchants/:id" />

      <h3>Example Request</h3>
      <CodeBlock
        language="bash"
        code={`curl https://api.caspiapay.az/v1/merchants/merch_baku_eats \\
  -H "Authorization: Bearer sk_test_xxx"`}
      />

      <hr />

      <h2>Merchant statuses</h2>
      <ul>
        <li><code>pending</code> — Merchant application is under review</li>
        <li><code>active</code> — Merchant is approved and can accept payments</li>
        <li><code>suspended</code> — Merchant account is temporarily suspended</li>
        <li><code>rejected</code> — Merchant application was rejected</li>
      </ul>

      <Callout type="info">
        See the <a href="/connect">Connect / Marketplace guide</a> for a full walkthrough of building a marketplace platform.
      </Callout>
    </div>
  );
}
