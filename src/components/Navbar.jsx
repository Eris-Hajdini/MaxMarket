import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, User, X, Menu, Heart, LogOut, ShieldCheck, PackageCheck, Sparkles } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Navbar({
  cartCount = 0,
  wishlistCount = 0,
  ordersCount = 0,
  pendingOrdersCount = 0,
  currentUser = null,
  hasClientOrders = false,
  categories = [],
  searchQuery = '',
  onSearchChange,
  onSelectCategory,
  activeCategory = 'all',
  currentPage = 'home',
  onNavigatePage,
  onOpenCart,
  onOpenWishlist,
  onOpenOrders,
  onOpenCustomerOrders,
  onOpenAuth,
  onLogout,
  onReplayIntro
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const searchInputRef = useRef(null);
  const isAdmin = currentUser && currentUser.role === 'admin';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        if (searchInputRef.current) searchInputRef.current.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // When clicking Logo: return to Home page and scroll upfront to the very top
  const handleLogoClick = () => {
    setMobileMenuOpen(false);
    if (onNavigatePage) onNavigatePage('home');
    if (onSelectCategory) onSelectCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Categories click: go to Home and scroll to Categories section
  const handleScrollToCategories = () => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home' && onNavigatePage) {
      onNavigatePage('home');
      setTimeout(() => {
        const el = document.getElementById('categories-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    } else {
      const el = document.getElementById('categories-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Products click: go to dedicated Products page with all products
  const handleGoToProducts = () => {
    setMobileMenuOpen(false);
    if (onSelectCategory) onSelectCategory('all');
    if (onNavigatePage) onNavigatePage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to Contact / Footer section
  const handleScrollToContact = () => {
    setMobileMenuOpen(false);
    const el = document.getElementById('footer-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="mz-header">
      {/* ── Top Announcement Bar ── */}
      <div className="mz-topbar">
        <div className="mz-topbar-left">
          <Sparkles size={13} style={{ color: '#f59e0b' }} />
          <span>Dërgesa në të gjithë Kosovën • Kthime të thjeshta</span>
        </div>
        <div className="mz-topbar-right">
          {currentUser && !isAdmin && hasClientOrders && (
            <button onClick={onOpenCustomerOrders} className="mz-topbar-link">
              <PackageCheck size={13} /> Porosia ime
            </button>
          )}
          {isAdmin && (
            <button onClick={onOpenOrders} className="mz-topbar-link">
              <ShieldCheck size={13} /> Paneli Admin
            </button>
          )}
          <span>Blerje 100% e sigurt</span>
        </div>
      </div>

      {/* ── Unified Single Header Bar: Logo (Upfront) | Categories, Products, Contacts | Search (Right) | Icons ── */}
      <div className="mz-mainbar">
        <div className="mz-mainbar-inner">
          {/* Mobile hamburger menu toggle */}
          <button className="mz-mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo on Left - Clicking goes upfront to the top */}
          <div className="mz-logo-wrap" title="Kthehu në fillim (Upfront)">
            <BrandLogo
              size={36}
              onClick={handleLogoClick}
            />
          </div>

          {/* 3 Main Header Links: Categories, Products, Contact */}
          <nav className="mz-unified-nav" aria-label="Main Navigation">
            <button
              className={`mz-nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={handleScrollToCategories}
              title="Categories"
            >
              Categories
            </button>
            <button
              className={`mz-nav-link ${currentPage === 'products' ? 'active' : ''}`}
              onClick={handleGoToProducts}
              title="Products"
            >
              Products
            </button>
            <button
              className="mz-nav-link"
              onClick={handleScrollToContact}
              title="Contact"
            >
              Contact
            </button>
          </nav>

          {/* Search bar pushed to the right */}
          <div className="mz-search-wrap mz-search-right">
            <Search size={16} className="mz-search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="mz-search-input"
              placeholder="Kërko produkte..."
              value={searchQuery}
              onChange={(e) => {
                if (onSearchChange) onSearchChange(e.target.value);
                if (e.target.value.trim().length > 0 && currentPage !== 'products' && onNavigatePage) {
                  onNavigatePage('products');
                }
              }}
            />
            {searchQuery && (
              <button className="mz-search-clear" onClick={() => onSearchChange && onSearchChange('')} aria-label="Fshij kërkimin">
                <X size={14} />
              </button>
            )}
          </div>

          {/* User Account, Wishlist & Cart Icons on the far right */}
          <div className="mz-icons-wrap">
            {/* User */}
            <div className="mz-icon-wrap" style={{ position: 'relative' }}>
              <button
                className="mz-icon-btn"
                onClick={() => currentUser ? setUserMenuOpen(!userMenuOpen) : onOpenAuth && onOpenAuth()}
                title={currentUser ? currentUser.name : 'Hyr / Regjistrohu'}
              >
                <User size={21} />
              </button>
              {userMenuOpen && currentUser && (
                <div className="mz-user-dropdown">
                  <div className="mz-user-name">{currentUser.name} {currentUser.surname}</div>
                  <div className="mz-user-email">{currentUser.email}</div>
                  <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #f1f1f1' }} />
                  <button className="mz-user-menu-btn" onClick={() => { setUserMenuOpen(false); onLogout && onLogout(); }}>
                    <LogOut size={14} /> Dil (Logout)
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button className="mz-icon-btn" onClick={onOpenWishlist} title="Lista e dëshirave">
              <Heart size={21} />
              {wishlistCount > 0 && <span className="mz-badge">{wishlistCount}</span>}
            </button>

            {/* Cart */}
            <button className="mz-icon-btn" onClick={onOpenCart} title="Shporta">
              <ShoppingBag size={21} />
              {cartCount > 0 && <span className="mz-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu drawer ── */}
      {mobileMenuOpen && (
        <div className="mz-mobile-menu">
          <button className="mz-catlink" onClick={handleLogoClick}>Home (Upfront)</button>
          <button className="mz-catlink" onClick={handleScrollToCategories}>Categories</button>
          <button className="mz-catlink" onClick={handleGoToProducts}>Products</button>
          <button className="mz-catlink" onClick={handleScrollToContact}>Contact</button>
          <hr style={{ margin: '8px 16px', border: 'none', borderTop: '1px solid #f1f1f1' }} />
          {!currentUser ? (
            <button className="mz-catlink" onClick={() => { setMobileMenuOpen(false); onOpenAuth && onOpenAuth(); }}>Hyr / Regjistrohu</button>
          ) : (
            <button className="mz-catlink" onClick={() => { setMobileMenuOpen(false); onLogout && onLogout(); }}>Dil (Logout)</button>
          )}
        </div>
      )}
    </header>
  );
}
