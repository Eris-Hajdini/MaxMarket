import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import CategoryBar from './components/CategoryBar';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';
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
import { Sparkles, ArrowRight, Gift, Percent, PlusCircle, ShieldCheck, Edit3, Truck, LayoutDashboard } from 'lucide-react';

const STORAGE_KEY = 'maxmarket_products_list_v1';
const ORDERS_STORAGE_KEY = 'maxmarket_orders_list_v1';
const CATEGORIES_STORAGE_KEY = 'maxmarket_categories_list_v1';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoginIntro, setIsLoginIntro] = useState(false);
  const [loginUser, setLoginUser] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

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
    setCategoriesList((prev) => [...prev, newCat]);
  };

  // Load products from localStorage if available, otherwise initialProducts
  const [productsList, setProductsList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Could not load stored products", e);
    }
    return initialProducts;
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
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isCustomerOrdersOpen, setIsCustomerOrdersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Authentication & Admin State
  const [currentUser, setCurrentUser] = useState(null); // null, { name, email, role: 'admin'|'client' }
  const [viewMode, setViewMode] = useState('store'); // 'store' | 'admin'
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

  // Login Handler with 5-second logo transition
  const handleLoginSuccess = (user) => {
    setLoginUser(user);
    setIsLoginIntro(true);
    setShowIntro(true);
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
  };

  // Add Product Handler (Admin)
  const handleAddProduct = (newProduct) => {
    setProductsList((prev) => [newProduct, ...prev]);
  };

  // Edit Product Handler (Admin)
  const handleSaveEditedProduct = (updatedProduct) => {
    setProductsList((prev) =>
      prev.map((item) => (item.id === updatedProduct.id ? updatedProduct : item))
    );
  };

  // Delete Product Handler (Admin)
  const handleDeleteProduct = (productId) => {
    setProductsList((prev) => prev.filter((item) => item.id !== productId));
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Customer places order -> Save immediately to orders list with timestamp & status 'pending'
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

  // Filter products by category
  const filteredProducts = activeCategory === 'all'
    ? productsList
    : activeCategory === 'offers'
      ? productsList.filter((p) => p.oldPrice !== null)
      : productsList.filter((p) => p.category === activeCategory);

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
      {/* Big Splash Logo Intro Transition & 5s Login Animation */}
      {showIntro && (
        <LogoIntro
          onFinish={handleFinishIntro}
          isLogin={isLoginIntro}
          loginUser={loginUser}
          duration={5000}
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

          {/* Main E-commerce Website */}
          <Navbar
            cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
            wishlistCount={wishlist.length}
            ordersCount={orders.length}
            pendingOrdersCount={pendingOrdersCount}
            currentUser={currentUser}
            hasClientOrders={hasClientOrders}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenWishlist={() => {
              if (wishlist.length === 0) {
                alert("Nuk keni ende asnjë produkt në listën e dëshirave. Shtypni ikonën e zemrës tek produktet për t'i ruajtur!");
              } else {
                alert(`Keni ${wishlist.length} produkte të ruajtura në listën tuaj të dëshirave!`);
              }
            }}
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
        {/* Animated Hero Slider */}
        <HeroSlider 
          onShopNow={() => {
            const el = document.getElementById('products-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} 
        />

        {/* Category Pills Slider / Filter */}
        <CategoryBar 
          activeCategory={activeCategory} 
          categories={categoriesList}
          onSelectCategory={(catId) => {
            setActiveCategory(catId);
            const el = document.getElementById('products-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} 
        />

        {/* Promotional Banner Strip */}
        <section className="promo-banner-strip">
          <div className="container banner-grid">
            <div className="promo-banner-card card-orange">
              <div className="promo-content">
                <span className="promo-tag">OFERTË E LIMITUAR</span>
                <h3>Setet e Kuzhinës -30%</h3>
                <p>Porcelan mbretëror dhe vegla gatimi për shtëpinë tuaj.</p>
                <button 
                  onClick={() => {
                    setActiveCategory('kitchen');
                    const el = document.getElementById('products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="promo-btn"
                >
                  Shfleto Kuzhinën <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="promo-banner-card card-blue">
              <div className="promo-content">
                <span className="promo-tag">KOLEKSIONI I RI</span>
                <h3>Tekstil Luksoz Shtrati</h3>
                <p>100% Pambuk Satina për rehati të pashoqe çdo natë.</p>
                <button 
                  onClick={() => {
                    setActiveCategory('bedding');
                    const el = document.getElementById('products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="promo-btn"
                >
                  Zbulo Tekstilin <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid Section */}
        <section id="products-section" className="products-section">
          <div className="container">
            <div className="section-header-row products-header-with-action">
              <div>
                <div className="section-pill">
                  <Sparkles size={15} />
                  <span>Koleksionet Tona</span>
                </div>
                <h2 className="section-title">Produktet e Zgjedhura për Ju</h2>
                <p className="section-subtitle">
                  Elegancë dhe funksionalitet në çdo kënd të shtëpisë tuaj.
                </p>
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
            </div>

            <div className="products-grid">
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
          </div>
        </section>

        {/* Bridal Registry (Lista e Pajës) Highlight Section */}
        <section className="registry-highlight-section" id="paje">
          <div className="container">
            <div className="registry-card">
              <div className="registry-content">
                <div className="reg-badge">
                  <Gift size={16} />
                  <span>Për Nuset & Çiftet e Reja</span>
                </div>
                <h2>Lista e Pajës në MaxMarket</h2>
                <p>
                  Përgatitni ambientin tuaj të ri me setet më elegante të enëve, tekstilit të dhomës së gjumit dhe aksesorëve luksozë me konsulencë të personalizuar dhe zbritje speciale.
                </p>
                <div className="reg-buttons">
                  <button className="reg-primary-btn" onClick={() => alert("Krijimi i Listës së Pajës së shpejti!")}>
                    Krijo Listën e Pajës
                  </button>
                  <button className="reg-secondary-btn" onClick={() => alert("Konsulenca falas në numrin: +383 44 123 456")}>
                    Rezervo Konsulencë Falas
                  </button>
                </div>
              </div>
              <div className="registry-visual">
                <div className="reg-image-wrapper">
                  <img 
                    src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80" 
                    alt="Bridal Home Registry" 
                  />
                  <div className="floating-discount-tag">
                    <Percent size={20} />
                    <div>
                      <strong>-15% Extra</strong>
                      <span>në të gjithë pakon</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  )}

  {/* Cart Drawer */}
  <CartModal
    isOpen={isCartOpen && viewMode !== 'admin'}
    onClose={() => setIsCartOpen(false)}
    cart={cart}
    onUpdateQuantity={handleUpdateQuantity}
    onRemove={handleRemoveFromCart}
    onProceedToCheckout={() => {
      if (!currentUser) {
        setIsCartOpen(false);
        setIsAuthOpen(true);
      } else {
        setIsCheckoutOpen(true);
      }
    }}
  />

      {/* Checkout Modal Form (Customer details) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        currentUser={currentUser}
        onOrderPlaced={handleOrderPlaced}
        onViewMyOrders={() => setIsCustomerOrdersOpen(true)}
      />

      {/* Admin Orders Modal (Porositë) */}
      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        onUpdateStatus={handleUpdateOrderStatus}
        onDeleteOrder={handleDeleteOrder}
        onUpdateTransport={handleUpdateTransport}
      />

      {/* Customer Orders Tracking Modal */}
      <CustomerOrdersModal
        isOpen={isCustomerOrdersOpen}
        onClose={() => setIsCustomerOrdersOpen(false)}
        orders={orders}
        currentUser={currentUser}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlist.some((item) => item.id === quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Add Product Modal (Admin Exclusive) */}
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAddProduct={handleAddProduct}
        categories={categoriesList}
      />

      {/* Product Selector Modal for Edit (Admin Exclusive) */}
      <EditProductSelectorModal
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        products={productsList}
        onSelectProductToEdit={(prod) => {
          setIsSelectorOpen(false);
          setEditingProduct(prod);
        }}
        onDeleteProduct={handleDeleteProduct}
      />

      {/* Edit Product Modal (Admin Exclusive with Discount field) */}
      <EditProductModal
        isOpen={Boolean(editingProduct)}
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
        onSave={handleSaveEditedProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
}

export default App;
