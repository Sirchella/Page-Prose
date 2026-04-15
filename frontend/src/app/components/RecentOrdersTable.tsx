import { useState, useEffect } from 'react';
import { fetchOrders, type Order as ApiOrder } from '../api';

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: 'completed' | 'processing' | 'pending';
  date: string;
}

function mapOrder(o: ApiOrder): Order {
  const statusMap: Record<string, Order['status']> = {
    delivered: 'completed',
    shipped: 'processing',
    packing: 'processing',
    confirmed: 'processing',
    pending: 'pending',
    cancelled: 'pending',
  };
  const bookLabel = o.items.length > 0
    ? `${o.items.length} book${o.items.length > 1 ? 's' : ''}`
    : 'Order';
  return {
    id: `#ORD-${String(o.id).padStart(4, '0')}`,
    customer: o.customer_name,
    product: bookLabel,
    amount: `${Math.round(parseFloat(o.total_price)).toLocaleString()} XAF`,
    status: statusMap[o.status] ?? 'pending',
    date: new Date(o.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  };
}

export function RecentOrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders()
      .then(apiOrders => setOrders(apiOrders.slice(0, 6).map(mapOrder)))
      .catch(() => {});
  }, []);

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
        {orders.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-[#a3a3a3]">No orders yet.</div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
