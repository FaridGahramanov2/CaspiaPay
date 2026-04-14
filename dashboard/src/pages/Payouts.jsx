import { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { getPayouts } from '../data/payouts';
import { formatCurrency, formatDate } from '../utils/formatters';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';

export default function Payouts() {
  const [payouts] = useState(getPayouts());

  const totalPaidOut = payouts
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingPayouts = payouts
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const nextPayout = payouts.find(p => p.status === 'scheduled');

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          icon={DollarSign}
          label="Total Paid Out"
          value={formatCurrency(totalPaidOut)}
          trend="+₼12,438 this month"
          iconColor="text-teal-500"
          iconBg="bg-teal-100"
        />
        <StatCard
          icon={DollarSign}
          label="Pending Payouts"
          value={formatCurrency(pendingPayouts)}
          trend="3 merchants"
          iconColor="text-yellow-500"
          iconBg="bg-yellow-100"
        />
        <StatCard
          icon={DollarSign}
          label="Next Payout"
          value={nextPayout ? formatDate(nextPayout.scheduled_date) : 'N/A'}
          trend={nextPayout ? formatCurrency(nextPayout.amount) : ''}
          iconColor="text-blue-500"
          iconBg="bg-blue-100"
        />
      </div>

      <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-navy-900 border-b border-gray-200 dark:border-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Payout ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Merchant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Bank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-white/5">
              {payouts.map((payout) => (
                <tr key={payout.id} className="hover:bg-gray-50 dark:hover:bg-navy-900/50">
                  <td className="px-6 py-4 text-sm font-mono text-gray-900 dark:text-white">{payout.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{payout.merchant.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">{payout.merchant.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(payout.amount)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{payout.bank}</td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        payout.status === 'completed' ? 'success' :
                        payout.status === 'pending' ? 'warning' :
                        payout.status === 'scheduled' ? 'default' :
                        'error'
                      }
                    >
                      {payout.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {payout.status === 'scheduled' ? formatDate(payout.scheduled_date) : formatDate(payout.paid_date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
