import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// Mock data for charts
const monthlyRevenueData = [
  { month: 'Jan', revenue: 24500 },
  { month: 'Feb', revenue: 28200 },
  { month: 'Mar', revenue: 31800 },
  { month: 'Apr', revenue: 29500 },
  { month: 'May', revenue: 35200 },
  { month: 'Jun', revenue: 38900 },
  { month: 'Jul', revenue: 42300 },
  { month: 'Aug', revenue: 39800 },
  { month: 'Sep', revenue: 45600 },
  { month: 'Oct', revenue: 48200 },
  { month: 'Nov', revenue: 52800 },
  { month: 'Dec', revenue: 58400 },
];

const topBooksData = [
  { title: 'The Midnight Library', sales: 1247 },
  { title: 'Atomic Habits', sales: 1089 },
  { title: 'Project Hail Mary', sales: 967 },
  { title: 'Where the Crawdads Sing', sales: 845 },
  { title: 'The Silent Patient', sales: 723 },
];

const orderVolumeData = [
  { date: 'Jan 1', orders: 45 },
  { date: 'Jan 8', orders: 52 },
  { date: 'Jan 15', orders: 49 },
  { date: 'Jan 22', orders: 63 },
  { date: 'Jan 29', orders: 58 },
  { date: 'Feb 5', orders: 71 },
  { date: 'Feb 12', orders: 67 },
  { date: 'Feb 19', orders: 78 },
  { date: 'Feb 26', orders: 82 },
  { date: 'Mar 5', orders: 89 },
  { date: 'Mar 12', orders: 94 },
];

const cartData = [
  { name: 'Completed', value: 732, color: '#4A7C2C' },
  { name: 'Abandoned', value: 168, color: '#A68A64' },
];

const genreRevenueData = [
  { genre: 'Fiction', sales: 1247, revenue: 31245.50, avgPrice: 25.06 },
  { genre: 'Mystery & Thriller', sales: 892, revenue: 24567.80, avgPrice: 27.54 },
  { genre: 'Romance', sales: 756, revenue: 18945.30, avgPrice: 25.06 },
  { genre: 'Science Fiction', sales: 634, revenue: 21234.60, avgPrice: 33.50 },
  { genre: 'Fantasy', sales: 589, revenue: 19876.40, avgPrice: 33.74 },
  { genre: 'Biography', sales: 423, revenue: 12456.70, avgPrice: 29.45 },
  { genre: 'Self-Help', sales: 378, revenue: 9234.50, avgPrice: 24.43 },
  { genre: 'Business', sales: 298, revenue: 8567.20, avgPrice: 28.75 },
];

export function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState('Last 30 Days');

  const totalRevenue = genreRevenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalSales = genreRevenueData.reduce((sum, item) => sum + item.sales, 0);
  const abandonmentRate = ((cartData[1].value / (cartData[0].value + cartData[1].value)) * 100).toFixed(1);

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
          <p className="text-3xl text-[#f5f5f5]">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className="text-sm text-[#4A7C2C] mt-2">↑ 12.5% from last period</p>
        </div>
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-6">
          <p className="text-sm text-[#a3a3a3] mb-2">Total Orders</p>
          <p className="text-3xl text-[#f5f5f5]">{totalSales.toLocaleString()}</p>
          <p className="text-sm text-[#4A7C2C] mt-2">↑ 8.3% from last period</p>
        </div>
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-6">
          <p className="text-sm text-[#a3a3a3] mb-2">Cart Abandonment Rate</p>
          <p className="text-3xl text-[#f5f5f5]">{abandonmentRate}%</p>
          <p className="text-sm text-[#dc2626] mt-2">↓ 3.2% from last period</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Bar Chart */}
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-6">
          <h3 className="text-lg text-[#f5f5f5] mb-6">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenueData}>
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
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0a0a0a', 
                  border: '1px solid #262626',
                  borderRadius: '8px',
                  color: '#f5f5f5'
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Bar dataKey="revenue" fill="#4A7C2C" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top 5 Best-Selling Books */}
        <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-6">
          <h3 className="text-lg text-[#f5f5f5] mb-6">Top 5 Best-Selling Books</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topBooksData} layout="vertical">
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
            <LineChart data={orderVolumeData}>
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
                data={cartData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {cartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0a0a0a', 
                  border: '1px solid #262626',
                  borderRadius: '8px',
                  color: '#f5f5f5'
                }}
                formatter={(value: number, name: string) => [
                  `${value} (${((value / (cartData[0].value + cartData[1].value)) * 100).toFixed(1)}%)`,
                  name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {cartData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-sm text-[#a3a3a3]">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Breakdown Table by Genre */}
      <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg overflow-hidden">
        <div className="p-6 border-b border-[#262626]">
          <h3 className="text-lg text-[#f5f5f5]">Revenue Breakdown by Genre</h3>
          <p className="text-sm text-[#a3a3a3] mt-1">Detailed performance metrics by book category</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#262626] bg-[#0f0f0f]">
                <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Genre</th>
                <th className="text-right px-6 py-4 text-sm text-[#a3a3a3]">Sales</th>
                <th className="text-right px-6 py-4 text-sm text-[#a3a3a3]">Revenue</th>
                <th className="text-right px-6 py-4 text-sm text-[#a3a3a3]">Avg Price</th>
                <th className="text-right px-6 py-4 text-sm text-[#a3a3a3]">% of Total</th>
              </tr>
            </thead>
            <tbody>
              {genreRevenueData.map((genre, index) => {
                const percentage = (genre.revenue / totalRevenue * 100).toFixed(1);
                return (
                  <tr key={index} className="border-b border-[#262626] hover:bg-[#1a1a1a]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: index % 2 === 0 ? '#4A7C2C' : '#A68A64' }}
                        />
                        <span className="text-sm text-[#f5f5f5]">{genre.genre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-[#f5f5f5]">
                      {genre.sales.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-[#f5f5f5]">
                      ${genre.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-right text-sm text-[#f5f5f5]">
                      ${genre.avgPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <div className="w-20 h-2 bg-[#0a0a0a] rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full" 
                            style={{ 
                              width: `${percentage}%`,
                              backgroundColor: index % 2 === 0 ? '#4A7C2C' : '#A68A64'
                            }}
                          />
                        </div>
                        <span className="text-sm text-[#a3a3a3] w-12">{percentage}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-[#0f0f0f]">
                <td className="px-6 py-4 text-sm text-[#f5f5f5]">Total</td>
                <td className="px-6 py-4 text-right text-sm text-[#f5f5f5]">
                  {totalSales.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right text-sm text-[#f5f5f5]">
                  ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 text-right text-sm text-[#f5f5f5]">
                  ${(totalRevenue / totalSales).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-right text-sm text-[#f5f5f5]">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
