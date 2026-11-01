import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, RotateCcw, XCircle, Clock, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BookCover } from '../components/BookCover';

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { orders, cancelOrder, buyAgain, books } = useStore();

  const handleBuyAgain = (orderId: string) => {
    buyAgain(orderId);
    navigate('/cart');
  };

  // Recommendations based on Order History (Use case #2)
  const historyRecommendations = books.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Page Title & Breadcrumbs */}
      <div>
        <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-2 font-medium">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-cyan-400">My Orders</span>
        </nav>
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-500" />
          <span>Order History & Active Purchases</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Track packages, manage 48-hour order cancellations, or quickly re-order past reads.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-[#161B22] border border-[#272E3B] rounded-xl p-12 text-center max-w-md mx-auto">
          <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No Orders Yet</h3>
          <p className="text-xs text-gray-400 mb-5">
            You haven't placed any orders yet. Discover great books in our catalogue.
          </p>
          <Link
            to="/"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-semibold inline-flex items-center gap-2"
          >
            <span>Start Shopping</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => {
            const isCancelled = order.status === 'Cancelled';
            const canCancel = !isCancelled && new Date(order.canCancelUntil).getTime() > Date.now();
            const orderDate = new Date(order.createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            });

            return (
              <div
                key={order.id}
                className="bg-[#161B22] border border-[#272E3B] rounded-xl overflow-hidden shadow-md"
              >
                {/* Order Header bar */}
                <div className="bg-[#12161D] px-5 py-3 border-b border-[#272E3B] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase">Order Placed</span>
                      <span className="font-semibold text-gray-200">{orderDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase">Total</span>
                      <span className="font-bold text-white">₹{order.total}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px] uppercase">Ship To</span>
                      <span className="text-gray-200">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 font-mono text-[11px]">
                      {order.orderNumber}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                      isCancelled
                        ? 'bg-red-950/80 border border-red-800 text-red-400'
                        : 'bg-emerald-950/80 border border-emerald-800 text-emerald-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Items list */}
                <div className="p-5 space-y-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-800/60 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <BookCover book={item.book} size="sm" />
                        <div>
                          <Link
                            to={`/book/${item.book.slug}`}
                            className="text-xs font-bold text-white hover:text-blue-400 transition-colors line-clamp-1"
                          >
                            {item.book.title}
                          </Link>
                          <p className="text-[11px] text-cyan-400 font-medium">
                            by {item.book.author}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            Format: {item.book.format} • Quantity: {item.quantity}
                          </p>
                          <p className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{item.book.deliveryDate}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right sm:self-center">
                        <span className="text-sm font-bold text-white font-mono">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Actions Footer */}
                <div className="bg-[#0F1217] px-5 py-3 border-t border-[#272E3B] flex flex-wrap items-center justify-between gap-3 text-xs">
                  
                  {/* Cancellation status badge */}
                  <div className="flex items-center gap-2">
                    {canCancel ? (
                      <div className="flex items-center gap-1.5 text-amber-400 text-[11px]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Eligible for instant cancellation within 48 hours</span>
                      </div>
                    ) : isCancelled ? (
                      <span className="text-red-400 text-[11px]">
                        This order has been cancelled and refunded to your original payment method.
                      </span>
                    ) : (
                      <span className="text-gray-500 text-[11px]">
                        Standard delivery in progress.
                      </span>
                    )}
                  </div>

                  {/* Action buttons: Buy Again & Cancel */}
                  <div className="flex items-center gap-3">
                    {canCancel && (
                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="px-3 py-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800 rounded text-xs font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Cancel Order</span>
                      </button>
                    )}

                    {/* Buy In Again Feature (Slide 5 Requirement #2) */}
                    <button
                      onClick={() => handleBuyAgain(order.id)}
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Buy It Again</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Recommended items based on Order History (Slide 5 Requirement #2) */}
      <section className="pt-6 border-t border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">
              Recommended Based on Your Order History
            </h2>
            <p className="text-xs text-gray-400">
              Personalized selections tailored to your reading journey.
            </p>
          </div>
          <Link to="/" className="text-xs text-cyan-400 hover:underline flex items-center gap-1">
            <span>Explore more</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {historyRecommendations.map(book => (
            <div
              key={book.id}
              onClick={() => navigate(`/book/${book.slug}`)}
              className="bg-[#161B22] border border-[#272E3B] rounded-xl p-3.5 flex gap-3 hover:border-gray-600 transition-all cursor-pointer group"
            >
              <BookCover book={book} size="sm" />
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                    {book.title}
                  </h4>
                  <p className="text-[11px] text-cyan-400 font-medium">by {book.author}</p>
                  <p className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">{book.category}</p>
                </div>
                <div className="mt-2 flex items-center justify-between pt-1 border-t border-gray-800">
                  <span className="text-xs font-bold text-white">₹{book.price}</span>
                  <span className="text-[10px] text-blue-400 flex items-center gap-0.5">
                    View <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
