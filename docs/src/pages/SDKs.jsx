import CodeBlock from '../components/ui/CodeBlock';

export default function SDKs() {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>SDKs & Libraries</h1>
      <p className="lead">
        CaspiaPay provides official SDKs for popular programming languages to make integration easier.
      </p>

      <h2>Official SDKs</h2>

      <h3>Node.js / JavaScript</h3>
      <p>
        For Node.js, Express, Next.js, and other JavaScript backends.
      </p>

      <CodeBlock
        language="bash"
        code="npm install caspiapay"
      />

      <CodeBlock
        language="javascript"
        code={`const caspiapay = require('caspiapay')('sk_test_xxx');

// Create a charge
const charge = await caspiapay.charges.create({
  amount: 5000,
  currency: 'AZN',
  card_token: 'tok_visa_4242',
  description: 'Order #1234'
});

// Retrieve a charge
const charge = await caspiapay.charges.retrieve('ch_abc123');

// Create a customer
const customer = await caspiapay.customers.create({
  email: 'customer@example.com',
  name: 'Aysel Mammadova'
});

// List charges
const charges = await caspiapay.charges.list({ limit: 10 });`}
      />

      <hr />

      <h3>Python</h3>
      <p>
        For Django, Flask, FastAPI, and other Python frameworks.
      </p>

      <CodeBlock
        language="bash"
        code="pip install caspiapay"
      />

      <CodeBlock
        language="python"
        code={`import caspiapay

caspiapay.api_key = "sk_test_xxx"

# Create a charge
charge = caspiapay.Charge.create(
    amount=5000,
    currency="AZN",
    card_token="tok_visa_4242",
    description="Order #1234"
)

# Retrieve a charge
charge = caspiapay.Charge.retrieve("ch_abc123")

# Create a customer
customer = caspiapay.Customer.create(
    email="customer@example.com",
    name="Aysel Mammadova"
)

# List charges
charges = caspiapay.Charge.list(limit=10)`}
      />

      <hr />

      <h3>PHP</h3>
      <p>
        For Laravel, Symfony, WordPress, and other PHP applications.
      </p>

      <CodeBlock
        language="bash"
        code="composer require caspiapay/caspiapay-php"
      />

      <CodeBlock
        language="php"
        code={`<?php

require_once 'vendor/autoload.php';

$caspiapay = new \\CaspiaPay\\Client('sk_test_xxx');

// Create a charge
$charge = $caspiapay->charges->create([
    'amount' => 5000,
    'currency' => 'AZN',
    'card_token' => 'tok_visa_4242',
    'description' => 'Order #1234'
]);

// Retrieve a charge
$charge = $caspiapay->charges->retrieve('ch_abc123');

// Create a customer
$customer = $caspiapay->customers->create([
    'email' => 'customer@example.com',
    'name' => 'Aysel Mammadova'
]);

// List charges
$charges = $caspiapay->charges->all(['limit' => 10]);`}
      />

      <hr />

      <h3>Ruby</h3>
      <p>
        For Ruby on Rails and other Ruby applications.
      </p>

      <CodeBlock
        language="bash"
        code="gem install caspiapay"
      />

      <CodeBlock
        language="ruby"
        code={`require 'caspiapay'

CaspiaPay.api_key = 'sk_test_xxx'

# Create a charge
charge = CaspiaPay::Charge.create(
  amount: 5000,
  currency: 'AZN',
  card_token: 'tok_visa_4242',
  description: 'Order #1234'
)

# Retrieve a charge
charge = CaspiaPay::Charge.retrieve('ch_abc123')

# Create a customer
customer = CaspiaPay::Customer.create(
  email: 'customer@example.com',
  name: 'Aysel Mammadova'
)`}
      />

      <hr />

      <h3>Go</h3>
      <p>
        For Go / Golang applications.
      </p>

      <CodeBlock
        language="bash"
        code="go get github.com/caspiapay/caspiapay-go"
      />

      <CodeBlock
        language="go"
        code={`package main

import (
    "github.com/caspiapay/caspiapay-go"
    "github.com/caspiapay/caspiapay-go/charge"
)

func main() {
    caspiapay.Key = "sk_test_xxx"

    // Create a charge
    params := &caspiapay.ChargeParams{
        Amount:      5000,
        Currency:    "AZN",
        CardToken:   "tok_visa_4242",
        Description: "Order #1234",
    }

    ch, _ := charge.New(params)
}`}
      />

      <hr />

      <h2>REST API (cURL)</h2>
      <p>
        If we don't have an SDK for your language yet, you can use the REST API directly:
      </p>

      <CodeBlock
        language="bash"
        code={`# Create a charge
curl https://api.caspiapay.az/v1/charges \\
  -H "Authorization: Bearer sk_test_xxx" \\
  -d amount=5000 \\
  -d currency=AZN \\
  -d card_token=tok_visa_4242

# Retrieve a charge
curl https://api.caspiapay.az/v1/charges/ch_abc123 \\
  -H "Authorization: Bearer sk_test_xxx"

# List charges
curl https://api.caspiapay.az/v1/charges?limit=10 \\
  -H "Authorization: Bearer sk_test_xxx"`}
      />

      <hr />

      <h2>Community libraries</h2>
      <p>
        The community has built unofficial libraries for other languages. While we don't officially support these,
        they may be useful:
      </p>

      <ul>
        <li><strong>C# / .NET</strong> — <code>CaspiaPay.NET</code> (NuGet)</li>
        <li><strong>Java</strong> — <code>caspiapay-java</code> (Maven)</li>
        <li><strong>Rust</strong> — <code>caspiapay-rs</code> (crates.io)</li>
      </ul>

      <hr />

      <h2>Need help?</h2>
      <p>
        If you need an SDK for a language we don't support, or if you find a bug in an existing SDK,
        please reach out at <a href="mailto:developers@caspiapay.az">developers@caspiapay.az</a>
      </p>
    </div>
  );
}
