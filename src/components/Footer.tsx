import React from 'react';
import { BookOpen, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-[#161B22] border-t border-[#272E3B] text-gray-400 text-xs">
      {/* Value props banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-2.5 rounded-lg bg-blue-950/60 text-blue-400 border border-blue-900/50">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-200">Tentative Delivery Tracking</h4>
              <p className="text-[11px] text-gray-500">Fast delivery with real-time ETA tags</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-900/50">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-200">48-Hour Free Cancellation</h4>
              <p className="text-[11px] text-gray-500">Hassle-free 48h cancellation & instant refund</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-2.5 rounded-lg bg-purple-950/60 text-purple-400 border border-purple-900/50">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-gray-200">Secure Payments & Gift Points</h4>
              <p className="text-[11px] text-gray-500">256-bit encryption with reward redemption</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white">
            <BookOpen className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-gray-200">Book Worm</span>
          <span className="text-gray-600">|</span>
          <span className="text-[11px] text-gray-500">AI Specialist Capstone Project • Powered by IBM BOB</span>
        </div>

        <div className="flex items-center space-x-6 text-gray-400 text-xs">
          <Link to="/" className="hover:text-white transition-colors">Catalogue</Link>
          <Link to="/orders" className="hover:text-white transition-colors">My Orders</Link>
          <Link to="/wishlist" className="hover:text-white transition-colors">My Wishlist</Link>
          <Link to="/writers" className="hover:text-white transition-colors">My Writers</Link>
        </div>
      </div>
    </footer>
  );
};
