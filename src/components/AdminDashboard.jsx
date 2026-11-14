import React, { useState, useMemo } from 'react';
import { HouseMLogo } from './BrandLogo';
import {
  Home,
  ShoppingCart,
  Package,
  LayoutGrid,
  Users,
  Tag,
  Boxes,
  Settings,
  LogOut,
  Calendar,
  ChevronDown,
  TrendingUp,
  Clock,
  CheckCircle2,
  Truck,
  Trash2,
  Edit3,
  PlusCircle,
  MoreHorizontal,
  X,
  Menu,
  Sparkles,
  BarChart3,
  Plus,
  Percent
} from 'lucide-react';
import DiscountModal from './DiscountModal';
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
  onOpenProductSelector,
  onSaveProduct,
  onDeleteProduct,
  onAddCategory,
  onLogout
}) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30D');
  const [selectedOrderForAction, setSelectedOrderForAction] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [dateRange, setDateRange] = useState('Oct 1 – Oct 31, 2026');
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  // Discount modal state (Discounts are managed exclusively here)
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [selectedProductForDiscount, setSelectedProductForDiscount] = useState(null);

  const handleRemoveProductDiscount = (productId) => {
    const prod = products.find(p => String(p.id) === String(productId));
    if (!prod) return;
    if (window.confirm(`A jeni të sigurt që dëshironi të hiqni zbritjen nga "${prod.name}"?`)) {
      const updated = {
        ...prod,
        price: prod.oldPrice ? Number(prod.oldPrice) : prod.price,
        oldPrice: null,
        badge: prod.badge && prod.badge.startsWith('-') ? '' : prod.badge
      };
      if (onSaveProduct) {
        onSaveProduct(updated);
      }
    }
  };

  // Categories modal state
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('Sparkles');
  const [newCatBadge, setNewCatBadge] = useState('');

  // Search filter for dedicated tabs
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [ordersSearch, setOrdersSearch] = useState('');
  const [ordersStatusFilter, setOrdersStatusFilter] = useState('all');

  // Real data calculations starting strictly from 0
  const totalSales = useMemo(() => {
    return orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  }, [orders]);

  const totalSalesFormatted = '€' + totalSales.toFixed(2);
  const totalOrdersCount = orders.length;
  const totalProductsCount = products.length;

  const uniqueCustomersList = useMemo(() => {
    const map = new Map();
    orders.forEach((o) => {
      const emailKey = (o.email || '').trim().toLowerCase();
      if (emailKey && !map.has(emailKey)) {
        map.set(emailKey, o);
      }
    });
    return Array.from(map.values());
  }, [orders]);

  const uniqueCustomersCount = uniqueCustomersList.length;

  // Product performance items
  const productPerformanceItems = [
    {
      name: 'Storage Box 50L',
      category: 'Home & Living',
      revenue: totalSales > 0 ? `€${(totalSales * 0.4).toFixed(2)}` : '€0.00',
      trend: totalSales > 0 ? '+18.2%' : '0%',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=120&q=80'
    },
    {
      name: 'Kitchen Organizer',
      category: 'Kitchen',
      revenue: totalSales > 0 ? `€${(totalSales * 0.3).toFixed(2)}` : '€0.00',
      trend: totalSales > 0 ? '+14.7%' : '0%',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=120&q=80'
    },
    {
      name: 'Cleaning Bucket',
      category: 'Cleaning',
      revenue: totalSales > 0 ? `€${(totalSales * 0.2).toFixed(2)}` : '€0.00',
      trend: totalSales > 0 ? '+10.1%' : '0%',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=120&q=80'
    },
    {
      name: 'Laundry Basket',
      category: 'Home & Living',
      revenue: totalSales > 0 ? `€${(totalSales * 0.1).toFixed(2)}` : '€0.00',
      trend: totalSales > 0 ? '+9.8%' : '0%',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=120&q=80'
    }
  ];

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

  // Handle Add Category Submit
  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const id = newCatName.trim().toLowerCase().replace(/\s+/g, '-');
    const newCategory = {
      id,
      name: newCatName.trim(),
      icon: newCatIcon,
      count: 0,
      badge: newCatBadge.trim() || null
    };

    if (onAddCategory) {
      onAddCategory(newCategory);
    }

    setNewCatName('');
    setNewCatBadge('');
    setIsAddCategoryOpen(false);
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
            <HouseMLogo size={28} color="#ffffff" />
          </div>
          <div className="admin-brand-info">
            <h2>MaxMarket</h2>
            <span>Admin Panel</span>
          </div>
        </div>

        {/* Navigation Items (Cleaned as requested) */}
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
            <span className="nav-badge-pill">{orders.length}</span>
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
            <span className="nav-badge-pill">{uniqueCustomersCount}</span>
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
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
          >
            <div className="nav-item-left">
              <Settings size={19} />
              <span>Settings</span>
            </div>
          </button>
        </nav>

        {/* Sidebar Footer with Logout only */}
        <div className="admin-sidebar-footer">
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
        {/* Top Header Bar (Search bar, Shiko Dyqanin & Bell removed) */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              className="sidebar-toggle-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Hap menynë"
            >
              <Menu size={22} />
            </button>
          </div>

          <div className="admin-topbar-right">
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
          {/* TAB 1: DASHBOARD */}
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

              {/* 4 Stat Cards Row - Starts at Zero and increments with real data */}
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
                      <span className="stat-trend" style={{ color: totalSales > 0 ? '#16a34a' : '#64748b' }}>
                        <TrendingUp size={13} /> {totalSales > 0 ? '+100%' : '0%'}
                      </span>
                    </div>
                  </div>
                  <svg className="stat-sparkline" viewBox="0 0 100 40">
                    <path
                      d={totalSales > 0 ? "M 0 32 Q 25 10, 50 24 T 100 8" : "M 0 35 L 100 35"}
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
                      <h3 className="stat-value">{totalOrdersCount}</h3>
                      <span className="stat-trend" style={{ color: totalOrdersCount > 0 ? '#16a34a' : '#64748b' }}>
                        <TrendingUp size={13} /> {totalOrdersCount > 0 ? `+${totalOrdersCount} të reja` : '0 të reja'}
                      </span>
                    </div>
                  </div>
                  <svg className="stat-sparkline" viewBox="0 0 100 40">
                    <path
                      d={totalOrdersCount > 0 ? "M 0 28 Q 30 35, 55 18 T 100 12" : "M 0 35 L 100 35"}
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
                        <TrendingUp size={13} /> Aktive në dyqan
                      </span>
                    </div>
                  </div>
                  <svg className="stat-sparkline" viewBox="0 0 100 40">
                    <path
                      d="M 0 32 Q 25 28, 50 18 T 100 10"
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
                      <h3 className="stat-value">{uniqueCustomersCount}</h3>
                      <span className="stat-trend" style={{ color: uniqueCustomersCount > 0 ? '#16a34a' : '#64748b' }}>
                        <TrendingUp size={13} /> {uniqueCustomersCount > 0 ? `+${uniqueCustomersCount} të regjistruar` : '0 të regjistruar'}
                      </span>
                    </div>
                  </div>
                  <svg className="stat-sparkline" viewBox="0 0 100 40">
                    <path
                      d={uniqueCustomersCount > 0 ? "M 0 32 Q 25 36, 50 18 T 100 8" : "M 0 35 L 100 35"}
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
                      <text x="15" y="34" fill="#94a3b8" fontSize="11" fontWeight="600">
                        {totalSales > 0 ? `€${Math.ceil(totalSales * 1.2)}` : '€100'}
                      </text>
                      <text x="15" y="79" fill="#94a3b8" fontSize="11" fontWeight="600">
                        {totalSales > 0 ? `€${Math.ceil(totalSales * 0.9)}` : '€75'}
                      </text>
                      <text x="15" y="124" fill="#94a3b8" fontSize="11" fontWeight="600">
                        {totalSales > 0 ? `€${Math.ceil(totalSales * 0.6)}` : '€50'}
                      </text>
                      <text x="15" y="169" fill="#94a3b8" fontSize="11" fontWeight="600">
                        {totalSales > 0 ? `€${Math.ceil(totalSales * 0.3)}` : '€25'}
                      </text>
                      <text x="25" y="214" fill="#94a3b8" fontSize="11" fontWeight="600">€0</text>

                      {totalSales === 0 ? (
                        <>
                          <line x1="50" y1="210" x2="660" y2="210" stroke="#2563eb" strokeWidth="2.5" />
                          <circle cx="50" cy="210" r="4" fill="#2563eb" />
                          <circle cx="200" cy="210" r="4" fill="#2563eb" />
                          <circle cx="350" cy="210" r="4" fill="#2563eb" />
                          <circle cx="500" cy="210" r="4" fill="#2563eb" />
                          <circle cx="660" cy="210" r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                        </>
                      ) : (
                        <>
                          <path
                            d="M 50 210 
                               C 100 200, 150 170, 250 145 
                               C 350 120, 450 100, 550 80 
                               C 600 70, 630 60, 660 55 
                               L 660 210 L 50 210 Z"
                            fill="url(#chartGradient)"
                          />
                          <path
                            d="M 50 210 
                               C 100 200, 150 170, 250 145 
                               C 350 120, 450 100, 550 80 
                               C 600 70, 630 60, 660 55"
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                          />
                          <circle cx="50" cy="210" r="4" fill="#2563eb" />
                          <circle cx="250" cy="145" r="4" fill="#2563eb" />
                          <circle cx="450" cy="100" r="4" fill="#2563eb" />
                          <circle cx="660" cy="55" r="6" fill="#2563eb" stroke="#ffffff" strokeWidth="2.5" />
                          <line x1="660" y1="55" x2="660" y2="210" stroke="#2563eb" strokeDasharray="3,3" strokeWidth="1.5" />
                        </>
                      )}
                    </svg>

                    <div
                      className="chart-tooltip-badge"
                      style={{
                        position: 'absolute',
                        top: totalSales > 0 ? '12px' : '170px',
                        right: '28px'
                      }}
                    >
                      {totalSalesFormatted}
                    </div>
                  </div>

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
                    {orders.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '40px 10px', color: '#64748b' }}>
                        <Clock size={32} style={{ margin: '0 auto 10px', opacity: 0.35 }} />
                        <h4 style={{ margin: '0 0 4px', fontSize: '0.92rem', color: '#334155' }}>
                          Nuk ka ende asnjë aktivitet
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.78rem' }}>
                          Kur një klient bën porosi në dyqan, aktiviteti shfaqet menjëherë këtu.
                        </p>
                      </div>
                    ) : (
                      orders.slice(0, 5).map((ord) => (
                        <div key={ord.orderId} className="activity-item-row">
                          <div className="activity-left-side">
                            <div className="activity-icon-bubble green">
                              <ShoppingCart size={17} />
                            </div>
                            <div className="activity-text-info">
                              <h4>Porosi e re #{ord.orderId}</h4>
                              <p>
                                €{Number(ord.total).toFixed(2)} • {ord.status === 'on_the_way' ? 'Rrugës' : ord.status === 'completed' ? 'Kompletuar' : 'Në Pritje'}
                              </p>
                            </div>
                          </div>
                          <span className="activity-time-stamp">{ord.createdAt || 'Sapo'}</span>
                        </div>
                      ))
                    )}
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
                        {orders.length === 0 ? (
                          <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '38px 20px', color: '#64748b' }}>
                              <ShoppingCart size={32} style={{ margin: '0 auto 8px', display: 'block', opacity: 0.35 }} />
                              <strong style={{ display: 'block', color: '#1e293b', marginBottom: '4px' }}>
                                Nuk ka asnjë porosi të kryer (0 porosi)
                              </strong>
                              <span>Bëni një porosi në dyqan si klient për ta parë këtu në kohë reale (+1)!</span>
                            </td>
                          </tr>
                        ) : (
                          orders.slice(0, 5).map((order) => {
                            const isDelivered = order.status === 'completed';
                            const isProcessing = order.status === 'on_the_way';

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
                          })
                        )}
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
                <div className="admin-search-box" style={{ maxWidth: '320px', background: '#ffffff', border: '1px solid #cbd5e1' }}>
                  <input
                    type="text"
                    placeholder="Kërko me ID, klient, qytet..."
                    value={ordersSearch}
                    onChange={(e) => setOrdersSearch(e.target.value)}
                  />
                </div>

                <div className="timeframe-pill-group">
                  {[
                    { id: 'all', label: `Të Gjitha (${orders.length})` },
                    { id: 'pending', label: `Në Pritje (${orders.filter(o => o.status === 'pending').length})` },
                    { id: 'on_the_way', label: `Rrugës (${orders.filter(o => o.status === 'on_the_way').length})` },
                    { id: 'completed', label: `Kompletuar (${orders.filter(o => o.status === 'completed').length})` }
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
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center', padding: '38px', color: '#64748b' }}>
                          Nuk ka asnjë porosi të regjistruar në dyqan.
                        </td>
                      </tr>
                    ) : (
                      orders
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
                        ))
                    )}
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

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {onOpenProductSelector && (
                    <button
                      className="admin-return-dashboard-btn"
                      onClick={onOpenProductSelector}
                      style={{ padding: '9px 18px', fontSize: '0.92rem', background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe' }}
                    >
                      <Edit3 size={17} />
                      <span>Ndrysho / Edito Produkt ✏️</span>
                    </button>
                  )}
                  <button
                    className="admin-return-dashboard-btn"
                    onClick={onAddProduct}
                    style={{ padding: '9px 18px', fontSize: '0.92rem' }}
                  >
                    <PlusCircle size={18} />
                    <span>Shto Produkt të Ri +</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div style={{ display: 'flex', gap: '12px', margin: '20px 0', flexWrap: 'wrap' }}>
                <div className="admin-search-box" style={{ maxWidth: '320px', background: '#ffffff', border: '1px solid #cbd5e1' }}>
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
                  {categories.filter(c => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
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
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <button
                                className="order-action-dots-btn"
                                onClick={() => onEditProduct(product)}
                                title="Ndrysho të dhënat e këtij produkti"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  padding: '5px 10px',
                                  background: '#eff6ff',
                                  color: '#2563eb',
                                  border: '1px solid #bfdbfe',
                                  borderRadius: '6px',
                                  fontWeight: '600',
                                  fontSize: '0.8rem',
                                  cursor: 'pointer'
                                }}
                              >
                                <Edit3 size={14} color="#2563eb" />
                                <span>Edito</span>
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
                                <Trash2 size={16} color="#ef4444" />
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

          {/* TAB 4: CATEGORIES (With Add Category Button & Modal) */}
          {activeTab === 'categories' && (
            <div className="dashboard-panel-card">
              <div className="panel-header-row">
                <div>
                  <h2 style={{ margin: '0 0 4px', fontSize: '1.4rem' }}>Kategoritë e Dyqanit</h2>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
                    Menaxhoni dhe shtoni kategori të reja për produktet e MaxMarket.
                  </p>
                </div>

                <button
                  className="admin-return-dashboard-btn"
                  onClick={() => setIsAddCategoryOpen(true)}
                  style={{ padding: '9px 18px', fontSize: '0.92rem' }}
                >
                  <PlusCircle size={18} />
                  <span>Shto Kategori +</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginTop: '20px' }}>
                {categories.map((cat) => (
                  <div key={cat.id} style={{ border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '18px', background: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <LayoutGrid size={20} />
                      </div>
                      <span className="nav-badge-pill" style={{ background: '#2563eb', color: '#fff' }}>
                        {products.filter(p => cat.id === 'all' ? true : p.category === cat.id).length} artikuj
                      </span>
                    </div>
                    <h3 style={{ margin: '0 0 4px', fontSize: '1.05rem', fontWeight: '700' }}>{cat.name}</h3>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>slug: {cat.id}</p>
                    {cat.badge && (
                      <span style={{ display: 'inline-block', marginTop: '8px', fontSize: '0.72rem', fontWeight: '700', padding: '2px 8px', borderRadius: '12px', background: '#dcfce7', color: '#16a34a' }}>
                        {cat.badge}
                      </span>
                    )}
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
                    {uniqueCustomersList.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>
                          Nuk ka ende asnjë klient të regjistruar ose porosi të kryer (0 klientë).
                        </td>
                      </tr>
                    ) : (
                      uniqueCustomersList.map((c, idx) => (
                        <tr key={idx}>
                          <td><strong>{c.name} {c.surname}</strong></td>
                          <td>{c.email}</td>
                          <td>{c.phone}</td>
                          <td>{c.city}</td>
                          <td><span className="status-pill-badge processing">Klient Aktiv</span></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: DISCOUNTS (Discounts are managed exclusively here) */}
          {activeTab === 'discounts' && (
            <div className="dashboard-panel-card">
              <div className="panel-header-row">
                <div>
                  <h2 style={{ margin: '0 0 6px', fontSize: '1.4rem' }}>Produktet me Zbritje & Oferta</h2>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
                    Menaxhoni zbritjet, çmimet promovuese dhe ofertat speciale për të gjithë artikujt e dyqanit.
                  </p>
                </div>

                <button
                  className="admin-return-dashboard-btn"
                  onClick={() => {
                    setSelectedProductForDiscount(null);
                    setIsDiscountModalOpen(true);
                  }}
                  style={{
                    padding: '9px 18px',
                    fontSize: '0.92rem',
                    background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                    color: '#ffffff',
                    border: 'none',
                    boxShadow: '0 4px 12px rgba(234, 88, 12, 0.25)'
                  }}
                >
                  <Tag size={17} />
                  <span>Apliko Zbritje të Re +</span>
                </button>
              </div>

              {products.filter(p => p.oldPrice).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f8fafc', borderRadius: '16px', border: '1.5px dashed #cbd5e1', margin: '20px 0' }}>
                  <Tag size={40} color="#94a3b8" style={{ marginBottom: '12px' }} />
                  <h3 style={{ margin: '0 0 6px', color: '#0f172a', fontSize: '1.15rem' }}>Nuk ka asnjë produkt me zbritje aktualisht</h3>
                  <p style={{ margin: '0 0 18px', color: '#64748b', fontSize: '0.88rem' }}>
                    Vendosni oferta speciale me çmime të reduktuara ose përqindje zbritjeje.
                  </p>
                  <button
                    className="admin-return-dashboard-btn"
                    onClick={() => {
                      setSelectedProductForDiscount(null);
                      setIsDiscountModalOpen(true);
                    }}
                    style={{
                      padding: '9px 20px',
                      fontSize: '0.9rem',
                      background: '#ea580c',
                      color: '#ffffff',
                      border: 'none'
                    }}
                  >
                    <Plus size={16} />
                    <span>Apliko Zbritjen e Parë</span>
                  </button>
                </div>
              ) : (
                <div className="table-responsive-container">
                  <table className="admin-orders-table">
                    <thead>
                      <tr>
                        <th>Produkti</th>
                        <th>Kategoria</th>
                        <th>Çmimi me Zbritje</th>
                        <th>Çmimi Paraprak</th>
                        <th>Kursimi / Zbritja</th>
                        <th>Veprime</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.filter(p => p.oldPrice).map((p) => {
                        const savingsAmount = (p.oldPrice - p.price).toFixed(2);
                        const discountPercent = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
                        return (
                          <tr key={p.id}>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }}
                                />
                                <div>
                                  <strong>{p.name}</strong>
                                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>ID: #{p.id}</div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span style={{ textTransform: 'capitalize' }}>{p.category}</span>
                            </td>
                            <td>
                              <strong style={{ color: '#ea580c', fontSize: '1.05rem' }}>€{p.price.toFixed(2)}</strong>
                            </td>
                            <td>
                              <del style={{ color: '#94a3b8', fontSize: '0.95rem' }}>€{p.oldPrice.toFixed(2)}</del>
                            </td>
                            <td>
                              <span className="status-pill-badge delivered" style={{ background: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa', fontWeight: '700' }}>
                                -€{savingsAmount} (-{discountPercent}%)
                              </span>
                            </td>
                            <td>
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <button
                                  className="order-action-dots-btn"
                                  onClick={() => {
                                    setSelectedProductForDiscount(p);
                                    setIsDiscountModalOpen(true);
                                  }}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '6px 12px',
                                    background: '#fff7ed',
                                    color: '#c2410c',
                                    border: '1px solid #fed7aa',
                                    borderRadius: '8px',
                                    fontWeight: '700',
                                    fontSize: '0.82rem',
                                    cursor: 'pointer'
                                  }}
                                  title="Edito zbritjen e këtij produkti"
                                >
                                  <Tag size={14} color="#ea580c" />
                                  <span>Edito Zbritjen</span>
                                </button>

                                <button
                                  className="order-action-dots-btn"
                                  onClick={() => handleRemoveProductDiscount(p.id)}
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '6px 10px',
                                    background: '#fef2f2',
                                    color: '#dc2626',
                                    border: '1px solid #fecaca',
                                    borderRadius: '8px',
                                    fontWeight: '600',
                                    fontSize: '0.82rem',
                                    cursor: 'pointer'
                                  }}
                                  title="Hiq zbritjen dhe ktheje në çmim normal"
                                >
                                  <Trash2 size={14} color="#dc2626" />
                                  <span>Hiq</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
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

          {/* TAB 8: SETTINGS */}
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
        </main>
      </div>

      {/* ── Modal: Shto Kategori të Re ── */}
      {isAddCategoryOpen && (
        <div className="admin-quick-action-modal-backdrop" onClick={() => setIsAddCategoryOpen(false)}>
          <div className="admin-quick-action-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <button className="modal-close-icon" onClick={() => setIsAddCategoryOpen(false)}>
              <X size={18} />
            </button>

            <h3 style={{ margin: '0 0 6px', fontSize: '1.25rem' }}>
              Shto Kategori të Re
            </h3>
            <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '0.85rem' }}>
              Krijoni një kategori të re për të organizuar produktet e dyqanit.
            </p>

            <form onSubmit={handleCreateCategory}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  Emri i Kategorisë *
                </label>
                <input
                  type="text"
                  placeholder="psh. Vegla Kopshti, Pajisje Elektrike..."
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  Etiketë / Badge (Opsionale)
                </label>
                <input
                  type="text"
                  placeholder="psh. E Re, Zbritje..."
                  value={newCatBadge}
                  onChange={(e) => setNewCatBadge(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #cbd5e1', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button
                  type="button"
                  style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', fontWeight: '600' }}
                  onClick={() => setIsAddCategoryOpen(false)}
                >
                  Anulo
                </button>
                <button
                  type="submit"
                  style={{ padding: '9px 20px', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#ffffff', cursor: 'pointer', fontWeight: '700' }}
                >
                  <Plus size={16} style={{ display: 'inline', marginRight: '4px' }} />
                  Krijo Kategorinë
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

      {/* DEDICATED DISCOUNT MODAL (Exclusively managed here) */}
      {isDiscountModalOpen && (
        <DiscountModal
          isOpen={true}
          products={products}
          initialProduct={selectedProductForDiscount}
          onClose={() => {
            setIsDiscountModalOpen(false);
            setSelectedProductForDiscount(null);
          }}
          onSaveDiscount={(updatedProduct) => {
            if (onSaveProduct) {
              onSaveProduct(updatedProduct);
            }
            setIsDiscountModalOpen(false);
            setSelectedProductForDiscount(null);
          }}
          onRemoveDiscount={(productId) => {
            handleRemoveProductDiscount(productId);
            setIsDiscountModalOpen(false);
            setSelectedProductForDiscount(null);
          }}
        />
      )}
    </div>
  );
}
