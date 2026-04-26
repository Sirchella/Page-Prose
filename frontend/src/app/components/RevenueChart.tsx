import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchOrders } from '../api';

interface MonthData {
  month: string;
  revenue: number;
}

export function RevenueChart() {
  const [data, setData] = useState<MonthData[]>([]);

  useEffect(() => {
    fetchOrders()
      .then(orders => {
        const map: Record<string, number> = {};
        orders.forEach(o => {
          const d = new Date(o.created_at);
          const key = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
          map[key] = (map[key] ?? 0) + parseFloat(o.total_price);
        });
        const sorted = Object.entries(map)
          .map(([month, revenue]) => ({ month, revenue: Math.round(revenue) }))
          .sort((a, b) => new Date('1 ' + a.month).getTime() - new Date('1 ' + b.month).getTime());
        setData(sorted);
      })
      .catch(() => {});
  }, []);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-[#a3a3a3] text-sm">
        No revenue data yet. Revenue will appear once orders are placed.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
        <XAxis dataKey="month" tick={{ fill: '#a3a3a3', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#a3a3a3', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #262626', borderRadius: '8px' }}
          labelStyle={{ color: '#f5f5f5' }}
          formatter={(value: number) => [`${value.toLocaleString()} XAF`, 'Revenue']}
        />
        <Bar dataKey="revenue" fill="#A68A64" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
