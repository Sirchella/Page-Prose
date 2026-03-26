import { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, MapPin, Lock, Check } from 'lucide-react';
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

type DeliveryMethod = 'standard' | 'express' | 'nextday';
type PaymentMethod = 'stripe' | 'paypal';

export function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');

  // Form data
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    country: 'United Kingdom',
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
  });

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

  const deliveryOptions = [
    {
      id: 'standard' as DeliveryMethod,
      name: 'Standard Delivery',
      price: 3.99,
      description: '5-7 business days',
      estimatedDate: 'March 20-22, 2026',
    },
    {
      id: 'express' as DeliveryMethod,
      name: 'Express Delivery',
      price: 7.99,
      description: '2-3 business days',
      estimatedDate: 'March 17-18, 2026',
    },
    {
      id: 'nextday' as DeliveryMethod,
      name: 'Next Day Delivery',
      price: 12.99,
      description: 'Order by 2pm',
      estimatedDate: 'March 14, 2026',
    },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const selectedDelivery = deliveryOptions.find(d => d.id === deliveryMethod);
  const deliveryPrice = selectedDelivery?.price || 0;
  const total = subtotal + deliveryPrice;

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = () => {
    alert('Order placed successfully! This is a demo.');
  };

  return (
    <div className="min-h-screen bg-[#F5EFE7]">
      {/* Navigation Bar */}
      <nav className="bg-[#FDFBF7] border-b-2 border-[#A68A64] shadow-sm">
        <div className="max-w-[1440px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl text-[#4A7C2C] font-serif">Page & Prose</h1>
            <button className="px-4 py-2 text-[#4A7C2C] hover:text-[#3d6624] transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-8 py-12">
        <h2 className="text-3xl text-[#2C2416] font-serif mb-8">Secure Checkout</h2>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl">
            {[
              { step: 1, label: 'Shipping', icon: MapPin },
              { step: 2, label: 'Delivery', icon: Truck },
              { step: 3, label: 'Payment', icon: CreditCard },
            ].map((item, index) => {
              const Icon = item.icon;
              const isActive = currentStep === item.step;
              const isCompleted = currentStep > item.step;

              return (
                <div key={item.step} className="flex items-center flex-1">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        isCompleted
                          ? 'bg-[#4A7C2C] border-[#4A7C2C]'
                          : isActive
                          ? 'bg-white border-[#4A7C2C]'
                          : 'bg-white border-[#D4C4B0]'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6 text-white" />
                      ) : (
                        <Icon
                          className={`w-6 h-6 ${
                            isActive ? 'text-[#4A7C2C]' : 'text-[#D4C4B0]'
                          }`}
                        />
                      )}
                    </div>
                    <div>
                      <div
                        className={`text-sm font-semibold ${
                          isActive || isCompleted ? 'text-[#4A7C2C]' : 'text-[#6B5D4F]'
                        }`}
                      >
                        Step {item.step}
                      </div>
                      <div
                        className={`text-xs ${
                          isActive || isCompleted ? 'text-[#2C2416]' : 'text-[#6B5D4F]'
                        }`}
                      >
                        {item.label}
                      </div>
                    </div>
                  </div>
                  {index < 2 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        isCompleted ? 'bg-[#4A7C2C]' : 'bg-[#D4C4B0]'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="col-span-2">
            <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-8">
              {/* Step 1: Shipping Address */}
              {currentStep === 1 && (
                <div>
                  <h3 className="text-2xl text-[#2C2416] font-serif mb-6">
                    Shipping Address
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#2C2416] mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={shippingData.firstName}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, firstName: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416]"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#2C2416] mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={shippingData.lastName}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, lastName: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416]"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#2C2416] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={shippingData.email}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416]"
                        placeholder="john.doe@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#2C2416] mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={shippingData.phone}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416]"
                        placeholder="+44 7700 900000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#2C2416] mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        value={shippingData.address}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, address: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416]"
                        placeholder="123 High Street"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#2C2416] mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          value={shippingData.city}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, city: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416]"
                          placeholder="London"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#2C2416] mb-2">
                          Postcode *
                        </label>
                        <input
                          type="text"
                          value={shippingData.postcode}
                          onChange={(e) =>
                            setShippingData({ ...shippingData, postcode: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416]"
                          placeholder="SW1A 1AA"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#2C2416] mb-2">
                        Country *
                      </label>
                      <select
                        value={shippingData.country}
                        onChange={(e) =>
                          setShippingData({ ...shippingData, country: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416]"
                      >
                        <option>United Kingdom</option>
                        <option>Ireland</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Australia</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Delivery Method */}
              {currentStep === 2 && (
                <div>
                  <h3 className="text-2xl text-[#2C2416] font-serif mb-6">
                    Delivery Method
                  </h3>
                  <div className="space-y-4">
                    {deliveryOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setDeliveryMethod(option.id)}
                        className={`w-full p-5 border-2 rounded-lg transition-all text-left ${
                          deliveryMethod === option.id
                            ? 'border-[#4A7C2C] bg-[#4A7C2C]/5'
                            : 'border-[#D4C4B0] hover:border-[#A68A64]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-6 h-6 rounded-full border-2 mt-1 flex items-center justify-center ${
                                deliveryMethod === option.id
                                  ? 'border-[#4A7C2C] bg-[#4A7C2C]'
                                  : 'border-[#D4C4B0]'
                              }`}
                            >
                              {deliveryMethod === option.id && (
                                <div className="w-3 h-3 bg-white rounded-full" />
                              )}
                            </div>
                            <div>
                              <div className="text-lg font-semibold text-[#2C2416] mb-1">
                                {option.name}
                              </div>
                              <div className="text-sm text-[#6B5D4F] mb-1">
                                {option.description}
                              </div>
                              <div className="text-sm text-[#4A7C2C]">
                                Estimated delivery: {option.estimatedDate}
                              </div>
                            </div>
                          </div>
                          <div className="text-xl font-serif text-[#4A7C2C]">
                            £{option.price.toFixed(2)}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Delivery Address Summary */}
                  <div className="mt-8 p-4 bg-[#F5EFE7] border border-[#E8DCC8] rounded-lg">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#4A7C2C] mt-1" />
                      <div>
                        <div className="text-sm font-semibold text-[#2C2416] mb-1">
                          Delivering to:
                        </div>
                        <div className="text-sm text-[#6B5D4F]">
                          {shippingData.firstName} {shippingData.lastName}
                          <br />
                          {shippingData.address}
                          <br />
                          {shippingData.city}, {shippingData.postcode}
                          <br />
                          {shippingData.country}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div>
                  <h3 className="text-2xl text-[#2C2416] font-serif mb-6">
                    Payment Details
                  </h3>

                  {/* Payment Method Toggle */}
                  <div className="mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setPaymentMethod('stripe')}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          paymentMethod === 'stripe'
                            ? 'border-[#4A7C2C] bg-[#4A7C2C]/5'
                            : 'border-[#D4C4B0] hover:border-[#A68A64]'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <CreditCard className="w-5 h-5 text-[#4A7C2C]" />
                          <span className="font-semibold text-[#2C2416]">
                            Credit/Debit Card
                          </span>
                        </div>
                      </button>
                      <button
                        onClick={() => setPaymentMethod('paypal')}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          paymentMethod === 'paypal'
                            ? 'border-[#4A7C2C] bg-[#4A7C2C]/5'
                            : 'border-[#D4C4B0] hover:border-[#A68A64]'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-semibold text-[#2C2416]">PayPal</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {paymentMethod === 'stripe' ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#2C2416] mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          value={paymentData.cardNumber}
                          onChange={(e) =>
                            setPaymentData({ ...paymentData, cardNumber: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416]"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-[#2C2416] mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            value={paymentData.expiry}
                            onChange={(e) =>
                              setPaymentData({ ...paymentData, expiry: e.target.value })
                            }
                            className="w-full px-4 py-3 border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416]"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-[#2C2416] mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            value={paymentData.cvv}
                            onChange={(e) =>
                              setPaymentData({ ...paymentData, cvv: e.target.value })
                            }
                            className="w-full px-4 py-3 border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416]"
                            placeholder="123"
                            maxLength={4}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#2C2416] mb-2">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          value={paymentData.nameOnCard}
                          onChange={(e) =>
                            setPaymentData({ ...paymentData, nameOnCard: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416]"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="p-4 bg-[#F5EFE7] border border-[#E8DCC8] rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-[#6B5D4F]">
                          <Lock className="w-4 h-4 text-[#4A7C2C]" />
                          Your payment information is encrypted and secure
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 bg-[#F5EFE7] border-2 border-[#E8DCC8] rounded-lg text-center">
                      <div className="mb-4">
                        <div className="text-4xl mb-2">💳</div>
                        <h4 className="text-lg font-semibold text-[#2C2416] mb-2">
                          PayPal Checkout
                        </h4>
                        <p className="text-sm text-[#6B5D4F] mb-4">
                          You'll be redirected to PayPal to complete your purchase securely.
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#0070BA] text-white rounded-lg">
                        <span className="font-semibold">Continue with PayPal</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t-2 border-[#E8DCC8]">
                <button
                  onClick={handlePreviousStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 border-2 rounded-lg transition-colors flex items-center gap-2 ${
                    currentStep === 1
                      ? 'border-[#E8DCC8] text-[#D4C4B0] cursor-not-allowed'
                      : 'border-[#A68A64] text-[#A68A64] hover:bg-[#A68A64] hover:text-white'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>

                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#3d6624] transition-colors"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    className="px-8 py-3 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#3d6624] transition-colors flex items-center gap-2 text-lg font-semibold"
                  >
                    <Lock className="w-5 h-5" />
                    Place Order
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="col-span-1">
            <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-6 sticky top-8">
              <h3 className="text-xl text-[#2C2416] font-serif mb-6">Order Summary</h3>

              {/* Order Items */}
              <div className="space-y-4 mb-6 pb-6 border-b-2 border-[#E8DCC8]">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-20 flex-shrink-0 rounded overflow-hidden border border-[#E8DCC8]">
                      <ImageWithFallback
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-serif text-[#2C2416] mb-1 truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#6B5D4F] mb-1">{item.author}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#6B5D4F]">
                          {item.format} × {item.quantity}
                        </span>
                        <span className="text-sm font-semibold text-[#4A7C2C]">
                          £{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b-2 border-[#E8DCC8]">
                <div className="flex justify-between text-[#4A4A4A]">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#4A4A4A]">
                  <span>Delivery</span>
                  <span>
                    {currentStep >= 2 ? `£${deliveryPrice.toFixed(2)}` : 'TBD'}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[#2C2416]">Total</span>
                  <span className="text-2xl font-serif text-[#4A7C2C]">
                    £{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Security Info */}
              <div className="p-3 bg-[#F5EFE7] rounded-lg">
                <div className="flex items-center gap-2 text-xs text-[#6B5D4F] mb-2">
                  <Lock className="w-3 h-3 text-[#4A7C2C]" />
                  SSL Encrypted Payment
                </div>
                <div className="flex items-center gap-2 text-xs text-[#6B5D4F]">
                  <Check className="w-3 h-3 text-[#4A7C2C]" />
                  30-Day Money Back Guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
