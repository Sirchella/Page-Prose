import { X, Printer, Package, XCircle, MapPin, User, Mail, Phone } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

interface OrderDetailPanelProps {
  order: Order | null;
  onClose: () => void;
  onMarkAsShipped: (orderId: string) => void;
  onCancelOrder: (orderId: string) => void;
}

export function OrderDetailPanel({ order, onClose, onMarkAsShipped, onCancelOrder }: OrderDetailPanelProps) {
  if (!order) return null;

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

  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.0725;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-[#1a1a1a] z-50 shadow-xl overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#1a1a1a] border-b border-[#262626] p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-2xl text-[#f5f5f5]">Order Details</h2>
              <p className="text-sm text-[#a3a3a3] mt-1">{order.orderNumber}</p>
            </div>
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm border ${getStatusColor(order.status)}`}>
              {getStatusLabel(order.status)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-[#262626] hover:bg-[#333333] text-[#a3a3a3] hover:text-[#f5f5f5] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Customer Information */}
          <div className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-[#A68A64]" />
              <h3 className="text-lg text-[#f5f5f5]">Customer Information</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-[#a3a3a3]" />
                <span className="text-sm text-[#f5f5f5]">{order.customerName}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#a3a3a3]" />
                <span className="text-sm text-[#f5f5f5]">{order.customerEmail}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#a3a3a3]" />
                <span className="text-sm text-[#f5f5f5]">{order.customerPhone}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-[#A68A64]" />
              <h3 className="text-lg text-[#f5f5f5]">Shipping Address</h3>
            </div>
            <div className="text-sm text-[#f5f5f5] space-y-1">
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
            {order.trackingNumber && (
              <div className="mt-4 pt-4 border-t border-[#262626]">
                <p className="text-xs text-[#a3a3a3] mb-1">Tracking Number</p>
                <code className="text-sm text-[#A68A64] bg-[#A68A64]/10 px-3 py-1.5 rounded">
                  {order.trackingNumber}
                </code>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-5">
            <h3 className="text-lg text-[#f5f5f5] mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-[#262626] last:border-0 last:pb-0">
                  <ImageWithFallback
                    src={item.coverUrl}
                    alt={item.title}
                    className="w-16 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-[#f5f5f5]">{item.title}</p>
                    <p className="text-xs text-[#a3a3a3] mt-1">{item.author}</p>
                    <p className="text-xs text-[#a3a3a3] mt-2">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#f5f5f5]">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-xs text-[#a3a3a3] mt-1">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-[#0a0a0a] border border-[#262626] rounded-lg p-5">
            <h3 className="text-lg text-[#f5f5f5] mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#a3a3a3]">Subtotal</span>
                <span className="text-[#f5f5f5]">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#a3a3a3]">Shipping</span>
                <span className="text-[#f5f5f5]">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#a3a3a3]">Tax</span>
                <span className="text-[#f5f5f5]">${tax.toFixed(2)}</span>
              </div>
              <div className="pt-3 border-t border-[#262626] flex justify-between">
                <span className="text-[#f5f5f5]">Total</span>
                <span className="text-lg text-[#f5f5f5]">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Order Date */}
          <div className="text-sm text-[#a3a3a3]">
            Order placed: {new Date(order.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>

          {/* Action Buttons */}
          {order.status !== 'cancelled' && order.status !== 'delivered' && (
            <div className="sticky bottom-0 bg-[#1a1a1a] pt-4 border-t border-[#262626] space-y-3">
              {order.status === 'new' || order.status === 'processing' ? (
                <button
                  onClick={() => onMarkAsShipped(order.id)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#6B9D48] transition-colors"
                >
                  <Package className="w-5 h-5" />
                  Mark as Shipped
                </button>
              ) : null}
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#262626] text-[#f5f5f5] rounded-lg hover:bg-[#333333] transition-colors"
                >
                  <Printer className="w-5 h-5" />
                  Print Label
                </button>
                {order.status !== 'shipped' && (
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to cancel this order?')) {
                        onCancelOrder(order.id);
                      }
                    }}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[#dc2626] text-white rounded-lg hover:bg-[#ef4444] transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
