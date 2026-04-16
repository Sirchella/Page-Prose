interface Order {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: 'completed' | 'processing' | 'pending';
  date: string;
}

const orders: Order[] = [
  {
    id: '#ORD-2891',
    customer: 'Emma Richardson',
    product: 'The Midnight Library',
    amount: '14,999 XAF',
    status: 'completed',
    date: 'Mar 12, 2026',
  },
  {
    id: '#ORD-2890',
    customer: 'James Chen',
    product: 'Where the Crawdads Sing',
    amount: '10,999 XAF',
    status: 'processing',
    date: 'Mar 12, 2026',
  },
  {
    id: '#ORD-2889',
    customer: 'Sarah Williams',
    product: 'Project Hail Mary',
    amount: '17,999 XAF',
    status: 'completed',
    date: 'Mar 11, 2026',
  },
  {
    id: '#ORD-2888',
    customer: 'Michael Brown',
    product: 'Atomic Habits',
    amount: '9,999 XAF',
    status: 'pending',
    date: 'Mar 11, 2026',
  },
  {
    id: '#ORD-2887',
    customer: 'Lisa Anderson',
    product: 'The Silent Patient',
    amount: '12,999 XAF',
    status: 'completed',
    date: 'Mar 10, 2026',
  },
  {
    id: '#ORD-2886',
    customer: 'David Martinez',
    product: 'Educated',
    amount: '11,999 XAF',
    status: 'processing',
    date: 'Mar 10, 2026',
  },
];

export function RecentOrdersTable() {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-[#4A7C2C]/20 text-[#6B9D48] border-[#4A7C2C]/30';
      case 'processing':
        return 'bg-[#A68A64]/20 text-[#C4A67A] border-[#A68A64]/30';
      case 'pending':
        return 'bg-[#525252]/20 text-[#a3a3a3] border-[#525252]/30';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg">
      <div className="p-6 border-b border-[#262626]">
        <h3 className="text-lg text-[#f5f5f5] mb-1">Recent Orders</h3>
        <p className="text-sm text-[#a3a3a3]">Latest customer orders and their status</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#262626]">
              <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Order ID</th>
              <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Customer</th>
              <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Product</th>
              <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Amount</th>
              <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Status</th>
              <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-[#262626] hover:bg-[#1a1a1a]/50 transition-colors">
                <td className="px-6 py-4 text-sm text-[#f5f5f5]">{order.id}</td>
                <td className="px-6 py-4 text-sm text-[#f5f5f5]">{order.customer}</td>
                <td className="px-6 py-4 text-sm text-[#a3a3a3]">{order.product}</td>
                <td className="px-6 py-4 text-sm text-[#f5f5f5]">{order.amount}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs border ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-[#a3a3a3]">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
