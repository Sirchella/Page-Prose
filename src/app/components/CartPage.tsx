import { useState } from 'react';
import { ShoppingCart, User, Trash2, Plus, Minus, Tag, ArrowRight, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartItem {
  id: string;
  title: string;
  author: string;
  format: 'Hardback' | 'Paperback' | 'eBook';
  price: number;
  quantity: number;
  coverImage: string;
}

export function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
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
  ]);

  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number } | null>(null);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyDiscount = () => {
    const code = discountCode.trim().toUpperCase();
    if (code === 'WELCOME10') {
      setAppliedDiscount({ code, amount: subtotal * 0.1 });
    } else if (code === 'BOOK20') {
      setAppliedDiscount({ code, amount: subtotal * 0.2 });
    } else {
      alert('Invalid discount code');
    }
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountCode('');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 3.99;
  const discount = appliedDiscount?.amount || 0;
  const total = subtotal + shipping - discount;

  return (
    <div className="min-h-screen bg-[#F5EFE7]">
      {/* Navigation Bar */}
      <nav className="bg-[#FDFBF7] border-b-2 border-[#A68A64] shadow-sm">
        <div className="max-w-[1440px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl text-[#4A7C2C] font-serif">Page & Prose</h1>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-[#4A7C2C] hover:text-[#3d6624] transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </button>
              <button className="p-3 bg-[#A68A64] rounded-lg hover:bg-[#8f7556] transition-colors">
                <User className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl text-[#2C2416] font-serif mb-2">Shopping Cart</h2>
          <p className="text-[#6B5D4F]">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-16 text-center">
            <ShoppingCart className="w-20 h-20 text-[#D4C4B0] mx-auto mb-4" />
            <h3 className="text-2xl text-[#2C2416] font-serif mb-2">Your cart is empty</h3>
            <p className="text-[#6B5D4F] mb-6">Add some books to get started!</p>
            <button className="px-6 py-3 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#3d6624] transition-colors">
              Browse Books
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            {/* Left Side - Cart Items */}
            <div className="col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border-2 border-[#D4C4B0] rounded-lg p-6 hover:border-[#A68A64] transition-colors"
                >
                  <div className="flex gap-6">
                    {/* Book Cover Thumbnail */}
                    <div className="w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden border-2 border-[#E8DCC8]">
                      <ImageWithFallback
                        src={item.coverImage}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1">
                        <h3 className="text-lg text-[#2C2416] font-serif mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#6B5D4F] mb-2">by {item.author}</p>
                        <div className="inline-flex items-center px-3 py-1 bg-[#F5EFE7] text-[#6B5D4F] text-sm rounded-full">
                          {item.format}
                        </div>
                      </div>

                      {/* Price and Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-2xl text-[#4A7C2C] font-serif">
                          £{item.price.toFixed(2)}
                        </div>

                        <div className="flex items-center gap-4">
                          {/* Quantity Stepper */}
                          <div className="flex items-center gap-3 bg-[#F5EFE7] rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-[#E8DCC8] rounded transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4 text-[#4A7C2C]" />
                            </button>
                            <span className="w-8 text-center text-[#2C2416] font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-[#E8DCC8] rounded transition-colors"
                            >
                              <Plus className="w-4 h-4 text-[#4A7C2C]" />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 hover:bg-[#dc2626]/10 rounded-lg transition-colors group"
                            title="Remove from cart"
                          >
                            <Trash2 className="w-5 h-5 text-[#6B5D4F] group-hover:text-[#dc2626] transition-colors" />
                          </button>
                        </div>
                      </div>

                      {/* Item Subtotal */}
                      {item.quantity > 1 && (
                        <div className="mt-2 text-right text-sm text-[#6B5D4F]">
                          Subtotal: £{(item.price * item.quantity).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Free Shipping Banner */}
              {subtotal < 50 && (
                <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-lg p-4">
                  <p className="text-sm text-[#92400E]">
                    Add <span className="font-semibold">£{(50 - subtotal).toFixed(2)}</span> more to your order for <span className="font-semibold">FREE shipping!</span>
                  </p>
                  <div className="mt-2 h-2 bg-[#FDE68A] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F59E0B] transition-all duration-300"
                      style={{ width: `${Math.min((subtotal / 50) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Order Summary */}
            <div className="col-span-1">
              <div className="bg-white border-2 border-[#D4C4B0] rounded-lg p-6 sticky top-8">
                <h3 className="text-xl text-[#2C2416] font-serif mb-6">Order Summary</h3>

                {/* Subtotal */}
                <div className="space-y-3 mb-6 pb-6 border-b-2 border-[#E8DCC8]">
                  <div className="flex justify-between text-[#4A4A4A]">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#4A4A4A]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}</span>
                  </div>
                  {appliedDiscount && (
                    <div className="flex justify-between text-[#4A7C2C]">
                      <span className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Discount ({appliedDiscount.code})
                      </span>
                      <span>-£{discount.toFixed(2)}</span>
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
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416]"
                      />
                      <button
                        onClick={applyDiscount}
                        className="px-4 py-2 bg-[#A68A64] text-white rounded-lg hover:bg-[#8f7556] transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-[#6B5D4F] mt-2">
                    Try: WELCOME10 or BOOK20
                  </p>
                </div>

                {/* Total */}
                <div className="mb-6 pb-6 border-b-2 border-[#E8DCC8]">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-[#2C2416]">Total</span>
                    <span className="text-2xl font-serif text-[#4A7C2C]">
                      £{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full py-4 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#3d6624] transition-colors flex items-center justify-center gap-2 text-lg font-semibold mb-4">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Security Badge */}
                <div className="text-center">
                  <p className="text-xs text-[#6B5D4F]">
                    🔒 Secure checkout powered by Stripe
                  </p>
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t-2 border-[#E8DCC8] space-y-3 text-sm text-[#6B5D4F]">
                  <p>✓ Free returns within 30 days</p>
                  <p>✓ Free shipping on orders over £50</p>
                  <p>✓ Gift wrapping available at checkout</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Books Section */}
        {cartItems.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl text-[#2C2416] font-serif mb-6">You Might Also Like</h3>
            <div className="grid grid-cols-4 gap-6">
              {[
                {
                  title: 'Educated',
                  author: 'Tara Westover',
                  price: 14.99,
                  image: 'https://images.unsplash.com/photo-1769963121626-7f1885db412c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9ncmFwaHklMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzczMzMxODY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
                },
                {
                  title: 'Atomic Habits',
                  author: 'James Clear',
                  price: 13.99,
                  image: 'https://images.unsplash.com/photo-1632847933603-677959bb8ccb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3NzMzMjU5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
                },
                {
                  title: 'Beach Read',
                  author: 'Emily Henry',
                  price: 13.99,
                  image: 'https://images.unsplash.com/photo-1711185898226-beea7eee0611?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbmNlJTIwbm92ZWwlMjBib29rJTIwY292ZXJ8ZW58MXx8fHwxNzczMzk0ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
                },
                {
                  title: 'The Name of the Wind',
                  author: 'Patrick Rothfuss',
                  price: 15.99,
                  image: 'https://images.unsplash.com/photo-1711185892188-13f35959d3ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwYm9vayUyMGNvdmVyfGVufDF8fHx8MTc3MzM3OTYzNnww&ixlib=rb-4.1.0&q=80&w=1080',
                },
              ].map((book, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-[#E8DCC8] rounded-lg overflow-hidden hover:border-[#A68A64] hover:shadow-lg transition-all group cursor-pointer"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <ImageWithFallback
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-serif text-[#2C2416] mb-1 line-clamp-2">
                      {book.title}
                    </h4>
                    <p className="text-xs text-[#6B5D4F] mb-2">{book.author}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-serif text-[#4A7C2C]">
                        £{book.price.toFixed(2)}
                      </span>
                      <button className="p-2 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#3d6624] transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
