import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Bookmark, Check, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BookCover } from '../components/BookCover';
import { StarRating } from '../components/StarRating';
import { AUTHORS } from '../data/books';

export const BookDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const {
    books,
    addToCart,
    toggleWishlist,
    isInWishlist,
    reviews,
    addReview
  } = useStore();

  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Find book
  const currentBook = books.find(b => b.slug === slug) || books[0];
  const bookReviews = reviews[currentBook.slug] || [];
  const inWishlist = isInWishlist(currentBook.id);

  // Find author
  const authorData = AUTHORS.find(a => a.name.toLowerCase() === currentBook.author.toLowerCase()) || {
    id: 'author-default',
    name: currentBook.author,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    bio: `${currentBook.author} is an acclaimed author and expert in ${currentBook.category}. Their work has inspired readers worldwide to achieve greater clarity, depth, and intentionality.`,
    booksCount: 3
  };

  // Related Reads (excluding current book)
  const relatedReads = books
    .filter(b => b.id !== currentBook.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(currentBook, 1);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    addReview(currentBook.slug, reviewRating, reviewComment, reviewName || 'Book Enthusiast');
    setReviewComment('');
    setReviewName('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Breadcrumb Navigation matching Screenshot 11 */}
      <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-6 font-medium">
        <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-300">Non-Fiction</span>
        <span>/</span>
        <span className="text-gray-200">{currentBook.mainCategory}</span>
        <span>/</span>
        <span className="text-cyan-400 truncate">{currentBook.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Left/Center Content (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Top Main Product Box */}
          <div className="bg-[#161B22] border border-[#272E3B] rounded-xl p-5 md:p-6 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Book Cover Big Display */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-[240px] aspect-[2/3]">
                  <BookCover book={currentBook} size="xl" className="w-full h-full shadow-2xl" />
                </div>
                
                {/* Barcode & ISBN simulated box */}
                <div className="mt-4 p-2 bg-[#0F1217] border border-gray-800 rounded text-center w-full max-w-[240px]">
                  <div className="font-mono text-[9px] text-gray-400 tracking-widest uppercase">ISBN: {currentBook.isbn}</div>
                  <div className="flex justify-center gap-0.5 mt-1 h-6 items-end opacity-70">
                    <span className="w-1 h-6 bg-gray-400"></span>
                    <span className="w-0.5 h-6 bg-gray-400"></span>
                    <span className="w-1.5 h-6 bg-gray-400"></span>
                    <span className="w-0.5 h-6 bg-gray-400"></span>
                    <span className="w-2 h-6 bg-gray-400"></span>
                    <span className="w-1 h-6 bg-gray-400"></span>
                    <span className="w-0.5 h-6 bg-gray-400"></span>
                    <span className="w-1.5 h-6 bg-gray-400"></span>
                    <span className="w-2 h-6 bg-gray-400"></span>
                    <span className="w-0.5 h-6 bg-gray-400"></span>
                    <span className="w-1 h-6 bg-gray-400"></span>
                  </div>
                </div>
              </div>

              {/* Book Information & Purchase Controls */}
              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    {currentBook.title}
                  </h1>
                  
                  <p className="text-sm text-cyan-400 font-medium mt-1">
                    by{' '}
                    <Link to="/writers" className="hover:underline">
                      {currentBook.author}
                    </Link>
                  </p>

                  <p className="text-xs text-gray-300 italic mt-2">
                    {currentBook.quote || 'Declutter your life to uncover peace, clarity, and joy.'}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    Published by: <span className="text-gray-200 font-medium">{currentBook.publisher}</span>
                  </p>

                  {/* Format & Category pill */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-[#21262D] border border-gray-700 rounded text-xs text-gray-200 font-semibold">
                      {currentBook.format}
                    </span>
                    <span className="text-xs text-gray-400">
                      {currentBook.category}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white tracking-tight">
                      ₹{currentBook.price}
                    </span>
                    {currentBook.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{currentBook.originalPrice}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 mt-1">
                    {currentBook.deliveryDate}
                  </p>
                </div>

                {/* Action Buttons matching Screenshot 11 */}
                <div className="mt-6 pt-5 border-t border-gray-800 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleAddToCart}
                      className={`flex-1 min-w-[140px] px-5 py-2.5 rounded-md text-xs font-semibold flex items-center justify-center gap-2 shadow-lg transition-all ${
                        isAddedToCart
                          ? 'bg-emerald-600 text-white'
                          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                      }`}
                    >
                      {isAddedToCart ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Cart!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => toggleWishlist(currentBook.id)}
                      className={`px-4 py-2.5 rounded-md text-xs font-medium flex items-center gap-2 border transition-colors ${
                        inWishlist
                          ? 'bg-pink-950/40 border-pink-700 text-pink-300'
                          : 'bg-[#21262D] hover:bg-[#30363D] border-gray-700 text-gray-300'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${inWishlist ? 'fill-pink-400' : ''}`} />
                      <span>{inWishlist ? 'In Wishlist' : 'Add to Wishlist'}</span>
                    </button>
                  </div>

                  {/* Meta Specs row */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs text-gray-400 border-t border-gray-800/60">
                    <div className="p-2 bg-[#0F1217] rounded border border-gray-800/80">
                      <span className="block text-[10px] text-gray-500 uppercase">Language</span>
                      <span className="font-semibold text-gray-200">{currentBook.language}</span>
                    </div>
                    <div className="p-2 bg-[#0F1217] rounded border border-gray-800/80">
                      <span className="block text-[10px] text-gray-500 uppercase">Rating</span>
                      <div className="flex justify-center mt-0.5">
                        <StarRating rating={currentBook.rating} size="sm" />
                      </div>
                    </div>
                    <div className="p-2 bg-[#0F1217] rounded border border-gray-800/80">
                      <span className="block text-[10px] text-gray-500 uppercase">Sells</span>
                      <span className="font-semibold text-gray-200">{currentBook.soldCount} copies</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Expanded Book Description & Excerpt */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <h3 className="text-sm font-bold text-gray-100 uppercase tracking-wider mb-2">
                About this Book
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-line">
                {currentBook.description}
              </p>
            </div>
          </div>

          {/* About the Writer Section */}
          <div className="bg-[#161B22] border border-[#272E3B] rounded-xl p-5 md:p-6 shadow-md">
            <h3 className="text-sm font-bold text-gray-100 uppercase tracking-wider mb-4">
              About the writer
            </h3>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <img
                src={authorData.avatar}
                alt={authorData.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/60 shadow-md flex-shrink-0"
              />
              <div className="flex-1">
                <h4 className="text-base font-bold text-white">
                  {authorData.name}
                </h4>
                <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                  {authorData.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-[#161B22] border border-[#272E3B] rounded-xl p-5 md:p-6 shadow-md space-y-6">
            <h3 className="text-sm font-bold text-gray-100 uppercase tracking-wider">
              Reviews
            </h3>

            {/* Leave Your Review Form */}
            <form onSubmit={handleReviewSubmit} className="bg-[#0F1217] border border-[#272E3B] rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-300">Leave Your Review</span>
                <span className="text-[11px] text-gray-500">{reviewComment.length}/100</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={reviewName}
                  onChange={e => setReviewName(e.target.value)}
                  placeholder="Your Name (optional)"
                  className="bg-[#161B22] border border-[#272E3B] text-gray-200 text-xs rounded-md px-3 py-1.5 focus:outline-none focus:border-blue-500"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Rating:</span>
                  <StarRating
                    rating={reviewRating}
                    interactive
                    onRatingChange={setReviewRating}
                    size="md"
                  />
                </div>
              </div>

              <textarea
                value={reviewComment}
                maxLength={200}
                onChange={e => setReviewComment(e.target.value)}
                placeholder="Share your thoughts on this book..."
                rows={3}
                required
                className="w-full bg-[#161B22] border border-[#272E3B] text-gray-200 text-xs rounded-md p-2.5 focus:outline-none focus:border-blue-500"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Submit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Display Reviews */}
            <div className="space-y-4">
              {bookReviews.map(rev => (
                <div
                  key={rev.id}
                  className="p-3.5 bg-[#0F1217] border border-gray-800 rounded-lg text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-200">{rev.userName}</span>
                    <StarRating rating={rev.rating} size="sm" />
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {rev.comment}
                  </p>
                  <p className="text-[10px] text-gray-500 text-right">
                    {rev.date}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Right Sidebar: Related Reads (4 cols) matching Screenshot 11 */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="bg-[#161B22] border border-[#272E3B] rounded-xl p-4 shadow-md sticky top-20">
            <h3 className="text-sm font-bold text-gray-100 uppercase tracking-wider mb-4 pb-2 border-b border-gray-800">
              Related Reads
            </h3>

            <div className="space-y-4">
              {relatedReads.map(item => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/book/${item.slug}`)}
                  className="group bg-[#0F1217] hover:bg-[#1C2128] border border-[#272E3B] hover:border-gray-600 rounded-lg p-3 transition-all cursor-pointer flex gap-3"
                >
                  <div className="flex-shrink-0">
                    <BookCover book={item} size="sm" />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-cyan-400 font-medium">
                        by {item.author}
                      </p>
                      <p className="text-[10px] text-gray-400 line-clamp-2 mt-0.5">
                        {item.quote || item.description}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center justify-between pt-1 border-t border-gray-800/60">
                      <span className="text-xs font-bold text-white">
                        ₹{item.price}
                      </span>
                      <span className="text-[9px] text-gray-500">
                        {item.deliveryDate}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800 text-center">
              <Link
                to="/"
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1"
              >
                <span>Browse full catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};
