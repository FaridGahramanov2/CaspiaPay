import { useState } from 'react';
import { Building, Plus, Search } from 'lucide-react';
import { getMerchants } from '../data/merchants';
import { getAllTransactions } from '../data/transactions';
import { formatCurrency, formatDate } from '../utils/formatters';
import Badge from '../components/ui/Badge';

export default function Merchants() {
  const [merchants] = useState(getMerchants());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const transactions = getAllTransactions();

  const filteredMerchants = merchants.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMerchantStats = (merchantId) => {
    const merchantTxns = transactions.filter(t => t.merchant.id === merchantId);
    const total = merchantTxns.reduce((sum, t) => sum + t.amount, 0);
    return {
      total,
      count: merchantTxns.length,
      avgTransaction: merchantTxns.length > 0 ? total / merchantTxns.length : 0
    };
  };

  if (selectedMerchant) {
    const stats = getMerchantStats(selectedMerchant.id);
    const merchantTxns = transactions.filter(t => t.merchant.id === selectedMerchant.id).slice(0, 20);

    return (
      <div>
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => setSelectedMerchant(null)}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ← Back to all merchants
          </button>
        </div>

        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-gray-200 dark:border-white/10 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-sage-500 to-sage-600 flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedMerchant.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">{selectedMerchant.id}</p>
              </div>
            </div>
            <Badge variant={selectedMerchant.status === 'active' ? 'success' : 'warning'}>
              {selectedMerchant.status}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-white/10">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Volume</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.total)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Transactions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.count}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg Transaction</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(stats.avgTransaction)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedMerchant.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Joined</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(selectedMerchant.joinDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Contact</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedMerchant.contact}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedMerchant.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-gray-200 dark:border-white/10">
          <div className="p-6 border-b border-gray-200 dark:border-white/10">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-navy-900 border-b border-gray-200 dark:border-white/10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Card</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/5">
                {merchantTxns.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50 dark:hover:bg-navy-900/50">
                    <td className="px-6 py-4 text-sm font-mono text-gray-900 dark:text-white">{txn.id}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(txn.amount)}</td>
                    <td className="px-6 py-4">
                      <Badge variant={txn.status === 'succeeded' ? 'success' : txn.status === 'pending' ? 'warning' : 'error'}>
                        {txn.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white capitalize">{txn.card.brand} •••• {txn.card.last4}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{formatDate(txn.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-end">
        <button className="flex items-center gap-2 px-4 py-2 bg-sage dark:bg-teal-500 text-white rounded-lg hover:bg-sage-600 dark:hover:bg-teal-600 transition-colors">
          <Plus className="w-4 h-4" />
          Add Merchant
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search merchants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-navy-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sage placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-navy-900 border-b border-gray-200 dark:border-white/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Merchant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Total Volume</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-white/5">
            {filteredMerchants.map((merchant) => {
              const stats = getMerchantStats(merchant.id);
              return (
                <tr
                  key={merchant.id}
                  onClick={() => setSelectedMerchant(merchant)}
                  className="hover:bg-gray-50 dark:hover:bg-navy-900/50 cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sage-500 to-sage-600 flex items-center justify-center">
                        <Building className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{merchant.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">{merchant.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{merchant.category}</td>
                  <td className="px-6 py-4">
                    <Badge variant={merchant.status === 'active' ? 'success' : 'warning'}>
                      {merchant.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(stats.total)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{formatDate(merchant.joinDate)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
