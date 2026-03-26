import { CheckCircle, Package, MapPin, Calendar, Truck, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface OrderItem {
  id: string;
  title: string;
  author: string;
  format: string;
  price: number;
  quantity: number;
  coverImage: string;
}

interface RelatedBook {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
}

export function OrderConfirmationPage() {
  const orderNumber = 'PP-2026-047283';
  const trackingNumber = 'TRK9847562341GB';
  const estimatedDelivery = 'March 20-22, 2026';

  const orderItems: OrderItem[] = [
    {
      id: '1',
      title: 'The Midnight Library',
      author: 'Matt Haig',
      format: 'Hardback',
      price: 16.99,
      quantity: 1,
      coverImage: 'https://images.unsplash.com/photo-1763768861268-cb6b54173dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwYm9vayUyMGNvdmVyJTIwdmludGFnZXxlbnwxfHx8fDE3NzMzODI3NjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      format: 'Paperback',
      price: 12.99,
      quantity: 2,
      coverImage: 'https://images.unsplash.com/photo-1760696473709-a7da66ee87a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0ZXJ5JTIwdGhyaWxsZXIlMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzczMzUzNjM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '3',
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      format: 'Hardback',
      price: 16.99,
      quantity: 1,
      coverImage: 'https://images.unsplash.com/photo-1772225027406-00bda64076b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZmljdGlvbiUyMGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3NzMyODk4Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const shippingAddress = {
    name: 'John Doe',
    address: '123 High Street',
    city: 'London',
    postcode: 'SW1A 1AA',
    country: 'United Kingdom',
  };

  const relatedBooks: RelatedBook[] = [
    {
      id: '1',
      title: 'Educated',
      author: 'Tara Westover',
      price: 14.99,
      coverImage: 'https://images.unsplash.com/photo-1769963121626-7f1885db412c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9ncmFwaHklMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzczMzMxODY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      title: 'Atomic Habits',
      author: 'James Clear',
      price: 13.99,
      coverImage: 'https://images.unsplash.com/photo-1632847933603-677959bb8ccb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3NzMzMjU5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '3',
      title: 'Beach Read',
      author: 'Emily Henry',
      price: 13.99,
      coverImage: 'https://images.unsplash.com/photo-1711185898226-beea7eee0611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbmNlJTIwbm92ZWwlMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzczMzk0ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '4',
      title: 'The Name of the Wind',
      author: 'Patrick Rothfuss',
      price: 15.99,
      coverImage: 'https://images.unsplash.com/photo-1711185892188-13f35959d3ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc3MzM3OTYzNnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '5',
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      price: 12.99,
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWN0aW9uJTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc3MzQwNTY1OHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + 3.99;

  return (
    <div className="min-h-screen bg-[#F5EFE7]">
      {/* Simple Navigation Bar */}
      <nav className="bg-[#FDFBF7] border-b-2 border-[#A68A64] shadow-sm">
        <div className="max-w-[1440px] mx-auto px-8 py-4">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl text-[#4A7C2C] font-serif">Page & Prose</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Success Icon & Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-[#4A7C2C] rounded-full mb-6">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl text-[#2C2416] font-serif mb-3">
            Thank you for your order!
          </h1>
          <p className="text-lg text-[#6B5D4F]">
            Your order has been confirmed and will be shipped soon.
          </p>
        </div>

        {/* Order Number */}
        <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-6 mb-8 text-center">
          <div className="text-sm text-[#6B5D4F] mb-2">Order Number</div>
          <div className="text-2xl text-[#4A7C2C] font-serif">{orderNumber}</div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-8 mb-8">
          {/* Order Items */}
          <div className="mb-8">
            <h2 className="text-xl text-[#2C2416] font-serif mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-[#4A7C2C]" />
              Your Books
            </h2>
            <div className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-start">
                  <div className="w-20 h-28 flex-shrink-0 rounded overflow-hidden border-2 border-[#E8DCC8]">
                    <ImageWithFallback
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base text-[#2C2416] font-serif mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#6B5D4F] mb-2">by {item.author}</p>
                    <div className="flex items-center gap-4 text-sm text-[#6B5D4F]">
                      <span>{item.format}</span>
                      <span>×</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-lg text-[#4A7C2C] font-serif">
                    £{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div className="mt-6 pt-6 border-t-2 border-[#E8DCC8]">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-[#2C2416]">Total Paid</span>
                <span className="text-2xl text-[#4A7C2C] font-serif">
                  £{totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Information Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Delivery Address */}
            <div className="p-5 bg-[#F5EFE7] rounded-lg">
              <h3 className="text-sm font-semibold text-[#2C2416] mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#4A7C2C]" />
                Delivery Address
              </h3>
              <div className="text-sm text-[#6B5D4F] leading-relaxed">
                {shippingAddress.name}
                <br />
                {shippingAddress.address}
                <br />
                {shippingAddress.city}, {shippingAddress.postcode}
                <br />
                {shippingAddress.country}
              </div>
            </div>

            {/* Estimated Delivery */}
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

        {/* Tracking Section */}
        <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#4A7C2C]/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6 text-[#4A7C2C]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg text-[#2C2416] font-serif mb-2">
                Track Your Order
              </h3>
              <p className="text-sm text-[#6B5D4F] mb-4">
                Your tracking number will be activated once your order ships. You'll receive an email with tracking updates.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex-1 px-4 py-3 bg-[#F5EFE7] border border-[#E8DCC8] rounded-lg">
                  <div className="text-xs text-[#6B5D4F] mb-1">Tracking Number</div>
                  <div className="text-sm text-[#2C2416] font-mono">{trackingNumber}</div>
                </div>
                <button className="px-6 py-3 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#3d6624] transition-colors font-semibold">
                  Track Order
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Email Confirmation Notice */}
        <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-lg p-6 mb-8 text-center">
          <p className="text-sm text-[#92400E]">
            📧 A confirmation email has been sent to your email address with your order details and receipt.
          </p>
        </div>

        {/* Continue Shopping Link */}
        <div className="text-center mb-16">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#4A7C2C] hover:text-[#3d6624] transition-colors font-semibold"
          >
            Continue Shopping
          </a>
        </div>

        {/* You May Also Like Carousel */}
        <div>
          <h2 className="text-2xl text-[#2C2416] font-serif mb-6 text-center">
            You May Also Like
          </h2>
          <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-6">
            <div className="carousel-container">
              <Slider {...carouselSettings}>
                {relatedBooks.map((book) => (
                  <div key={book.id} className="px-3">
                    <div className="bg-[#F5EFE7] border-2 border-[#E8DCC8] rounded-lg overflow-hidden hover:border-[#A68A64] hover:shadow-lg transition-all group cursor-pointer">
                      <div className="aspect-[3/4] overflow-hidden">
                        <ImageWithFallback
                          src={book.coverImage}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-serif text-[#2C2416] mb-1 line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-xs text-[#6B5D4F] mb-2">{book.author}</p>
                        <div className="text-lg font-serif text-[#4A7C2C]">
                          £{book.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-[#D4C4B0] bg-[#FDFBF7] py-8 mt-16">
        <div className="max-w-4xl mx-auto px-8 text-center text-sm text-[#6B5D4F]">
          <p className="mb-2">
            Need help? Contact us at support@pageandprose.com or call 0800 123 4567
          </p>
          <p className="text-xs">
            © 2026 Page & Prose. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Custom Arrow Components for Carousel
function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#4A7C2C] rounded-full flex items-center justify-center hover:bg-[#3d6624] transition-colors shadow-lg"
    >
      <ChevronRight className="w-6 h-6 text-white" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#4A7C2C] rounded-full flex items-center justify-center hover:bg-[#3d6624] transition-colors shadow-lg"
    >
      <ChevronLeft className="w-6 h-6 text-white" />
    </button>
  );
}
