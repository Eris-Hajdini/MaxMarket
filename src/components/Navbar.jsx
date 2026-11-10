import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ShoppingBag, 
  User, 
  ChevronDown, 
  X, 
  Menu, 
  Truck, 
  ShieldCheck, 
  LogOut, 
  Heart,
  PackageCheck
} from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Navbar({ 
  cartCount = 0, 
  wishlistCount = 0, 
  ordersCount = 0,
  pendingOrdersCount = 0,
  currentUser = null, 
  hasClientOrders = false,
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
  const [bannerVisible, setBannerVisible] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const searchInputRef = useRef(null);

  const isAdmin = currentUser && currentUser.role === 'admin';

  // Keyboard shortcut '/' to focus search bar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navCategories = [
    { 
      id: 'kuhinja', 
      label: 'Kuhinja',
      subitems: ['Sete enësh qelqi', 'Tiganë & Tenxhere', 'Vegla gatimi', 'Kristal & Servirje']
    },
    { 
      id: 'organizim', 
      label: 'Organizim & Ruajtje',
      subitems: ['Shporta rrobash', 'Organizues kuzhine', 'Kuti & Ndarëse', 'Rafta muri']
    },
    { 
      id: 'shtepia', 
      label: 'Shtëpia',
      subitems: ['Vazo dekorative', 'Tekstil & Jastëkë', 'Pllaka druri & Servirje', 'Aromatikë']
    },
    { 
      id: 'pastrimi', 
      label: 'Pastrimi',
      subitems: ['Shishe spërkatëse qelqi', 'Lecka mikrofibër organike', 'Furça druri natyrale', 'Kova & Aksesorë']
    }
  ];

  const handleCategoryClick = (catId) => {
    if (onSelectCategory) onSelectCategory(catId);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="clean-header-root">
      {/* Top Banner (Dark Forest Green matching screenshot) */}
      {bannerVisible && (
        <div className="clean-top-announcement">
          <div className="container announcement-inner">
            <div className="announcement-content">
              <span className="announcement-truck">🚚</span>
              <span className="announcement-text">
                Dërgesë falas për porosi mbi 50 €
              </span>
            </div>

            <div className="announcement-right-tools">
              {currentUser && !isAdmin && hasClientOrders && (
                <button 
                  onClick={onOpenCustomerOrders} 
                  className="announcement-track-btn"
                  title="Gjurmo porosinë tuaj"
                >
                  <Truck size={13} />
                  <span>Porosia ime</span>
                </button>
              )}
              {isAdmin && (
                <button 
                  onClick={onOpenOrders} 
                  className="announcement-admin-link"
                  title="Hap Panelin e Administratorit"
                >
                  <ShieldCheck size={13} />
                  <span>Paneli Admin</span>
                </button>
              )}
              <button 
                className="announcement-close-btn" 
                onClick={() => setBannerVisible(false)}
                aria-label="Mbyll njoftimin"
                title="Mbyll"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Clean Header Bar */}
      <div className="clean-main-nav">
        <div className="container clean-nav-inner">
          {/* Mobile hamburger menu toggle */}
          <button 
            className="clean-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo on Left */}
          <div className="clean-logo-container">
            <BrandLogo 
              size={28} 
              color="#1a3b32" 
              textColor="#1a3b32" 
              onClick={() => {
                if (onSelectCategory) onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
            />
          </div>

          {/* Categories Navigation with Dropdowns */}
          <nav className="clean-category-nav" aria-label="Main Navigation">
            {navCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const isDropdownOpen = activeDropdown === cat.id;

              return (
                <div 
                  key={cat.id} 
                  className="clean-nav-item-wrap"
                  onMouseEnter={() => setActiveDropdown(cat.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={`clean-nav-link ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleCategoryClick(cat.id)}
                  >
                    <span>{cat.label}</span>
                    <ChevronDown size={14} className={`caret-icon ${isDropdownOpen ? 'rotated' : ''}`} />
                  </button>

                  {/* Dropdown Menu on hover/click */}
                  {isDropdownOpen && (
                    <div className="clean-nav-dropdown-menu">
                      <div className="dropdown-header">
                        <strong>{cat.label}</strong>
                        <button 
                          className="dropdown-all-btn"
                          onClick={() => handleCategoryClick(cat.id)}
                        >
                          Shiko të gjitha →
                        </button>
                      </div>
                      <div className="dropdown-subitems-grid">
                        {cat.subitems.map((sub, idx) => (
                          <button
                            key={idx}
                            className="dropdown-subitem-link"
                            onClick={() => {
                              if (onSearchChange) onSearchChange(sub);
                              handleCategoryClick(cat.id);
                            }}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Search Bar with '/' Shortcut */}
          <div className="clean-search-wrapper">
            <Search size={16} className="clean-search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="clean-search-input"
              placeholder="Kërko produkte..."
              value={searchQuery}
              onChange={(e) => {
                if (onSearchChange) onSearchChange(e.target.value);
                const el = document.getElementById('products-section');
                if (el && e.target.value.trim().length > 1) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
            {searchQuery ? (
              <button 
                className="clean-search-clear-btn" 
                onClick={() => onSearchChange && onSearchChange('')}
                aria-label="Fshij kërkimin"
              >
                <X size={14} />
              </button>
            ) : (
              <span className="clean-search-shortcut-badge" title="Shtyp '/' për të kërkuar">/</span>
            )}
          </div>

          {/* Right Action Icons: User Account & Cart */}
          <div className="clean-actions-wrapper">
            {/* Wishlist Link (Quick accessible) */}
            <button 
              className="clean-action-btn clean-wishlist-btn" 
              onClick={onOpenWishlist}
              title="Lista e dëshirave"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="clean-badge-counter">{wishlistCount}</span>
              )}
            </button>

            {/* User Account / Profile */}
            <div className="clean-user-dropdown-container">
              <button 
                className={`clean-action-btn clean-user-btn ${currentUser ? 'user-logged-in' : ''}`}
                onClick={() => {
                  if (currentUser) {
                    setUserMenuOpen(!userMenuOpen);
                  } else {
                    onOpenAuth();
                  }
                }}
                title={currentUser ? (isAdmin ? 'Paneli Admin' : currentUser.name) : 'Hyr / Regjistrohu'}
              >
                {isAdmin ? <ShieldCheck size={20} color="#1b4332" /> : <User size={20} />}
                {currentUser && (
                  <span className="clean-user-firstname">
                    {isAdmin ? 'Admin' : currentUser.name.split(' ')[0]}
                  </span>
                )}
              </button>

              {/* User dropdown if logged in */}
              {currentUser && userMenuOpen && (
                <div className="clean-user-popup-menu">
                  <div className="user-popup-header">
                    <strong>{currentUser.name}</strong>
                    <span>{currentUser.email}</span>
                  </div>
                  <div className="user-popup-divider" />
                  
                  {isAdmin && (
                    <button 
                      className="user-popup-item text-green"
                      onClick={() => { setUserMenuOpen(false); onOpenOrders(); }}
                    >
                      <ShieldCheck size={16} />
                      <span>Paneli i Menaxhimit (Admin)</span>
                    </button>
                  )}

                  {!isAdmin && hasClientOrders && (
                    <button 
                      className="user-popup-item"
                      onClick={() => { setUserMenuOpen(false); onOpenCustomerOrders(); }}
                    >
                      <PackageCheck size={16} />
                      <span>Porositë e Mia</span>
                    </button>
                  )}

                  <button 
                    className="user-popup-item"
                    onClick={() => { setUserMenuOpen(false); onReplayIntro(); }}
                  >
                    <span>✨ Shiko Intro</span>
                  </button>

                  <div className="user-popup-divider" />

                  <button 
                    className="user-popup-item text-danger"
                    onClick={() => { setUserMenuOpen(false); onLogout(); }}
                  >
                    <LogOut size={16} />
                    <span>Dil nga llogaria</span>
                  </button>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button 
              className="clean-action-btn clean-cart-btn" 
              onClick={onOpenCart}
              title="Shporta e blerjeve"
            >
              <ShoppingBag size={21} />
              {cartCount > 0 && (
                <span className="clean-cart-badge">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="clean-mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="clean-mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <BrandLogo size={24} color="#1a3b32" textColor="#1a3b32" />
              <button 
                className="drawer-close-btn" 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Mbyll"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="mobile-search-box">
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Kërko produkte..." 
                value={searchQuery}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              />
            </div>

            {/* Mobile Categories Links */}
            <div className="mobile-drawer-links">
              <button 
                className={`drawer-link ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryClick('all')}
              >
                Të gjitha
              </button>
              {navCategories.map((c) => (
                <button
                  key={c.id}
                  className={`drawer-link ${activeCategory === c.id ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(c.id)}
                >
                  {c.label}
                </button>
              ))}
              <button 
                className={`drawer-link text-offers ${activeCategory === 'offers' ? 'active' : ''}`}
                onClick={() => handleCategoryClick('offers')}
              >
                Vetëm Ofertat (% Zbritje)
              </button>

              <div style={{ height: '1px', background: '#f1f5f9', margin: '8px 0' }} />

              <button 
                className="drawer-link"
                onClick={() => { setMobileMenuOpen(false); onOpenWishlist(); }}
              >
                ❤️ Të Preferuarat ({wishlistCount})
              </button>

              <button 
                className="drawer-link"
                onClick={() => { setMobileMenuOpen(false); onOpenCart(); }}
              >
                🛒 Shporta ({cartCount})
              </button>
            </div>

            <div className="drawer-footer-actions">
              {currentUser ? (
                <>
                  <div className="drawer-user-info">
                    <User size={18} />
                    <span>{currentUser.name} ({currentUser.role})</span>
                  </div>
                  {isAdmin && (
                    <button className="drawer-action-btn" onClick={() => { setMobileMenuOpen(false); onOpenOrders(); }}>
                      <ShieldCheck size={18} /> Paneli Admin
                    </button>
                  )}
                  <button className="drawer-action-btn text-danger" onClick={() => { setMobileMenuOpen(false); onLogout(); }}>
                    <LogOut size={18} /> Dil nga llogaria
                  </button>
                </>
              ) : (
                <button className="drawer-action-btn primary" onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}>
                  <User size={18} /> Hyr në Llogari
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
