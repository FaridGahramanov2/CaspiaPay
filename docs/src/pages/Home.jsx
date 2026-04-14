import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Code } from 'lucide-react';
import CodeBlock from '../components/ui/CodeBlock';

export default function Home() {
  const quickStartCode = `const caspiapay = require('caspiapay')('sk_test_xxx');

const charge = await caspiapay.charges.create({
  amount: 5000,        // ₼50.00 in qəpik
  currency: 'AZN',
  card_token: 'tok_visa_4242',
  description: 'Order #1234'
});

console.log(charge.status); // 'succeeded'`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AZ</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">CaspiaPay</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/quickstart"
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Documentation
            </Link>
            <a
              href="#"
              className="px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded-lg hover:bg-teal-600 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Accept payments in Azerbaijan{' '}
            <span className="text-teal-500">in 15 minutes</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            CaspiaPay gives developers a simple, powerful API to accept Visa and Mastercard payments.
            Built for Azerbaijan, inspired by the best.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/quickstart"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
            >
              Read the Docs
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#"
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Create Account
            </a>
          </div>
        </div>

        {/* Code Preview */}
        <div>
          <CodeBlock code={quickStartCode} language="javascript" />
        </div>

        {/* Logos */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Works with</p>
          <div className="flex items-center justify-center gap-8 text-gray-400">
            <span className="font-bold text-2xl">VISA</span>
            <span className="font-bold text-2xl">Mastercard</span>
            <span className="font-bold text-2xl">Apple Pay</span>
            <span className="font-bold text-2xl">Google Pay</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="w-12 h-12 rounded-lg bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Simple API</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Clean REST API with SDKs for every language. Integrate in minutes, not weeks.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Settlement</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get paid next business day. Fast, reliable payouts to your bank account.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Split Payments</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Marketplace and platform payments built in. Perfect for multi-vendor platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="px-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © 2026 CaspiaPay. Built for Azerbaijan's digital economy.
        </div>
      </footer>
    </div>
  );
}
