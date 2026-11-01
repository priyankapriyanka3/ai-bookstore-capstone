import React from 'react';
import { useStore } from '../context/StoreContext';
import { ALL_CATEGORIES } from '../data/books';
import { BookCategory } from '../types';

export const Sidebar: React.FC = () => {
  const { filters, setSelectedCategory } = useStore();

  return (
    <aside className="w-full lg:w-48 flex-shrink-0">
      <div className="bg-[#161B22] border border-[#272E3B] rounded-lg p-2 md:p-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 px-3 py-2 border-b border-gray-800/80 mb-1">
          Categories
        </h3>
        <ul className="space-y-0.5 text-xs font-medium max-h-[70vh] overflow-y-auto pr-1">
          {ALL_CATEGORIES.map(category => {
            const isSelected = filters.selectedCategory === category;
            return (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => setSelectedCategory(category as BookCategory)}
                  className={`w-full text-left px-3 py-1.5 rounded transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#21262D] text-cyan-400 font-semibold shadow-sm border-l-2 border-cyan-400'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-[#1C2128]'
                  }`}
                >
                  <span className="truncate">{category}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};
