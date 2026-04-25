import { useNavigate, useLocation } from 'react-router';
import { CheckCircle, Package, MapPin, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OrderItem {
  id: string;
  title: string;
  author: string;
  format: string;
  price: number;
  quantity: number;
  coverImage: string;
}

interface LocationState {
  orderId?: number;
  customerName?: string;
  customerEmail?: string;
  shippingAddress?: string;
  total?: number;
  items?: OrderItem[];
}

export function OrderConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as LocationState;

  const {
    orderId,
    customerName = 'Customer',
    customerEmail,
    shippingAddress,
    total = 0,
    items = [],
  } = state;

  const orderNumber = orderId ? `#ORD-${String(orderId).padStart(7, '0')}` : '—';

  return (
    <div className="min-h-screen bg-[#F5EFE7]">
      {/* Navigation */}
      <nav className="bg-[#FDFBF7] border-b-2 border-[#A68A64] shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-center">
          <h1 className="text-xl md:text-3xl text-[#4A7C2C] font-serif">Page & Prose</h1>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-16">

        {/* Success Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-[#4A7C2C] rounded-full mb-4 md:mb-6">
            <CheckCircle className="w-10 h-10 md:w-16 md:h-16 text-white" />
          </div>
          <h1 className="text-2xl md:text-4xl text-[#2C2416] font-serif mb-3">
            Thank you{customerName ? `, ${customerName.split(' ')[0]}` : ''}!
          </h1>
          <p className="text-base md:text-lg text-[#6B5D4F]">
            Your order has been confirmed and payment received.
          </p>
        </div>

        {/* Order Number */}
        <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-6 mb-6 text-center">
          <div className="text-sm text-[#6B5D4F] mb-1">Order Number</div>
          <div className="text-2xl text-[#4A7C2C] font-serif font-bold">{orderNumber}</div>
          {customerEmail && (
            <p className="text-sm text-[#6B5D4F] mt-2">
              A confirmation email has been sent to <strong>{customerEmail}</strong>
            </p>
          )}
        </div>

        {/* Order Items */}
        {items.length > 0 && (
          <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-4 md:p-8 mb-6">
            <h2 className="text-xl text-[#2C2416] font-serif mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-[#4A7C2C]" />
              Your Books
            </h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 md:gap-4 items-start">
                  <div className="w-14 h-20 md:w-20 md:h-28 flex-shrink-0 rounded overflow-hidden border-2 border-[#E8DCC8]">
                    <ImageWithFallback
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base text-[#2C2416] font-serif mb-1">{item.title}</h3>
                    <p className="text-sm text-[#6B5D4F] mb-1">by {item.author}</p>
                    <p className="text-xs text-[#6B5D4F]">{item.format} × {item.quantity}</p>
                  </div>
                  <div className="text-base md:text-lg text-[#4A7C2C] font-serif whitespace-nowrap">
                    {Math.round(item.price * item.quantity).toLocaleString()} XAF
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t-2 border-[#E8DCC8] flex justify-between items-center">
              <span className="text-lg font-semibold text-[#2C2416]">Total Paid</span>
              <span className="text-2xl text-[#4A7C2C] font-serif">
                {Math.round(total).toLocaleString()} XAF
              </span>
            </div>
          </div>
        )}

        {/* Delivery info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {shippingAddress && (
            <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-5">
              <h3 className="text-sm font-semibold text-[#2C2416] mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#4A7C2C]" /> Delivery Address
              </h3>
              <p className="text-sm text-[#6B5D4F] leading-relaxed">
                {customerName}<br />
                {shippingAddress.replace(/,\s*/g, '\n')}
              </p>
            </div>
          )}
          <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-5">
            <h3 className="text-sm font-semibold text-[#2C2416] mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#4A7C2C]" /> Estimated Delivery
            </h3>
            <p className="text-sm text-[#6B5D4F] leading-relaxed">
              5–7 business days<br />
              <span className="text-xs">We'll email you when your order ships.</span>
            </p>
          </div>
        </div>

        {/* Email notice */}
        <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-lg p-4 mb-8 text-center">
          <p className="text-sm text-[#92400E]">
            📧 A confirmation email with your order details has been sent to your inbox.
          </p>
        </div>

        {/* Continue shopping */}
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#3d6624] transition-colors font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>

      <footer className="border-t-2 border-[#D4C4B0] bg-[#FDFBF7] py-8 mt-12">
        <div className="max-w-4xl mx-auto px-8 text-center text-sm text-[#6B5D4F]">
          <p>Need help? Contact us at support@pageandprose.com</p>
          <p className="text-xs mt-2">© 2026 Page & Prose. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
