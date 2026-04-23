import { useState, useEffect } from 'react';
import { Search, Package, CheckCircle, Truck, XCircle, Clock } from 'lucide-react';
import { OrderDetailPanel } from './OrderDetailPanel';
import { fetchOrders, updateOrderStatus, type Order as ApiOrder } from '../api';

interface OrderItem {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  trackingNumber?: string;
}


type StatusFilter = 'all' | 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface StatusConfig {
  value: StatusFilter;
  label: string;
  icon: React.ElementType;
  count: number;
}

function mapApiOrder(o: ApiOrder): Order {
  const statusMap: Record<string, Order['status']> = {
    pending: 'new', confirmed: 'processing', packing: 'processing',
    shipped: 'shipped', delivered: 'delivered', cancelled: 'cancelled',
  };
  return {
    id: String(o.id),
    orderNumber: `#ORD-${String(o.id).padStart(7, '0')}`,
    customerName: o.customer_name,
    customerEmail: o.customer_email,
    customerPhone: '',
    items: o.items.map(item => ({
      id: String(item.id),
      title: `Book #${item.book}`,
      author: '',
      coverUrl: '',
      quantity: item.quantity,
      price: parseFloat(item.price),
    })),
    total: parseFloat(o.total_price),
    date: o.created_at,
    status: statusMap[o.status] ?? 'new',
    shippingAddress: {
      street: o.shipping_address,
      city: '', state: '', zip: '', country: '',
    },
  };
}

export function OrdersManagement() {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  useEffect(() => {
    fetchOrders()
      .then(apiOrders => {
        if (apiOrders.length > 0) setOrders(apiOrders.map(mapApiOrder));
      })
      .catch(() => {});
  }, []);

  const statusConfigs: StatusConfig[] = [
    { value: 'all', label: 'All Orders', icon: Package, count: orders.length },
    { value: 'new', label: 'New', icon: Clock, count: orders.filter(o => o.status === 'new').length },
    { value: 'processing', label: 'Processing', icon: Package, count: orders.filter(o => o.status === 'processing').length },
    { value: 'shipped', label: 'Shipped', icon: Truck, count: orders.filter(o => o.status === 'shipped').length },
    { value: 'delivered', label: 'Delivered', icon: CheckCircle, count: orders.filter(o => o.status === 'delivered').length },
    { value: 'cancelled', label: 'Cancelled', icon: XCircle, count: orders.filter(o => o.status === 'cancelled').length },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'new':
        return 'bg-[#A68A64]/20 text-[#C4A67A] border-[#A68A64]/30';
      case 'processing':
        return 'bg-[#3b82f6]/20 text-[#60a5fa] border-[#3b82f6]/30';
      case 'shipped':
        return 'bg-[#8b5cf6]/20 text-[#a78bfa] border-[#8b5cf6]/30';
      case 'delivered':
        return 'bg-[#4A7C2C]/20 text-[#6B9D48] border-[#4A7C2C]/30';
      case 'cancelled':
        return 'bg-[#dc2626]/20 text-[#ef4444] border-[#dc2626]/30';
      default:
        return 'bg-[#525252]/20 text-[#a3a3a3] border-[#525252]/30';
    }
  };

  const getStatusLabel = (status: Order['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleMarkAsShipped = async (orderId: string) => {
    try {
      await updateOrderStatus(parseInt(orderId), 'shipped');
    } catch { /* backend may not be running */ }
    setOrders(orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'shipped', trackingNumber: '1Z999AA10' + Math.random().toString().slice(2, 11) }
        : order
    ));
    setSelectedOrder(prev => prev?.id === orderId ? { ...prev, status: 'shipped' } : prev);
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      await updateOrderStatus(parseInt(orderId), 'cancelled');
    } catch { /* backend may not be running */ }
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'cancelled' } : order
    ));
    setSelectedOrder(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-[#f5f5f5]">Orders Management</h2>
        <p className="text-sm text-[#a3a3a3] mt-1">Track and manage customer orders</p>
      </div>

      {/* Status Filters */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {statusConfigs.map((config) => {
          const Icon = config.icon;
          return (
            <button
              key={config.value}
              onClick={() => setSelectedStatus(config.value)}
              className={`p-4 rounded-lg border transition-colors ${
                selectedStatus === config.value
                  ? 'bg-[#A68A64] border-[#A68A64] text-[#0a0a0a]'
                  : 'bg-[#1a1a1a] border-[#262626] text-[#f5f5f5] hover:border-[#A68A64]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5" />
                <span className="text-2xl">{config.count}</span>
              </div>
              <p className="text-sm text-left">{config.label}</p>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a3a3a3]" />
          <input
            type="text"
            placeholder="Search by order number, customer name, or book title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#262626] rounded-lg pl-12 pr-4 py-3 text-[#f5f5f5] placeholder:text-[#a3a3a3] focus:outline-none focus:ring-2 focus:ring-[#A68A64] focus:border-transparent"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#262626] bg-[#0f0f0f]">
                <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Order ID</th>
                <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Customer</th>
                <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Books Ordered</th>
                <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Total</th>
                <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Date</th>
                <th className="text-left px-6 py-4 text-sm text-[#a3a3a3]">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="border-b border-[#262626] hover:bg-[#1a1a1a]/50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#f5f5f5] font-mono">{order.orderNumber}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#f5f5f5]">{order.customerName}</p>
                    <p className="text-xs text-[#a3a3a3] mt-1">{order.customerEmail}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <p key={idx} className="text-sm text-[#f5f5f5]">
                          {item.title} {item.quantity > 1 && `(×${item.quantity})`}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-green-400">
                    {Math.round(order.total).toLocaleString()} XAF
                  </td>
                  <td className="px-6 py-4 text-sm text-[#a3a3a3]">
                    {new Date(order.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs border ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-[#525252] mx-auto mb-4" />
            <p className="text-[#a3a3a3]">No orders found</p>
          </div>
        )}
      </div>

      {/* Order Detail Panel */}
      <OrderDetailPanel
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onMarkAsShipped={handleMarkAsShipped}
        onCancelOrder={handleCancelOrder}
      />
    </div>
  );
}
