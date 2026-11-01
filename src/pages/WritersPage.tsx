import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import { AUTHORS } from '../data/books';
import { useStore } from '../context/StoreContext';
import { BookCover } from '../components/BookCover';

export const WritersPage: React.FC = () => {
  const navigate = useNavigate();
  const { books } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div>
        <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-2 font-medium">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-cyan-400">My Writers</span>
        </nav>
        <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <Users className="w-6 h-6 text-cyan-400" />
          <span>Featured Authors & Writers</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Explore celebrated writers and creators in the Book Worm universe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AUTHORS.map(author => {
          const authorBooks = books.filter(
            b => b.author.toLowerCase() === author.name.toLowerCase()
          );

          return (
            <div
              key={author.id}
              className="bg-[#161B22] border border-[#272E3B] rounded-xl p-5 flex flex-col justify-between shadow-md hover:border-gray-600 transition-all"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-3">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-500/50 shadow"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {author.name}
                    </h3>
                    <p className="text-xs text-cyan-400 font-medium">
                      {authorBooks.length > 0 ? `${authorBooks.length} Published Books` : 'Featured Author'}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed mb-4">
                  {author.bio}
                </p>
              </div>

              {/* Author's books previews */}
              {authorBooks.length > 0 && (
                <div className="pt-3 border-t border-gray-800">
                  <span className="block text-[10px] text-gray-500 uppercase tracking-wider mb-2 font-semibold">
                    Published Reads
                  </span>
                  <div className="flex items-center gap-2">
                    {authorBooks.map(b => (
                      <div
                        key={b.id}
                        onClick={() => navigate(`/book/${b.slug}`)}
                        className="cursor-pointer hover:scale-105 transition-transform"
                        title={b.title}
                      >
                        <BookCover book={b} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
