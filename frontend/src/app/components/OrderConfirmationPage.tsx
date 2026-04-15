import { useNavigate, useLocation, Navigate } from 'react-router';
import { useEffect, useState } from 'react';
import { CheckCircle, Package, MapPin, Calendar, Truck, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchBooks, type Book as ApiBook } from '../api';

interface OrderItem {
  id: string;
  title: string;
  author: string;
  format: string;
  price: number;
  quantity: number;
  coverImage: string;
}

const mediaBase = (import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api').replace('/api', '');

export function OrderConfirmationPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as {
    state: { orderItems: OrderItem[]; shippingAddress: string; total: number } | null;
  };

  if (!state?.orderItems?.length) return <Navigate to="/" replace />;

  const orderItems: OrderItem[] = state.orderItems;
  const shippingAddress = state.shippingAddress ?? '';
  const total = state.total ?? orderItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const orderNumber = `PP-${Date.now().toString().slice(-7)}`;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const estimatedDelivery = deliveryDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const [recommendations, setRecommendations] = useState<ApiBook[]>([]);
  useEffect(() => {
    fetchBooks()
      .then(books => {
        const orderedIds = new Set(orderItems.map(i => i.id));
        setRecommendations(books.filter(b => !orderedIds.has(String(b.id))).slice(0, 5));
      })
      .catch(() => {});
  }, []);

  const carouselSettings = {
    dots: false,
    infinite: recommendations.length > 1,
    speed: 500,
    slidesToShow: Math.min(4, recommendations.length || 1),
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1, draggable: true } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, draggable: true } },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F5EFE7]">
      {/* Navigation */}
      <nav className="bg-[#FDFBF7] border-b-2 border-[#A68A64] shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3 md:py-4">
          <div className="flex items-center justify-center">
            <h1 className="text-xl md:text-3xl text-[#4A7C2C] font-serif">Page & Prose</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16">
        {/* Success */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-[#4A7C2C] rounded-full mb-4 md:mb-6">
            <CheckCircle className="w-10 h-10 md:w-16 md:h-16 text-white" />
          </div>
          <h1 className="text-2xl md:text-4xl text-[#2C2416] font-serif mb-3">Thank you for your order!</h1>
          <p className="text-base md:text-lg text-[#6B5D4F]">Your order has been confirmed and will be shipped soon.</p>
        </div>

        {/* Order Number */}
        <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-6 mb-8 text-center">
          <div className="text-sm text-[#6B5D4F] mb-2">Order Number</div>
          <div className="text-2xl text-[#4A7C2C] font-serif">{orderNumber}</div>
        </div>

        {/* Order Details */}
        <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-4 md:p-8 mb-4 md:mb-8">
          {orderItems.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl text-[#2C2416] font-serif mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-[#4A7C2C]" />
                Your Books
              </h2>
              <div className="space-y-4">
                {orderItems.map((item, i) => (
                  <div key={i} className="flex gap-3 md:gap-4 items-start">
                    <div className="w-14 h-20 md:w-20 md:h-28 flex-shrink-0 rounded overflow-hidden border-2 border-[#E8DCC8]">
                      <ImageWithFallback src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base text-[#2C2416] font-serif mb-1">{item.title}</h3>
                      <p className="text-sm text-[#6B5D4F] mb-2">by {item.author}</p>
                      <div className="flex items-center gap-4 text-sm text-[#6B5D4F]">
                        <span>{item.format}</span>
                        <span>×</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <div className="text-base md:text-lg text-[#4A7C2C] font-serif whitespace-nowrap">
                      {Math.round(item.price * item.quantity).toLocaleString()} XAF
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t-2 border-[#E8DCC8]">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[#2C2416]">Total Paid</span>
                  <span className="text-2xl text-[#4A7C2C] font-serif">{Math.round(total).toLocaleString()} XAF</span>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {shippingAddress && (
              <div className="p-5 bg-[#F5EFE7] rounded-lg">
                <h3 className="text-sm font-semibold text-[#2C2416] mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#4A7C2C]" />
                  Delivery Address
                </h3>
                <div className="text-sm text-[#6B5D4F] leading-relaxed whitespace-pre-line">
                  {shippingAddress.split(', ').join('\n')}
                </div>
              </div>
            )}
            <div className="p-5 bg-[#F5EFE7] rounded-lg">
              <h3 className="text-sm font-semibold text-[#2C2416] mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#4A7C2C]" />
                Estimated Delivery
              </h3>
              <div className="text-sm text-[#6B5D4F] leading-relaxed">
                {estimatedDelivery}
                <br />
                <span className="text-xs">Standard Delivery (5-7 business days)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking */}
        <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-4 md:p-8 mb-4 md:mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#4A7C2C]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6 text-[#4A7C2C]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg text-[#2C2416] font-serif mb-2">Track Your Order</h3>
              <p className="text-sm text-[#6B5D4F]">
                You'll receive an email with tracking updates once your order ships.
              </p>
            </div>
          </div>
        </div>

        {/* Email Notice */}
        <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-lg p-6 mb-8 text-center">
          <p className="text-sm text-[#92400E]">
            📧 A confirmation email has been sent to your email address with your order details and receipt.
          </p>
        </div>

        {/* Continue Shopping */}
        <div className="text-center mb-16">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-[#4A7C2C] hover:text-[#3d6624] transition-colors font-semibold"
          >
            Continue Shopping
          </button>
        </div>

        {/* You May Also Like */}
        {recommendations.length > 0 && (
          <div>
            <h2 className="text-xl md:text-2xl text-[#2C2416] font-serif mb-4 md:mb-6 text-center">You May Also Like</h2>
            <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-4 md:p-6">
              <div className="carousel-container">
                <Slider {...carouselSettings}>
                  {recommendations.map((book) => (
                    <div key={book.id} className="px-3">
                      <div
                        onClick={() => navigate(`/book/${book.id}`)}
                        className="bg-[#F5EFE7] border-2 border-[#E8DCC8] rounded-lg overflow-hidden hover:border-[#A68A64] hover:shadow-lg transition-all group cursor-pointer"
                      >
                        <div className="aspect-[3/4] overflow-hidden">
                          <ImageWithFallback
                            src={book.cover_image ? `${mediaBase}${book.cover_image}` : ''}
                            alt={book.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-sm font-serif text-[#2C2416] mb-1 line-clamp-2">{book.title}</h3>
                          <p className="text-xs text-[#6B5D4F] mb-2">{book.author}</p>
                          <div className="text-lg font-serif text-[#4A7C2C]">
                            {Math.round(parseFloat(book.price)).toLocaleString()} XAF
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="border-t-2 border-[#D4C4B0] bg-[#FDFBF7] py-8 mt-16">
        <div className="max-w-4xl mx-auto px-8 text-center text-sm text-[#6B5D4F]">
          <p className="mb-2">Need help? Contact us at support@pageandprose.com</p>
          <p className="text-xs">© {new Date().getFullYear()} Page & Prose. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function NextArrow(props: { onClick?: () => void }) {
  return (
    <button
      onClick={props.onClick}
      className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#4A7C2C] rounded-full flex items-center justify-center hover:bg-[#3d6624] transition-colors shadow-lg"
    >
      <ChevronRight className="w-6 h-6 text-white" />
    </button>
  );
}

function PrevArrow(props: { onClick?: () => void }) {
  return (
    <button
      onClick={props.onClick}
      className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#4A7C2C] rounded-full flex items-center justify-center hover:bg-[#3d6624] transition-colors shadow-lg"
    >
      <ChevronLeft className="w-6 h-6 text-white" />
    </button>
  );
}
