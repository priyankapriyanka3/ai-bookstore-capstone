export type BookFormat = 'Paperback' | 'Hard Cover' | 'eBook' | 'Audiobook';

export type BookCategory =
  | 'All'
  | 'Romance'
  | 'Mystery'
  | 'Science Fiction'
  | 'Fantasy'
  | 'Historical'
  | 'Biography'
  | 'Self-help'
  | 'Memoir'
  | 'Travel'
  | 'Cooking'
  | 'Children\'s'
  | 'Young Adult'
  | 'Comics & Graphic Novels'
  | 'Poetry'
  | 'Drama'
  | 'Science'
  | 'Philosophy'
  | 'Religion'
  | 'Language Learning';

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  booksCount: number;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorId?: string;
  price: number;
  originalPrice?: number;
  format: BookFormat;
  category: string; // e.g. "Non-fiction, Self Help"
  mainCategory: BookCategory;
  deliveryDate: string; // e.g. "Delivery by Mon, 21 Jul"
  rating: number;
  ratingCount: number;
  soldCount: number;
  language: string;
  publisher: string;
  isbn: string;
  quote?: string;
  description: string;
  coverBgColor?: string;
  coverTextColor?: string;
  coverPattern?: 'focus' | 'learning' | 'success' | 'midnight' | 'stars' | 'frontier' | 'minimalism' | 'house' | 'kitten' | 'custom';
  coverTheme?: string;
  coverAccent?: string;
  badge?: 'Recommended' | 'Bestseller' | 'New Launch' | 'Trending';
  featuredIn?: ('recommended' | 'bestsellers' | 'new_launches')[];
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  email: string;
  city: string;
  pin: string;
  countryCode: string;
  phone: string;
  state: string;
  country: string;
}

export interface OrderItem {
  book: Book;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  discount: number;
  giftPointsUsed: number;
  total: number;
  shippingAddress: Address;
  paymentMethod: 'Credit Card' | 'Debit Card' | 'UPI' | 'Wallet';
  paymentDetails?: {
    lastFourDigits?: string;
    upiId?: string;
    walletName?: string;
  };
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  canCancelUntil: string; // ISO date string (48 hrs from creation)
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isMember: boolean;
  giftPoints: number;
  savedAddress: Address;
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: BookCategory;
  language: string;
  format: string;
  priceRange: string;
  sortBy: string;
}
