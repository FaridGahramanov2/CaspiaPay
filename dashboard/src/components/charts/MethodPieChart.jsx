import { useMemo } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { TRANSACTIONS } from '../../data/transactions'

export default function MethodPieChart() {
  const data = useMemo(() => {
    const visa = TRANSACTIONS.filter(
      t => t.card.brand === 'visa' && t.status === 'succeeded'
    ).length
    const mc = TRANSACTIONS.filter(
      t => t.card.brand === 'mastercard' && t.status === 'succeeded'
    ).length
    return [
      { name: 'Visa', value: visa },
      { name: 'Mastercard', value: mc },
    ]
  }, [])

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={58}
          outerRadius={82}
          paddingAngle={3}
          dataKey="value"
        >
          <Cell fill="#1A56DB" />
          <Cell fill="#EB5E28" />
        </Pie>
        <Tooltip
          contentStyle={{
            background: '#0D1F3C',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            color: '#fff',
            fontSize: 12,
          }}
          formatter={(value, name) => [`${value} txns`, name]}
        />
        <Legend
          wrapperStyle={{ color: '#94a3b8', fontSize: 12, paddingTop: 8 }}
          iconType="circle"
          iconSize={8}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
