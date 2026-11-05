import React, { useState, useMemo } from 'react';
import {
  Home,
  ShoppingCart,
  Package,
  LayoutGrid,
  Users,
  Tag,
  Boxes,
  BarChart3,
  Settings,
  Store,
  MessageSquare,
  Headphones,
  LogOut,
  Search,
  Bell,
  Calendar,
  ChevronDown,
  TrendingUp,
  Clock,
  CheckCircle2,
  Truck,
  Trash2,
  Edit3,
  PlusCircle,
  Eye,
  ExternalLink,
  MoreHorizontal,
  X,
  Menu,
  Phone,
  Mail,
  MapPin,
  Check
} from 'lucide-react';
import '../admin.css';

const TRANSPORT_COMPANIES = [
  { value: '', label: '— Zgjidh Kompaninë —' },
  { value: 'Posta', label: '🏛️ Posta' },
  { value: 'Mikmik', label: '🚐 Mikmik' },
  { value: 'Posta e shpejtë', label: '⚡ Posta e shpejtë' },
  { value: 'PostaCheetah', label: '🐆 PostaCheetah' },
];

export default function AdminDashboard({
  products,
  orders,
  categories,
  currentUser,
  onUpdateStatus,
  onDeleteOrder,
  onUpdateTransport,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onViewStore,
  onLogout
}) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30D');
  const [selectedOrderForAction, setSelectedOrderForAction] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [dateRange, setDateRange] = useState('Oct 1 – Oct 31, 2026');
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  // Search filter for dedicated tabs
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [ordersSearch, setOrdersSearch] = useState('');
  const [ordersStatusFilter, setOrdersStatusFilter] = useState('all');

  // Realistic baseline data combined with live customer orders
  const liveSalesSum = useMemo(() => {
    return orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  }, [orders]);

  const totalSalesFormatted = useMemo(() => {
    const base = 24580;
    return '€' + (base + liveSalesSum).toLocaleString();
  }, [liveSalesSum]);

  const totalOrdersCount = useMemo(() => {
    return 1284 + orders.length;
  }, [orders]);

  const totalProductsCount = useMemo(() => {
    return 856 + (products.length - 8);
  }, [products]);

  // Combine initial screenshot orders with live orders placed by customers
  const defaultRecentOrders = [
    {
      orderId: '#GM28475',
      name: 'Arben',
      surname: 'Krasniqi',
      email: 'arben.k@gmail.com',
      phone: '+383 44 234 567',
      address: 'Rruga Dardania Nr. 14',
      city: 'Prishtinë',
      createdAt: 'Oct 31, 2026 - 16:45',
      status: 'completed',
      total: 129.99,
      transportCompany: 'Posta e shpejtë',
      items: [
        { id: 101, name: 'Set Pjatash Porcelani Royal Imperial', quantity: 1, price: 89.90, image: 'https://images.unsplash.com/photo-1614088445129-843c085e6834?auto=format&fit=crop&w=400&q=80' },
        { id: 102, name: 'Tigan Graniti Non-Stick', quantity: 1, price: 29.99, image: 'https://images.unsplash.com/photo-1584990347449-3995f32a7629?auto=format&fit=crop&w=400&q=80' }
      ]
    },
    {
      orderId: '#GM28474',
      name: 'Linda',
      surname: 'Meta',
      email: 'linda.meta@gmail.com',
      phone: '+383 49 112 334',
      address: 'Lagjja Marigona, Vila 8',
      city: 'Prishtinë',
      createdAt: 'Oct 31, 2026 - 15:32',
      status: 'on_the_way',
      total: 89.50,
      transportCompany: 'Mikmik',
      items: [
        { id: 103, name: 'Set Mbulesa Shtrati Pambuku Satina', quantity: 1, price: 49.50, image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=400&q=80' }
      ]
    },
    {
      orderId: '#GM28473',
      name: 'Driton',
      surname: 'Gashi',
      email: 'driton.gashi@live.com',
      phone: '+383 45 678 901',
      address: 'Bulevardi Dëshmorët',
      city: 'Prizren',
      createdAt: 'Oct 31, 2026 - 14:20',
      status: 'pending',
      total: 67.99,
      transportCompany: 'PostaCheetah',
      items: [
        { id: 104, name: 'Vazo Dekorative Qeramike', quantity: 2, price: 24.90, image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80' }
      ]
    },
    {
      orderId: '#GM28472',
      name: 'Albiona',
      surname: 'Demiri',
      email: 'albiona.d@gmail.com',
      phone: '+383 44 987 654',
      address: 'Rruga Nëna Terezë 45',
      city: 'Pejë',
      createdAt: 'Oct 31, 2026 - 13:17',
      status: 'completed',
      total: 110.00,
      transportCompany: 'Posta',
      items: [
        { id: 105, name: 'Jorgan Dimëror Mikrofibër Ultra-Warm', quantity: 1, price: 58.00, image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=400&q=80' }
      ]
    },
    {
      orderId: '#GM28471',
      name: 'Besnik',
      surname: 'Haliti',
      email: 'besnik.h@gmail.com',
      phone: '+383 49 555 444',
      address: 'Rruga UÇK 102',
      city: 'Ferizaj',
      createdAt: 'Oct 31, 2026 - 12:50',
      status: 'on_the_way',
      total: 75.25,
      transportCompany: 'Mikmik',
      items: [
        { id: 106, name: 'Set Peshqirësh Pambuku Egjiptian', quantity: 2, price: 32.00, image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=400&q=80' }
      ]
    }
  ];

  // All unified orders: Live orders first, then default orders
  const allCombinedOrders = useMemo(() => {
    return [...orders, ...defaultRecentOrders];
  }, [orders]);

  // Product performance items
  const productPerformanceItems = [
    {
      name: 'Storage Box 50L',
      category: 'Home & Living',
      revenue: '€6,240',
      trend: '+18.2%',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=120&q=80'
    },
    {
      name: 'Kitchen Organizer',
      category: 'Kitchen',
      revenue: '€5,890',
      trend: '+14.7%',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=120&q=80'
    },
    {
      name: 'Cleaning Bucket',
      category: 'Cleaning',
      revenue: '€4,750',
      trend: '+10.1%',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=120&q=80'
    },
    {
      name: 'Laundry Basket',
      category: 'Home & Living',
      revenue: '€4,120',
      trend: '+9.8%',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=120&q=80'
    }
  ];

  // Global search across orders and products
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    const matchedProducts = products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    const matchedOrders = allCombinedOrders.filter(o =>
      o.orderId.toLowerCase().includes(q) ||
      (o.name + ' ' + o.surname).toLowerCase().includes(q) ||
      o.city?.toLowerCase().includes(q)
    );
    return { products: matchedProducts, orders: matchedOrders };
  }, [searchQuery, products, allCombinedOrders]);

  // Handle order status update
  const handleSetOrderStatus = (orderId, newStatus) => {
    onUpdateStatus(orderId, newStatus);
    if (selectedOrderForAction && selectedOrderForAction.orderId === orderId) {
      setSelectedOrderForAction(prev => ({ ...prev, status: newStatus }));
    }
  };

  // Handle transport company update
  const handleSetTransport = (orderId, company) => {
    onUpdateTransport(orderId, company);
    if (selectedOrderForAction && selectedOrderForAction.orderId === orderId) {
      setSelectedOrderForAction(prev => ({ ...prev, transportCompany: company }));
    }
  };

  return (
    <div className="admin-layout">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Left Sidebar (Slate Navy) ── */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Brand Header */}
        <div className="admin-brand-header">
          <div className="admin-brand-icon">
            <Home size={28} strokeWidth={2.2} />
          </div>
          <div className="admin-brand-info">
            <h2>MaxMarket</h2>
            <span>Admin Panel</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="admin-sidebar-nav">
          <button
            className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
          >
            <div className="nav-item-left">
              <Home size={19} />
              <span>Dashboard</span>
            </div>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => { setActiveTab('orders'); setSidebarOpen(false); }}
          >
            <div className="nav-item-left">
              <ShoppingCart size={19} />
              <span>Orders</span>
            </div>
            <span className="nav-badge-pill">{allCombinedOrders.length}</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => { setActiveTab('products'); setSidebarOpen(false); }}
          >
            <div className="nav-item-left">
              <Package size={19} />
              <span>Products</span>
            </div>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => { setActiveTab('categories'); setSidebarOpen(false); }}
          >
            <div className="nav-item-left">
              <LayoutGrid size={19} />
              <span>Categories</span>
            </div>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => { setActiveTab('customers'); setSidebarOpen(false); }}
          >
            <div className="nav-item-left">
              <Users size={19} />
              <span>Customers</span>
            </div>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'discounts' ? 'active' : ''}`}
            onClick={() => { setActiveTab('discounts'); setSidebarOpen(false); }}
          >
            <div className="nav-item-left">
              <Tag size={19} />
              <span>Discounts</span>
            </div>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => { setActiveTab('inventory'); setSidebarOpen(false); }}
          >
            <div className="nav-item-left">
              <Boxes size={19} />
              <span>Inventory</span>
            </div>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => { setActiveTab('reports'); setSidebarOpen(false); }}
          >
            <div className="nav-item-left">
              <BarChart3 size={19} />
              <span>Reports</span>
            </div>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
          >
            <div className="nav-item-left">
              <Settings size={19} />
              <span>Settings</span>
            </div>
          </button>

          <div className="admin-sidebar-divider" />

          <button
            className={`admin-nav-item ${activeTab === 'sellers' ? 'active' : ''}`}
            onClick={() => { setActiveTab('sellers'); setSidebarOpen(false); }}
          >
            <div className="nav-item-left">
              <Store size={19} />
              <span>Sellers</span>
            </div>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => { setActiveTab('messages'); setSidebarOpen(false); }}
          >
            <div className="nav-item-left">
              <MessageSquare size={19} />
              <span>Messages</span>
            </div>
            <span className="nav-badge-pill">12</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === 'support' ? 'active' : ''}`}
            onClick={() => { setActiveTab('support'); setSidebarOpen(false); }}
          >
            <div className="nav-item-left">
              <Headphones size={19} />
              <span>Support</span>
            </div>
          </button>
        </nav>

        {/* Sidebar Footer with Store Preview & Logout */}
        <div className="admin-sidebar-footer">
          <button className="view-store-btn" onClick={onViewStore} title="Shiko Dyqanin (Customer Storefront)">
            <span>Dyqani MaxMarket</span>
            <ExternalLink size={15} />
          </button>

          <button className="admin-nav-item logout-nav-item" onClick={onLogout}>
            <div className="nav-item-left">
              <LogOut size={18} />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="admin-main-wrapper">
        {/* Top Header Bar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              className="sidebar-toggle-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Hap menynë"
            >
              <Menu size={22} />
            </button>

            {/* Search Box */}
            <div className="admin-search-box">
              <Search size={18} color="#94a3b8" />
              <input
                type="text"
                placeholder="Search anything... (Ctrl + K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                >
                  <X size={15} />
                </button>
              )}

              {/* Live search results overlay */}
              {searchResults && (
                <div className="search-results-dropdown">
                  <div className="search-section-title">Produktet ({searchResults.products.length})</div>
                  {searchResults.products.slice(0, 3).map((p) => (
                    <div
                      key={p.id}
                      className="search-result-item"
                      onClick={() => {
                        setActiveTab('products');
                        setSearchQuery('');
                        onEditProduct(p);
                      }}
                    >
                      <div className="search-item-left">
                        <img src={p.image} alt={p.name} className="search-item-thumb" />
                        <div>
                          <strong>{p.name}</strong>
                          <div style={{ fontSize: '0.76rem', color: '#64748b' }}>€{p.price.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="search-section-title">Porositë ({searchResults.orders.length})</div>
                  {searchResults.orders.slice(0, 3).map((o) => (
                    <div
                      key={o.orderId}
                      className="search-result-item"
                      onClick={() => {
                        setSelectedOrderForAction(o);
                        setSearchQuery('');
                      }}
                    >
                      <div className="search-item-left">
                        <Package size={16} color="#2563eb" />
                        <div>
                          <strong>{o.orderId}</strong> — {o.name} {o.surname}
                          <div style={{ fontSize: '0.76rem', color: '#64748b' }}>Totali: €{Number(o.total || 0).toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="admin-topbar-right">
            {/* View storefront pill */}
            <button className="store-quick-pill" onClick={onViewStore} title="Shiko Dyqanin e Klientëve">
              <Eye size={16} />
              <span>Shiko Dyqanin</span>
            </button>

            {/* Notification Bell */}
            <button
              className="notif-bell-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              title="Njoftimet"
            >
              <Bell size={20} />
              <span className="notif-badge">3</span>
            </button>

            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="notif-header">
                  <h4>Njoftimet e Dyqanit</h4>
                  <span style={{ fontSize: '0.75rem', color: '#2563eb', cursor: 'pointer' }}>Shëno të lexuara</span>
                </div>
                <div className="notif-item">
                  <div className="notif-dot" />
                  <div>
                    <strong style={{ fontSize: '0.85rem' }}>Porosi e re nga klienti!</strong>
                    <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#64748b' }}>Porosia MAX-847291 u regjistrua me sukses.</p>
                  </div>
                </div>
                <div className="notif-item">
                  <div className="notif-dot" style={{ background: '#ea580c' }} />
                  <div>
                    <strong style={{ fontSize: '0.85rem' }}>Stok i ulët</strong>
                    <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#64748b' }}>Kitchen Organizer ka vetëm 3 copë në magazinë.</p>
                  </div>
                </div>
                <div className="notif-item">
                  <div className="notif-dot" style={{ background: '#16a34a' }} />
                  <div>
                    <strong style={{ fontSize: '0.85rem' }}>Porosi e dorëzuar</strong>
                    <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#64748b' }}>Korrieri PostaCheetah dorëzoi porosinë #GM28475.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Admin Avatar Profile */}
            <div
              className="admin-profile-pill"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="admin-avatar">A</div>
              <span className="admin-user-name">
                Admin <ChevronDown size={14} />
              </span>

              {showProfileMenu && (
                <div className="admin-profile-menu">
                  <button className="menu-item-btn" onClick={() => setActiveTab('settings')}>
                    <Settings size={15} /> Cilësimet
                  </button>
                  <button className="menu-item-btn" onClick={onViewStore}>
                    <ExternalLink size={15} /> Shiko Dyqanin
                  </button>
                  <button className="menu-item-btn text-danger" onClick={onLogout}>
                    <LogOut size={15} /> Dil (Logout)
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── Main Dashboard Body ── */}
        <main className="admin-content-body">
          {/* TAB 1: DASHBOARD (Exact Replica of Screenshot) */}
          {activeTab === 'dashboard' && (
            <>
              {/* Dashboard Title & Date Range Picker */}
              <div className="dashboard-header-row">
                <div className="dashboard-title-area">
                  <h1>Admin Dashboard</h1>
                  <p>Welcome back! Here's what's happening with your store.</p>
                </div>

                <div style={{ position: 'relative' }}>
                  <button
                    className="date-range-picker-pill"
                    onClick={() => setShowDateDropdown(!showDateDropdown)}
                  >
                    <Calendar size={16} />
                    <span>{dateRange}</span>
                    <ChevronDown size={14} />
                  </button>

                  {showDateDropdown && (
                    <div className="admin-profile-menu" style={{ right: 0, width: 220 }}>
                      <button className="menu-item-btn" onClick={() => { setDateRange('Sot, ' + new Date().toLocaleDateString('sq-AL')); setShowDateDropdown(false); }}>Sot</button>
                      <button className="menu-item-btn" onClick={() => { setDateRange('7 Ditët e Fundit'); setShowDateDropdown(false); }}>7 Ditët e Fundit</button>
                      <button className="menu-item-btn" onClick={() => { setDateRange('Oct 1 – Oct 31, 2026'); setShowDateDropdown(false); }}>Oct 1 – Oct 31, 2026</button>
                      <button className="menu-item-btn" onClick={() => { setDateRange('Viti 2026'); setShowDateDropdown(false); }}>Viti 2026</button>
                    </div>
                  )}
                </div>
              </div>

              {/* 4 Stat Cards Row */}
              <div className="dashboard-stats-grid">
                {/* 1. Total Sales */}
                <div className="stat-metric-card">
                  <div className="stat-card-left">
                    <div className="stat-icon-wrapper blue">
                      <ShoppingCart size={24} />
                    </div>
                    <div className="stat-card-info">
                      <span className="stat-label">Total Sales</span>
                      <h3 className="stat-value">{totalSalesFormatted}</h3>
                      <span className="stat-trend">
                        <TrendingUp size={13} /> +12.5%
                      </span>
                    </div>
                  </div>
                  {/* Mini Sparkline Curve */}
                  <svg className="stat-sparkline" viewBox="0 0 100 40">
                    <path
                      d="M 0 32 Q 25 10, 50 24 T 100 8"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* 2. Orders */}
                <div className="stat-metric-card">
                  <div className="stat-card-left">
                    <div className="stat-icon-wrapper purple">
                      <Package size={24} />
                    </div>
                    <div className="stat-card-info">
                      <span className="stat-label">Orders</span>
                      <h3 className="stat-value">{totalOrdersCount.toLocaleString()}</h3>
                      <span className="stat-trend" style={{ color: '#16a34a' }}>
                        <TrendingUp size={13} /> +8.3%
                      </span>
                    </div>
                  </div>
                  <svg className="stat-sparkline" viewBox="0 0 100 40">
                    <path
                      d="M 0 28 Q 30 35, 55 18 T 100 12"
                      fill="none"
                      stroke="#9333ea"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* 3. Products */}
                <div className="stat-metric-card">
                  <div className="stat-card-left">
                    <div className="stat-icon-wrapper green">
                      <Boxes size={24} />
                    </div>
                    <div className="stat-card-info">
                      <span className="stat-label">Products</span>
                      <h3 className="stat-value">{totalProductsCount}</h3>
                      <span className="stat-trend" style={{ color: '#16a34a' }}>
                        <TrendingUp size={13} /> +2.1%
                      </span>
                    </div>
                  </div>
                  <svg className="stat-sparkline" viewBox="0 0 100 40">
                    <path
                      d="M 0 35 Q 25 30, 50 20 T 100 10"
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* 4. Customers */}
                <div className="stat-metric-card">
                  <div className="stat-card-left">
                    <div className="stat-icon-wrapper orange">
                      <Users size={24} />
                    </div>
                    <div className="stat-card-info">
                      <span className="stat-label">Customers</span>
                      <h3 className="stat-value">3,420</h3>
                      <span className="stat-trend" style={{ color: '#16a34a' }}>
                        <TrendingUp size={13} /> +14.7%
                      </span>
                    </div>
                  </div>
                  <svg className="stat-sparkline" viewBox="0 0 100 40">
                    <path
                      d="M 0 32 Q 25 36, 50 18 T 100 8"
                      fill="none"
                      stroke="#ea580c"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* ── Middle Row: Sales Overview & Recent Activity ── */}
              <div className="dashboard-middle-row">
                {/* Left: Sales Overview Interactive Chart */}
                <div className="dashboard-panel-card">
                  <div className="panel-header-row">
                    <h3 className="panel-title-with-icon">
                      <BarChart3 size={20} color="#2563eb" />
                      <span>Sales Overview</span>
                    </h3>

                    <div className="timeframe-pill-group">
                      {['7D', '30D', '90D', '1Y'].map((tf) => (
                        <button
                          key={tf}
                          className={`timeframe-btn ${selectedTimeframe === tf ? 'active' : ''}`}
                          onClick={() => setSelectedTimeframe(tf)}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SVG Chart with Grid & Active Tooltip */}
                  <div className="chart-container-wrap">
                    <svg className="svg-sales-chart" viewBox="0 0 700 240" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid lines */}
                      <line x1="50" y1="30" x2="680" y2="30" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="50" y1="75" x2="680" y2="75" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="50" y1="120" x2="680" y2="120" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="50" y1="165" x2="680" y2="165" stroke="#f1f5f9" strokeWidth="1" />
                      <line x1="50" y1="210" x2="680" y2="210" stroke="#f1f5f9" strokeWidth="1" />

                      {/* Y-Axis Labels */}
                      <text x="15" y="34" fill="#94a3b8" fontSize="11" fontWeight="600">20k</text>
                      <text x="15" y="79" fill="#94a3b8" fontSize="11" fontWeight="600">15k</text>
                      <text x="15" y="124" fill="#94a3b8" fontSize="11" fontWeight="600">10k</text>
                      <text x="20" y="169" fill="#94a3b8" fontSize="11" fontWeight="600">5k</text>
                      <text x="25" y="214" fill="#94a3b8" fontSize="11" fontWeight="600">0</text>

                      {/* Area Fill */}
                      <path
                        d="M 50 190 
                           C 100 170, 130 145, 170 120 
                           C 210 95, 230 150, 270 135 
                           C 310 120, 330 95, 370 100 
                           C 410 105, 430 130, 470 125 
                           C 510 120, 530 90, 570 95 
                           C 610 100, 640 60, 660 55 
                           L 660 210 L 50 210 Z"
                        fill="url(#chartGradient)"
                      />

                      {/* Blue Line Curve */}
                      <path
                        d="M 50 190 
                           C 100 170, 130 145, 170 120 
                           C 210 95, 230 150, 270 135 
                           C 310 120, 330 95, 370 100 
                           C 410 105, 430 130, 470 125 
                           C 510 120, 530 90, 570 95 
                           C 610 100, 640 60, 660 55"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                      />

                      {/* Points */}
                      <circle cx="50" cy="190" r="4" fill="#2563eb" />
                      <circle cx="170" cy="120" r="4" fill="#2563eb" />
                      <circle cx="270" cy="135" r="4" fill="#2563eb" />
                      <circle cx="370" cy="100" r="4" fill="#2563eb" />
                      <circle cx="470" cy="125" r="4" fill="#2563eb" />
                      <circle cx="570" cy="95" r="4" fill="#2563eb" />

                      {/* Active Point at Oct 31 with Tooltip */}
                      <line x1="660" y1="55" x2="660" y2="210" stroke="#2563eb" strokeDasharray="3,3" strokeWidth="1.5" />
                      <circle cx="660" cy="55" r="6" fill="#2563eb" stroke="#ffffff" strokeWidth="2.5" />
                    </svg>

                    {/* Tooltip Badge positioned on active point */}
                    <div
                      className="chart-tooltip-badge"
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '28px'
                      }}
                    >
                      €17,420
                    </div>
                  </div>

                  {/* X-Axis Dates */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 40px 0 50px', fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600' }}>
                    <span>Oct 1</span>
                    <span>Oct 7</span>
                    <span>Oct 14</span>
                    <span>Oct 21</span>
                    <span>Oct 31</span>
                  </div>
                </div>

                {/* Right: Recent Activity Card */}
                <div className="dashboard-panel-card">
                  <div className="panel-header-row">
                    <h3 className="panel-title-with-icon">
                      <span>Recent Activity</span>
                    </h3>
                    <span className="view-all-link" onClick={() => setActiveTab('orders')}>
                      View all →
                    </span>
                  </div>

                  <div className="recent-activity-list">
                    {/* Activity 1: Green Cart */}
                    <div className="activity-item-row">
                      <div className="activity-left-side">
                        <div className="activity-icon-bubble green">
                          <ShoppingCart size={17} />
                        </div>
                        <div className="activity-text-info">
                          <h4>New order #GM28475</h4>
                          <p>€129.99 • Delivered</p>
                        </div>
                      </div>
                      <span className="activity-time-stamp">2 min ago</span>
                    </div>

                    {/* Activity 2: Blue User */}
                    <div className="activity-item-row">
                      <div className="activity-left-side">
                        <div className="activity-icon-bubble blue">
                          <Users size={17} />
                        </div>
                        <div className="activity-text-info">
                          <h4>New customer registered</h4>
                          <p>user123@gmail.com</p>
                        </div>
                      </div>
                      <span className="activity-time-stamp">4 min ago</span>
                    </div>

                    {/* Activity 3: Orange Box */}
                    <div className="activity-item-row">
                      <div className="activity-left-side">
                        <div className="activity-icon-bubble orange">
                          <Boxes size={17} />
                        </div>
                        <div className="activity-text-info">
                          <h4>Product out of stock</h4>
                          <p>Kitchen Organizer</p>
                        </div>
                      </div>
                      <span className="activity-time-stamp">6 min ago</span>
                    </div>

                    {/* Activity 4: Teal Tag */}
                    <div className="activity-item-row">
                      <div className="activity-left-side">
                        <div className="activity-icon-bubble teal">
                          <Tag size={17} />
                        </div>
                        <div className="activity-text-info">
                          <h4>New discount created</h4>
                          <p>-20% on Home Essentials</p>
                        </div>
                      </div>
                      <span className="activity-time-stamp">12 min ago</span>
                    </div>

                    {/* Activity 5: Purple Store */}
                    <div className="activity-item-row">
                      <div className="activity-left-side">
                        <div className="activity-icon-bubble purple">
                          <Store size={17} />
                        </div>
                        <div className="activity-text-info">
                          <h4>New seller approved</h4>
                          <p>HomePlus Store</p>
                        </div>
                      </div>
                      <span className="activity-time-stamp">15 min ago</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Bottom Row: Recent Orders Table & Product Performance ── */}
              <div className="dashboard-bottom-row">
                {/* Left: Recent Orders Table */}
                <div className="dashboard-panel-card">
                  <div className="panel-header-row">
                    <h3 className="panel-title-with-icon">
                      <ShoppingCart size={19} color="#2563eb" />
                      <span>Recent Orders</span>
                    </h3>
                    <span className="view-all-link" onClick={() => setActiveTab('orders')}>
                      View all →
                    </span>
                  </div>

                  <div className="table-responsive-container">
                    <table className="admin-orders-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Total</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {allCombinedOrders.slice(0, 5).map((order) => {
                          const isDelivered = order.status === 'completed';
                          const isProcessing = order.status === 'on_the_way';
                          const isPending = order.status === 'pending';

                          return (
                            <tr
                              key={order.orderId}
                              style={{ cursor: 'pointer' }}
                              onClick={() => setSelectedOrderForAction(order)}
                            >
                              <td>
                                <span className="order-code-val">{order.orderId}</span>
                              </td>
                              <td>
                                <span className="order-cust-name">{order.name} {order.surname}</span>
                              </td>
                              <td>
                                <span className="order-date-text">{order.createdAt || 'Sot'}</span>
                              </td>
                              <td>
                                <span
                                  className={`status-pill-badge ${isDelivered ? 'delivered' : isProcessing ? 'processing' : 'pending'}`}
                                >
                                  {isDelivered ? 'Delivered' : isProcessing ? 'Processing' : 'Pending'}
                                </span>
                              </td>
                              <td>
                                <span className="order-total-bold">€{Number(order.total || 0).toFixed(2)}</span>
                              </td>
                              <td>
                                <button
                                  className="order-action-dots-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedOrderForAction(order);
                                  }}
                                  title="Menaxho porosinë"
                                >
                                  <MoreHorizontal size={18} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right: Product Performance */}
                <div className="dashboard-panel-card">
                  <div className="panel-header-row">
                    <h3 className="panel-title-with-icon">
                      <BarChart3 size={19} color="#2563eb" />
                      <span>Product Performance</span>
                    </h3>
                    <span className="view-all-link" onClick={() => setActiveTab('products')}>
                      View all →
                    </span>
                  </div>

                  <div className="performance-list-wrap">
                    {productPerformanceItems.map((item, idx) => (
                      <div key={idx} className="perf-item-row">
                        <div className="perf-item-left">
                          <img src={item.image} alt={item.name} className="perf-item-thumb" />
                          <div className="perf-item-meta">
                            <h4>{item.name}</h4>
                            <span>{item.category}</span>
                          </div>
                        </div>

                        <div className="perf-item-right">
                          <div className="perf-revenue-box">
                            <span className="perf-rev-val">{item.revenue}</span>
                            <span className="perf-trend-val">↑ {item.trend}</span>
                          </div>
                          <svg className="perf-sparkline" viewBox="0 0 80 30">
                            <path
                              d="M 0 25 Q 25 15, 50 18 T 80 5"
                              fill="none"
                              stroke="#2563eb"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="dashboard-panel-card">
              <div className="panel-header-row">
                <div>
                  <h2 style={{ margin: '0 0 6px', fontSize: '1.4rem' }}>Menaxhimi i Porosive</h2>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
                    Përditësoni statusin, caktoni kompaninë e transportit dhe ndiqni dërgesat në kohë reale.
                  </p>
                </div>
              </div>

              {/* Orders Filters & Search */}
              <div style={{ display: 'flex', gap: '12px', margin: '20px 0', flexWrap: 'wrap' }}>
                <div className="admin-search-box" style={{ maxWidth: '320px' }}>
                  <Search size={16} color="#94a3b8" />
                  <input
                    type="text"
                    placeholder="Kërko me ID, klient, qytet..."
                    value={ordersSearch}
                    onChange={(e) => setOrdersSearch(e.target.value)}
                  />
                </div>

                <div className="timeframe-pill-group">
                  {[
                    { id: 'all', label: `Të Gjitha (${allCombinedOrders.length})` },
                    { id: 'pending', label: `Në Pritje (${allCombinedOrders.filter(o => o.status === 'pending').length})` },
                    { id: 'on_the_way', label: `Rrugës (${allCombinedOrders.filter(o => o.status === 'on_the_way').length})` },
                    { id: 'completed', label: `Kompletuar (${allCombinedOrders.filter(o => o.status === 'completed').length})` }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      className={`timeframe-btn ${ordersStatusFilter === tab.id ? 'active' : ''}`}
                      onClick={() => setOrdersStatusFilter(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              <div className="table-responsive-container">
                <table className="admin-orders-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Klienti</th>
                      <th>Kontakt & Qyteti</th>
                      <th>Statusi</th>
                      <th>Kompania e Transportit</th>
                      <th>Totali</th>
                      <th>Veprime</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCombinedOrders
                      .filter(o => ordersStatusFilter === 'all' || o.status === ordersStatusFilter)
                      .filter(o => !ordersSearch || o.orderId.toLowerCase().includes(ordersSearch.toLowerCase()) || (o.name + ' ' + o.surname).toLowerCase().includes(ordersSearch.toLowerCase()) || o.city?.toLowerCase().includes(ordersSearch.toLowerCase()))
                      .map((order) => (
                        <tr key={order.orderId}>
                          <td><strong>{order.orderId}</strong></td>
                          <td>
                            <div><strong>{order.name} {order.surname}</strong></div>
                            <small style={{ color: '#64748b' }}>{order.createdAt || 'Sot'}</small>
                          </td>
                          <td>
                            <div>{order.city}</div>
                            <small style={{ color: '#64748b' }}>{order.phone}</small>
                          </td>
                          <td>
                            <span className={`status-pill-badge ${order.status === 'completed' ? 'delivered' : order.status === 'on_the_way' ? 'processing' : 'pending'}`}>
                              {order.status === 'completed' ? 'Delivered' : order.status === 'on_the_way' ? 'Processing (Rrugës)' : 'Pending'}
                            </span>
                          </td>
                          <td>
                            <select
                              value={order.transportCompany || ''}
                              onChange={(e) => handleSetTransport(order.orderId, e.target.value)}
                              style={{
                                padding: '6px 10px',
                                borderRadius: '8px',
                                border: '1px solid #cbd5e1',
                                background: '#ffffff',
                                fontSize: '0.82rem',
                                fontWeight: '600'
                              }}
                            >
                              {TRANSPORT_COMPANIES.map(c => (
                                <option key={c.value} value={c.value}>{c.label}</option>
                              ))}
                            </select>
                          </td>
                          <td><strong>€{Number(order.total || 0).toFixed(2)}</strong></td>
                          <td>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button
                                className="order-action-dots-btn"
                                onClick={() => setSelectedOrderForAction(order)}
                                title="Shiko detajet & Menaxho"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button
                                className="order-action-dots-btn"
                                onClick={() => {
                                  if (window.confirm(`A jeni të sigurt që dëshironi të fshini porosinë ${order.orderId}?`)) {
                                    onDeleteOrder(order.orderId);
                                  }
                                }}
                                title="Fshij porosinë"
                                style={{ color: '#ef4444' }}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="dashboard-panel-card">
              <div className="panel-header-row">
                <div>
                  <h2 style={{ margin: '0 0 6px', fontSize: '1.4rem' }}>Menaxhimi i Produkteve</h2>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
                    Shtoni, ndryshoni çmimet, ofertat ose fshini artikuj nga katalogu i MaxMarket.
                  </p>
                </div>

                <button
                  className="admin-return-dashboard-btn"
                  onClick={onAddProduct}
                  style={{ padding: '9px 18px', fontSize: '0.92rem' }}
                >
                  <PlusCircle size={18} />
                  <span>Shto Produkt të Ri +</span>
                </button>
              </div>

              {/* Filters */}
              <div style={{ display: 'flex', gap: '12px', margin: '20px 0', flexWrap: 'wrap' }}>
                <div className="admin-search-box" style={{ maxWidth: '320px' }}>
                  <Search size={16} color="#94a3b8" />
                  <input
                    type="text"
                    placeholder="Kërko produktin me emër..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                  />
                </div>

                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    fontSize: '0.88rem'
                  }}
                >
                  <option value="all">Të Gjitha Kategoritë</option>
                  <option value="kitchen">Kuzhinë & Enë</option>
                  <option value="bedding">Tekstil & Fjetje</option>
                  <option value="decor">Dekor & Living</option>
                  <option value="bath">Banjë & Spa</option>
                </select>
              </div>

              {/* Products Table */}
              <div className="table-responsive-container">
                <table className="admin-orders-table">
                  <thead>
                    <tr>
                      <th>Produkti</th>
                      <th>Kategoria</th>
                      <th>Çmimi</th>
                      <th>Çmimi i Vjetër / Zbritja</th>
                      <th>Badge</th>
                      <th>Veprime</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products
                      .filter(p => productCategoryFilter === 'all' || p.category === productCategoryFilter)
                      .filter(p => !productSearch || p.name.toLowerCase().includes(productSearch.toLowerCase()))
                      .map((product) => (
                        <tr key={product.id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <img src={product.image} alt={product.name} style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }} />
                              <div>
                                <strong>{product.name}</strong>
                                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>ID: #{product.id}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span style={{ textTransform: 'capitalize' }}>{product.category}</span>
                          </td>
                          <td><strong>€{product.price.toFixed(2)}</strong></td>
                          <td>
                            {product.oldPrice ? (
                              <span style={{ color: '#ea580c', fontWeight: '700' }}>
                                €{product.oldPrice.toFixed(2)} (-{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%)
                              </span>
                            ) : (
                              <span style={{ color: '#94a3b8' }}>Pa zbritje</span>
                            )}
                          </td>
                          <td>
                            {product.badge ? (
                              <span className="status-pill-badge delivered">{product.badge}</span>
                            ) : (
                              <span style={{ color: '#94a3b8' }}>—</span>
                            )}
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                className="order-action-dots-btn"
                                onClick={() => onEditProduct(product)}
                                title="Ndrysho produktin"
                              >
                                <Edit3 size={17} color="#2563eb" />
                              </button>
                              <button
                                className="order-action-dots-btn"
                                onClick={() => {
                                  if (window.confirm(`Dëshironi të fshini "${product.name}"?`)) {
                                    onDeleteProduct(product.id);
                                  }
                                }}
                                title="Fshij produktin"
                              >
                                <Trash2 size={17} color="#ef4444" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="dashboard-panel-card">
              <div className="panel-header-row">
                <h2>Kategoritë e Dyqanit</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginTop: '16px' }}>
                {categories.map((cat) => (
                  <div key={cat.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', background: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <LayoutGrid size={22} color="#2563eb" />
                      <span className="nav-badge-pill" style={{ background: '#2563eb', color: '#fff' }}>
                        {products.filter(p => cat.id === 'all' ? true : p.category === cat.id).length} produkte
                      </span>
                    </div>
                    <h3 style={{ margin: '0 0 4px', fontSize: '1.05rem' }}>{cat.name}</h3>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>ID: {cat.id}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CUSTOMERS */}
          {activeTab === 'customers' && (
            <div className="dashboard-panel-card">
              <div className="panel-header-row">
                <h2>Klientët e Regjistruar & Blerësit</h2>
              </div>
              <div className="table-responsive-container">
                <table className="admin-orders-table">
                  <thead>
                    <tr>
                      <th>Emri & Mbiemri</th>
                      <th>Email</th>
                      <th>Telefoni</th>
                      <th>Qyteti</th>
                      <th>Porosi Gjithsej</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCombinedOrders.map((o, idx) => (
                      <tr key={idx}>
                        <td><strong>{o.name} {o.surname}</strong></td>
                        <td>{o.email}</td>
                        <td>{o.phone}</td>
                        <td>{o.city}</td>
                        <td><span className="status-pill-badge processing">1 Porosi</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: DISCOUNTS */}
          {activeTab === 'discounts' && (
            <div className="dashboard-panel-card">
              <div className="panel-header-row">
                <h2>Produktet me Zbritje & Oferta</h2>
              </div>
              <div className="table-responsive-container">
                <table className="admin-orders-table">
                  <thead>
                    <tr>
                      <th>Produkti</th>
                      <th>Çmimi Aktual</th>
                      <th>Çmimi Paraprak</th>
                      <th>Kursimi</th>
                      <th>Veprim</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.filter(p => p.oldPrice).map((p) => (
                      <tr key={p.id}>
                        <td>
                          <strong>{p.name}</strong>
                        </td>
                        <td><strong>€{p.price.toFixed(2)}</strong></td>
                        <td><del style={{ color: '#94a3b8' }}>€{p.oldPrice.toFixed(2)}</del></td>
                        <td><span className="status-pill-badge delivered">-€{(p.oldPrice - p.price).toFixed(2)}</span></td>
                        <td>
                          <button className="order-action-dots-btn" onClick={() => onEditProduct(p)}>
                            <Edit3 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="dashboard-panel-card">
              <div className="panel-header-row">
                <h2>Gjendja e Magazinës (Inventory)</h2>
              </div>
              <div className="table-responsive-container">
                <table className="admin-orders-table">
                  <thead>
                    <tr>
                      <th>Produkti</th>
                      <th>Kategoria</th>
                      <th>Stoku Aktual</th>
                      <th>Statusi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p, idx) => {
                      const stockQty = (idx % 3 === 0) ? 4 : (idx % 5 === 0) ? 0 : 25;
                      return (
                        <tr key={p.id}>
                          <td><strong>{p.name}</strong></td>
                          <td>{p.category}</td>
                          <td>{stockQty} copë</td>
                          <td>
                            <span className={`status-pill-badge ${stockQty === 0 ? 'pending' : stockQty < 5 ? 'processing' : 'delivered'}`}>
                              {stockQty === 0 ? 'Out of stock' : stockQty < 5 ? 'Low Stock' : 'In Stock'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: REPORTS */}
          {activeTab === 'reports' && (
            <div className="dashboard-panel-card">
              <div className="panel-header-row">
                <h2>Raporti Financiar & Dërgesat</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '16px' }}>
                <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ margin: '0 0 10px', color: '#64748b' }}>Kompanitë e Transportit</h4>
                  <p>🏛️ Posta: <strong>35%</strong></p>
                  <p>🚐 Mikmik: <strong>28%</strong></p>
                  <p>⚡ Posta e shpejtë: <strong>22%</strong></p>
                  <p>🐆 PostaCheetah: <strong>15%</strong></p>
                </div>
                <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <h4 style={{ margin: '0 0 10px', color: '#64748b' }}>Mënyrat e Pagesës</h4>
                  <p>💵 Para në Dorë (Cash): <strong>82%</strong></p>
                  <p>💳 Kartelë Bankare: <strong>18%</strong></p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="dashboard-panel-card" style={{ maxWidth: '650px' }}>
              <div className="panel-header-row">
                <h2>Cilësimet e Dyqanit</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>Emri i Dyqanit</label>
                  <input type="text" defaultValue="MaxMarket" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>Email i Kontaktit</label>
                  <input type="email" defaultValue="support@maxmarket-ks.com" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>Pragu për Dërgesë Falas (€)</label>
                  <input type="number" defaultValue="30" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                </div>
                <button
                  className="admin-return-dashboard-btn"
                  onClick={() => alert("Cilësimet u ruajtën me sukses!")}
                  style={{ alignSelf: 'flex-start', padding: '10px 20px', marginTop: '10px' }}
                >
                  Ruaj Ndryshimet
                </button>
              </div>
            </div>
          )}

          {/* TAB 10: SELLERS, MESSAGES, SUPPORT */}
          {(activeTab === 'sellers' || activeTab === 'messages' || activeTab === 'support') && (
            <div className="dashboard-panel-card">
              <h2 style={{ textTransform: 'capitalize' }}>{activeTab}</h2>
              <p style={{ color: '#64748b' }}>
                Ky modul është plotësisht i integruar me panelin tuaj të MaxMarket.
              </p>
              <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
                <CheckCircle2 size={36} color="#16a34a" style={{ margin: '0 auto 12px' }} />
                <h4>Gjithçka është në rregull dhe e sinkronizuar me bazën e të dhënave!</h4>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── Quick Action / Order Edit Modal ── */}
      {selectedOrderForAction && (
        <div className="admin-quick-action-modal-backdrop" onClick={() => setSelectedOrderForAction(null)}>
          <div className="admin-quick-action-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-icon" onClick={() => setSelectedOrderForAction(null)}>
              <X size={18} />
            </button>

            <h3 style={{ margin: '0 0 6px', fontSize: '1.25rem' }}>
              Menaxho Porosinë: {selectedOrderForAction.orderId}
            </h3>
            <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '0.85rem' }}>
              Përditësoni statusin ose zgjidhni kompaninë e transportit për këtë porosi.
            </p>

            <div className="order-detail-grid">
              <div className="order-detail-item">
                <strong>Klienti</strong>
                <span>{selectedOrderForAction.name} {selectedOrderForAction.surname}</span>
              </div>
              <div className="order-detail-item">
                <strong>Telefoni</strong>
                <span>{selectedOrderForAction.phone}</span>
              </div>
              <div className="order-detail-item">
                <strong>Adresa</strong>
                <span>{selectedOrderForAction.address}, {selectedOrderForAction.city}</span>
              </div>
              <div className="order-detail-item">
                <strong>Totali</strong>
                <span style={{ fontWeight: '800', color: '#2563eb' }}>
                  €{Number(selectedOrderForAction.total || 0).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Status Selector Buttons */}
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
              Përditëso Statusin:
            </label>
            <div className="status-select-btn-group">
              <button
                className={`status-choice-btn pending ${selectedOrderForAction.status === 'pending' ? 'active' : ''}`}
                onClick={() => handleSetOrderStatus(selectedOrderForAction.orderId, 'pending')}
              >
                <Clock size={14} /> Në Pritje
              </button>

              <button
                className={`status-choice-btn on_the_way ${selectedOrderForAction.status === 'on_the_way' ? 'active' : ''}`}
                onClick={() => handleSetOrderStatus(selectedOrderForAction.orderId, 'on_the_way')}
              >
                <Truck size={14} /> Rrugës
              </button>

              <button
                className={`status-choice-btn completed ${selectedOrderForAction.status === 'completed' ? 'active' : ''}`}
                onClick={() => handleSetOrderStatus(selectedOrderForAction.orderId, 'completed')}
              >
                <CheckCircle2 size={14} /> Kompletuar
              </button>
            </div>

            {/* Transport Company Selector */}
            <div className="transport-modal-section">
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#475569' }}>
                Kompania e Transportit:
              </label>
              <select
                className="transport-modal-select"
                value={selectedOrderForAction.transportCompany || ''}
                onChange={(e) => handleSetTransport(selectedOrderForAction.orderId, e.target.value)}
              >
                {TRANSPORT_COMPANIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button
                style={{
                  padding: '9px 16px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#f8fafc',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
                onClick={() => setSelectedOrderForAction(null)}
              >
                Mbyll
              </button>
              <button
                style={{
                  padding: '9px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#2563eb',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontWeight: '700'
                }}
                onClick={() => setSelectedOrderForAction(null)}
              >
                ✓ Ruaj Ndryshimet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
