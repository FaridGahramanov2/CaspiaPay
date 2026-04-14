import { useState } from 'react';
import { BarChart3, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import { getAllTransactions } from '../data/transactions';
import { getMerchants } from '../data/merchants';
import { formatCurrency } from '../utils/formatters';
import StatCard from '../components/ui/StatCard';
import MerchantRevenueChart from '../components/charts/MerchantRevenueChart';
import MethodPieChart from '../components/charts/MethodPieChart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Analytics() {
  const [transactions] = useState(getAllTransactions());
  const [merchants] = useState(getMerchants());

  // Success rate over time (last 30 days)
  const successRateData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const dateStr = date.toISOString().split('T')[0];

    const dayTxns = transactions.filter(t => {
      const txnDate = new Date(t.createdAt).toISOString().split('T')[0];
      return txnDate === dateStr;
    });

    const successful = dayTxns.filter(t => t.status === 'succeeded').length;
    const rate = dayTxns.length > 0 ? (successful / dayTxns.length) * 100 : 0;

    return {
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      rate: parseFloat(rate.toFixed(1))
    };
  });

  // Average transaction value trend
  const avgValueData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const dateStr = date.toISOString().split('T')[0];

    const dayTxns = transactions.filter(t => {
      const txnDate = new Date(t.createdAt).toISOString().split('T')[0];
      return txnDate === dateStr && t.status === 'succeeded';
    });

    const avg = dayTxns.length > 0
      ? dayTxns.reduce((sum, t) => sum + t.amount, 0) / dayTxns.length / 100
      : 0;

    return {
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      value: parseFloat(avg.toFixed(2))
    };
  });

  const successfulTxns = transactions.filter(t => t.status === 'succeeded');
  const avgTransactionValue = successfulTxns.reduce((sum, t) => sum + t.amount, 0) / successfulTxns.length;
  const successRate = (successfulTxns.length / transactions.length) * 100;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          icon={TrendingUp}
          label="Overall Success Rate"
          value={`${successRate.toFixed(1)}%`}
          trend="+0.3% vs last month"
          iconColor="text-green-500"
          iconBg="bg-green-100"
        />
        <StatCard
          icon={BarChart3}
          label="Avg Transaction Value"
          value={formatCurrency(avgTransactionValue)}
          trend="+₼2.40 vs last month"
          iconColor="text-blue-500"
          iconBg="bg-blue-100"
        />
        <StatCard
          icon={PieChartIcon}
          label="Active Merchants"
          value={merchants.filter(m => m.status === 'active').length}
          trend={`${merchants.length} total`}
          iconColor="text-purple-500"
          iconBg="bg-purple-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-gray-200 dark:border-white/10 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue by Merchant</h3>
          <MerchantRevenueChart />
        </div>

        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-gray-200 dark:border-white/10 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Payment Methods</h3>
          <MethodPieChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-gray-200 dark:border-white/10 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Success Rate Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={successRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
              <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} domain={[95, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A2332',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#fff'
                }}
                formatter={(value) => [`${value}%`, 'Success Rate']}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-gray-200 dark:border-white/10 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Avg Transaction Value</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={avgValueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
              <XAxis dataKey="date" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A2332',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#fff'
                }}
                formatter={(value) => [`₼${value.toFixed(2)}`, 'Avg Value']}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
