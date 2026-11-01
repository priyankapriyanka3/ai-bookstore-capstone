import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CatalogPage } from './pages/CatalogPage';
import { BookDetailPage } from './pages/BookDetailPage';
import { CartCheckoutPage } from './pages/CartCheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { WishlistPage } from './pages/WishlistPage';
import { WritersPage } from './pages/WritersPage';

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#0F1217] text-gray-200">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<CatalogPage />} />
              <Route path="/book/:slug" element={<BookDetailPage />} />
              <Route path="/cart" element={<CartCheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/writers" element={<WritersPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;
