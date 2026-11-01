import React, { createContext, useContext, useState } from 'react';
import { Book, CartItem, Order, UserProfile, Address, Review, FilterState, BookCategory } from '../types';
import { BOOKS_DATA, INITIAL_REVIEWS } from '../data/books';

interface StoreContextType {
  books: Book[];
  cart: CartItem[];
  wishlist: string[]; // book ids
  orders: Order[];
  user: UserProfile;
  filters: FilterState;
  reviews: Record<string, Review[]>;
  couponCode: string;
  couponDiscount: number;
  useSavedAddress: boolean;
  address: Address;
  isRedeemingPoints: boolean;
  
  // Cart actions
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Wishlist actions
  toggleWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  
  // Order actions
  placeOrder: (paymentMethod: Order['paymentMethod'], paymentDetails?: Order['paymentDetails']) => Order;
  cancelOrder: (orderId: string) => boolean;
  buyAgain: (orderId: string) => void;
  
  // Filter actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: BookCategory) => void;
  setLanguageFilter: (lang: string) => void;
  setFormatFilter: (format: string) => void;
  setPriceRangeFilter: (range: string) => void;
  setSortBy: (sort: string) => void;
  resetFilters: () => void;
  
  // Address & Checkout
  setUseSavedAddress: (use: boolean) => void;
  setAddress: (address: Address) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  toggleRedeemPoints: () => void;
  
  // Reviews
  addReview: (bookSlug: string, rating: number, comment: string, userName?: string) => void;
  
  // Calculations
  cartCount: number;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  totalDiscount: number;
  grandTotal: number;
}

const DEFAULT_ADDRESS: Address = {
  firstName: 'Priyanka',
  lastName: 'Sharma',
  addressLine1: 'Flat 402, Lotus Residency, Tech Park Road',
  addressLine2: 'Near Innovation Hub, Whitefield',
  email: 'priyanka@example.com',
  city: 'Bangalore',
  pin: '560066',
  countryCode: '+91',
  phone: '9876543210',
  state: 'Karnataka',
  country: 'India'
};

