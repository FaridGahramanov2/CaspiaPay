import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { MERCHANTS } from '../../data/merchants'

export default function MerchantRevenueChart() {
  const data = useMemo(() => {
    return [...MERCHANTS]
      .filter(m => m.status === 'active')
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 8)
      .map(m => ({
        name: m.name.length > 14 ? m.name.slice(0, 13) + '…' : m.name,
        revenue: m.volume,
      }))
  }, [])

  const COLORS = ['#00D4AA', '#00C49A', '#00B48A', '#00A47A', '#3B9EFF', '#6C7EFF', '#C4A962', '#00D4AA']

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fill: '#64748b', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={v => `₼${(v / 1000).toFixed(0)}k`}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          width={95}
        />
        <Tooltip
          contentStyle={{
            background: '#0D1F3C',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            color: '#fff',
            fontSize: 12,
          }}
          formatter={v => [`₼${v.toLocaleString()}`, 'Volume']}
        />
        <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
