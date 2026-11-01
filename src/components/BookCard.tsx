import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Truck, Check } from 'lucide-react';
import { Book } from '../types';
import { BookCover } from './BookCover';
import { useStore } from '../context/StoreContext';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [isAdded, setIsAdded] = React.useState(false);

  const inWishlist = isInWishlist(book.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(book, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(book.id);
  };

  return (
    <div
      onClick={() => navigate(`/book/${book.slug}`)}
      className="group bg-[#161B22] hover:bg-[#1C2128] border border-[#272E3B] hover:border-gray-600 rounded-lg p-3 transition-all duration-200 cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-lg relative"
    >
      <div className="flex gap-3">
        {/* Book Cover thumbnail */}
        <div className="flex-shrink-0">
          <BookCover book={book} size="md" />
        </div>

        {/* Book details */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-1">
              <h4 className="text-sm font-bold text-gray-100 group-hover:text-blue-400 transition-colors line-clamp-1 leading-snug">
                {book.title}
              </h4>
              <button
                type="button"
                onClick={handleToggleWishlist}
                className="text-gray-500 hover:text-pink-400 p-0.5 rounded transition-colors"
                title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    inWishlist ? 'fill-pink-500 text-pink-500' : ''
                  }`}
                />
              </button>
            </div>

            <p className="text-xs text-cyan-400 font-medium mt-0.5">
              by {book.author}
            </p>

            {book.quote && (
              <p className="text-[11px] text-gray-400 line-clamp-2 mt-1 italic leading-tight">
                {book.quote.replace(/"/g, '')}
              </p>
            )}
          </div>

          <div className="mt-2 pt-1 border-t border-gray-800/60">
            {/* Format & Category */}
            <p className="text-[10px] text-gray-400 font-medium">
              <span className="text-gray-300 font-semibold">{book.format}</span>
              <span className="mx-1 text-gray-600">|</span>
              <span className="text-gray-400">{book.category}</span>
            </p>

            {/* Price & Delivery */}
            <div className="mt-1 flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-white tracking-tight">
                  ₹{book.price}
                </span>
                {book.originalPrice && book.originalPrice > book.price && (
                  <span className="text-[11px] text-gray-500 line-through">
                    ₹{book.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
              <Truck className="w-2.5 h-2.5 text-blue-400" />
              <span>{book.deliveryDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Add To Basket button */}
      <div className="mt-2.5 pt-2 border-t border-[#272E3B]/80 flex items-center justify-between">
        <Link
          to={`/book/${book.slug}`}
          onClick={e => e.stopPropagation()}
          className="text-[11px] text-gray-400 hover:text-cyan-400 transition-colors"
        >
          View Details &rarr;
        </Link>
        <button
          type="button"
          onClick={handleAddToCart}
          className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
            isAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-3 h-3" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-3 h-3" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
