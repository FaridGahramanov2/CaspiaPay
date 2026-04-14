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
import { TRANSACTIONS } from '../../data/transactions'

function getHourlyData() {
  const today = '2026-04-13'
  const hours = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i.toString().padStart(2, '0')}:00`,
    count: 0,
  }))
  TRANSACTIONS.filter(t => t.createdAt.startsWith(today)).forEach(t => {
    const h = new Date(t.createdAt).getUTCHours()
    if (hours[h]) hours[h].count++
  })
  return hours
}

const PEAK = new Set([7, 8, 9, 12, 13, 14, 18, 19, 20, 21])

export default function VolumeChart() {
  const data = useMemo(() => getHourlyData(), [])
  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis
          dataKey="hour"
          tick={{ fill: '#64748b', fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          interval={3}
        />
        <YAxis
          tick={{ fill: '#64748b', fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          width={28}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            background: '#0D1F3C',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            color: '#fff',
            fontSize: 12,
          }}
          formatter={(value) => [value, 'Transactions']}
        />
        <Bar dataKey="count" radius={[3, 3, 0, 0]}>
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={PEAK.has(index) ? '#00D4AA' : 'rgba(0,212,170,0.35)'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
