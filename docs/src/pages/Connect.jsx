import CodeBlock from '../components/ui/CodeBlock';
import Callout from '../components/ui/Callout';

export default function Connect() {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>Connect / Marketplace Guide</h1>
      <p className="lead">
        Build marketplace platforms where you can onboard multiple merchants and split payments between them.
      </p>

      <h2>What is CaspiaPay Connect?</h2>
      <p>
        CaspiaPay Connect enables you to create marketplace or platform businesses where you:
      </p>
      <ul>
        <li>Onboard multiple sub-merchants (e.g., restaurants, drivers, vendors)</li>
        <li>Accept payments on their behalf</li>
        <li>Automatically split payments between merchants and your platform</li>
        <li>Manage payouts to each merchant</li>
      </ul>

      <Callout type="info">
        <strong>Example use cases:</strong> Food delivery apps, ride-sharing platforms, multi-vendor e-commerce,
        SaaS marketplaces, freelance platforms
      </Callout>

      <h2>How it works</h2>
      <p>
        Here's the flow for a food delivery app like "Baku Eats":
      </p>

      <ol>
        <li>
          <strong>Onboard merchants</strong> — Restaurants sign up on your platform. You create merchant accounts
          using the Merchants API.
        </li>
        <li>
          <strong>Accept payments</strong> — When a customer orders food, you charge their card and specify which
          restaurant should receive the funds.
        </li>
        <li>
          <strong>Split the payment</strong> — CaspiaPay automatically deducts your platform fee and credits the
          rest to the restaurant.
        </li>
        <li>
          <strong>Payout</strong> — Restaurants receive payouts on a schedule you define (e.g., weekly).
        </li>
      </ol>

      <h2>Step 1: Onboard a merchant</h2>
      <p>
        Use the Merchants API to create sub-merchant accounts:
      </p>

      <CodeBlock
        language="javascript"
        code={`const merchant = await caspiapay.merchants.create({
  business_name: 'Şirin Kafe',
  email: 'admin@sirinkafe.az',
  phone: '+994501234567',
  category: 'restaurant',
  bank_account: {
    bank: 'Kapital Bank',
    account_number: 'AZ12KAPI12345678901234567890',
    account_holder: 'Şirin Kafe MMC'
  }
});

console.log(merchant.id); // 'merch_sirin_kafe'
console.log(merchant.status); // 'pending' (awaiting approval)`}
      />

      <p>
        Merchants must be approved before they can accept payments. Approval typically takes 1-2 business days.
      </p>

      <h2>Step 2: Create a charge with split payment</h2>
      <p>
        When processing a payment, specify the merchant ID and your platform fee:
      </p>

      <CodeBlock
        language="javascript"
        code={`const charge = await caspiapay.charges.create({
  amount: 3500,         // ₼35.00 (customer pays)
  currency: 'AZN',
  card_token: 'tok_visa_4242',
  merchant_id: 'merch_sirin_kafe',  // Restaurant receives the funds
  application_fee: 500  // ₼5.00 (your platform fee - 14%)
});

// Result:
// - Customer pays: ₼35.00
// - Restaurant receives: ₼30.00
// - Your platform receives: ₼5.00`}
      />

      <Callout type="warning">
        The <code>application_fee</code> is deducted from the total amount. Make sure it doesn't exceed the charge amount.
      </Callout>

      <h2>Step 3: Manage payouts</h2>
      <p>
        Funds are held in each merchant's balance and paid out on your schedule:
      </p>

      <CodeBlock
        language="javascript"
        code={`// Check merchant balance
const balance = await caspiapay.merchants.balance('merch_sirin_kafe');
console.log(balance.available); // ₼430.00

// Create a manual payout (optional - payouts are automatic by default)
const payout = await caspiapay.payouts.create({
  amount: 43000,  // ₼430.00
  currency: 'AZN',
  merchant_id: 'merch_sirin_kafe'
});`}
      />

      <h2>Example: Food delivery marketplace</h2>
      <p>
        Here's a complete flow for a food delivery app where you split payments between the restaurant,
        driver, and platform:
      </p>

      <CodeBlock
        language="javascript"
        code={`// Order: ₼45.00 total
// - Food: ₼35.00 (restaurant)
// - Delivery: ₼7.00 (driver)
// - Platform fee: ₼3.00 (you)

// 1. Charge the customer
const charge = await caspiapay.charges.create({
  amount: 4500,
  currency: 'AZN',
  card_token: 'tok_visa_4242',
  merchant_id: 'merch_sirin_kafe',
  application_fee: 300,  // Your platform fee
  metadata: {
    order_id: '1234',
    driver_id: 'driver_rashad'
  }
});

// 2. Pay the driver separately (from your platform balance)
const driverPayout = await caspiapay.payouts.create({
  amount: 700,
  currency: 'AZN',
  merchant_id: 'merch_driver_rashad',
  description: 'Delivery fee for order #1234'
});

// Result:
// - Customer pays: ₼45.00
// - Restaurant gets: ₼35.00 (auto-split)
// - Driver gets: ₼7.00 (manual payout)
// - You get: ₼3.00 (platform fee)`}
      />

      <h2>Webhook events</h2>
      <p>
        Listen for these Connect-specific webhook events:
      </p>
      <ul>
        <li><code>merchant.activated</code> — A merchant was approved and can now accept payments</li>
        <li><code>payout.completed</code> — A payout to a merchant was successful</li>
        <li><code>payout.failed</code> — A payout failed (e.g., invalid bank details)</li>
      </ul>

      <Callout type="success">
        That's it! You now have a fully functional marketplace payment system. Check out our{' '}
        <a href="/merchants">Merchants API reference</a> for more details.
      </Callout>
    </div>
  );
}
