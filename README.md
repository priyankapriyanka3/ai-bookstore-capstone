# 📚 Book Worm - Online Bookstore Platform

> **AI Specialist Capstone Project** developed using **IBM BOB** (Agentic IDE).

An enterprise-grade, responsive e-commerce bookstore web application built from scratch to match real-world design specifications, complete customer journeys, and agentic workflows.

---

## 🌟 Key Features & Customer Journeys

### 1. E-Store Home & Catalogue (Screenshots 9 & 10)
- **Dark Mode UI**: High-contrast, accessibility-focused sleek dark theme.
- **Top Navigation Bar**: Book Worm brand identity, quick links (`My Orders`, `My Wishlist`, `My Writers`), real-time cart item badge, reward point balance (`350 pts`), and profile management.
- **Multi-Category Sidebar**: Seamless genre browsing across 20 categories (*Romance, Mystery, Science Fiction, Fantasy, Historical, Biography, Self-help, Memoir, Travel, Cooking, Children's, Young Adult, Comics, Poetry, Drama, Science, Philosophy, Religion, Language Learning*).
- **Search & Intelligent Filter Bar**: Real-time title/author/synopsis search, Language selector (*English, Hindi, Spanish, French, German*), Format selector (*Paperback, Hard Cover, eBook, Audiobook*), Price Range filter, and Sort By options (*Relevance, Price, Rating, Popularity*).
- **Curated Showcases**:
  - ⭐ **Recommended for You**: *The Art of Focus*, *The Art of Learning*, *The Path to Success*
  - 🔥 **Bestsellers this Month**: *The Midnight Hour*, *Beneath the Stars*, *The Final Frontier*
  - 🚀 **New Launches**: *Joy of Minimalism*, *The Vanishing House*, *The Lost Kitten*
- **Tentative Delivery Badges**: Real-time delivery ETA tags (`Delivery by Mon, 21 Jul`) on all product cards.

### 2. Product Details Page (Screenshot 11)
- **Rich Product Presentation**: High-fidelity custom SVG book cover artwork, ISBN barcode generator, and publication metadata (*ABC Publishers*).
- **Author Bio & Quote Highlights**: Dedicated author showcase for Daniel Reed, Arjun Patel, and featured writers.
- **Interactive Reviews & Rating Module**: Community reviews, 5-star rating selector, and live review submission with character counter.
- **Related Reads Sidebar**: Real-time cross-sell / up-sell book recommendations with direct navigation.
- **Purchase Actions**: Direct "Add to Cart" and "Add to Wishlist" controls.

### 3. Shopping Cart & Address Selection (Screenshot 12)
- **Cart Management**: Real-time quantity increment/decrement (`[-] 1 [+]`), item removal, and subtotal calculation.
- **Saved Address Feature**: One-click saved address autofill or custom shipping details form (*First Name, Last Name, Street Address, City, Pin, +91 Phone, State, Country*).
- **Grand Total Calculation**: Dynamic item subtotal, tax calculation, free shipping indicator, coupon code engine (`BOB100`, `CAPSTONE20`), and **Gift Points Redemption** discount.

### 4. Secure Payment Gateway (Screenshot 13)
- Multi-channel payment modal with:
  - 💳 **Credit Card**: Card Number, Cardholder Name, CVV, Expiry Date with input masking.
  - 💳 **Debit Card**: Direct banking debit card processing.
  - 📱 **UPI**: Virtual Payment Address (VPA) and QR-code checkout.
  - 👛 **Digital Wallets**: Amazon Pay, Paytm Wallet, PhonePe, Mobikwik.
- 256-bit encrypted simulated checkout.

### 5. Order Confirmation & 48-Hour Cancellation (Screenshot 14)
- **Success Screen**: Green checkmark confirmation, order reference number (`BW-2026-XXXX`), itemized purchase recap, and quick continue shopping trigger.
- **48-Hour Cancellation Guarantee**: In accordance with the Capstone use-case specification, customers can cancel or modify orders within 48 hours for an instant full refund.

### 6. Order History & "Buy It Again" (Slide 5 Requirement #2)
- Complete historical order overview with status tracking (*Confirmed, Processing, Shipped, Delivered, Cancelled*).
- **"Buy It Again"**: One-click re-order functionality that re-populates the cart from any past order.
- Post-purchase recommendations based on order history.

---

## 🛠️ Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3 (Custom Dark Theme Extension)
- **Routing**: React Router DOM 6
- **Icons**: Lucide React
- **Architecture**: Context API + Custom Hooks (`StoreContext`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. Clone repository:
```bash
git clone https://github.com/priyankapriyanka3/ai-bookstore-capstone.git
cd ai-bookstore-capstone
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

---

## 📂 Project Architecture

```
ai-bookstore-capstone/
├── src/
│   ├── components/
│   │   ├── BookCard.tsx          # Product card with delivery tag and actions
│   │   ├── BookCover.tsx         # High-fidelity SVG/CSS cover renderer
│   │   ├── FilterBar.tsx         # Search and multi-criteria filters
│   │   ├── Footer.tsx            # Value propositions and footer links
│   │   ├── Header.tsx            # Top navigation, cart count & points badge
│   │   ├── OrderSuccessModal.tsx # Order confirmation with 48h cancel notice
│   │   ├── PaymentModal.tsx      # Credit, Debit, UPI, and Wallet checkout
│   │   ├── Sidebar.tsx           # Genre & Category navigation
│   │   └── StarRating.tsx        # Dynamic 5-star rating component
│   ├── context/
│   │   └── StoreContext.tsx      # Global store (Cart, Orders, Wishlist, User)
│   ├── data/
│   │   └── books.ts              # Catalog data, authors, reviews & categories
│   ├── pages/
│   │   ├── BookDetailPage.tsx    # Single book view with Related Reads
│   │   ├── CartCheckoutPage.tsx  # Cart, Address form, and Grand Total
│   │   ├── CatalogPage.tsx       # Home catalog (Recommended, Bestsellers, New)
│   │   ├── OrdersPage.tsx        # Order history with Buy Again & 48h Cancel
│   │   ├── WishlistPage.tsx      # Saved wishlist reads
│   │   └── WritersPage.tsx       # Featured authors directory
│   ├── types/
│   │   └── index.ts              # Full TypeScript type definitions
│   ├── App.tsx                   # Route definitions & layout
│   ├── index.css                 # Base Tailwind styles & dark theme scrollbars
│   └── main.tsx                  # Application entry point
├── index.html                    # Root HTML with Google Fonts
├── tailwind.config.js            # Tailwind color & font extensions
├── tsconfig.json                 # TypeScript compiler configuration
└── vite.config.ts                # Vite bundler configuration
```

---

## 👩‍💻 Developed For

**AI Specialist Capstone Project**  
Repository: [priyankapriyanka3/ai-bookstore-capstone](https://github.com/priyankapriyanka3/ai-bookstore-capstone)
