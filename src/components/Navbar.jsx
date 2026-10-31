import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Phone, 
  LogOut,
  ShieldCheck,
  Package,
  Truck,
  Menu, 
  X
} from 'lucide-react';

export default function Navbar({ 
  cartCount, 
  wishlistCount, 
  ordersCount,
  pendingOrdersCount,
  currentUser, 
  hasClientOrders,
  onOpenCart, 
  onOpenWishlist, 
  onOpenOrders,
  onOpenCustomerOrders,
  onOpenAuth, 
  onLogout,
  onReplayIntro 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isAdmin = currentUser && currentUser.role === 'admin';

  return (
    <header className="site-header">
      {/* Top Banner / Announcement */}
      <div className="top-bar">
        <div className="container top-bar-container">
          <div className="top-bar-left">
            <span className="live-pill">LIVE</span>
            <span className="top-bar-text">🚚 Dërgesa falas në tërë Kosovën mbi 30€ | Zbritje verore deri në 50%!</span>
          </div>
          <div className="top-bar-right">
            {/* Show "Porosia ime" ONLY when user is logged in as client and has orders */}
            {currentUser && !isAdmin && hasClientOrders && (
              <button onClick={onOpenCustomerOrders} className="client-track-top-link">
                <Truck size={14} className="truck-wiggle" />
                <span>Porosia ime</span>
              </button>
            )}
            <button onClick={onReplayIntro} className="replay-intro-link">
              ✨ Shiko Intro
            </button>
            <span className="divider">|</span>
            <a href="tel:+38344123456" className="top-link">
              <Phone size={13} /> +383 (44) 123 456
            </a>
            <span className="divider">|</span>
            <span className="top-link">Lista e Pajës</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="main-nav">
        <div className="container nav-content">
          {/* Mobile menu button */}
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Brand Logo */}
          <a href="#" className="main-brand" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="nav-logo-badge">
              <span className="badge-letter">M</span>
            </div>
            <div className="nav-brand-text">
              <span className="max-text">MAX</span>
              <span className="market-text">MARKET</span>
            </div>
          </a>

          {/* Search Box */}
          <div className="search-bar">
            <Search className="search-icon" size={19} />
            <input 
              type="text" 
              placeholder="Kërko produkte, marka, pjata, jorganë..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-submit">Kërko</button>
          </div>

          {/* Action Icons: Account, Wishlist, Cart & Admin Orders */}
          <div className="nav-actions">
            {/* If Admin is logged in, show POROSITË button */}
            {isAdmin && (
              <button 
                className="action-btn admin-orders-btn" 
                onClick={onOpenOrders}
                title="Shiko Porositë e Klientëve"
                id="porosite-btn"
              >
                <div className="icon-with-badge">
                  <Package size={22} />
                  {pendingOrdersCount > 0 ? (
                    <span className="counter-badge counter-orders pulse">{pendingOrdersCount}</span>
                  ) : ordersCount > 0 ? (
                    <span className="counter-badge counter-orders-subtle">{ordersCount}</span>
                  ) : null}
                </div>
                <span className="action-label bold text-admin">Porositë</span>
              </button>
            )}

            {/* If regular customer is LOGGED IN and has orders, show button to track their order */}
            {currentUser && !isAdmin && hasClientOrders && (
              <button 
                className="action-btn client-track-btn" 
                onClick={onOpenCustomerOrders}
                title="Gjurmo statusin e porosisë suaj"
              >
                <div className="icon-with-badge">
                  <Truck size={22} />
                  <span className="counter-badge counter-cart pulse">•</span>
                </div>
                <span className="action-label bold">Porosia ime</span>
              </button>
            )}

            {currentUser ? (
              <div className="user-logged-box">
                <div className={`user-badge-pill ${isAdmin ? 'is-admin' : ''}`}>
                  {isAdmin ? <ShieldCheck size={16} /> : <User size={16} />}
                  <span className="user-name-text">
                    {isAdmin ? 'Admin' : currentUser.name}
                  </span>
                </div>
                <button 
                  className="logout-mini-btn" 
                  onClick={onLogout}
                  title="Dil nga llogaria"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button className="action-btn" onClick={onOpenAuth} title="Llogaria ime" id="llogaria-btn">
                <User size={22} />
                <span className="action-label">Llogaria</span>
              </button>
            )}

            <button className="action-btn" onClick={onOpenWishlist} title="Lista e dëshirave">
              <div className="icon-with-badge">
                <Heart size={22} />
                {wishlistCount > 0 && <span className="counter-badge pulse">{wishlistCount}</span>}
              </div>
              <span className="action-label">Dëshirat</span>
            </button>

            <button className="action-btn cart-btn-highlight" onClick={onOpenCart} title="Shporta e blerjeve">
              <div className="icon-with-badge">
                <ShoppingBag size={22} />
                {cartCount > 0 && <span className="counter-badge counter-cart bounce">{cartCount}</span>}
              </div>
              <div className="cart-text-details">
                <span className="action-label bold">Shporta</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Categories secondary bar */}
      <div className={`categories-subnav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="container subnav-links">
          <a href="#products-section" className="subnav-link">PRODUKTET</a>
          <a href="#kitchen" className="subnav-link">KUZHINË</a>
          <a href="#bedding" className="subnav-link">TEKSTIL & SHTRAT</a>
          <a href="#decor" className="subnav-link">DEKOR & SALON</a>
          <a href="#bath" className="subnav-link">BANJË</a>
          <a href="#paje" className="subnav-link highlight-link">LISTA E PAJËS</a>
          <a href="#offers" className="subnav-link sale-tag">ZBRITJE %</a>
        </div>
      </div>
    </header>
  );
}
