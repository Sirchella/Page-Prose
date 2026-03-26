import svgPaths from '../../imports/svg-7n328hsve8';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const imgBook1 = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200';
const imgBook2 = 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200';
const imgBook3 = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200';
const imgRec1 = 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=200';
const imgRec2 = 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=200';
const imgRec3 = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=200';
const imgRec4 = 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=200';

function CheckIcon() {
  return (
    <svg className="w-16 h-16" fill="none" viewBox="0 0 64 64">
      <path
        d={svgPaths.p8652380}
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5.33333"
      />
      <path
        d={svgPaths.paab5900}
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5.33333"
      />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
      <path
        d={svgPaths.p3bfee9c0}
        stroke="#4A7C2C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M12 22V12"
        stroke="#4A7C2C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M3.29 7L12 12L20.71 7"
        stroke="#4A7C2C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M7.5 4.27L16.5 9.42"
        stroke="#4A7C2C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
      <path
        d={svgPaths.p26ddc800}
        stroke="#4A7C2C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.66667"
      />
      <path
        d={svgPaths.p35ba4680}
        stroke="#4A7C2C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.66667"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
      <path
        d="M6.66667 1.66667V5"
        stroke="#4A7C2C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.66667"
      />
      <path
        d="M13.3333 1.66667V5"
        stroke="#4A7C2C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.66667"
      />
      <path
        d={svgPaths.p1da67b80}
        stroke="#4A7C2C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.66667"
      />
      <path
        d="M2.5 8.33333H17.5"
        stroke="#4A7C2C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.66667"
      />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
      <path
        d={svgPaths.p67fd620}
        stroke="#4A7C2C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M15 18H9"
        stroke="#4A7C2C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d={svgPaths.p2beec100}
        stroke="#4A7C2C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d={svgPaths.p13934880}
        stroke="#4A7C2C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d={svgPaths.p1ff3c700}
        stroke="#4A7C2C"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#4a7c2c] text-white hover:bg-[#3a621c] shadow-lg flex items-center justify-center transition-all"
  >
    →
  </button>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#4a7c2c] text-white hover:bg-[#3a621c] shadow-lg flex items-center justify-center transition-all"
  >
    ←
  </button>
);

export function OrderConfirmation() {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f5efe7]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div className="bg-[#fdfbf7] border-b-2 border-[#a68a64] shadow-sm">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <h1
            className="text-[30px] leading-[36px] text-[#4a7c2c] text-center"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Page & Prose
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[896px] mx-auto px-8 py-16">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full bg-[#4a7c2c] flex items-center justify-center">
            <CheckIcon />
          </div>
        </div>

        {/* Thank You Message */}
        <h2
          className="text-[36px] leading-[40px] text-[#2c2416] text-center mb-4"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Thank you for your order!
        </h2>
        <p className="text-[18px] leading-[28px] text-[#6b5d4f] text-center mb-12">
          Your order has been confirmed and will be shipped soon.
        </p>

        {/* Order Number Card */}
        <div className="bg-white rounded-[10px] border-2 border-[#d4c4b0] p-6 mb-6 text-center">
          <p className="text-[14px] leading-[20px] text-[#6b5d4f] mb-2">Order Number</p>
          <p
            className="text-[24px] leading-[32px] text-[#4a7c2c]"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            PP-2026-047283
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-[10px] border-2 border-[#d4c4b0] p-8 mb-6">
          {/* Your Books */}
          <div className="mb-8">
            <h3
              className="text-[20px] leading-[28px] text-[#2c2416] mb-6 flex items-center gap-2"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <PackageIcon />
              Your Books
            </h3>

            <div className="space-y-4">
              {/* Book 1 */}
              <div className="flex gap-4">
                <div className="w-20 h-28 rounded border-2 border-[#e8dcc8] overflow-hidden flex-shrink-0">
                  <img src={imgBook1} alt="The Midnight Library" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4
                    className="text-[16px] leading-[24px] text-[#2c2416] mb-1"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    The Midnight Library
                  </h4>
                  <p className="text-[14px] leading-[20px] text-[#6b5d4f] mb-2">by Matt Haig</p>
                  <p className="text-[14px] leading-[20px] text-[#6b5d4f]">Hardback × Qty: 1</p>
                </div>
                <div className="text-right">
                  <p
                    className="text-[18px] leading-[28px] text-[#4a7c2c]"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    £16.99
                  </p>
                </div>
              </div>

              {/* Book 2 */}
              <div className="flex gap-4">
                <div className="w-20 h-28 rounded border-2 border-[#e8dcc8] overflow-hidden flex-shrink-0">
                  <img src={imgBook2} alt="The Silent Patient" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4
                    className="text-[16px] leading-[24px] text-[#2c2416] mb-1"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    The Silent Patient
                  </h4>
                  <p className="text-[14px] leading-[20px] text-[#6b5d4f] mb-2">by Alex Michaelides</p>
                  <p className="text-[14px] leading-[20px] text-[#6b5d4f]">Paperback × Qty: 2</p>
                </div>
                <div className="text-right">
                  <p
                    className="text-[18px] leading-[28px] text-[#4a7c2c]"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    £25.98
                  </p>
                </div>
              </div>

              {/* Book 3 */}
              <div className="flex gap-4">
                <div className="w-20 h-28 rounded border-2 border-[#e8dcc8] overflow-hidden flex-shrink-0">
                  <img src={imgBook3} alt="Project Hail Mary" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4
                    className="text-[16px] leading-[24px] text-[#2c2416] mb-1"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Project Hail Mary
                  </h4>
                  <p className="text-[14px] leading-[20px] text-[#6b5d4f] mb-2">by Andy Weir</p>
                  <p className="text-[14px] leading-[20px] text-[#6b5d4f]">Hardback × Qty: 1</p>
                </div>
                <div className="text-right">
                  <p
                    className="text-[18px] leading-[28px] text-[#4a7c2c]"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    £16.99
                  </p>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="pt-6 mt-6 border-t-2 border-[#e8dcc8] flex items-center justify-between">
              <p className="text-[18px] leading-[28px] text-[#2c2416] font-semibold">Total Paid</p>
              <p
                className="text-[24px] leading-[32px] text-[#4a7c2c]"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                £63.95
              </p>
            </div>
          </div>

          {/* Delivery Info Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Delivery Address */}
            <div className="bg-[#f5efe7] rounded-[10px] p-5">
              <h4 className="text-[14px] leading-[20px] text-[#2c2416] font-semibold mb-3 flex items-center gap-2">
                <MapPinIcon />
                Delivery Address
              </h4>
              <div className="text-[14px] leading-[22.75px] text-[#6b5d4f] space-y-0.5">
                <p>John Doe</p>
                <p>123 High Street</p>
                <p>London, SW1A 1AA</p>
                <p>United Kingdom</p>
              </div>
            </div>

            {/* Estimated Delivery */}
            <div className="bg-[#f5efe7] rounded-[10px] p-5">
              <h4 className="text-[14px] leading-[20px] text-[#2c2416] font-semibold mb-3 flex items-center gap-2">
                <CalendarIcon />
                Estimated Delivery
              </h4>
              <div className="text-[#6b5d4f]">
                <p className="text-[14px] leading-[22.75px] mb-1">March 20-22, 2026</p>
                <p className="text-[12px] leading-[16px]">Standard Delivery (5-7 business days)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Track Your Order Card */}
        <div className="bg-white rounded-[10px] border-2 border-[#d4c4b0] p-8 mb-6">
          <div className="flex gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-[rgba(74,124,44,0.1)] flex items-center justify-center flex-shrink-0">
              <TruckIcon />
            </div>
            <div className="flex-1">
              <h3
                className="text-[18px] leading-[28px] text-[#2c2416] mb-2"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Track Your Order
              </h3>
              <p className="text-[14px] leading-[20px] text-[#6b5d4f] mb-4">
                Your tracking number will be activated once your order ships. You'll receive an email with
                tracking updates.
              </p>
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <p className="text-[12px] leading-[16px] text-[#6b5d4f] mb-1">Tracking Number</p>
                  <div className="bg-[#f5efe7] rounded-[10px] border border-[#e8dcc8] px-4 py-3">
                    <p
                      className="text-[14px] leading-[20px] text-[#2c2416]"
                      style={{ fontFamily: 'Consolas, monospace' }}
                    >
                      TRK9847562341GB
                    </p>
                  </div>
                </div>
                <button className="bg-[#4a7c2c] text-white text-[16px] leading-[24px] font-semibold px-6 py-3 rounded-[10px] hover:bg-[#3a621c] transition-colors">
                  Track Order
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Email Confirmation Notice */}
        <div className="bg-[#fef3c7] rounded-[10px] border-2 border-[#f59e0b] p-6 mb-8 text-center">
          <p className="text-[14px] leading-[20px] text-[#92400e]">
            📧 A confirmation email has been sent to your email address with your order details and receipt.
          </p>
        </div>

        {/* Continue Shopping Link */}
        <div className="text-center mb-16">
          <a
            href="#"
            className="text-[16px] leading-[24px] text-[#4a7c2c] font-semibold hover:underline"
          >
            Continue Shopping
          </a>
        </div>

        {/* You May Also Like */}
        <div>
          <h2
            className="text-[24px] leading-[32px] text-[#2c2416] text-center mb-8"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            You May Also Like
          </h2>

          <div className="relative px-12">
            <Slider {...sliderSettings}>
              {/* Book 1 */}
              <div className="px-3">
                <div className="bg-[#f5efe7] rounded-[10px] border-2 border-[#e8dcc8] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-56 overflow-hidden">
                    <img src={imgRec1} alt="Educated" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h4
                      className="text-[14px] leading-[20px] text-[#2c2416] mb-1"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      Educated
                    </h4>
                    <p className="text-[12px] leading-[16px] text-[#6b5d4f] mb-2">Tara Westover</p>
                    <p
                      className="text-[18px] leading-[28px] text-[#4a7c2c]"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      £14.99
                    </p>
                  </div>
                </div>
              </div>

              {/* Book 2 */}
              <div className="px-3">
                <div className="bg-[#f5efe7] rounded-[10px] border-2 border-[#e8dcc8] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-56 overflow-hidden">
                    <img src={imgRec2} alt="Atomic Habits" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h4
                      className="text-[14px] leading-[20px] text-[#2c2416] mb-1"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      Atomic Habits
                    </h4>
                    <p className="text-[12px] leading-[16px] text-[#6b5d4f] mb-2">James Clear</p>
                    <p
                      className="text-[18px] leading-[28px] text-[#4a7c2c]"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      £13.99
                    </p>
                  </div>
                </div>
              </div>

              {/* Book 3 */}
              <div className="px-3">
                <div className="bg-[#f5efe7] rounded-[10px] border-2 border-[#e8dcc8] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-56 overflow-hidden">
                    <img src={imgRec3} alt="Beach Read" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h4
                      className="text-[14px] leading-[20px] text-[#2c2416] mb-1"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      Beach Read
                    </h4>
                    <p className="text-[12px] leading-[16px] text-[#6b5d4f] mb-2">Emily Henry</p>
                    <p
                      className="text-[18px] leading-[28px] text-[#4a7c2c]"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      £13.99
                    </p>
                  </div>
                </div>
              </div>

              {/* Book 4 */}
              <div className="px-3">
                <div className="bg-[#f5efe7] rounded-[10px] border-2 border-[#e8dcc8] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-56 overflow-hidden">
                    <img src={imgRec4} alt="The Name of the Wind" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h4
                      className="text-[14px] leading-[20px] text-[#2c2416] mb-1"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      The Name of the Wind
                    </h4>
                    <p className="text-[12px] leading-[16px] text-[#6b5d4f] mb-2">Patrick Rothfuss</p>
                    <p
                      className="text-[18px] leading-[28px] text-[#4a7c2c]"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      £16.99
                    </p>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-[#e8dcc8]">
          <p className="text-[14px] leading-[20px] text-[#6b5d4f]">
            Need help? Contact us at{' '}
            <a href="mailto:support@pageandprose.com" className="text-[#4a7c2c] hover:underline">
              support@pageandprose.com
            </a>{' '}
            or call (123) 456-7890
          </p>
          <p className="text-[12px] leading-[16px] text-[#6b5d4f] mt-2">
            © 2026 Page & Prose. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
