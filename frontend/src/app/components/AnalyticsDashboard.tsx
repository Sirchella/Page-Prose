import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { fetchOrders, fetchBooks } from '../api';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [liveRevenue, setLiveRevenue] = useState<number | null>(null);
  const [liveOrders, setLiveOrders] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([fetchOrders(), fetchBooks()])
      .then(([orders, _books]) => {
        const revenue = orders
          .filter(o => o.status !== 'cancelled')
          .reduce((s, o) => s + parseFloat(o.total_price), 0);
        setLiveRevenue(revenue);
        setLiveOrders(orders.filter(o => o.status !== 'cancelled').length);
      })
      .catch(() => {});
  }, []);

  const totalRevenue = liveRevenue ?? 0;
  const totalSales = liveOrders ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-[#f5f5f5]">Analytics & Reporting</h2>
          <p className="text-sm text-[#a3a3a3] mt-1">Track your store performance and insights</p>
        </div>

        {/* Date Range Picker */}
        <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#262626] rounded-lg text-[#f5f5f5] hover:border-[#A68A64] transition-colors">
            <Calendar className="w-5 h-5 text-[#a3a3a3]" />
            <span>{dateRange}</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-6">
          <p className="text-sm text-[#a3a3a3] mb-2">Total Revenue</p>
          <p className="text-3xl text-green-400">{Math.round(totalRevenue).toLocaleString()} XAF</p>
        </div>
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-6">
          <p className="text-sm text-[#a3a3a3] mb-2">Total Orders</p>
          <p className="text-3xl text-[#f5f5f5]">{totalSales.toLocaleString()}</p>
        </div>
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-6">
          <p className="text-sm text-[#a3a3a3] mb-2">Cart Abandonment Rate</p>
          <p className="text-3xl text-[#f5f5f5]">—</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Bar Chart */}
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-6">
          <h3 className="text-lg text-[#f5f5f5] mb-6">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis 
                dataKey="month" 
                stroke="#a3a3a3" 
                tick={{ fill: '#a3a3a3' }}
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#a3a3a3" 
                tick={{ fill: '#a3a3a3' }}
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `${Math.round(value / 1000)}k XAF`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0a0a0a', 
                  border: '1px solid #262626',
                  borderRadius: '8px',
                  color: '#f5f5f5'
                }}
                formatter={(value: number) => [`${Math.round(value).toLocaleString()} XAF`, 'Revenue']}
              />
              <Bar dataKey="revenue" fill="#4A7C2C" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top 5 Best-Selling Books */}
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-6">
          <h3 className="text-lg text-[#f5f5f5] mb-6">Top 5 Best-Selling Books</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[]} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis 
                type="number" 
                stroke="#a3a3a3" 
                tick={{ fill: '#a3a3a3' }}
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                type="category" 
                dataKey="title" 
                stroke="#a3a3a3" 
                tick={{ fill: '#a3a3a3' }}
                style={{ fontSize: '11px' }}
                width={150}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0a0a0a', 
                  border: '1px solid #262626',
                  borderRadius: '8px',
                  color: '#f5f5f5'
                }}
                formatter={(value: number) => [value, 'Sales']}
              />
              <Bar dataKey="sales" fill="#A68A64" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Volume Over Time */}
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-6">
          <h3 className="text-lg text-[#f5f5f5] mb-6">Order Volume Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis 
                dataKey="date" 
                stroke="#a3a3a3" 
                tick={{ fill: '#a3a3a3' }}
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#a3a3a3" 
                tick={{ fill: '#a3a3a3' }}
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0a0a0a', 
                  border: '1px solid #262626',
                  borderRadius: '8px',
                  color: '#f5f5f5'
                }}
                formatter={(value: number) => [value, 'Orders']}
              />
              <Line 
                type="monotone" 
                dataKey="orders" 
                stroke="#4A7C2C" 
                strokeWidth={3}
                dot={{ fill: '#4A7C2C', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Abandoned Cart Rate Donut Chart */}
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-6">
          <h3 className="text-lg text-[#f5f5f5] mb-6">Cart Completion vs Abandonment</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[]}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0a0a0a',
                  border: '1px solid #262626',
                  borderRadius: '8px',
                  color: '#f5f5f5'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            <p className="text-sm text-[#a3a3a3]">No cart data available</p>
          </div>
        </div>
      </div>

    </div>
  );
}
