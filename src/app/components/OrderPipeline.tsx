import { useState, useMemo } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Package,
  Search,
  Calendar,
  ShoppingBag,
  DollarSign,
  User,
  TrendingUp,
} from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

type OrderStatus = 'received' | 'confirmed' | 'packing' | 'shipped' | 'delivered';

interface Order {
  id: string;
  customerName: string;
  bookCount: number;
  totalValue: number;
  status: OrderStatus;
  date: string;
  priority: 'normal' | 'high';
}

interface DragItem {
  id: string;
  currentStatus: OrderStatus;
}

const generateOrders = (): Order[] => {
  const customers = [
    'Sarah Johnson', 'Michael Chen', 'Emma Wilson', 'David Martinez',
    'Lisa Anderson', 'James Brown', 'Rachel Green', 'Thomas Wright',
    'Amy Foster', 'Kevin Taylor', 'Jennifer Lee', 'Robert Davis',
    'Maria Garcia', 'Christopher Moore', 'Laura Taylor', 'Daniel White',
  ];

  const statuses: OrderStatus[] = ['received', 'confirmed', 'packing', 'shipped', 'delivered'];
  const orders: Order[] = [];

  for (let i = 0; i < 32; i++) {
    const daysAgo = Math.floor(Math.random() * 5);
    const orderDate = new Date('2026-03-15');
    orderDate.setDate(orderDate.getDate() - daysAgo);

    orders.push({
      id: `ORD${String(3000 + i).padStart(5, '0')}`,
      customerName: customers[Math.floor(Math.random() * customers.length)],
      bookCount: Math.floor(Math.random() * 8) + 1,
      totalValue: parseFloat((Math.random() * 200 + 25).toFixed(2)),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      date: orderDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      priority: Math.random() > 0.8 ? 'high' : 'normal',
    });
  }

  return orders;
};

interface OrderCardProps {
  order: Order;
}

