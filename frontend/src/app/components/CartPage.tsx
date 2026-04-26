import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ShoppingCart, User, Trash2, Plus, Minus, Tag, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from '../CartContext';
import { validateDiscount } from '../api';

export function CartPage() {
  const navigate = useNavigate();
  const { items: cartItems, removeItem, updateQuantity } = useCart();

  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number } | null>(null);
  const [discountError, setDiscountError] = useState('');
  const [validatingDiscount, setValidatingDiscount] = useState(false);

  const applyDiscount = async () => {
    const code = discountCode.trim().toUpperCase();
    if (!code) return;
    setDiscountError('');
    setValidatingDiscount(true);
    try {
      const result = await validateDiscount(code, subtotal);
      setAppliedDiscount({ code: result.code, amount: parseFloat(result.amount) });
    } catch (err) {
      setDiscountError(err instanceof Error ? err.message : 'Invalid discount code');
    } finally {
      setValidatingDiscount(false);
    }
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 25000 ? 0 : 2000;
  const discount = appliedDiscount?.amount || 0;
  const total = subtotal + shipping - discount;

  return (
    <div className="min-h-screen bg-[#F5EFE7]">
      {/* Navigation Bar */}
      <nav className="bg-[#FDFBF7] border-b-2 border-[#A68A64] shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-3xl text-[#4A7C2C] font-serif">Page & Prose</h1>
            <div className="flex items-center gap-2 md:gap-4">
              <button onClick={() => navigate('/')} className="px-2 md:px-4 py-2 text-sm md:text-base text-[#4A7C2C] hover:text-[#3d6624] transition-colors flex items-center gap-1 md:gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Continue Shopping</span>
              </button>
              <button className="p-2 md:p-3 bg-[#A68A64] rounded-lg hover:bg-[#8f7556] transition-colors">
                <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 md:py-12">
        <div className="mb-4 md:mb-8">
          <h2 className="text-2xl md:text-3xl text-[#2C2416] font-serif mb-2">Shopping Cart</h2>
          <p className="text-[#6B5D4F]">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-8 md:p-16 text-center">
            <ShoppingCart className="w-20 h-20 text-[#D4C4B0] mx-auto mb-4" />
            <h3 className="text-2xl text-[#2C2416] font-serif mb-2">Your cart is empty</h3>
            <p className="text-[#6B5D4F] mb-6">Add some books to get started!</p>
            <button onClick={() => navigate('/')} className="px-6 py-3 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#3d6624] transition-colors">
              Browse Books
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            {/* Left Side - Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border-2 border-[#D4C4B0] rounded-lg p-6 hover:border-[#A68A64] transition-colors"
                >
                  <div className="flex gap-3 md:gap-6">
                    {/* Book Cover Thumbnail */}
                    <div className="w-16 h-22 md:w-24 md:h-32 flex-shrink-0 rounded-lg overflow-hidden border-2 border-[#E8DCC8]">
                      <ImageWithFallback
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="flex-1">
                        <h3 className="text-base md:text-lg text-[#2C2416] font-serif mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs md:text-sm text-[#6B5D4F] mb-2">by {item.author}</p>
                        <div className="inline-flex items-center px-2 md:px-3 py-1 bg-[#F5EFE7] text-[#6B5D4F] text-xs md:text-sm rounded-full">
                          {item.format}
                        </div>
                      </div>

                      {/* Price and Controls */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 md:mt-4">
                        <div className="text-lg md:text-2xl text-[#4A7C2C] font-serif">
                          {Math.round(item.price).toLocaleString()} XAF
                        </div>

                        <div className="flex items-center gap-2 md:gap-4">
                          {/* Quantity Stepper */}
                          <div className="flex items-center gap-1 md:gap-3 bg-[#F5EFE7] rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-[#E8DCC8] rounded transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3 md:w-4 md:h-4 text-[#4A7C2C]" />
                            </button>
                            <span className="w-6 md:w-8 text-center text-sm text-[#2C2416] font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-[#E8DCC8] rounded transition-colors"
                            >
                              <Plus className="w-3 h-3 md:w-4 md:h-4 text-[#4A7C2C]" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 hover:bg-[#dc2626]/10 rounded-lg transition-colors group"
                            title="Remove from cart"
                          >
                            <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-[#6B5D4F] group-hover:text-[#dc2626] transition-colors" />
                          </button>
                        </div>
                      </div>

                      {/* Item Subtotal */}
                      {item.quantity > 1 && (
                        <div className="mt-1 text-right text-xs md:text-sm text-[#6B5D4F]">
                          Subtotal: {Math.round(item.price * item.quantity).toLocaleString()} XAF
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Free Shipping Banner */}
              {subtotal < 25000 && (
                <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-lg p-4">
                  <p className="text-sm text-[#92400E]">
                    Add <span className="font-semibold">{Math.round(25000 - subtotal).toLocaleString()} XAF</span> more to your order for <span className="font-semibold">FREE shipping!</span>
                  </p>
                  <div className="mt-2 h-2 bg-[#FDE68A] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F59E0B] transition-all duration-300"
                      style={{ width: `${Math.min((subtotal / 25000) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-4 md:p-6 lg:sticky lg:top-8">
                <h3 className="text-xl text-[#2C2416] font-serif mb-6">Order Summary</h3>

                {/* Subtotal */}
                <div className="space-y-3 mb-6 pb-6 border-b-2 border-[#E8DCC8]">
                  <div className="flex justify-between text-[#4A4A4A]">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>{Math.round(subtotal).toLocaleString()} XAF</span>
                  </div>
                  <div className="flex justify-between text-[#4A4A4A]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `${Math.round(shipping).toLocaleString()} XAF`}</span>
                  </div>
                  {appliedDiscount && (
                    <div className="flex justify-between text-[#4A7C2C]">
                      <span className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Discount ({appliedDiscount.code})
                      </span>
                      <span>-{Math.round(discount).toLocaleString()} XAF</span>
                    </div>
                  )}
                </div>

                {/* Discount Code */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#2C2416] mb-2">
                    Discount Code
                  </label>
                  {appliedDiscount ? (
                    <div className="flex items-center justify-between p-3 bg-[#4A7C2C]/10 border border-[#4A7C2C] rounded-lg">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-[#4A7C2C]" />
                        <span className="text-sm font-semibold text-[#4A7C2C]">
                          {appliedDiscount.code}
                        </span>
                      </div>
                      <button
                        onClick={removeDiscount}
                        className="text-xs text-[#4A7C2C] hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => { setDiscountCode(e.target.value); setDiscountError(''); }}
                        onKeyDown={(e) => { if (e.key === 'Enter') applyDiscount(); }}
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416]"
                      />
                      <button
                        onClick={applyDiscount}
                        disabled={validatingDiscount}
                        className="px-4 py-2 bg-[#A68A64] text-white rounded-lg hover:bg-[#8f7556] transition-colors disabled:opacity-60 flex items-center gap-1"
                      >
                        {validatingDiscount ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
                      </button>
                    </div>
                  )}
                  {discountError && (
                    <p className="text-xs text-red-500 mt-1">{discountError}</p>
                  )}
                  <p className="text-xs text-[#6B5D4F] mt-2">
                    Enter a valid discount code to save on your order.
                  </p>
                </div>

                {/* Total */}
                <div className="mb-6 pb-6 border-b-2 border-[#E8DCC8]">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-[#2C2416]">Total</span>
                    <span className="text-2xl font-serif text-[#4A7C2C]">
                      {Math.round(total).toLocaleString()} XAF
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button onClick={() => navigate('/checkout', { state: { discount: appliedDiscount ? { code: appliedDiscount.code, amount: discount } : null } })} className="w-full py-4 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#3d6624] transition-colors flex items-center justify-center gap-2 text-lg font-semibold mb-4">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Security Badge */}
                <div className="text-center">
                  <p className="text-xs text-[#6B5D4F]">
                    🔒 Secure checkout — Mobile Money
                  </p>
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t-2 border-[#E8DCC8] space-y-3 text-sm text-[#6B5D4F]">
                  <p>✓ Free returns within 30 days</p>
                  <p>✓ Free shipping on orders over 25,000 XAF</p>
                  <p>✓ Gift wrapping available at checkout</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
