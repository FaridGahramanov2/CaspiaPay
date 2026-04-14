import { Shield, Lock, Key, FileCheck } from 'lucide-react';
import Callout from '../components/ui/Callout';

export default function Security() {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>Security</h1>
      <p className="lead">
        CaspiaPay is built with security at its core. Here's how we protect your payments and data.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
        <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="w-12 h-12 rounded-lg bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">PCI-DSS Compliant</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            We maintain PCI-DSS Level 1 compliance, the highest level of certification in the payments industry.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">End-to-End Encryption</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            All data is encrypted in transit (TLS 1.3) and at rest (AES-256) to prevent unauthorized access.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
            <Key className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Tokenization</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Card details are never stored on your servers. We use secure tokens to represent payment methods.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
            <FileCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Fraud Detection</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Advanced machine learning models analyze every transaction to detect and prevent fraud in real-time.
          </p>
        </div>
      </div>

      <h2>PCI-DSS Compliance</h2>
      <p>
        CaspiaPay is certified as a PCI-DSS Level 1 Service Provider. This means:
      </p>
      <ul>
        <li>We undergo annual security audits by qualified assessors</li>
        <li>Our infrastructure meets the strictest security standards</li>
        <li>Card data never touches your servers (reducing your PCI scope)</li>
        <li>You can accept payments without handling sensitive card information</li>
      </ul>

      <Callout type="info">
        By using CaspiaPay, you significantly reduce your PCI compliance burden since card data flows directly
        to our secure servers.
      </Callout>

      <h2>Card tokenization</h2>
      <p>
        When a customer enters their card details, we immediately tokenize it:
      </p>
      <ol>
        <li>Card details are sent directly to CaspiaPay's servers over HTTPS</li>
        <li>We encrypt and store the card securely in our PCI-compliant vault</li>
        <li>We return a token (e.g., <code>tok_visa_4242</code>) to your server</li>
        <li>You use this token to create charges — the actual card never touches your server</li>
      </ol>

      <p>
        This means you never need to handle raw card data, reducing your security risk and compliance requirements.
      </p>

      <h2>3D Secure authentication</h2>
      <p>
        CaspiaPay supports 3D Secure (3DS) for added security on card transactions:
      </p>
      <ul>
        <li><strong>Visa Secure</strong> (formerly Verified by Visa)</li>
        <li><strong>Mastercard Identity Check</strong> (formerly Mastercard SecureCode)</li>
      </ul>

      <p>
        3D Secure adds an extra authentication step where the cardholder verifies their identity with their bank.
        This shifts liability for fraud from you to the card issuer.
      </p>

      <Callout type="warning">
        For certain high-risk transactions, 3D Secure may be required by law (e.g., under PSD2 in Europe).
      </Callout>

      <h2>Data encryption</h2>
      <ul>
        <li><strong>In transit:</strong> All API requests use TLS 1.3 encryption</li>
        <li><strong>At rest:</strong> All data is encrypted using AES-256</li>
        <li><strong>Backups:</strong> Encrypted and stored in geographically distributed data centers</li>
      </ul>

      <h2>Fraud detection</h2>
      <p>
        Every transaction is analyzed in real-time using:
      </p>
      <ul>
        <li>Machine learning models trained on millions of transactions</li>
        <li>Device fingerprinting to detect suspicious behavior</li>
        <li>Velocity checks (e.g., too many cards from same IP)</li>
        <li>Geolocation analysis</li>
        <li>Card BIN database to detect stolen cards</li>
      </ul>

      <p>
        Suspicious transactions are automatically flagged or blocked, with detailed risk scores available in your dashboard.
      </p>

      <h2>API security best practices</h2>
      <p>
        To keep your integration secure:
      </p>

      <h3>1. Keep your API keys secure</h3>
      <ul>
        <li>Never commit keys to version control</li>
        <li>Store keys in environment variables</li>
        <li>Use separate keys for test and live environments</li>
        <li>Rotate keys regularly</li>
      </ul>

      <h3>2. Validate webhook signatures</h3>
      <ul>
        <li>Always verify the <code>X-CaspiaPay-Signature</code> header</li>
        <li>Reject webhooks with invalid signatures</li>
        <li>Use constant-time comparison to prevent timing attacks</li>
      </ul>

      <h3>3. Use HTTPS everywhere</h3>
      <ul>
        <li>Never accept payments over HTTP</li>
        <li>Ensure your SSL certificate is valid</li>
        <li>Use HSTS headers to enforce HTTPS</li>
      </ul>

      <h3>4. Limit API access</h3>
      <ul>
        <li>Only request the minimum permissions you need</li>
        <li>Use IP whitelisting if possible</li>
        <li>Monitor API logs for suspicious activity</li>
      </ul>

      <h2>Compliance certifications</h2>
      <ul>
        <li><strong>PCI-DSS Level 1</strong> — Payment Card Industry Data Security Standard</li>
        <li><strong>ISO 27001</strong> — Information Security Management</li>
        <li><strong>SOC 2 Type II</strong> — Security, Availability, and Confidentiality</li>
      </ul>

      <h2>Reporting vulnerabilities</h2>
      <p>
        If you discover a security vulnerability in CaspiaPay, please report it to us at{' '}
        <a href="mailto:security@caspiapay.az">security@caspiapay.az</a>. We take all reports seriously and will
        respond within 24 hours.
      </p>

      <Callout type="success">
        Have questions about security? Contact our security team at{' '}
        <a href="mailto:security@caspiapay.az">security@caspiapay.az</a>
      </Callout>
    </div>
  );
}
