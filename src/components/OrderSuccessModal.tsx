import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ShoppingBag, Clock, PackageCheck } from 'lucide-react';
import { Order } from '../types';
import { BookCover } from './BookCover';

interface OrderSuccessModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  order,
  onClose
}) => {
  const navigate = useNavigate();

  if (!isOpen || !order) return null;

  const handleContinue = () => {
    onClose();
    navigate('/');
  };

  const handleViewOrders = () => {
    onClose();
    navigate('/orders');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#161B22] border border-[#272E3B] rounded-xl shadow-2xl overflow-hidden p-6 text-center">
        
        {/* Success Green Checkmark Icon */}
        <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30 text-white mb-4">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>

        {/* Heading */}
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight mb-1">
          Your purchase of the following reads is successful
        </h2>
        <p className="text-xs text-gray-400 mb-5">
          Order ID: <span className="font-mono text-cyan-400 font-semibold">{order.orderNumber}</span> • Total Paid: <span className="text-white font-bold">₹{order.total}</span>
        </p>

        {/* Purchased Books Preview Cards */}
        <div className="space-y-3 max-h-60 overflow-y-auto mb-6 px-1">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0F1217] border border-[#272E3B] rounded-lg p-3 flex items-center gap-4 text-left"
            >
              <div className="flex-shrink-0">
                <BookCover book={item.book} size="sm" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate">
                  {item.book.title}
                </h4>
                <p className="text-[11px] text-cyan-400 font-medium">
                  by {item.book.author}
                </p>
                <div className="mt-1 flex items-center justify-between text-[10px] text-gray-400">
                  <span>{item.book.format} (Qty: {item.quantity})</span>
                  <span className="text-xs font-bold text-white">₹{item.price * item.quantity}</span>
                </div>
                <p className="text-[9px] text-gray-500 mt-0.5">
                  {item.book.deliveryDate}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 48hr cancellation badge */}
        <div className="mb-6 p-2.5 rounded-lg bg-blue-950/40 border border-blue-900/40 flex items-center justify-center gap-2 text-xs text-blue-300">
          <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <span>Need changes? You can cancel or modify this order within <strong>48 hours</strong> in My Orders.</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleContinue}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-semibold flex items-center justify-center gap-2 shadow-lg transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue your Shopping</span>
          </button>

          <button
            onClick={handleViewOrders}
            className="w-full sm:w-auto px-4 py-2.5 bg-[#21262D] hover:bg-[#30363D] text-gray-300 rounded-md text-xs font-medium flex items-center justify-center gap-2 border border-gray-700 transition-colors"
          >
            <PackageCheck className="w-4 h-4" />
            <span>View in My Orders</span>
          </button>
        </div>

      </div>
    </div>
  );
};
