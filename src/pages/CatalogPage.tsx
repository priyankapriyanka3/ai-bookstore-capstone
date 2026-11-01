import React, { useMemo } from 'react';
import { Sidebar } from '../components/Sidebar';
import { FilterBar } from '../components/FilterBar';
import { BookCard } from '../components/BookCard';
import { useStore } from '../context/StoreContext';
import { Sparkles, TrendingUp, Zap, BookOpen } from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const { books, filters } = useStore();

  // Filter & search books
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      // Category filter
      if (filters.selectedCategory !== 'All') {
        const matchesMain = book.mainCategory.toLowerCase() === filters.selectedCategory.toLowerCase();
        const matchesSub = book.category.toLowerCase().includes(filters.selectedCategory.toLowerCase());
        if (!matchesMain && !matchesSub) return false;
      }

      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = book.title.toLowerCase().includes(query);
        const matchesAuthor = book.author.toLowerCase().includes(query);
        const matchesCategory = book.category.toLowerCase().includes(query);
        const matchesDescription = book.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesAuthor && !matchesCategory && !matchesDescription) {
          return false;
        }
      }

      // Language filter
      if (filters.language !== 'All') {
        if (book.language.toLowerCase() !== filters.language.toLowerCase()) {
          return false;
        }
      }

      // Format filter
      if (filters.format !== 'All') {
        if (book.format.toLowerCase() !== filters.format.toLowerCase()) {
          return false;
        }
      }

      // Price Range filter
      if (filters.priceRange !== 'All') {
        if (filters.priceRange === 'Under ₹200' && book.price >= 200) return false;
        if (filters.priceRange === '₹200 - ₹400' && (book.price < 200 || book.price > 400)) return false;
        if (filters.priceRange === '₹400 - ₹600' && (book.price < 400 || book.price > 600)) return false;
        if (filters.priceRange === 'Above ₹600' && book.price <= 600) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') return a.price - b.price;
      if (filters.sortBy === 'price_desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'popular') return b.soldCount - a.soldCount;
      return 0; // relevance / default
    });
  }, [books, filters]);

  // Specific groups for default home view matching screenshots 9 & 10
  const recommendedBooks = useMemo(() => {
    return books.filter(b => b.featuredIn?.includes('recommended') || b.id === 'the-art-of-focus' || b.id === 'the-art-of-learning' || b.id === 'the-path-to-success');
  }, [books]);

  const bestsellerBooks = useMemo(() => {
    return books.filter(b => b.featuredIn?.includes('bestsellers') || b.id === 'the-midnight-hour' || b.id === 'beneath-the-stars' || b.id === 'the-final-frontier');
  }, [books]);

  const newLaunchBooks = useMemo(() => {
    return books.filter(b => b.featuredIn?.includes('new_launches') || b.id === 'joy-of-minimalism' || b.id === 'the-vanishing-house' || b.id === 'the-lost-kitten');
  }, [books]);

  const isBrowsingAll =
    filters.selectedCategory === 'All' &&
    !filters.searchQuery.trim() &&
    filters.language === 'All' &&
    filters.format === 'All' &&
    filters.priceRange === 'All' &&
    filters.sortBy === 'relevance';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Category Sidebar */}
        <Sidebar />

        {/* Right Main Catalog Area */}
        <main className="flex-1 min-w-0">
          <FilterBar />

          {/* If Default Home Mode -> Render exact 3 sections from Screenshots 9 and 10 */}
          {isBrowsingAll ? (
            <div className="space-y-8">
              
              {/* Section 1: Recommended for You */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <h2 className="text-sm md:text-base font-bold text-gray-100 tracking-wide">
                    Recommended for You
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {recommendedBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </section>

              {/* Section 2: Bestsellers this Month */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-rose-400" />
                  <h2 className="text-sm md:text-base font-bold text-gray-100 tracking-wide">
                    Bestsellers this Month
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {bestsellerBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </section>

              {/* Section 3: New Launches */}
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <h2 className="text-sm md:text-base font-bold text-gray-100 tracking-wide">
                    New Launches
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {newLaunchBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </section>

            </div>
          ) : (
            /* Filtered Catalog Results View */
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <h2 className="text-base font-bold text-white">
                    {filters.selectedCategory !== 'All' ? filters.selectedCategory : 'Filtered Results'}
                  </h2>
                  <span className="text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full border border-gray-700">
                    {filteredBooks.length} books found
                  </span>
                </div>
              </div>

              {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-[#161B22] border border-[#272E3B] rounded-lg p-6">
                  <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <h3 className="text-base font-semibold text-gray-200">No books found</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Try adjusting your search criteria or resetting filters to see more results.
                  </p>
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
