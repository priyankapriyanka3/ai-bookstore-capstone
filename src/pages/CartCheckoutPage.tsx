import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, Sparkles, Check, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BookCover } from '../components/BookCover';
import { PaymentModal } from '../components/PaymentModal';
import { OrderSuccessModal } from '../components/OrderSuccessModal';
import { Order } from '../types';

export const CartCheckoutPage: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    tax,
    totalDiscount,
    grandTotal,
    couponCode,
    applyCoupon,
    removeCoupon,
    useSavedAddress,
    setUseSavedAddress,
    address,
    setAddress,
    user,
    isRedeemingPoints,
    toggleRedeemPoints
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponMessage({ type: 'success', text: res.message });
    } else {
      setCouponMessage({ type: 'error', text: res.message });
    }
  };

  const handleAddressChange = (field: keyof typeof address, value: string) => {
    setAddress({
      ...address,
      [field]: value
    });
  };

  const handlePaymentSuccess = (order: Order) => {
    setIsPaymentModalOpen(false);
    setCompletedOrder(order);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Breadcrumb Navigation matching Screenshot 12 */}
      <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-6 font-medium flex-wrap">
        <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
        <span>/</span>
        <span>Non-Fiction</span>
        <span>/</span>
        <span>Self Help</span>
        <span>/</span>
        <span>Joy of Minimalism</span>
        <span>/</span>
        <span>Checkout</span>
        <span>/</span>
        <span className="text-cyan-400 font-semibold">Shopping Cart</span>
      </nav>

      {cart.length === 0 && !completedOrder ? (
        <div className="bg-[#161B22] border border-[#272E3B] rounded-xl p-12 text-center max-w-lg mx-auto">
          <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-white mb-2">Your Shopping Cart is Empty</h2>
          <p className="text-xs text-gray-400 mb-6">
            Looks like you haven't added any books to your cart yet. Explore our curated catalogue and find your next favorite read.
          </p>
          <Link
            to="/"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-semibold inline-flex items-center gap-2 shadow-lg transition-colors"
          >
            <span>Explore Catalogue</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Top Section: Shopping Cart Items List matching Screenshot 12 */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white tracking-wide">
              Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cart.map(item => (
                <div
                  key={item.book.id}
                  className="bg-[#161B22] border border-[#272E3B] rounded-xl p-4 flex gap-4 items-center justify-between shadow-sm relative group"
                >
                  <div className="flex gap-4 items-center min-w-0">
                    <div className="flex-shrink-0">
                      <BookCover book={item.book} size="md" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-white truncate">
                        {item.book.title}
                      </h4>
                      <p className="text-xs text-cyan-400 font-medium">
                        by {item.book.author}
                      </p>
                      <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                        {item.book.quote || item.book.description}
                      </p>
                      
                      <div className="mt-1 text-[10px] text-gray-400">
                        <span className="text-gray-300 font-medium">{item.book.format}</span>
                        <span className="mx-1">•</span>
                        <span>{item.book.category}</span>
                      </div>

                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-base font-extrabold text-white">
                          ₹{item.book.price}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {item.book.deliveryDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Delete Controls */}
                  <div className="flex flex-col items-end justify-between self-stretch pl-2 border-l border-gray-800">
                    <button
                      onClick={() => removeFromCart(item.book.id)}
                      className="text-gray-500 hover:text-red-400 p-1 rounded transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center border border-[#272E3B] rounded-md bg-[#0F1217] overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                        className="px-2 py-1 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-white select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                        className="px-2 py-1 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section: Address (Left) & Grand Total (Right) matching Screenshot 12 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Address Form (7 cols) */}
            <div className="lg:col-span-7 bg-[#161B22] border border-[#272E3B] rounded-xl p-5 md:p-6 shadow-md">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-800">
                <h3 className="text-base font-bold text-white">
                  Address
                </h3>

                {/* Checkbox Use Saved Address matching Screenshot 12 */}
                <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                  <input
                    type="checkbox"
                    checked={useSavedAddress}
                    onChange={e => setUseSavedAddress(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#0F1217] border-gray-700 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <span>Use Saved Address</span>
                </label>
              </div>

              {/* Form Grid */}
              <div className="space-y-4">
                
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={address.firstName}
                      onChange={e => handleAddressChange('firstName', e.target.value)}
                      placeholder="First Name"
                      className="w-full bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={address.lastName}
                      onChange={e => handleAddressChange('lastName', e.target.value)}
                      placeholder="Last Name"
                      className="w-full bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Address Line 1 & Line 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={address.addressLine1}
                      onChange={e => handleAddressChange('addressLine1', e.target.value)}
                      placeholder="Street address, apartment, suite"
                      className="w-full bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      value={address.addressLine2 || ''}
                      onChange={e => handleAddressChange('addressLine2', e.target.value)}
                      placeholder="Landmark, area"
                      className="w-full bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* E-mail, City, Pin */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1">
                      e-mail
                    </label>
                    <input
                      type="email"
                      value={address.email}
                      onChange={e => handleAddressChange('email', e.target.value)}
                      placeholder="e-mail"
                      className="w-full bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={e => handleAddressChange('city', e.target.value)}
                      placeholder="City"
                      className="w-full bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1">
                      Pin
                    </label>
                    <input
                      type="text"
                      value={address.pin}
                      onChange={e => handleAddressChange('pin', e.target.value)}
                      placeholder="000000"
                      className="w-full bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>

                {/* Phone Number, State, Country */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1">
                      Phone Number
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 rounded-l-md border border-r-0 border-[#272E3B] bg-[#12161D] text-gray-400 text-xs">
                        +91
                      </span>
                      <input
                        type="text"
                        value={address.phone}
                        onChange={e => handleAddressChange('phone', e.target.value)}
                        placeholder="12345567890"
                        className="w-full bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-r-md px-3 py-2 focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={e => handleAddressChange('state', e.target.value)}
                      placeholder="State"
                      className="w-full bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1">
                      Country
                    </label>
                    <select
                      value={address.country}
                      onChange={e => handleAddressChange('country', e.target.value)}
                      className="w-full bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Grand Total Card (5 cols) matching Screenshot 12 */}
            <div className="lg:col-span-5 bg-[#161B22] border border-[#272E3B] rounded-xl p-5 md:p-6 shadow-md relative overflow-hidden">
              
              {/* Subtle decorative graphic background matching Screenshot 12 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl pointer-events-none"></div>

              <h3 className="text-base font-bold text-white mb-4 pb-2 border-b border-gray-800">
                Grand Total
              </h3>

              <div className="space-y-3 text-xs">
                
                {/* Price (items) */}
                <div className="flex justify-between text-gray-300">
                  <span>Price ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-mono text-white">₹{subtotal.toFixed(2)}</span>
                </div>

                {/* Tax */}
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span className="font-mono text-white">₹{tax.toFixed(2)}</span>
                </div>

                {/* Delivery Charges */}
                <div className="flex justify-between text-gray-300">
                  <span>Delivery Charges</span>
                  <span className="text-emerald-400 font-semibold">Free</span>
                </div>

                {/* Apply Coupon Input & Button matching Screenshot 12 */}
                <form onSubmit={handleApplyCoupon} className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      placeholder="Apply Coupon (e.g. BOB100)"
                      className="flex-1 bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-md px-3 py-1.5 focus:outline-none focus:border-blue-500 uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-md transition-colors"
                    >
                      Apply
                    </button>
                  </div>

                  {couponMessage && (
                    <p className={`text-[11px] mt-1.5 flex items-center gap-1 ${
                      couponMessage.type === 'success' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {couponMessage.type === 'success' ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      <span>{couponMessage.text}</span>
                    </p>
                  )}

                  {couponCode && (
                    <div className="mt-2 flex items-center justify-between bg-blue-950/40 border border-blue-900/50 p-2 rounded text-xs text-blue-300">
                      <span>Applied: <strong>{couponCode}</strong></span>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-red-400 hover:text-red-300 text-[11px] underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </form>

                {/* Redeem Gift Points matching Slide 5 */}
                <div className="pt-2 border-t border-gray-800/80">
                  <div className="flex items-center justify-between p-2 bg-[#0F1217] rounded border border-gray-800 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-gray-300">Gift Points ({user.giftPoints} pts available)</span>
                    </div>
                    <button
                      type="button"
                      onClick={toggleRedeemPoints}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                        isRedeemingPoints
                          ? 'bg-amber-500 text-black'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {isRedeemingPoints ? 'Points Applied (-₹100)' : 'Redeem Points'}
                    </button>
                  </div>
                </div>

                {/* Discount */}
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold pt-1">
                    <span>Discount</span>
                    <span className="font-mono">- ₹{totalDiscount}</span>
                  </div>
                )}

                {/* Total Amount */}
                <div className="pt-3 border-t border-gray-700 flex justify-between items-baseline text-white">
                  <span className="text-sm font-bold">Total Amount</span>
                  <span className="text-xl font-extrabold text-cyan-400 font-mono">
                    ₹{grandTotal}
                  </span>
                </div>

                {/* Pay Now Button matching Screenshot 12 */}
                <div className="pt-4">
                  <button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01]"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Pay Now</span>
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      )}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />

      {/* Order Confirmation Success Modal */}
      <OrderSuccessModal
        isOpen={!!completedOrder}
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

    </div>
  );
};
