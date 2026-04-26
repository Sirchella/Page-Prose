import { useEffect, useState } from 'react';
import { fetchOrders, type Order } from '../api';

const statusStyles: Record<string, string> = {
  pending:   'bg-amber-950 text-amber-400 border border-amber-700',
  confirmed: 'bg-blue-950 text-blue-400 border border-blue-700',
  packing:   'bg-purple-950 text-purple-400 border border-purple-700',
  shipped:   'bg-indigo-950 text-indigo-400 border border-indigo-700',
  delivered: 'bg-green-950 text-green-400 border border-green-700',
  cancelled: 'bg-red-950 text-red-400 border border-red-700',
};

export function RecentOrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders()
      .then(all => setOrders(all.slice(0, 6)))
      .catch(() => {});
  }, []);

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 text-[#a3a3a3] text-sm">
        No orders yet. Orders will appear here once customers start purchasing.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#262626]">
            <th className="text-left py-3 text-xs text-[#a3a3a3] font-medium">Order</th>
            <th className="text-left py-3 text-xs text-[#a3a3a3] font-medium">Customer</th>
            <th className="text-left py-3 text-xs text-[#a3a3a3] font-medium">Date</th>
            <th className="text-right py-3 text-xs text-[#a3a3a3] font-medium">Amount</th>
            <th className="text-right py-3 text-xs text-[#a3a3a3] font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-b border-[#262626] hover:bg-[#1a1a1a] transition-colors">
              <td className="py-3 text-sm text-[#f5f5f5] font-mono">
                #ORD-{String(order.id).padStart(7, '0')}
              </td>
              <td className="py-3 text-sm text-[#f5f5f5]">{order.customer_name}</td>
              <td className="py-3 text-sm text-[#a3a3a3]">
                {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </td>
              <td className="py-3 text-sm text-right text-[#f5f5f5]">
                {Math.round(parseFloat(order.total_price)).toLocaleString()} XAF
              </td>
              <td className="py-3 text-right">
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusStyles[order.status] ?? 'bg-[#262626] text-[#a3a3a3]'}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
