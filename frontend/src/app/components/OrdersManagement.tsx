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

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '#ORD-2026-001234',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@email.com',
    customerPhone: '(555) 123-4567',
    items: [
      {
        id: '1',
        title: 'The Midnight Library',
        author: 'Matt Haig',
        coverUrl: 'https://images.unsplash.com/photo-1763768861268-cb6b54173dbf?w=400',
        quantity: 1,
        price: 24.99,
      },
      {
        id: '2',
        title: 'Atomic Habits',
        author: 'James Clear',
        coverUrl: 'https://images.unsplash.com/photo-1758803184789-a5dd872fe82e?w=400',
        quantity: 2,
        price: 16.99,
      },
    ],
    total: 64.69,
    date: '2026-03-12T10:30:00',
    status: 'new',
    shippingAddress: {
      street: '123 Oak Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      country: 'United States',
    },
  },
  {
    id: '2',
    orderNumber: '#ORD-2026-001233',
    customerName: 'Michael Chen',
    customerEmail: 'mchen@email.com',
    customerPhone: '(555) 234-5678',
    items: [
      {
        id: '3',
        title: 'Project Hail Mary',
        author: 'Andy Weir',
        coverUrl: 'https://images.unsplash.com/photo-1670523798656-eda0ea506db6?w=400',
        quantity: 1,
        price: 29.99,
      },
    ],
    total: 35.98,
    date: '2026-03-12T09:15:00',
    status: 'processing',
    shippingAddress: {
      street: '456 Maple Avenue',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
      country: 'United States',
    },
  },
  {
    id: '3',
    orderNumber: '#ORD-2026-001232',
    customerName: 'Emily Rodriguez',
    customerEmail: 'emily.r@email.com',
    customerPhone: '(555) 345-6789',
    items: [
      {
        id: '4',
        title: 'The Silent Patient',
        author: 'Alex Michaelides',
        coverUrl: 'https://images.unsplash.com/photo-1760696473709-a7da66ee87a6?w=400',
        quantity: 1,
        price: 22.00,
      },
      {
        id: '5',
        title: 'Where the Crawdads Sing',
        author: 'Delia Owens',
        coverUrl: 'https://images.unsplash.com/photo-1758803184789-a5dd872fe82e?w=400',
        quantity: 1,
        price: 18.50,
      },
    ],
    total: 46.49,
    date: '2026-03-11T16:45:00',
    status: 'shipped',
    trackingNumber: '1Z999AA10123456784',
    shippingAddress: {
      street: '789 Pine Road',
      city: 'Austin',
      state: 'TX',
      zip: '73301',
      country: 'United States',
    },
  },
  {
    id: '4',
    orderNumber: '#ORD-2026-001231',
    customerName: 'David Thompson',
    customerEmail: 'dthompson@email.com',
    customerPhone: '(555) 456-7890',
    items: [
      {
        id: '6',
        title: 'Dune',
        author: 'Frank Herbert',
        coverUrl: 'https://images.unsplash.com/photo-1772225027406-00bda64076b6?w=400',
        quantity: 1,
        price: 25.00,
      },
    ],
    total: 30.99,
    date: '2026-03-11T14:20:00',
    status: 'delivered',
    trackingNumber: '1Z999AA10123456785',
    shippingAddress: {
      street: '321 Birch Lane',
      city: 'Portland',
      state: 'OR',
      zip: '97201',
      country: 'United States',
    },
  },
  {
    id: '5',
    orderNumber: '#ORD-2026-001230',
    customerName: 'Jessica Williams',
    customerEmail: 'jwilliams@email.com',
    customerPhone: '(555) 567-8901',
    items: [
      {
        id: '7',
        title: 'The Name of the Wind',
        author: 'Patrick Rothfuss',
        coverUrl: 'https://images.unsplash.com/photo-1685478237148-aaf613b2e8ad?w=400',
        quantity: 2,
        price: 27.50,
      },
    ],
    total: 60.99,
    date: '2026-03-11T11:00:00',
    status: 'processing',
    shippingAddress: {
      street: '654 Cedar Court',
      city: 'Boston',
      state: 'MA',
      zip: '02101',
      country: 'United States',
    },
  },
  {
    id: '6',
    orderNumber: '#ORD-2026-001229',
    customerName: 'Robert Martinez',
    customerEmail: 'rmartinez@email.com',
    customerPhone: '(555) 678-9012',
    items: [
      {
        id: '8',
        title: 'Educated',
        author: 'Tara Westover',
        coverUrl: 'https://images.unsplash.com/photo-1769963121626-7f1885db412c?w=400',
        quantity: 1,
        price: 19.99,
      },
    ],
    total: 25.98,
    date: '2026-03-10T15:30:00',
    status: 'cancelled',
    shippingAddress: {
      street: '987 Elm Street',
      city: 'Denver',
      state: 'CO',
      zip: '80201',
      country: 'United States',
    },
  },
  {
    id: '7',
    orderNumber: '#ORD-2026-001228',
    customerName: 'Amanda Taylor',
    customerEmail: 'ataylor@email.com',
    customerPhone: '(555) 789-0123',
    items: [
      {
        id: '9',
        title: 'The Seven Husbands of Evelyn Hugo',
        author: 'Taylor Jenkins Reid',
        coverUrl: 'https://images.unsplash.com/photo-1770983438142-c12f4422e5e0?w=400',
        quantity: 1,
        price: 19.99,
      },
      {
        id: '10',
        title: 'The Psychology of Money',
        author: 'Morgan Housel',
        coverUrl: 'https://images.unsplash.com/photo-1758803184789-a5dd872fe82e?w=400',
        quantity: 1,
        price: 21.50,
      },
    ],
    total: 47.48,
    date: '2026-03-10T08:45:00',
    status: 'new',
    shippingAddress: {
      street: '159 Spruce Avenue',
      city: 'Chicago',
      state: 'IL',
      zip: '60601',
      country: 'United States',
    },
  },
];

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
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders()
      .then(apiOrders => setOrders(apiOrders.map(mapApiOrder)))
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
