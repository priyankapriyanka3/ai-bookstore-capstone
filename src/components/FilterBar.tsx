import React from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { LANGUAGES, FORMATS, PRICE_RANGES, SORT_OPTIONS } from '../data/books';

export const FilterBar: React.FC = () => {
  const {
    filters,
    setSearchQuery,
    setLanguageFilter,
    setFormatFilter,
    setPriceRangeFilter,
    setSortBy,
    resetFilters
  } = useStore();

  const hasActiveFilters =
    filters.searchQuery ||
    filters.language !== 'All' ||
    filters.format !== 'All' ||
    filters.priceRange !== 'All' ||
    filters.sortBy !== 'relevance' ||
    filters.selectedCategory !== 'All';

  return (
    <div className="bg-[#161B22] border border-[#272E3B] rounded-lg p-3 mb-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        {/* Search input (covers 4-5 cols) */}
        <div className="md:col-span-4 relative">
          <label htmlFor="search-input" className="sr-only">Search</label>
          <div className="relative">
            <input
              id="search-input"
              type="text"
              value={filters.searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search you want to read here"
              className="w-full bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-md pl-3 pr-8 py-2 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-gray-400">
              <Search className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Language Dropdown */}
        <div className="md:col-span-2 relative">
          <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">
            Language
          </label>
          <div className="relative">
            <select
              value={filters.language}
              onChange={e => setLanguageFilter(e.target.value)}
              className="w-full appearance-none bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer pr-6"
            >
              {LANGUAGES.map(lang => (
                <option key={lang} value={lang} className="bg-[#161B22] text-gray-200">
                  {lang}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Format Dropdown */}
        <div className="md:col-span-2 relative">
          <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">
            Format (Paperback, ebook etc)
          </label>
          <div className="relative">
            <select
              value={filters.format}
              onChange={e => setFormatFilter(e.target.value)}
              className="w-full appearance-none bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer pr-6"
            >
              {FORMATS.map(fmt => (
                <option key={fmt} value={fmt} className="bg-[#161B22] text-gray-200">
                  {fmt}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Price Range Dropdown */}
        <div className="md:col-span-2 relative">
          <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">
            Price Range
          </label>
          <div className="relative">
            <select
              value={filters.priceRange}
              onChange={e => setPriceRangeFilter(e.target.value)}
              className="w-full appearance-none bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer pr-6"
            >
              {PRICE_RANGES.map(range => (
                <option key={range} value={range} className="bg-[#161B22] text-gray-200">
                  {range}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Sort By Dropdown */}
        <div className="md:col-span-2 relative">
          <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-0.5">
            Sort by
          </label>
          <div className="relative">
            <select
              value={filters.sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="w-full appearance-none bg-[#0F1217] border border-[#272E3B] text-gray-200 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:border-blue-500 cursor-pointer pr-6"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value} className="bg-[#161B22] text-gray-200">
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Active filters pill list & reset */}
      {hasActiveFilters && (
        <div className="mt-2.5 pt-2 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-gray-500">Active filters:</span>
            {filters.selectedCategory !== 'All' && (
              <span className="bg-blue-950/60 border border-blue-800/60 text-blue-300 text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1">
                Category: {filters.selectedCategory}
              </span>
            )}
            {filters.searchQuery && (
              <span className="bg-gray-800 text-gray-300 text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1">
                Query: "{filters.searchQuery}"
              </span>
            )}
            {filters.language !== 'All' && (
              <span className="bg-gray-800 text-gray-300 text-[11px] px-2 py-0.5 rounded-full">
                Lang: {filters.language}
              </span>
            )}
            {filters.format !== 'All' && (
              <span className="bg-gray-800 text-gray-300 text-[11px] px-2 py-0.5 rounded-full">
                Format: {filters.format}
              </span>
            )}
            {filters.priceRange !== 'All' && (
              <span className="bg-gray-800 text-gray-300 text-[11px] px-2 py-0.5 rounded-full">
                Price: {filters.priceRange}
              </span>
            )}
          </div>
          <button
            onClick={resetFilters}
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 hover:underline"
          >
            <X className="w-3 h-3" />
            Reset all
          </button>
        </div>
      )}
    </div>
  );
};
