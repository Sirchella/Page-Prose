import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 12400 },
  { month: 'Feb', revenue: 15800 },
  { month: 'Mar', revenue: 14200 },
  { month: 'Apr', revenue: 18900 },
  { month: 'May', revenue: 21300 },
  { month: 'Jun', revenue: 19800 },
  { month: 'Jul', revenue: 23500 },
  { month: 'Aug', revenue: 25100 },
  { month: 'Sep', revenue: 22700 },
  { month: 'Oct', revenue: 27400 },
  { month: 'Nov', revenue: 29800 },
  { month: 'Dec', revenue: 31200 },
];

export function RevenueChart() {
  return (
    <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg text-[#f5f5f5] mb-1">Monthly Revenue</h3>
        <p className="text-sm text-[#a3a3a3]">Revenue trends over the past 12 months</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
          <XAxis 
            dataKey="month" 
            stroke="#a3a3a3"
            tick={{ fill: '#a3a3a3' }}
          />
          <YAxis 
            stroke="#a3a3a3"
            tick={{ fill: '#a3a3a3' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1a1a1a', 
              border: '1px solid #262626',
              borderRadius: '8px',
              color: '#f5f5f5'
            }}
            formatter={(value: number) => [`${Math.round(value).toLocaleString()} XAF`, 'Revenue']}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#A68A64" 
            strokeWidth={2}
            dot={{ fill: '#A68A64', r: 4 }}
            activeDot={{ r: 6, fill: '#C4A67A' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
