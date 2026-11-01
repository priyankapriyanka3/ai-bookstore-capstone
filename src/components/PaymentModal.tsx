import React, { useState } from 'react';
import { CreditCard, Smartphone, Wallet as WalletIcon, ShieldCheck, X, Lock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (order: Order) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { grandTotal, placeOrder, user } = useStore();
  const [activeTab, setActiveTab] = useState<'credit' | 'debit' | 'upi' | 'wallet'>('credit');

  // Form states
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardName, setCardName] = useState(user.name);
  const [cvv, setCvv] = useState('888');
  const [expiry, setExpiry] = useState('08/29');
  const [upiId, setUpiId] = useState('priyanka@okhdfcbank');
  const [selectedWallet, setSelectedWallet] = useState('Amazon Pay');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      let method: Order['paymentMethod'] = 'Credit Card';
      let details: Order['paymentDetails'] = {};

      if (activeTab === 'credit') {
        method = 'Credit Card';
        details = { lastFourDigits: cardNumber.slice(-4) || '4242' };
      } else if (activeTab === 'debit') {
        method = 'Debit Card';
        details = { lastFourDigits: cardNumber.slice(-4) || '1234' };
      } else if (activeTab === 'upi') {
        method = 'UPI';
        details = { upiId };
      } else if (activeTab === 'wallet') {
        method = 'Wallet';
        details = { walletName: selectedWallet };
      }

      const order = placeOrder(method, details);
      setIsProcessing(false);
      onSuccess(order);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      
      {/* Decorative bookstore floating background illustrations */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl"></div>
      </div>

      {/* Main Payment Dialog Card */}
      <div className="relative w-full max-w-2xl bg-[#161B22] border border-[#272E3B] rounded-xl shadow-2xl overflow-hidden z-10">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#272E3B] bg-[#12161D]">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Complete Payment
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-200">
              Payable Amount: <span className="text-cyan-400 font-bold">₹{grandTotal}</span>
            </span>
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="text-gray-400 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Payment tabs & Form */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[340px]">
          
          {/* Left Method selector tabs */}
          <div className="md:col-span-4 bg-[#0F1217] border-r border-[#272E3B] p-2 space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab('credit')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-semibold flex items-center gap-3 transition-all ${
                activeTab === 'credit'
                  ? 'bg-[#1F2633] text-cyan-400 border-l-4 border-cyan-400 shadow'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#161B22]'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Credit Card</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('debit')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-semibold flex items-center gap-3 transition-all ${
                activeTab === 'debit'
                  ? 'bg-[#1F2633] text-cyan-400 border-l-4 border-cyan-400 shadow'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#161B22]'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Debit card</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('upi')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-semibold flex items-center gap-3 transition-all ${
                activeTab === 'upi'
                  ? 'bg-[#1F2633] text-cyan-400 border-l-4 border-cyan-400 shadow'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#161B22]'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>UPI</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('wallet')}
              className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-semibold flex items-center gap-3 transition-all ${
                activeTab === 'wallet'
                  ? 'bg-[#1F2633] text-cyan-400 border-l-4 border-cyan-400 shadow'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#161B22]'
              }`}
            >
              <WalletIcon className="w-4 h-4" />
              <span>Wallet</span>
            </button>

            <div className="pt-6 px-3">
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-bit Encrypted Checkout</span>
              </div>
            </div>
          </div>

          {/* Right Form content */}
          <div className="md:col-span-8 p-6 flex flex-col justify-between">
            <form onSubmit={handlePayment} className="space-y-4">
              
              {/* Credit Card / Debit Card fields matching screenshot 13 */}
              {(activeTab === 'credit' || activeTab === 'debit') && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-gray-400 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        className="w-full bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-gray-400 mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        required
                        value={cardName}
                        onChange={e => setCardName(e.target.value)}
                        placeholder="Name"
                        className="w-full bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-gray-400 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        required
                        value={cvv}
                        onChange={e => setCvv(e.target.value)}
                        placeholder="XXX"
                        className="w-full bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 font-mono tracking-widest"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-gray-400 mb-1">
                        Date of Expiry
                      </label>
                      <input
                        type="text"
                        required
                        value={expiry}
                        onChange={e => setExpiry(e.target.value)}
                        placeholder="MM/YYYY"
                        className="w-full bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Tab */}
              {activeTab === 'upi' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-medium text-gray-400 mb-1">
                      Virtual Payment Address (UPI ID)
                    </label>
                    <input
                      type="text"
                      required
                      value={upiId}
                      onChange={e => setUpiId(e.target.value)}
                      placeholder="e.g. yourname@oksbi"
                      className="w-full bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="p-3 bg-[#0F1217] border border-gray-800 rounded-lg text-xs text-gray-400 flex items-center justify-between">
                    <span>Scan with GooglePay / PhonePe / Paytm</span>
                    <span className="text-cyan-400 font-mono font-semibold">QR Ready</span>
                  </div>
                </div>
              )}

              {/* Wallet Tab */}
              {activeTab === 'wallet' && (
                <div className="space-y-3">
                  <label className="block text-[11px] font-medium text-gray-400 mb-1">
                    Select Digital Wallet
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['Amazon Pay', 'Paytm Wallet', 'PhonePe', 'Mobikwik'].map(wallet => (
                      <button
                        key={wallet}
                        type="button"
                        onClick={() => setSelectedWallet(wallet)}
                        className={`p-2.5 rounded border text-left transition-all ${
                          selectedWallet === wallet
                            ? 'bg-blue-950/70 border-blue-500 text-white font-medium'
                            : 'bg-[#0F1217] border-[#272E3B] text-gray-400 hover:text-gray-200'
                        }`}
                      >
                        {wallet}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Pay Now button */}
              <div className="pt-4 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-600/30 transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Pay Now ₹{grandTotal}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
