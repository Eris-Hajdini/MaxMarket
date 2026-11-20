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

  // Standard Albanian categories mapping
  const albanianCategories = [
    { id: 'kitchen', name: 'Kuzhina' },
    { id: 'home', name: 'Shtëpia' },
    { id: 'storage', name: 'Organizim' },
    { id: 'cleaning', name: 'Pastrimi' },
    { id: 'decor', name: 'Dekori' },
    { id: 'offers', name: 'Ofertat' }
  ];

  const navLinks = (categories && categories.length > 0
    ? categories.filter(c => c.id !== 'all').map(c => {
        // Map common IDs to clean Albanian names
        if (c.id === 'kitchen' || c.id === 'kuhinja') return { ...c, name: 'Kuzhina' };
        if (c.id === 'home' || c.id === 'shtepia') return { ...c, name: 'Shtëpia' };
        if (c.id === 'storage' || c.id === 'organizim') return { ...c, name: 'Organizim' };
        if (c.id === 'cleaning' || c.id === 'pastrimi') return { ...c, name: 'Pastrimi' };
        if (c.id === 'decor') return { ...c, name: 'Dekori' };
        if (c.id === 'offers') return { ...c, name: 'Ofertat' };
        return c;
      })
    : albanianCategories
  );

  const handleCategoryClick = (catId) => {
    if (onSelectCategory) onSelectCategory(catId);
    setMobileMenuOpen(false);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="mz-header">
      {/* ── Top Announcement Bar (Free delivery removed, Albanian text) ── */}
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

      {/* ── Unified Single Header Bar: Logo | Category Nav Links | Search (Right) | Icons ── */}
      <div className="mz-mainbar">
        <div className="mz-mainbar-inner">
          {/* Mobile menu hamburger toggle */}
          <button className="mz-mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo on Left */}
          <div className="mz-logo-wrap">
            <BrandLogo
              size={36}
              onClick={() => {
                if (onSelectCategory) onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>

          {/* Unified Category Navigation Links directly inside Header */}
          <nav className="mz-unified-nav" aria-label="Kategoritë kryesore">
            <button
              className={`mz-nav-link ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('all')}
            >
              Kreu
            </button>
            {navLinks.map(cat => (
              <button
                key={cat.id}
                className={`mz-nav-link ${activeCategory === cat.id ? 'active' : ''} ${cat.id === 'offers' ? 'offers' : ''}`}
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.name}
              </button>
            ))}
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
                if (e.target.value.trim().length > 1) {
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
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
          <button className={`mz-catlink ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => handleCategoryClick('all')}>Kreu</button>
          {navLinks.map(cat => (
            <button key={cat.id} className={`mz-catlink ${activeCategory === cat.id ? 'active' : ''} ${cat.id === 'offers' ? 'offers' : ''}`} onClick={() => handleCategoryClick(cat.id)}>
              {cat.name}
            </button>
          ))}
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
