import { useState } from 'react';
import { Copy, Eye, EyeOff, Check, CheckCircle } from 'lucide-react';

export default function Settings() {
  const [showLiveKey, setShowLiveKey] = useState(false);
  const [showTestKey, setShowTestKey] = useState(false);
  const [toast, setToast] = useState(null);

  const liveKey = 'caspay_live_xxxxxxxxxxxxxxxxxxxx';
  const testKey = 'caspay_live_xxxxxxxxxxxxxxxxxxxx';

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setToast(`${label} copied to clipboard`);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div>
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white dark:bg-navy-800 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 shadow-2xl">
          <CheckCircle className="w-4 h-4 text-sage dark:text-teal-400" />
          <span className="text-sm text-gray-900 dark:text-white">{toast}</span>
        </div>
      )}

      <div className="space-y-6">
        {/* Company Profile */}
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-gray-200 dark:border-white/10 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Company Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
              <input
                type="text"
                defaultValue="CaspiaPay Demo Account"
                className="w-full px-3 py-2 bg-gray-50 dark:bg-navy-900 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sage"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="admin@caspiapay.az"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-navy-900 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sage"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                <input
                  type="tel"
                  defaultValue="+994 12 345 67 89"
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-navy-900 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sage"
                />
              </div>
            </div>
          </div>
        </div>

        {/* API Keys */}
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-gray-200 dark:border-white/10 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">API Keys</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Use these keys to authenticate API requests. Keep them secure and never share them publicly.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Live Key</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    type={showLiveKey ? 'text' : 'password'}
                    value={liveKey}
                    readOnly
                    className="w-full px-3 py-2 font-mono text-sm border border-gray-300 dark:border-white/10 rounded-lg bg-gray-50 dark:bg-navy-900 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => setShowLiveKey(!showLiveKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showLiveKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  onClick={() => copyToClipboard(liveKey, 'Live key')}
                  className="px-3 py-2 border border-gray-300 dark:border-white/10 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-900 transition-colors"
                >
                  <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Test Key</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    type={showTestKey ? 'text' : 'password'}
                    value={testKey}
                    readOnly
                    className="w-full px-3 py-2 font-mono text-sm border border-gray-300 dark:border-white/10 rounded-lg bg-gray-50 dark:bg-navy-900 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => setShowTestKey(!showTestKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showTestKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  onClick={() => copyToClipboard(testKey, 'Test key')}
                  className="px-3 py-2 border border-gray-300 dark:border-white/10 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-900 transition-colors"
                >
                  <Copy className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Webhooks */}
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-gray-200 dark:border-white/10 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Webhook Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Webhook URL</label>
              <input
                type="url"
                placeholder="https://yoursite.com/webhook"
                className="w-full px-3 py-2 bg-gray-50 dark:bg-navy-900 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sage placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Events to receive</label>
              <div className="space-y-2">
                {['charge.succeeded', 'charge.failed', 'refund.created', 'payout.completed', 'merchant.activated'].map(event => (
                  <label key={event} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300 dark:border-white/10 text-sage focus:ring-sage bg-gray-50 dark:bg-navy-900" />
                    <span className="text-sm font-mono text-gray-700 dark:text-gray-300">{event}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-gray-200 dark:border-white/10 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Team Members</h2>
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sage to-lime flex items-center justify-center text-white font-medium">
                  AD
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">admin@caspiapay.az</p>
                </div>
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-navy-900 px-2 py-1 rounded">Owner</span>
            </div>
          </div>
          <button className="text-sm text-sage hover:text-sage-600 dark:hover:text-lime font-medium">
            + Invite team member
          </button>
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-2 bg-gradient-to-r from-lime to-sage text-white font-semibold rounded-lg hover:from-lime-600 hover:to-sage-600 transition-colors shadow-sm">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
