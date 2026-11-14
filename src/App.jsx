import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CleanHero from './components/CleanHero';
import CategoryCardsStrip from './components/CategoryCardsStrip';
import ProductCard from './components/ProductCard';
import TrustFeaturesStrip from './components/TrustFeaturesStrip';
import CartModal from './components/CartModal';
import WishlistModal from './components/WishlistModal';
import QuickViewModal from './components/QuickViewModal';
import AuthModal from './components/AuthModal';
import AddProductModal from './components/AddProductModal';
import EditProductModal from './components/EditProductModal';
import EditProductSelectorModal from './components/EditProductSelectorModal';
import CheckoutModal from './components/CheckoutModal';
import OrdersModal from './components/OrdersModal';
import CustomerOrdersModal from './components/CustomerOrdersModal';
import Footer from './components/Footer';
import LogoIntro from './components/LogoIntro';
import AdminDashboard from './components/AdminDashboard';
import { PRODUCTS as initialProducts, CATEGORIES } from './data';
import { Sparkles, ArrowRight, PlusCircle, ShieldCheck, Edit3, Truck, LayoutDashboard } from 'lucide-react';

const STORAGE_KEY = 'maxmarket_products_v3';
const ORDERS_STORAGE_KEY = 'maxmarket_orders_list_v1';
const CATEGORIES_STORAGE_KEY = 'maxmarket_categories_v3';
const USER_STORAGE_KEY = 'maxmarket_auth_user_v2';
const VIEW_MODE_STORAGE_KEY = 'maxmarket_auth_view_v2';

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  const [viewMode, setViewMode] = useState(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed?.role === 'admin') return 'admin';
      }
      const savedMode = localStorage.getItem(VIEW_MODE_STORAGE_KEY);
      if (savedMode) return savedMode;
    } catch (e) {}
    return 'store';
  });

  const [showIntro, setShowIntro] = useState(() => {
    try {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed?.role === 'admin') return false;
      }
    } catch (e) {}
    return true;
  });

  const [isLoginIntro, setIsLoginIntro] = useState(false);
  const [loginUser, setLoginUser] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Persist user & view mode
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {}
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(VIEW_MODE_STORAGE_KEY, viewMode);
    } catch (e) {}
  }, [viewMode]);

  // Load categories from localStorage if available, otherwise initial CATEGORIES
  const [categoriesList, setCategoriesList] = useState(() => {
    try {
      const saved = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Could not load stored categories", e);
    }
    return CATEGORIES;
  });

  // Save categories to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categoriesList));
    } catch (e) {
      console.error("Could not save categories to localStorage", e);
    }
  }, [categoriesList]);

  const handleAddCategory = (newCat) => {
    setCategoriesList((prev) => {
      if (prev.some((c) => c.id === newCat.id)) return prev;
      return [...prev, newCat];
    });
  };

  // Load products from localStorage if available, otherwise initialProducts
  const [productsList, setProductsList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p, idx) => ({
            ...p,
            stock: typeof p.stock === 'number' ? p.stock : (35 + ((idx * 9) % 25))
          }));
        }
      }
    } catch (e) {
      console.error("Could not load stored products", e);
    }
    return initialProducts.map((p, idx) => ({
      ...p,
      stock: typeof p.stock === 'number' ? p.stock : (35 + ((idx * 9) % 25))
    }));
  });

  // Load orders from localStorage
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Could not load stored orders", e);
    }
    return [];
  });

  // Save products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productsList));
    } catch (e) {
      console.error("Could not save products to localStorage", e);
    }
  }, [productsList]);

  // Save orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error("Could not save orders to localStorage", e);
    }
  }, [orders]);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isCustomerOrdersOpen, setIsCustomerOrdersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Authentication & Admin State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Cart operations
  const handleAddToCart = (product) => {
    const qty = product.quantity || 1;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const handleUpdateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Wishlist toggle
  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Login Handler: Admin goes straight to Admin page immediately
  const handleLoginSuccess = (user) => {
    if (user.role === 'admin') {
      setCurrentUser(user);
      setViewMode('admin');
      setShowIntro(false);
      setIsLoginIntro(false);
      setLoginUser(null);
      setIsAuthOpen(false);
      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        localStorage.setItem(VIEW_MODE_STORAGE_KEY, 'admin');
      } catch (e) {}
    } else {
      setLoginUser(user);
      setIsLoginIntro(true);
      setShowIntro(true);
      setIsAuthOpen(false);
      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        localStorage.setItem(VIEW_MODE_STORAGE_KEY, 'store');
      } catch (e) {}
    }
  };

  const handleFinishIntro = () => {
    setShowIntro(false);
    if (isLoginIntro && loginUser) {
      setCurrentUser(loginUser);
      if (loginUser.role === 'admin') {
        setViewMode('admin');
      } else {
        setViewMode('store');
        setCart((prevCart) => {
          if (prevCart.length > 0) {
            setTimeout(() => setIsCheckoutOpen(true), 200);
          }
          return prevCart;
        });
      }
      setIsLoginIntro(false);
      setLoginUser(null);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setViewMode('store');
    setIsLoginIntro(false);
    setLoginUser(null);
    setShowIntro(true); // play the logo transition on logout too
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.setItem(VIEW_MODE_STORAGE_KEY, 'store');
    } catch (e) {}
  };

  // Add Product Handler (Admin)
  const handleAddProduct = (newProduct) => {
    setProductsList((prev) => [newProduct, ...prev]);
  };

  // Edit Product Handler (Admin)
  const handleSaveEditedProduct = (updatedProduct) => {
    setProductsList((prev) =>
      prev.map((item) => (String(item.id) === String(updatedProduct.id) ? { ...item, ...updatedProduct } : item))
    );
  };

  // Delete Product Handler (Admin)
  const handleDeleteProduct = (productId) => {
    setProductsList((prev) => prev.filter((item) => String(item.id) !== String(productId)));
    setCart((prev) => prev.filter((item) => String(item.id) !== String(productId)));
  };

  // Customer places order -> Save immediately to orders list with timestamp & status 'pending'
  // Also decrements product inventory stock based on the quantity ordered
  const handleOrderPlaced = (orderData) => {
    const formattedDate = new Date().toLocaleDateString('sq-AL', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newOrder = {
      ...orderData,
      status: 'pending',
      createdAt: formattedDate
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Deduct stock for each ordered item
    if (Array.isArray(orderData.items) && orderData.items.length > 0) {
      setProductsList((prev) =>
        prev.map((prod) => {
          const orderedItem = orderData.items.find(
            (item) => String(item.id) === String(prod.id)
          );
          if (orderedItem) {
            const currentStock = typeof prod.stock === 'number' ? prod.stock : 35;
            const orderedQty = Number(orderedItem.quantity) || 1;
            const updatedStock = Math.max(0, currentStock - orderedQty);
            return {
              ...prod,
              stock: updatedStock
            };
          }
          return prod;
        })
      );
    }

    setCart([]); // Clear bucket after successful order

    // If client wasn't logged in, log them in automatically with the email they provided
    if (!currentUser) {
      setCurrentUser({
        name: orderData.name,
        email: orderData.email,
        role: 'client'
      });
    }
  };

  // Stock update handler (Admin inventory)
  const handleUpdateStock = (productId, newStock) => {
    setProductsList((prev) =>
      prev.map((item) =>
        String(item.id) === String(productId)
          ? { ...item, stock: Math.max(0, parseInt(newStock) || 0) }
          : item
      )
    );
  };

  // Admin toggles order status: 'pending', 'on_the_way', 'completed'
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
    );
  };

  // Admin deletes order
  const handleDeleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
  };

  // Admin sets transport company for order
  const handleUpdateTransport = (orderId, company) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, transportCompany: company } : o))
    );
  };

  // Filter products by category and live search query
  const filteredProducts = productsList.filter((p) => {
    let matchesCategory = true;
    if (activeCategory === 'offers') {
      matchesCategory = p.oldPrice !== null;
    } else if (activeCategory !== 'all') {
      matchesCategory = 
        p.category === activeCategory || 
        (activeCategory === 'kuhinja' && (p.category === 'kitchen' || p.category === 'kuzhine')) ||
        (activeCategory === 'shtepia' && (p.category === 'decor' || p.category === 'bedding'));
    }

    let matchesSearch = true;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      matchesSearch = 
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.sku && p.sku.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q));
    }

    return matchesCategory && matchesSearch;
  });

  const isAdmin = currentUser && currentUser.role === 'admin';
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;

  // Filter orders that belong ONLY to the currently logged in customer
  const clientUserOrders = currentUser && !isAdmin
    ? orders.filter((o) => o.email?.toLowerCase() === currentUser.email?.toLowerCase())
    : [];

  const hasClientOrders = clientUserOrders.length > 0;

  // Check if LOGGED IN customer has an order "on the way"
  const onTheWayOrderForBanner = currentUser && !isAdmin && clientUserOrders.find((o) => o.status === 'on_the_way');

  return (
    <div className="app-root">
      {/* Clean White Logo Intro Transition matching screenshot */}
      {showIntro && (
        <LogoIntro
          onFinish={handleFinishIntro}
          isLogin={isLoginIntro}
          loginUser={loginUser}
          duration={2400}
        />
      )}

      {/* ADMIN DASHBOARD (When Admin is logged in and viewMode is 'admin') */}
      {isAdmin && viewMode === 'admin' ? (
        <AdminDashboard
          products={productsList}
          orders={orders}
          categories={categoriesList}
          currentUser={currentUser}
          onUpdateStatus={handleUpdateOrderStatus}
          onDeleteOrder={handleDeleteOrder}
          onUpdateTransport={handleUpdateTransport}
          onAddProduct={() => setIsAddProductOpen(true)}
          onEditProduct={(p) => setEditingProduct(p)}
          onOpenProductSelector={() => setIsSelectorOpen(true)}
          onSaveProduct={handleSaveEditedProduct}
          onUpdateStock={handleUpdateStock}
          onDeleteProduct={handleDeleteProduct}
          onAddCategory={handleAddCategory}
          onLogout={handleLogout}
        />
      ) : (
        <>
          {/* FLOATING TOP BAR FOR ADMIN BROWSING THE STOREFRONT */}
          {isAdmin && (
            <div className="admin-store-floating-header">
              <div className="admin-store-banner-inner">
                <div className="admin-banner-left">
                  <ShieldCheck size={18} color="#60a5fa" />
                  <span>
                    <strong>Paneli i Administratorit Aktiv</strong> — Po shfletoni dyqanin si klient
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button
                    className="admin-return-dashboard-btn"
                    onClick={() => setViewMode('admin')}
                  >
                    <LayoutDashboard size={15} />
                    <span>Kthehu te Paneli Admin ↗</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    style={{
                      background: 'transparent',
                      border: '1px solid #475569',
                      color: '#cbd5e1',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}
                  >
                    Dil (Logout)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Clean Navbar matching screenshot */}
          <Navbar
            cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
            wishlistCount={wishlist.length}
            ordersCount={orders.length}
            pendingOrdersCount={pendingOrdersCount}
            currentUser={currentUser}
            hasClientOrders={hasClientOrders}
            categories={categoriesList}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            activeCategory={activeCategory}
            onSelectCategory={(catId) => {
              setActiveCategory(catId);
              setSearchQuery('');
            }}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenWishlist={() => setIsWishlistOpen(true)}
            onOpenOrders={() => setViewMode('admin')}
            onOpenCustomerOrders={() => setIsCustomerOrdersOpen(true)}
            onOpenAuth={() => setIsAuthOpen(true)}
            onLogout={handleLogout}
            onReplayIntro={() => setShowIntro(true)}
          />

          {/* LIVE BANNER FOR CUSTOMER: Shown when their order is ON THE WAY! */}
          {onTheWayOrderForBanner && (
            <div className="client-ontheway-floating-banner" onClick={() => setIsCustomerOrdersOpen(true)}>
              <div className="container banner-inner">
                <div className="banner-left">
                  <span className="live-pulse-dot"></span>
                  <Truck size={20} className="banner-truck-icon" />
                  <span>
                    <strong>Porosia juaj ({onTheWayOrderForBanner.orderId}) është Rrugës!</strong> Korrieri i MaxMarket po vjen drejt adresës tuaj.
                  </span>
                </div>
                <button className="banner-view-btn">
                  Gjurmo Porosinë <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          <main>
            {/* Clean Hero Section matching screenshot */}
            <CleanHero 
              onShopNow={() => {
                setActiveCategory('all');
                setSearchQuery('');
                const el = document.getElementById('products-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onViewOffers={() => {
                setActiveCategory('offers');
                setSearchQuery('');
                const el = document.getElementById('products-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 4 Category Cards Strip matching screenshot */}
            <CategoryCardsStrip 
              activeCategory={activeCategory}
              categories={categoriesList}
              onSelectCategory={(catId) => {
                setActiveCategory(catId);
                setSearchQuery('');
              }}
            />

            {/* "Kategoritë" Section matching user request */}
            <section id="products-section" className="clean-favorites-section">
              <div className="container">
                {/* Header Row: Title on Left, Link on Right */}
                <div className="favorites-header-row">
                  <h2 className="favorites-title">Kategoritë</h2>
                  <button 
                    className="favorites-see-all-btn"
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchQuery('');
                    }}
                  >
                    <span>Shiko të gjitha</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                {/* Filter Tabs dynamically populated with all categories added as admin */}
                <div className="favorites-tabs-bar">
                  <button
                    className={`favorites-tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchQuery('');
                    }}
                  >
                    Të gjitha
                  </button>

                  {categoriesList
                    .filter((c) => c.id !== 'all' && c.id !== 'offers')
                    .map((cat) => (
                      <button
                        key={cat.id}
                        className={`favorites-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setSearchQuery('');
                        }}
                      >
                        {cat.name}
                      </button>
                    ))}

                  <button
                    className={`favorites-tab-btn ${activeCategory === 'offers' ? 'active' : ''}`}
                    onClick={() => {
                      setActiveCategory('offers');
                      setSearchQuery('');
                    }}
                  >
                    Në ofertë
                  </button>
                </div>

                {/* ADMIN ACTIONS: Shto Produktin+ & Edit Options */}
                {isAdmin && (
                  <div className="admin-actions-bar">
                    <div className="admin-badge-indicator">
                      <ShieldCheck size={16} />
                      <span>Paneli Admin</span>
                    </div>

                    <button 
                      className="add-product-main-btn"
                      onClick={() => setIsAddProductOpen(true)}
                      id="shto-produktin-btn"
                    >
                      <PlusCircle size={20} />
                      <span>Shto Produktin+</span>
                    </button>

                    <button 
                      className="admin-edit-toggle-btn"
                      onClick={() => setIsSelectorOpen(true)}
                      id="admin-edit-btn"
                      title="Shiko të gjitha produktet dhe zgjidh për editim"
                    >
                      <Edit3 size={18} />
                      <span>Edit</span>
                    </button>
                  </div>
                )}

                {/* Live search active indicator */}
                {searchQuery.trim() && (
                  <div className="search-active-pill">
                    <span>Rezultatet për: <strong>"{searchQuery}"</strong> ({filteredProducts.length} produkte)</span>
                    <button onClick={() => setSearchQuery('')}>✕ Fshij kërkimin</button>
                  </div>
                )}

                {/* Products Grid matching screenshot */}
                {filteredProducts.length > 0 ? (
                  <div className="clean-products-grid">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        isAdmin={isAdmin}
                        isWishlisted={wishlist.some((item) => item.id === product.id)}
                        onToggleWishlist={handleToggleWishlist}
                        onAddToCart={handleAddToCart}
                        onQuickView={(p) => setQuickViewProduct(p)}
                        onEditProduct={(p) => setEditingProduct(p)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="clean-no-products">
                    <p>Nuk u gjet asnjë produkt për këtë zgjedhje.</p>
                    <button 
                      className="clean-reset-filter-btn"
                      onClick={() => {
                        setActiveCategory('all');
                        setSearchQuery('');
                      }}
                    >
                      Shiko të gjitha produktet
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* 3 Trust Features Strip matching screenshot */}
            <TrustFeaturesStrip />
          </main>

          {/* Clean Footer matching screenshot */}
          <Footer 
            categories={categoriesList}
            onSelectCategory={(catId) => {
              setActiveCategory(catId);
              setSearchQuery('');
            }} 
          />
        </>
      )}

      {/* MODALS */}
      {isCartOpen && (
        <CartModal
          isOpen={true}
          cart={cart}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveFromCart={handleRemoveFromCart}
          onCheckout={() => {
            setIsCartOpen(false);
            if (!currentUser) {
              setIsAuthOpen(true);
            } else {
              setIsCheckoutOpen(true);
            }
          }}
        />
      )}

      {isWishlistOpen && (
        <WishlistModal
          isOpen={true}
          wishlist={wishlist}
          onClose={() => setIsWishlistOpen(false)}
          onRemoveFromWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onOpenCart={() => {
            setIsWishlistOpen(false);
            setIsCartOpen(true);
          }}
        />
      )}

      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={true}
          cart={cart}
          currentUser={currentUser}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderPlaced={handleOrderPlaced}
          onViewMyOrders={() => {
            setIsCheckoutOpen(false);
            setIsCustomerOrdersOpen(true);
          }}
        />
      )}

      {isAuthOpen && (
        <AuthModal
          isOpen={true}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {quickViewProduct && (
        <QuickViewModal
          isOpen={true}
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          isWishlisted={wishlist.some((item) => item.id === quickViewProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onOpenCart={() => setIsCartOpen(true)}
        />
      )}

      {isAddProductOpen && (
        <AddProductModal
          categories={categoriesList}
          onClose={() => setIsAddProductOpen(false)}
          onAddProduct={handleAddProduct}
        />
      )}

      {editingProduct && (
        <EditProductModal
          isOpen={true}
          product={editingProduct}
          categories={categoriesList}
          onClose={() => setEditingProduct(null)}
          onSave={(p) => {
            handleSaveEditedProduct(p);
            setEditingProduct(null);
          }}
          onSaveProduct={(p) => {
            handleSaveEditedProduct(p);
            setEditingProduct(null);
          }}
          onDelete={(id) => {
            handleDeleteProduct(id);
            setEditingProduct(null);
          }}
          onDeleteProduct={(id) => {
            handleDeleteProduct(id);
            setEditingProduct(null);
          }}
        />
      )}

      {isSelectorOpen && (
        <EditProductSelectorModal
          isOpen={true}
          products={productsList}
          onClose={() => setIsSelectorOpen(false)}
          onSelectProduct={(p) => {
            setIsSelectorOpen(false);
            setEditingProduct(p);
          }}
          onSelectProductToEdit={(p) => {
            setIsSelectorOpen(false);
            setEditingProduct(p);
          }}
          onDeleteProduct={handleDeleteProduct}
        />
      )}

      {isOrdersOpen && (
        <OrdersModal
          orders={orders}
          onClose={() => setIsOrdersOpen(false)}
          onUpdateStatus={handleUpdateOrderStatus}
          onDeleteOrder={handleDeleteOrder}
          onUpdateTransport={handleUpdateTransport}
        />
      )}

      {isCustomerOrdersOpen && currentUser && (
        <CustomerOrdersModal
          orders={clientUserOrders}
          currentUser={currentUser}
          onClose={() => setIsCustomerOrdersOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
