import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BookCover } from '../components/BookCover';

export const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { wishlist, books, toggleWishlist, addToCart } = useStore();

  const wishlistedBooks = books.filter(b => wishlist.includes(b.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div>
        <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-2 font-medium">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-cyan-400">My Wishlist</span>
        </nav>
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
          <span>My Wishlist ({wishlistedBooks.length})</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Save titles you want to read later and quickly move them to your shopping cart.
        </p>
      </div>

      {wishlistedBooks.length === 0 ? (
        <div className="bg-[#161B22] border border-[#272E3B] rounded-xl p-12 text-center max-w-md mx-auto">
          <Heart className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">Your Wishlist is Empty</h3>
          <p className="text-xs text-gray-400 mb-5">
            Explore our collections and tap the heart icon on any book to save it here.
          </p>
          <Link
            to="/"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-semibold inline-flex items-center gap-2"
          >
            <span>Explore Catalogue</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistedBooks.map(book => (
            <div
              key={book.id}
              className="bg-[#161B22] border border-[#272E3B] rounded-xl p-4 flex flex-col justify-between shadow-sm group hover:border-gray-600 transition-all"
            >
              <div className="flex gap-4">
                <div
                  onClick={() => navigate(`/book/${book.slug}`)}
                  className="cursor-pointer flex-shrink-0"
                >
                  <BookCover book={book} size="md" />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4
                      onClick={() => navigate(`/book/${book.slug}`)}
                      className="text-sm font-bold text-white hover:text-blue-400 cursor-pointer transition-colors line-clamp-1"
                    >
                      {book.title}
                    </h4>
                    <p className="text-xs text-cyan-400 font-medium">
                      by {book.author}
                    </p>
                    <p className="text-[11px] text-gray-400 line-clamp-2 mt-1">
                      {book.quote || book.description}
                    </p>
                  </div>

                  <div className="mt-2 pt-2 border-t border-gray-800">
                    <span className="text-base font-bold text-white">
                      ₹{book.price}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {book.deliveryDate}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleWishlist(book.id)}
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    addToCart(book, 1);
                    toggleWishlist(book.id);
                  }}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <ShoppingCart className="w-3 h-3" />
                  <span>Move to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
