import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, ShoppingCart, Heart, Users, Package, Menu, X, Sparkles, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const { cartCount, wishlist, user } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#161B22]/95 backdrop-blur-md border-b border-[#272E3B] text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                Book Worm
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link
                to="/orders"
                className={`flex items-center gap-1.5 transition-colors ${
                  isActive('/orders')
                    ? 'text-cyan-400 font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>My Orders</span>
              </Link>

              <Link
                to="/wishlist"
                className={`flex items-center gap-1.5 transition-colors ${
                  isActive('/wishlist')
                    ? 'text-cyan-400 font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>My Wishlist</span>
                {wishlist.length > 0 && (
                  <span className="ml-0.5 text-xs bg-gray-800 text-gray-300 px-1.5 py-0.2 rounded-full border border-gray-700">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link
                to="/writers"
                className={`flex items-center gap-1.5 transition-colors ${
                  isActive('/writers')
                    ? 'text-cyan-400 font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>My Writers</span>
              </Link>
            </nav>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4">
            
            {/* Gift points reward pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/50 text-blue-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{user.giftPoints} pts</span>
            </div>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-300 hover:text-white hover:bg-[#21262D] rounded-lg transition-colors"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 text-gray-200" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-gray-700">
              <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-300 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-800 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-800"
            >
              <BookOpen className="w-4 h-4" />
              <span>Catalogue</span>
            </Link>
            <Link
              to="/orders"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-800"
            >
              <Package className="w-4 h-4" />
              <span>My Orders</span>
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-800"
            >
              <Heart className="w-4 h-4" />
              <span>My Wishlist ({wishlist.length})</span>
            </Link>
            <Link
              to="/writers"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-800"
            >
              <Users className="w-4 h-4" />
              <span>My Writers</span>
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-800"
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                <span>Shopping Cart</span>
              </div>
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {cartCount}
              </span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