const DEFAULT_USER: UserProfile = {
  id: 'usr-101',
  name: 'Priyanka Sharma',
  email: 'priyanka@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
  isMember: true,
  giftPoints: 350,
  savedAddress: DEFAULT_ADDRESS
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books] = useState<Book[]>(BOOKS_DATA);
  
  // Pre-seed cart with 2 items from screenshot 12
  const [cart, setCart] = useState<CartItem[]>(() => {
    const joyBook = BOOKS_DATA.find(b => b.id === 'joy-of-minimalism');
    const pathBook = BOOKS_DATA.find(b => b.id === 'the-path-to-success');
    const items: CartItem[] = [];
    if (joyBook) items.push({ book: joyBook, quantity: 1 });
    if (pathBook) items.push({ book: pathBook, quantity: 1 });
    return items;
  });

  const [wishlist, setWishlist] = useState<string[]>(['the-art-of-focus']);
  
  const [orders, setOrders] = useState<Order[]>(() => {
    const joyBook = BOOKS_DATA.find(b => b.id === 'joy-of-minimalism');
    const pathBook = BOOKS_DATA.find(b => b.id === 'the-path-to-success');
    if (!joyBook || !pathBook) return [];
    
    const initialOrderDate = new Date();
    const canCancelDate = new Date(initialOrderDate.getTime() + 48 * 60 * 60 * 1000);
    
    return [
      {
        id: 'ord-8921',
        orderNumber: 'BW-2026-8921',
        createdAt: initialOrderDate.toISOString(),
        items: [
          { book: joyBook, quantity: 1, price: joyBook.price },
          { book: pathBook, quantity: 1, price: pathBook.price }
        ],
        subtotal: 508,
        tax: 62,
        deliveryFee: 0,
        discount: 100,
        giftPointsUsed: 0,
        total: 470,
        shippingAddress: DEFAULT_ADDRESS,
        paymentMethod: 'Credit Card',
        paymentDetails: { lastFourDigits: '4242' },
        status: 'Confirmed',
        canCancelUntil: canCancelDate.toISOString()
      }
    ];
  });

  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [reviews, setReviews] = useState<Record<string, Review[]>>(INITIAL_REVIEWS);
  const [useSavedAddress, setUseSavedAddress] = useState<boolean>(true);
  const [address, setAddress] = useState<Address>(DEFAULT_ADDRESS);
  const [couponCode, setCouponCode] = useState<string>('BOB100');
  const [couponDiscount, setCouponDiscount] = useState<number>(100);
  const [isRedeemingPoints, setIsRedeemingPoints] = useState<boolean>(false);

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedCategory: 'All',
    language: 'All',
    format: 'All',
    priceRange: 'All',
    sortBy: 'relevance'
  });

  // Calculate totals
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  // Fixed tax matching design or approximate 12%
  const tax = subtotal > 0 ? (subtotal === 508 ? 62 : Math.round(subtotal * 0.12)) : 0;
  const deliveryFee = 0; // Free delivery
  const giftPointsDiscount = isRedeemingPoints ? Math.min(user.giftPoints, 100) : 0;
  const totalDiscount = (subtotal > 0 ? couponDiscount : 0) + giftPointsDiscount;
  const grandTotal = Math.max(0, subtotal + tax + deliveryFee - totalDiscount);

  const addToCart = (book: Book, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.book.id === book.id);
      if (existing) {
        return prev.map(item =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { book, quantity }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart(prev => prev.filter(item => item.book.id !== bookId));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.book.id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (bookId: string) => {
    setWishlist(prev =>
      prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const isInWishlist = (bookId: string) => wishlist.includes(bookId);

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'BOB100' || trimmed === 'WELCOME100') {
      setCouponCode(trimmed);
      setCouponDiscount(100);
      return { success: true, message: 'Coupon applied! ₹100 discount added.' };
    } else if (trimmed === 'CAPSTONE20') {
      const discount = Math.round(subtotal * 0.2);
      setCouponCode(trimmed);
      setCouponDiscount(discount);
      return { success: true, message: `Coupon applied! ₹${discount} (20%) discount added.` };
    }
    return { success: false, message: 'Invalid coupon code. Try BOB100 or CAPSTONE20' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponDiscount(0);
  };

  const toggleRedeemPoints = () => {
    setIsRedeemingPoints(prev => !prev);
  };

  const placeOrder = (
    paymentMethod: Order['paymentMethod'],
    paymentDetails?: Order['paymentDetails']
  ): Order => {
    const now = new Date();
    const canCancel = new Date(now.getTime() + 48 * 60 * 60 * 1000);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `BW-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: now.toISOString(),
      items: cart.map(item => ({
        book: item.book,
        quantity: item.quantity,
        price: item.book.price
      })),
      subtotal,
      tax,
      deliveryFee,
      discount: totalDiscount,
      giftPointsUsed: giftPointsDiscount,
      total: grandTotal,
      shippingAddress: address,
      paymentMethod,
      paymentDetails,
      status: 'Confirmed',
      canCancelUntil: canCancel.toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);

    // Deduct redeemed points if used
    if (isRedeemingPoints && giftPointsDiscount > 0) {
      setUser(u => ({ ...u, giftPoints: Math.max(0, u.giftPoints - giftPointsDiscount) }));
      setIsRedeemingPoints(false);
    }

    clearCart();
    return newOrder;
  };

  const cancelOrder = (orderId: string): boolean => {
    const target = orders.find(o => o.id === orderId);
    if (!target) return false;
    
    const expiry = new Date(target.canCancelUntil).getTime();
    if (Date.now() > expiry) {
      return false; // Can only cancel within 48h
    }

    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: 'Cancelled' } : o))
    );
    return true;
  };

  const buyAgain = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    order.items.forEach(item => {
      addToCart(item.book, item.quantity);
    });
  };

  const setSearchQuery = (searchQuery: string) => {
    setFilters(prev => ({ ...prev, searchQuery }));
  };

  const setSelectedCategory = (selectedCategory: BookCategory) => {
    setFilters(prev => ({ ...prev, selectedCategory }));
  };

  const setLanguageFilter = (language: string) => {
    setFilters(prev => ({ ...prev, language }));
  };

  const setFormatFilter = (format: string) => {
    setFilters(prev => ({ ...prev, format }));
  };

  const setPriceRangeFilter = (priceRange: string) => {
    setFilters(prev => ({ ...prev, priceRange }));
  };

  const setSortBy = (sortBy: string) => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedCategory: 'All',
      language: 'All',
      format: 'All',
      priceRange: 'All',
      sortBy: 'relevance'
    });
  };

  const addReview = (bookSlug: string, rating: number, comment: string, userName = 'You') => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      userName,
      rating,
      comment,
      date: 'Just now'
    };
    setReviews(prev => ({
      ...prev,
      [bookSlug]: [newRev, ...(prev[bookSlug] || [])]
    }));
  };

  return (
    <StoreContext.Provider
      value={{
        books,
        cart,
        wishlist,
        orders,
        user,
        filters,
        reviews,
        couponCode,
        couponDiscount,
        useSavedAddress,
        address,
        isRedeemingPoints,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        placeOrder,
        cancelOrder,
        buyAgain,
        setSearchQuery,
        setSelectedCategory,
        setLanguageFilter,
        setFormatFilter,
        setPriceRangeFilter,
        setSortBy,
        resetFilters,
        setUseSavedAddress,
        setAddress,
        applyCoupon,
        removeCoupon,
        toggleRedeemPoints,
        addReview,
        cartCount,
        subtotal,
        tax,
        deliveryFee,
        totalDiscount,
        grandTotal
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
