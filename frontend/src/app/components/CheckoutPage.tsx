import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Truck, MapPin, Lock, Check, Smartphone, Loader2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { createOrder, initiatePayment, checkPaymentStatus } from '../api';
import { useCart } from '../CartContext';

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
type PaymentStatus = 'idle' | 'waiting' | 'failed';

export function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items: cartItems, clearCart } = useCart();
  const locationDiscount = (location.state as { discount?: { code: string; amount: number } | null } | null)?.discount ?? null;
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('standard');
  const pollingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Shipping form
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    country: 'Cameroon',
  });

  // Validation errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Payment state
  const [momoPhone, setMomoPhone] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [paymentError, setPaymentError] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);

  const orderItems: OrderItem[] = cartItems;

  const deliveryOptions = [
    { id: 'standard' as DeliveryMethod, name: 'Standard Delivery', price: 500, description: '5-7 business days' },
    { id: 'express' as DeliveryMethod, name: 'Express Delivery', price: 1000, description: '2-3 business days' },
    { id: 'nextday' as DeliveryMethod, name: 'Next Day Delivery', price: 2000, description: 'Order by 2pm' },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryPrice = deliveryOptions.find(d => d.id === deliveryMethod)?.price || 0;
  const discountAmount = locationDiscount?.amount ?? 0;
  const total = subtotal + deliveryPrice - discountAmount;

  // Clean up polling on unmount
  useEffect(() => () => { if (pollingRef.current) clearTimeout(pollingRef.current); }, []);

  const handleNextStep = () => {
    if (currentStep === 1) {
      const errors: Record<string, string> = {};
      if (!shippingData.firstName.trim()) errors.firstName = 'First name is required';
      if (!shippingData.lastName.trim()) errors.lastName = 'Last name is required';
      if (!shippingData.email.trim()) errors.email = 'Email address is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingData.email)) errors.email = 'Please enter a valid email address';
      if (!shippingData.phone.trim()) errors.phone = 'Phone number is required';
      if (!shippingData.address.trim()) errors.address = 'Street address is required';
      if (!shippingData.city.trim()) errors.city = 'City is required';
      if (Object.keys(errors).length > 0) { setFieldErrors(errors); return; }
      setFieldErrors({});
    }
    if (currentStep === 2) {
      if (!deliveryMethod) { setFieldErrors({ delivery: 'Please select a delivery method' }); return; }
      setFieldErrors({});
    }
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };
  const handlePreviousStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  const handlePlaceOrder = async () => {
    setPaymentError('');
    setPlacingOrder(true);

    // Normalise phone: strip spaces/dashes, ensure 237 prefix
    const rawPhone = momoPhone.replace(/[\s\-()]/g, '');
    const phone = rawPhone.startsWith('237') ? rawPhone : `237${rawPhone.replace(/^0/, '')}`;

    if (phone.length < 12) {
      setPaymentError('Please enter a valid Cameroon phone number (e.g. 6XXXXXXXX).');
      setPlacingOrder(false);
      return;
    }

    try {
      const { reference } = await initiatePayment({
        phone,
        amount: Math.round(total),
        description: `Page & Prose — ${orderItems.length} item(s)`,
      });

      setPaymentStatus('waiting');

      // Poll every 5 s for up to 2 minutes
      let attempts = 0;
      const maxAttempts = 24;

      const poll = async () => {
        try {
          const { status } = await checkPaymentStatus(reference);

          if (status === 'SUCCESSFUL') {
            const shippingAddress = `${shippingData.address}, ${shippingData.city}, ${shippingData.postcode}, ${shippingData.country}`;
            const createdOrder = await createOrder({
              customer_name: `${shippingData.firstName} ${shippingData.lastName}`.trim(),
              customer_email: shippingData.email,
              shipping_address: shippingAddress,
              total_price: total.toFixed(2),
              items: orderItems.map(item => ({
                book: parseInt(item.id),
                quantity: item.quantity,
                price: item.price.toFixed(2),
              })),
            });
            clearCart();
            navigate('/order-confirmation', {
              state: {
                orderId: createdOrder.id,
                customerName: `${shippingData.firstName} ${shippingData.lastName}`.trim(),
                customerEmail: shippingData.email,
                shippingAddress,
                total,
                items: orderItems,
              },
            });
          } else if (status === 'FAILED') {
            setPaymentError('Payment was declined or cancelled. Please try again.');
            setPaymentStatus('failed');
            setPlacingOrder(false);
          } else if (attempts < maxAttempts) {
            attempts++;
            pollingRef.current = setTimeout(poll, 5000);
          } else {
            setPaymentError('Payment timed out. Please try again or contact support.');
            setPaymentStatus('failed');
            setPlacingOrder(false);
          }
        } catch {
          setPaymentError('Could not verify payment status. Please check your order history.');
          setPaymentStatus('failed');
          setPlacingOrder(false);
        }
      };

      pollingRef.current = setTimeout(poll, 5000);
    } catch (err: unknown) {
      setPaymentError(err instanceof Error ? err.message : 'Failed to initiate payment. Please try again.');
      setPaymentStatus('idle');
      setPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE7]">
      {/* Navigation */}
      <nav className="bg-[#FDFBF7] border-b-2 border-[#A68A64] shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-3xl text-[#4A7C2C] font-serif">Page & Prose</h1>
          <button onClick={() => navigate('/cart')} className="px-3 md:px-4 py-2 text-sm md:text-base text-[#4A7C2C] hover:text-[#3d6624] transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </button>
        </div>
      </nav>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 md:py-12">
        <h2 className="text-2xl md:text-3xl text-[#2C2416] font-serif mb-4 md:mb-8">Secure Checkout</h2>

        {/* Progress Steps */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: 'Shipping', icon: MapPin },
              { step: 2, label: 'Delivery', icon: Truck },
              { step: 3, label: 'Payment', icon: Smartphone },
            ].map((item, index) => {
              const Icon = item.icon;
              const isActive = currentStep === item.step;
              const isCompleted = currentStep > item.step;
              return (
                <div key={item.step} className="flex items-center flex-1">
                  <div className="flex items-center gap-1 md:gap-3">
                    <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all flex-shrink-0 ${isCompleted ? 'bg-[#4A7C2C] border-[#4A7C2C]' : isActive ? 'bg-white border-[#4A7C2C]' : 'bg-white border-[#D4C4B0]'}`}>
                      {isCompleted ? <Check className="w-4 h-4 md:w-6 md:h-6 text-white" /> : <Icon className={`w-4 h-4 md:w-6 md:h-6 ${isActive ? 'text-[#4A7C2C]' : 'text-[#D4C4B0]'}`} />}
                    </div>
                    <div className="hidden sm:block">
                      <div className={`text-xs md:text-sm font-semibold ${isActive || isCompleted ? 'text-[#4A7C2C]' : 'text-[#6B5D4F]'}`}>Step {item.step}</div>
                      <div className={`text-xs ${isActive || isCompleted ? 'text-[#2C2416]' : 'text-[#6B5D4F]'}`}>{item.label}</div>
                    </div>
                  </div>
                  {index < 2 && <div className={`flex-1 h-0.5 mx-2 md:mx-4 ${isCompleted ? 'bg-[#4A7C2C]' : 'bg-[#D4C4B0]'}`} />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          {/* Left Column — Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-4 md:p-8">

              {/* Step 1: Shipping */}
              {currentStep === 1 && (
                <div>
                  <h3 className="text-2xl text-[#2C2416] font-serif mb-6">Shipping Address</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#2C2416] mb-2">First Name *</label>
                        <input type="text" value={shippingData.firstName} onChange={e => { setShippingData({ ...shippingData, firstName: e.target.value }); setFieldErrors(p => ({ ...p, firstName: '' })); }} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416] ${fieldErrors.firstName ? 'border-red-400' : 'border-[#D4C4B0]'}`} placeholder="Jean" />
                        {fieldErrors.firstName && <p className="text-red-500 text-xs mt-1">{fieldErrors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#2C2416] mb-2">Last Name *</label>
                        <input type="text" value={shippingData.lastName} onChange={e => { setShippingData({ ...shippingData, lastName: e.target.value }); setFieldErrors(p => ({ ...p, lastName: '' })); }} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416] ${fieldErrors.lastName ? 'border-red-400' : 'border-[#D4C4B0]'}`} placeholder="Mbarga" />
                        {fieldErrors.lastName && <p className="text-red-500 text-xs mt-1">{fieldErrors.lastName}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#2C2416] mb-2">Email Address *</label>
                      <input type="email" value={shippingData.email} onChange={e => { setShippingData({ ...shippingData, email: e.target.value }); setFieldErrors(p => ({ ...p, email: '' })); }} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416] ${fieldErrors.email ? 'border-red-400' : 'border-[#D4C4B0]'}`} placeholder="jean@example.com" />
                      {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#2C2416] mb-2">Phone Number *</label>
                      <input type="tel" value={shippingData.phone} onChange={e => { setShippingData({ ...shippingData, phone: e.target.value }); setFieldErrors(p => ({ ...p, phone: '' })); }} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416] ${fieldErrors.phone ? 'border-red-400' : 'border-[#D4C4B0]'}`} placeholder="+237 6XX XXX XXX" />
                      {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#2C2416] mb-2">Street Address *</label>
                      <input type="text" value={shippingData.address} onChange={e => { setShippingData({ ...shippingData, address: e.target.value }); setFieldErrors(p => ({ ...p, address: '' })); }} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416] ${fieldErrors.address ? 'border-red-400' : 'border-[#D4C4B0]'}`} placeholder="Rue Joffre, Akwa" />
                      {fieldErrors.address && <p className="text-red-500 text-xs mt-1">{fieldErrors.address}</p>}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#2C2416] mb-2">City *</label>
                        <input type="text" value={shippingData.city} onChange={e => { setShippingData({ ...shippingData, city: e.target.value }); setFieldErrors(p => ({ ...p, city: '' })); }} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416] ${fieldErrors.city ? 'border-red-400' : 'border-[#D4C4B0]'}`} placeholder="Douala" />
                        {fieldErrors.city && <p className="text-red-500 text-xs mt-1">{fieldErrors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#2C2416] mb-2">Postal Code</label>
                        <input type="text" value={shippingData.postcode} onChange={e => setShippingData({ ...shippingData, postcode: e.target.value })} className="w-full px-4 py-3 border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416]" placeholder="BP 1234" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#2C2416] mb-2">Country *</label>
                      <select value={shippingData.country} onChange={e => setShippingData({ ...shippingData, country: e.target.value })} className="w-full px-4 py-3 border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416]">
                        <option>Cameroon</option>
                        <option>Nigeria</option>
                        <option>Ghana</option>
                        <option>Senegal</option>
                        <option>Côte d'Ivoire</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Delivery */}
              {currentStep === 2 && (
                <div>
                  <h3 className="text-2xl text-[#2C2416] font-serif mb-6">Delivery Method</h3>
                  <div className="space-y-4">
                    {fieldErrors.delivery && <p className="text-red-500 text-sm font-medium">{fieldErrors.delivery}</p>}
                    {deliveryOptions.map(option => (
                      <button key={option.id} onClick={() => setDeliveryMethod(option.id)} className={`w-full p-5 border-2 rounded-lg transition-all text-left ${deliveryMethod === option.id ? 'border-[#4A7C2C] bg-[#4A7C2C]/5' : 'border-[#D4C4B0] hover:border-[#A68A64]'}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-4">
                            <div className={`w-6 h-6 rounded-full border-2 mt-1 flex items-center justify-center ${deliveryMethod === option.id ? 'border-[#4A7C2C] bg-[#4A7C2C]' : 'border-[#D4C4B0]'}`}>
                              {deliveryMethod === option.id && <div className="w-3 h-3 bg-white rounded-full" />}
                            </div>
                            <div>
                              <div className="text-lg font-semibold text-[#2C2416] mb-1">{option.name}</div>
                              <div className="text-sm text-[#6B5D4F]">{option.description}</div>
                            </div>
                          </div>
                          <div className="text-xl font-serif text-[#4A7C2C]">{option.price.toLocaleString()} XAF</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 p-4 bg-[#F5EFE7] border border-[#E8DCC8] rounded-lg">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#4A7C2C] mt-1" />
                      <div>
                        <div className="text-sm font-semibold text-[#2C2416] mb-1">Delivering to:</div>
                        <div className="text-sm text-[#6B5D4F]">
                          {shippingData.firstName} {shippingData.lastName}<br />
                          {shippingData.address}<br />
                          {shippingData.city}{shippingData.postcode ? `, ${shippingData.postcode}` : ''}<br />
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
                  <h3 className="text-2xl text-[#2C2416] font-serif mb-6">Mobile Money Payment</h3>

                  {paymentStatus === 'waiting' ? (
                    /* Waiting for user to confirm on phone */
                    <div className="text-center py-8 space-y-6">
                      <div className="flex justify-center">
                        <div className="w-20 h-20 rounded-full bg-[#4A7C2C]/10 flex items-center justify-center">
                          <Loader2 className="w-10 h-10 text-[#4A7C2C] animate-spin" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-[#2C2416] mb-2">Check your phone</h4>
                        <p className="text-[#6B5D4F] mb-1">A payment prompt has been sent to</p>
                        <p className="text-lg font-semibold text-[#4A7C2C]">{momoPhone}</p>
                      </div>
                      <div className="p-4 bg-[#F5EFE7] border border-[#E8DCC8] rounded-lg text-sm text-[#6B5D4F]">
                        Enter your Mobile Money PIN to confirm the payment of{' '}
                        <span className="font-semibold text-[#2C2416]">{Math.round(total).toLocaleString()} XAF</span>.
                        This page will update automatically once confirmed.
                      </div>
                      <button
                        onClick={() => { setPaymentStatus('idle'); setPlacingOrder(false); if (pollingRef.current) clearTimeout(pollingRef.current); }}
                        className="text-sm text-[#A68A64] hover:text-[#8f7556] underline"
                      >
                        Cancel and try again
                      </button>
                    </div>
                  ) : (
                    /* Phone number input */
                    <div className="space-y-6">
                      {/* MTN / Orange badges */}
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                          <div className="w-3 h-3 rounded-full bg-yellow-400" />
                          <span className="text-sm font-semibold text-yellow-800">MTN Mobile Money</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 border-2 border-orange-300 rounded-lg">
                          <div className="w-3 h-3 rounded-full bg-orange-500" />
                          <span className="text-sm font-semibold text-orange-800">Orange Money</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-[#2C2416] mb-2">
                          Mobile Money Phone Number *
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-4 border-2 border-r-0 border-[#D4C4B0] rounded-l-lg bg-[#F5EFE7] text-[#6B5D4F] text-sm font-medium">+237</span>
                          <input
                            type="tel"
                            value={momoPhone}
                            onChange={e => setMomoPhone(e.target.value)}
                            className="flex-1 px-4 py-3 border-2 border-[#D4C4B0] rounded-r-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416]"
                            placeholder="6XX XXX XXX"
                            maxLength={13}
                          />
                        </div>
                        <p className="text-xs text-[#6B5D4F] mt-1">Enter the number registered with MTN MoMo or Orange Money</p>
                      </div>

                      {paymentError && (
                        <div className="px-4 py-3 bg-red-50 border-2 border-red-200 rounded-lg text-sm text-red-700">
                          {paymentError}
                        </div>
                      )}

                      <div className="p-4 bg-[#F5EFE7] border border-[#E8DCC8] rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-[#6B5D4F]">
                          <Lock className="w-4 h-4 text-[#4A7C2C]" />
                          You will receive a prompt on your phone to confirm with your PIN
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              {paymentStatus !== 'waiting' && (
                <div className="flex justify-between mt-8 pt-6 border-t-2 border-[#E8DCC8]">
                  <button
                    onClick={handlePreviousStep}
                    disabled={currentStep === 1}
                    className={`px-6 py-3 border-2 rounded-lg transition-colors flex items-center gap-2 ${currentStep === 1 ? 'border-[#E8DCC8] text-[#D4C4B0] cursor-not-allowed' : 'border-[#A68A64] text-[#A68A64] hover:bg-[#A68A64] hover:text-white'}`}
                  >
                    <ArrowLeft className="w-4 h-4" /> Previous
                  </button>

                  {currentStep < 3 ? (
                    <button onClick={handleNextStep} className="px-6 py-3 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#3d6624] transition-colors">
                      Continue
                    </button>
                  ) : (
                    <button
                      onClick={handlePlaceOrder}
                      disabled={placingOrder}
                      className="px-8 py-3 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#3d6624] transition-colors flex items-center gap-2 text-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Lock className="w-5 h-5" />
                      {placingOrder ? 'Sending prompt...' : 'Pay with Mobile Money'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column — Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-4 md:p-6 lg:sticky lg:top-8">
              <h3 className="text-xl text-[#2C2416] font-serif mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 pb-6 border-b-2 border-[#E8DCC8]">
                {orderItems.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-20 flex-shrink-0 rounded overflow-hidden border border-[#E8DCC8]">
                      <ImageWithFallback src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-serif text-[#2C2416] mb-1 truncate">{item.title}</h4>
                      <p className="text-xs text-[#6B5D4F] mb-1">{item.author}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#6B5D4F]">{item.format} × {item.quantity}</span>
                        <span className="text-sm font-semibold text-[#4A7C2C]">{(item.price * item.quantity).toLocaleString()} XAF</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b-2 border-[#E8DCC8]">
                <div className="flex justify-between text-[#4A4A4A]">
                  <span>Subtotal</span>
                  <span>{subtotal.toLocaleString()} XAF</span>
                </div>
                <div className="flex justify-between text-[#4A4A4A]">
                  <span>Delivery</span>
                  <span>{currentStep >= 2 ? `${deliveryPrice.toLocaleString()} XAF` : 'TBD'}</span>
                </div>
                {locationDiscount && (
                  <div className="flex justify-between text-[#4A7C2C]">
                    <span>Discount ({locationDiscount.code})</span>
                    <span>-{Math.round(discountAmount).toLocaleString()} XAF</span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[#2C2416]">Total</span>
                  <span className="text-2xl font-serif text-[#4A7C2C]">{Math.round(total).toLocaleString()} XAF</span>
                </div>
              </div>

              <div className="p-3 bg-[#F5EFE7] rounded-lg">
                <div className="flex items-center gap-2 text-xs text-[#6B5D4F] mb-2">
                  <Lock className="w-3 h-3 text-[#4A7C2C]" />
                  Secure Mobile Money Payment
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
