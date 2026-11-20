import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, User, X, Menu, Heart, LogOut, ShieldCheck, Truck, PackageCheck } from 'lucide-react';
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

  const navLinks = (categories && categories.length > 0 ? categories : [
    { id: 'kitchen', name: 'Kitchen' },
    { id: 'home', name: 'Home & Living' },
    { id: 'storage', name: 'Storage' },
    { id: 'cleaning', name: 'Cleaning' },
    { id: 'decor', name: 'Decor' },
    { id: 'offers', name: 'Offers' }
  ]).filter(c => c.id !== 'all');

  const handleCategoryClick = (catId) => {
    if (onSelectCategory) onSelectCategory(catId);
    setMobileMenuOpen(false);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="mz-header">
      {/* ── Top black announcement bar ── */}
      <div className="mz-topbar">
        <div className="mz-topbar-left">
          <Truck size={14} />
          <span>Free delivery on orders over €50</span>
        </div>
        <div className="mz-topbar-right">
          {currentUser && !isAdmin && hasClientOrders && (
            <button onClick={onOpenCustomerOrders} className="mz-topbar-link">
              <PackageCheck size={13} /> Porosia ime
            </button>
          )}
          {isAdmin && (
            <button onClick={onOpenOrders} className="mz-topbar-link">
              <ShieldCheck size={13} /> Admin Panel
            </button>
          )}
          <span>Easy returns • Secure checkout</span>
        </div>
      </div>

      {/* ── Main header: logo | search | icons ── */}
      <div className="mz-mainbar">
        <div className="mz-mainbar-inner">
          {/* Mobile toggle */}
          <button className="mz-mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <div className="mz-logo-wrap">
            <BrandLogo
              size={36}
              onClick={() => {
                if (onSelectCategory) onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>

          {/* Search bar – center */}
          <div className="mz-search-wrap">
            <Search size={16} className="mz-search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="mz-search-input"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => {
                if (onSearchChange) onSearchChange(e.target.value);
                if (e.target.value.trim().length > 1) {
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
            {searchQuery && (
              <button className="mz-search-clear" onClick={() => onSearchChange && onSearchChange('')}>
                <X size={14} />
              </button>
            )}
          </div>

          {/* Right icons */}
          <div className="mz-icons-wrap">
            {/* User */}
            <div className="mz-icon-wrap" style={{ position: 'relative' }}>
              <button
                className="mz-icon-btn"
                onClick={() => currentUser ? setUserMenuOpen(!userMenuOpen) : onOpenAuth && onOpenAuth()}
                title={currentUser ? currentUser.name : 'Hyr / Regjistrohu'}
              >
                <User size={22} />
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
              <Heart size={22} />
              {wishlistCount > 0 && <span className="mz-badge">{wishlistCount}</span>}
            </button>

            {/* Cart */}
            <button className="mz-icon-btn" onClick={onOpenCart} title="Shporta">
              <ShoppingBag size={22} />
              {cartCount > 0 && <span className="mz-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* ── Category nav bar ── */}
      <div className="mz-catbar">
        <div className="mz-catbar-inner">
          {/* Home link */}
          <button
            className={`mz-catlink ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('all')}
          >
            Home
          </button>
          {navLinks.map(cat => (
            <button
              key={cat.id}
              className={`mz-catlink ${activeCategory === cat.id ? 'active' : ''} ${cat.id === 'offers' ? 'offers' : ''}`}
              onClick={() => handleCategoryClick(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileMenuOpen && (
        <div className="mz-mobile-menu">
          <button className="mz-catlink" onClick={() => handleCategoryClick('all')}>Home</button>
          {navLinks.map(cat => (
            <button key={cat.id} className={`mz-catlink ${cat.id === 'offers' ? 'offers' : ''}`} onClick={() => handleCategoryClick(cat.id)}>
              {cat.name}
            </button>
          ))}
          {!currentUser && (
            <button className="mz-catlink" onClick={() => { setMobileMenuOpen(false); onOpenAuth && onOpenAuth(); }}>Hyr / Regjistrohu</button>
          )}
          {currentUser && (
            <button className="mz-catlink" onClick={() => { setMobileMenuOpen(false); onLogout && onLogout(); }}>Dil (Logout)</button>
          )}
        </div>
      )}
    </header>
  );
}