function OrderCard({ order }: OrderCardProps) {
  const [{ isDragging }, drag] = useDrag<DragItem, unknown, { isDragging: boolean }>(() => ({
    type: 'ORDER',
    item: { id: order.id, currentStatus: order.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [order.id, order.status]);

  return (
    <div
      ref={drag}
      className={`bg-white rounded-lg border-2 border-slate-200 p-4 mb-3 cursor-move transition-all hover:shadow-md ${
        isDragging ? 'opacity-50 rotate-2' : 'opacity-100'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="font-mono text-sm font-semibold text-slate-900">{order.id}</p>
          <p className="text-xs text-slate-500 mt-0.5">{order.date}</p>
        </div>
        {order.priority === 'high' && (
          <Badge className="bg-red-100 text-red-700 border-red-300 hover:bg-red-100 text-xs">
            High Priority
          </Badge>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-900">{order.customerName}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#A68A64]" />
            <span className="text-sm text-slate-700">
              <span className="font-semibold">{order.bookCount}</span> book{order.bookCount !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-center gap-1 font-semibold text-[#4A7C2C]">
            <DollarSign className="w-4 h-4" />
            <span>{order.totalValue.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ColumnProps {
  status: OrderStatus;
  title: string;
  orders: Order[];
  color: string;
  onDrop: (orderId: string, newStatus: OrderStatus) => void;
}

function Column({ status, title, orders, color, onDrop }: ColumnProps) {
  const [{ isOver }, drop] = useDrop<DragItem, unknown, { isOver: boolean }>(() => ({
    accept: 'ORDER',
    drop: (item) => {
      if (item.currentStatus !== status) {
        onDrop(item.id, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }), [status, onDrop]);

  const totalValue = useMemo(() => {
    return orders.reduce((sum, order) => sum + order.totalValue, 0);
  }, [orders]);

  return (
    <div className="flex-1 min-w-[280px]">
      <div className={`rounded-t-lg p-4 ${color}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-white">{title}</h3>
          <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/20">
            {orders.length}
          </Badge>
        </div>
        <p className="text-xs text-white/80">
          Total: ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div
        ref={drop}
        className={`bg-slate-50 rounded-b-lg p-3 min-h-[600px] transition-colors ${
          isOver ? 'bg-blue-50 ring-2 ring-blue-300' : ''
        }`}
      >
        {orders.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-slate-400 text-sm">
            No orders
          </div>
        ) : (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
}

function OrderPipelineContent() {
  const [orders, setOrders] = useState<Order[]>(generateOrders());
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredOrders = useMemo(() => {
    let filtered = orders;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.customerName.toLowerCase().includes(query)
      );
    }

    // Date filter
    if (dateFilter !== 'all') {
      const today = new Date('2026-03-15');
      filtered = filtered.filter((order) => {
        if (dateFilter === 'today') {
          return order.date === today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        } else if (dateFilter === 'week') {
          const weekAgo = new Date(today);
          weekAgo.setDate(weekAgo.getDate() - 7);
          const orderDate = new Date(order.date + ', 2026');
          return orderDate >= weekAgo;
        }
        return true;
      });
    }

    return filtered;
  }, [orders, searchQuery, dateFilter]);

  const handleDrop = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const ordersByStatus = useMemo(() => {
    return {
      received: filteredOrders.filter((o) => o.status === 'received'),
      confirmed: filteredOrders.filter((o) => o.status === 'confirmed'),
      packing: filteredOrders.filter((o) => o.status === 'packing'),
      shipped: filteredOrders.filter((o) => o.status === 'shipped'),
      delivered: filteredOrders.filter((o) => o.status === 'delivered'),
    };
  }, [filteredOrders]);

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalValue = orders.reduce((sum, order) => sum + order.totalValue, 0);
    const activeOrders = orders.filter((o) => 
      o.status !== 'delivered'
    ).length;

    return { totalOrders, totalValue, activeOrders };
  }, [orders]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#A68A64] to-[#8B7355] flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">Order Processing Pipeline</h1>
                <p className="text-sm text-slate-500">Drag and drop orders to update their status</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Total Orders</p>
                <p className="text-2xl font-semibold text-slate-900">{stats.totalOrders}</p>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Active</p>
                <p className="text-2xl font-semibold text-[#A68A64]">{stats.activeOrders}</p>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Total Value</p>
                <p className="text-2xl font-semibold text-[#4A7C2C]">
                  ${stats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-4">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search by order ID or customer name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-slate-300 bg-slate-50"
              />
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <div className="flex gap-2">
                <Button
                  variant={dateFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDateFilter('all')}
                  className={dateFilter === 'all' ? 'bg-[#A68A64] hover:bg-[#8B7355]' : 'border-slate-300'}
                >
                  All Time
                </Button>
                <Button
                  variant={dateFilter === 'today' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDateFilter('today')}
                  className={dateFilter === 'today' ? 'bg-[#A68A64] hover:bg-[#8B7355]' : 'border-slate-300'}
                >
                  Today
                </Button>
                <Button
                  variant={dateFilter === 'week' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDateFilter('week')}
                  className={dateFilter === 'week' ? 'bg-[#A68A64] hover:bg-[#8B7355]' : 'border-slate-300'}
                >
                  This Week
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="max-w-[1800px] mx-auto px-8 py-6">
        <div className="flex gap-4 overflow-x-auto pb-4">
          <Column
            status="received"
            title="Order Received"
            orders={ordersByStatus.received}
            color="bg-gradient-to-br from-slate-600 to-slate-700"
            onDrop={handleDrop}
          />
          <Column
            status="confirmed"
            title="Payment Confirmed"
            orders={ordersByStatus.confirmed}
            color="bg-gradient-to-br from-blue-600 to-blue-700"
            onDrop={handleDrop}
          />
          <Column
            status="packing"
            title="Packing"
            orders={ordersByStatus.packing}
            color="bg-gradient-to-br from-[#A68A64] to-[#8B7355]"
            onDrop={handleDrop}
          />
          <Column
            status="shipped"
            title="Shipped"
            orders={ordersByStatus.shipped}
            color="bg-gradient-to-br from-amber-600 to-amber-700"
            onDrop={handleDrop}
          />
          <Column
            status="delivered"
            title="Delivered"
            orders={ordersByStatus.delivered}
            color="bg-gradient-to-br from-[#4A7C2C] to-[#3A621C]"
            onDrop={handleDrop}
          />
        </div>

        {/* Instructions */}
        <div className="mt-6 flex items-start gap-3 p-4 bg-white border border-[#A68A64]/20 rounded-lg">
          <TrendingUp className="w-5 h-5 text-[#A68A64] mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-semibold text-slate-900 mb-1">Pipeline Instructions</p>
            <p className="text-slate-600">
              Drag and drop order cards between columns to update their status. High priority orders are marked
              with a red badge. The pipeline automatically updates totals and statistics in real-time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OrderPipeline() {
  return (
    <DndProvider backend={HTML5Backend}>
      <OrderPipelineContent />
    </DndProvider>
  );
}