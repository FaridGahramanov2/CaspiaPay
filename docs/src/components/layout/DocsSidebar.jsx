import { Link, useLocation } from 'react-router-dom';
import { FileText, Key, CreditCard, Users, DollarSign, Building2, Webhook, Share2, TestTube, Code, Shield } from 'lucide-react';

const navItems = [
  { path: '/quickstart', label: 'Quickstart', icon: FileText },
  { path: '/authentication', label: 'Authentication', icon: Key },
  {
    label: 'API Reference',
    items: [
      { path: '/charges', label: 'Charges', icon: CreditCard },
      { path: '/customers', label: 'Customers', icon: Users },
      { path: '/payouts', label: 'Payouts', icon: DollarSign },
      { path: '/merchants', label: 'Merchants (Connect)', icon: Building2 },
    ]
  },
  { path: '/webhooks', label: 'Webhooks', icon: Webhook },
  { path: '/connect', label: 'Connect / Marketplace', icon: Share2 },
  { path: '/testing', label: 'Testing', icon: TestTube },
  { path: '/sdks', label: 'SDKs & Libraries', icon: Code },
  { path: '/security', label: 'Security', icon: Shield },
];

export default function DocsSidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-800 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      <nav className="p-6 space-y-1">
        {navItems.map((item, i) => {
          if (item.items) {
            return (
              <div key={i} className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">{item.label}</p>
                <div className="space-y-1">
                  {item.items.map((subItem) => {
                    const Icon = subItem.icon;
                    return (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive(subItem.path)
                            ? 'bg-teal-50 text-teal-600 font-medium dark:bg-teal-900/20 dark:text-teal-400'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {subItem.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          }

          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive(item.path)
                  ? 'bg-teal-50 text-teal-600 font-medium dark:bg-teal-900/20 dark:text-teal-400'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
