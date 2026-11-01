import React from 'react';
import { Book } from '../types';

interface BookCoverProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showShadow?: boolean;
}

export const BookCover: React.FC<BookCoverProps> = ({
  book,
  size = 'md',
  className = '',
  showShadow = true
}) => {
  // Dimensions based on size
  const sizeClasses = {
    sm: 'w-16 h-24 text-[8px]',
    md: 'w-28 h-40 text-[10px]',
    lg: 'w-48 h-68 text-xs',
    xl: 'w-64 h-96 text-sm'
  }[size];

  const shadowClass = showShadow
    ? 'shadow-[0_10px_25px_-5px_rgba(0,0,0,0.6),0_8px_10px_-6px_rgba(0,0,0,0.4)]'
    : '';

  const renderContent = () => {
    switch (book.coverPattern) {
      case 'focus':
        return (
          <div className="w-full h-full bg-[#FFFFFF] text-gray-900 p-2 flex flex-col justify-between items-center text-center font-sans select-none relative overflow-hidden">
            <div className="w-full pt-1">
              <span className="block text-[7px] tracking-widest uppercase text-gray-500 font-semibold">Bestselling Guide</span>
              <h3 className="font-extrabold uppercase tracking-tight text-gray-900 leading-none mt-1 text-[13px] md:text-sm">
                THE ART OF<br /><span className="text-red-600">FOCUS</span>
              </h3>
            </div>
            
            {/* Target bullseye graphic */}
            <div className="my-auto relative flex items-center justify-center">
              <svg className="w-14 h-14 text-red-600" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <circle cx="50" cy="50" r="42" strokeWidth="6" />
                <circle cx="50" cy="50" r="30" strokeWidth="6" />
                <circle cx="50" cy="50" r="18" strokeWidth="6" />
                <circle cx="50" cy="50" r="6" fill="#DC2626" />
                <path d="M50 0 L50 20 M50 80 L50 100 M0 50 L20 50 M80 50 L100 50" strokeWidth="4" />
              </svg>
            </div>

            <div className="w-full pb-1 border-t border-gray-200 pt-1">
              <p className="text-[7px] text-gray-600 font-medium leading-tight">Mastering Productivity</p>
              <p className="font-bold text-[9px] uppercase tracking-wider text-gray-800 mt-0.5">
                {book.author}
              </p>
            </div>
          </div>
        );

      case 'learning':
        return (
          <div className="w-full h-full bg-[#DC2626] text-white p-2 flex flex-col justify-between items-center text-center font-sans select-none relative overflow-hidden">
            <div className="w-full pt-1">
              <span className="block text-[7px] tracking-widest uppercase text-red-200">The Power of Mind</span>
              <h3 className="font-extrabold uppercase tracking-tight text-white leading-none mt-1 text-[12px] md:text-sm">
                THE ART<br />OF<br />LEARNING
              </h3>
            </div>

            {/* Book & flame/bulb graphic */}
            <div className="my-auto flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-red-700/60 flex items-center justify-center border border-yellow-300/40">
                <svg className="w-6 h-6 text-yellow-300" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm-2 17h4v1h-4v-1zm1-15c2.76 0 5 2.24 5 5 0 1.63-.8 3.16-2.15 4.1L13 13.67V16h-2v-2.33l-.85-.57C8.8 12.16 8 10.63 8 9c0-2.76 2.24-5 5-5z"/>
                </svg>
              </div>
            </div>

            <div className="w-full pb-1">
              <div className="h-0.5 w-8 bg-yellow-400 mx-auto mb-1"></div>
              <p className="font-bold text-[9px] uppercase tracking-wider text-white">
                {book.author}
              </p>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="w-full h-full bg-gradient-to-b from-[#0284C7] via-[#0369A1] to-[#0F172A] text-white p-2 flex flex-col justify-between items-center text-center font-sans select-none relative overflow-hidden">
            <div className="w-full pt-1 z-10">
              <span className="block text-[6px] tracking-widest uppercase text-cyan-200">Definitive Guide</span>
              <h3 className="font-extrabold uppercase tracking-tight text-white leading-none mt-1 text-[11px] md:text-sm drop-shadow">
                THE PATH TO<br /><span className="text-amber-300">SUCCESS</span>
              </h3>
            </div>

            {/* Climber on arrow toward star */}
            <div className="my-auto relative w-full flex items-center justify-center">
              <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
                {/* Shining Star */}
                <polygon points="75,25 78,33 87,33 80,38 82,47 75,41 68,47 70,38 63,33 72,33" fill="#FBBF24" />
                {/* Upward Arrow Path */}
                <path d="M15 85 L75 35" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" />
                <polyline points="55,35 75,35 75,55" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                {/* Person Silhouette */}
                <circle cx="48" cy="46" r="4" fill="#FFFFFF" />
                <path d="M48 50 L48 62 M48 54 L42 60 M48 54 L54 58 M48 62 L43 72 M48 62 L52 70" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            <div className="w-full pb-1 z-10">
              <p className="font-bold text-[9px] uppercase tracking-wider text-cyan-200">
                {book.author}
              </p>
            </div>
          </div>
        );

      case 'midnight':
        return (
          <div className="w-full h-full bg-[#08131E] text-white p-2 flex flex-col justify-between items-center text-center font-serif select-none relative overflow-hidden">
            {/* Background Moonlight effect */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-cyan-100/20 blur-md"></div>
            <div className="w-full pt-1 z-10">
              <span className="block text-[6px] tracking-widest uppercase text-cyan-400 font-sans">A NOVEL</span>
              <h3 className="font-bold uppercase tracking-wider text-cyan-100 leading-tight mt-1 text-[11px] md:text-sm">
                THE<br />MIDNIGHT<br />HOUR
              </h3>
            </div>

            {/* Tree & moon mystery silhouette */}
            <div className="my-auto z-10 flex items-center justify-center">
              <svg className="w-12 h-12 text-cyan-400/80" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 17.93V17a3 3 0 0 0-3-3h-.5a1.5 1.5 0 0 1-1.5-1.5V11a2 2 0 0 0-2-2H4.07A8 8 0 0 1 12 4a8 8 0 0 1 8 8 7.94 7.94 0 0 1-2 5.19A3 3 0 0 0 13 19.93z"/>
              </svg>
            </div>

            <div className="w-full pb-1 z-10 font-sans">
              <p className="font-bold text-[9px] uppercase tracking-wider text-cyan-300">
                {book.author}
              </p>
            </div>
          </div>
        );

      case 'stars':
        return (
          <div className="w-full h-full bg-gradient-to-b from-[#2E1065] via-[#3B0764] to-[#1E1B4B] text-white p-2 flex flex-col justify-between items-center text-center font-serif select-none relative overflow-hidden">
            {/* Tiny stars */}
            <div className="absolute inset-0 bg-[radial-gradient(white,_rgba(255,255,255,0)_1px)] bg-[size:12px_12px] opacity-40"></div>
            
            <div className="w-full pt-1 z-10">
              <span className="block text-[6px] tracking-widest uppercase text-pink-300 font-sans">A ROMANCE</span>
              <h3 className="font-serif italic text-pink-100 leading-tight mt-1 text-[12px] md:text-sm">
                Beneath<br /><span className="text-[9px] font-sans font-normal not-italic tracking-wider uppercase text-pink-200">the</span><br /><span className="font-bold not-italic tracking-widest uppercase text-white">STARS</span>
              </h3>
            </div>

            {/* Couple / Moon silhouette */}
            <div className="my-auto z-10 flex items-center justify-center">
              <svg className="w-12 h-12 text-pink-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>

            <div className="w-full pb-1 z-10 font-sans">
              <p className="font-semibold text-[9px] uppercase tracking-wider text-pink-200">
                {book.author}
              </p>
            </div>
          </div>
        );

      case 'frontier':
        return (
          <div className="w-full h-full bg-[#050811] text-white p-2 flex flex-col justify-between items-center text-center font-sans select-none relative overflow-hidden border border-cyan-900/40">
            <div className="w-full pt-1 z-10">
              <h3 className="font-extrabold uppercase tracking-tight text-white leading-tight text-[11px] md:text-sm">
                THE<br />FINAL<br /><span className="text-cyan-400">FRONTIER</span>
              </h3>
            </div>

            {/* Planet and Rocket orbit */}
            <div className="my-auto z-10 flex items-center justify-center relative">
              <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="22" fill="#0284C7" />
                <ellipse cx="50" cy="50" rx="42" ry="14" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="4 2" transform="rotate(-25 50 50)" />
                <circle cx="78" cy="38" r="3" fill="#FBBF24" />
              </svg>
            </div>

            <div className="w-full pb-1 z-10">
              <p className="font-bold text-[8px] uppercase tracking-wider text-cyan-400">
                {book.author}
              </p>
            </div>
          </div>
        );

      case 'minimalism':
        return (
          <div className="w-full h-full bg-[#F59E0B] text-gray-950 p-2 flex flex-col justify-between items-center text-center font-sans select-none relative overflow-hidden">
            <div className="w-full pt-1">
              <h3 className="font-extrabold uppercase tracking-tight text-gray-950 leading-none text-[12px] md:text-[14px]">
                THE JOY OF<br />MINIMALISM
              </h3>
            </div>

            {/* Black arch shape matching the screenshot */}
            <div className="my-auto flex items-center justify-center">
              <svg className="w-14 h-14 text-gray-950" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <path d="M 20 85 L 20 50 A 30 30 0 0 1 80 50 L 80 85" strokeWidth="18" strokeLinecap="round" />
                <circle cx="50" cy="20" r="4" fill="currentColor" />
              </svg>
            </div>

            <div className="w-full pb-1">
              <p className="font-black text-[9px] uppercase tracking-widest text-gray-950">
                {book.author}
              </p>
              <p className="text-[6px] text-gray-800 font-medium leading-none mt-0.5">Simplify your life for clarity</p>
            </div>
          </div>
        );

      case 'house':
        return (
          <div className="w-full h-full bg-[#115E59] text-white p-2 flex flex-col justify-between items-center text-center font-serif select-none relative overflow-hidden">
            <div className="w-full pt-1 z-10">
              <span className="block text-[6px] tracking-widest uppercase text-teal-200 font-sans">THE NOVEL</span>
              <h3 className="font-bold uppercase tracking-tight text-white leading-tight mt-0.5 text-[11px] md:text-sm">
                THE<br />VANISHING<br />HOUSE
              </h3>
            </div>

            {/* Haunted house silhouette */}
            <div className="my-auto z-10 flex items-center justify-center">
              <svg className="w-12 h-12 text-teal-200/90" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 2.84L18 11v7h-2v-6H8v6H6v-7l6-5.16z"/>
              </svg>
            </div>

            <div className="w-full pb-1 z-10 font-sans">
              <p className="font-bold text-[8px] uppercase tracking-wider text-teal-200">
                {book.author}
              </p>
            </div>
          </div>
        );

      case 'kitten':
        return (
          <div className="w-full h-full bg-[#EA580C] text-white p-2 flex flex-col justify-between items-center text-center font-sans select-none relative overflow-hidden">
            <div className="w-full pt-1">
              <h3 className="font-extrabold uppercase tracking-tight text-white leading-tight text-[12px] md:text-sm">
                The Lost<br />Kitten
              </h3>
            </div>

            {/* Cute kitten graphic */}
            <div className="my-auto flex items-center justify-center">
              <svg className="w-12 h-12 text-amber-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>

            <div className="w-full pb-1">
              <p className="font-bold text-[9px] uppercase tracking-wider text-orange-200">
                {book.author}
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div
            className="w-full h-full p-2 flex flex-col justify-between items-center text-center font-sans select-none relative overflow-hidden"
            style={{
              backgroundColor: book.coverBgColor || '#1E293B',
              color: book.coverTextColor || '#FFFFFF'
            }}
          >
            <div className="w-full pt-1">
              <span className="block text-[6px] tracking-widest uppercase opacity-75">{book.format}</span>
              <h3 className="font-bold uppercase tracking-tight leading-tight mt-1 text-[11px] md:text-sm">
                {book.title}
              </h3>
            </div>

            <div className="my-auto flex items-center justify-center opacity-80">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
                <path d="M6 6h10"/>
                <path d="M6 10h10"/>
              </svg>
            </div>

            <div className="w-full pb-1">
              <p className="font-bold text-[8px] uppercase tracking-wider opacity-90">
                {book.author}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`relative rounded-md overflow-hidden flex-shrink-0 transition-transform duration-300 hover:scale-105 border border-white/10 ${sizeClasses} ${shadowClass} ${className}`}
    >
      {/* Book spine line styling */}
      <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-black/20 z-20 pointer-events-none"></div>
      <div className="absolute left-[4px] top-0 bottom-0 w-[1px] bg-white/20 z-20 pointer-events-none"></div>
      
      {renderContent()}
    </div>
  );
};
