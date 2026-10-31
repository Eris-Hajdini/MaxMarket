import React, { useState } from 'react';
import { X, Package, Clock, CheckCircle2, Phone, Mail, MapPin, Trash2, Calendar, Filter, Truck } from 'lucide-react';

const TRANSPORT_COMPANIES = [
  { value: '', label: '— Zgjidh Kompaninë —' },
  { value: 'Posta', label: '🏛️ Posta' },
  { value: 'Mikmik', label: '🚐 Mikmik' },
  { value: 'Posta e shpejtë', label: '⚡ Posta e shpejtë' },
  { value: 'PostaCheetah', label: '🐆 PostaCheetah' },
];

export default function OrdersModal({ isOpen, onClose, orders, onUpdateStatus, onDeleteOrder, onUpdateTransport }) {
  const [filterStatus, setFilterStatus] = useState('pending');

  if (!isOpen) return null;

  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const onTheWayOrders = orders.filter((o) => o.status === 'on_the_way');
  const completedOrders = orders.filter((o) => o.status === 'completed');

  const displayedOrders = filterStatus === 'all'
    ? orders
    : filterStatus === 'completed'
      ? completedOrders
      : filterStatus === 'on_the_way'
        ? onTheWayOrders
        : pendingOrders;

  return (
    <div className="add-product-backdrop" onClick={onClose}>
      <div className="orders-admin-modal" onClick={(e) => e.stopPropagation()}>
        <button className="add-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="orders-header">
          <div className="admin-pill-tag">
            <Package size={15} /> Paneli i Porosive (Admin)
          </div>
          <h2>Porositë e Klientëve</h2>
          <p>Përditësoni statusin në kohë reale: Në Pritje, Rrugës (On The Way) ose e Kompletuar.</p>

          {/* Orders Filter Tabs */}
          <div className="orders-status-tabs">
            <button
              className={`status-tab-btn pending ${filterStatus === 'pending' ? 'active' : ''}`}
              onClick={() => setFilterStatus('pending')}
            >
              <Clock size={14} />
              <span>Në Pritje ({pendingOrders.length})</span>
            </button>

            <button
              className={`status-tab-btn on-the-way ${filterStatus === 'on_the_way' ? 'active' : ''}`}
              onClick={() => setFilterStatus('on_the_way')}
            >
              <Truck size={14} />
              <span>Rrugës ({onTheWayOrders.length})</span>
            </button>

            <button
              className={`status-tab-btn completed ${filterStatus === 'completed' ? 'active' : ''}`}
              onClick={() => setFilterStatus('completed')}
            >
              <CheckCircle2 size={14} />
              <span>Të Kompletuara ({completedOrders.length})</span>
            </button>

            <button
              className={`status-tab-btn ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              <Filter size={14} />
              <span>Të Gjitha ({orders.length})</span>
            </button>
          </div>
        </div>

        <div className="orders-body-list">
          {displayedOrders.length === 0 ? (
            <div className="orders-empty-state">
              <Package size={48} className="empty-box-icon" />
              <h3>
                {filterStatus === 'pending'
                  ? 'Nuk ka asnjë porosi në pritje'
                  : filterStatus === 'on_the_way'
                    ? 'Nuk ka asnjë porosi aktualisht rrugës'
                    : filterStatus === 'completed'
                      ? 'Nuk ka ende porosi të kompletuara'
                      : 'Nuk ka asnjë porosi'}
              </h3>
              <p>Porositë që kryhen nga klientët në dyqan do të shfaqen menjëherë këtu.</p>
            </div>
          ) : (
            displayedOrders.map((order) => {
              const isCompleted = order.status === 'completed';
              const isOnTheWay = order.status === 'on_the_way';
              const isPending = order.status === 'pending';

              return (
                <div 
                  key={order.orderId} 
                  className={`order-card-item ${isCompleted ? 'is-done' : isOnTheWay ? 'is-on-the-way' : 'is-pending'}`}
                >
                  {/* Order Top Bar */}
                  <div className="order-item-header">
                    <div className="order-id-date">
                      <span className="order-id-text">{order.orderId}</span>
                      <span className="order-date-pill">
                        <Calendar size={13} />
                        {order.createdAt || 'Sot'}
                      </span>
                    </div>

                    <div className="order-status-controller">
                      {/* Current Status Pill */}
                      <span className={`status-badge-indicator ${isCompleted ? 'done' : isOnTheWay ? 'ontheway' : 'pending'}`}>
                        {isCompleted ? <CheckCircle2 size={15} /> : isOnTheWay ? <Truck size={15} /> : <Clock size={15} />}
                        <span>
                          {isCompleted ? 'E Kompletuar' : isOnTheWay ? '🚚 Rrugës' : 'Në Pritje'}
                        </span>
                      </span>

                      {/* BUTTON: Rrugës (On The Way) */}
                      {!isCompleted && (
                        <button
                          className={`toggle-status-btn ontheway-btn ${isOnTheWay ? 'active' : ''}`}
                          onClick={() => onUpdateStatus(order.orderId, isOnTheWay ? 'pending' : 'on_the_way')}
                          title={isOnTheWay ? "Kthe në Pritje" : "Njofto klientin se porosia është rrugës"}
                        >
                          <Truck size={14} />
                          <span>{isOnTheWay ? '✓ Është Rrugës' : 'Rrugës'}</span>
                        </button>
                      )}

                      {/* BUTTON: Complete / Revert */}
                      <button
                        className={`toggle-status-btn ${isCompleted ? 'revert-btn' : 'complete-btn'}`}
                        onClick={() => onUpdateStatus(order.orderId, isCompleted ? 'pending' : 'completed')}
                        title={isCompleted ? "Kthe tek Porositë Aktive" : "Shëno si të dorëzuar / kompletuar"}
                      >
                        {isCompleted ? 'Kthe në Pritje ↺' : 'Kompleto ✓'}
                      </button>

                      <button
                        className="delete-order-mini-btn"
                        onClick={() => {
                          if (window.confirm(`A jeni të sigurt që dëshironi të fshini porosinë ${order.orderId}?`)) {
                            onDeleteOrder(order.orderId);
                          }
                        }}
                        title="Fshij këtë porosi"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Customer Full Information Grid */}
                  <div className="customer-info-box">
                    <div className="cust-data-col">
                      <span className="cust-label">Blerësi (Emri & Mbiemri):</span>
                      <strong className="cust-name-val">{order.name} {order.surname}</strong>
                    </div>

                    <div className="cust-data-col">
                      <span className="cust-label">Kontakt:</span>
                      <div className="cust-contact-row">
                        <a href={`tel:${order.phone}`} className="contact-link">
                          <Phone size={13} /> {order.phone}
                        </a>
                        <a href={`mailto:${order.email}`} className="contact-link">
                          <Mail size={13} /> {order.email}
                        </a>
                      </div>
                    </div>

                    <div className="cust-data-col">
                      <span className="cust-label">Adresa e Dërgesës:</span>
                      <div className="cust-address-row">
                        <MapPin size={14} color="#d9480f" />
                        <span>{order.address}, {order.city}</span>
                      </div>
                    </div>

                    <div className="cust-data-col">
                      <span className="cust-label">Mënyra e Pagesës:</span>
                      <span className="payment-type-badge">
                        {order.paymentMethod === 'card' ? 'Kartelë Bankare' : 'Para në Dorë (Cash)'}
                      </span>
                    </div>
                  </div>

                  {/* Ordered Items Table / List */}
                  <div className="ordered-items-summary">
                    <span className="items-title">Artikujt e Porositur:</span>
                    <div className="order-items-scroll">
                      {order.items && order.items.map((it) => (
                        <div key={it.id} className="order-sub-item">
                          <img src={it.image} alt={it.name} className="sub-item-img" />
                          <div className="sub-item-text">
                            <span className="sub-name">{it.name}</span>
                            <span className="sub-qty-price">{it.quantity} copë × €{it.price.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transport Company Selector (Admin) */}
                  <div className="transport-selector-row">
                    <label className="transport-label">
                      <Truck size={14} /> Kompania e Transportit:
                    </label>
                    <select
                      className="transport-company-select"
                      value={order.transportCompany || ''}
                      onChange={(e) => onUpdateTransport(order.orderId, e.target.value)}
                    >
                      {TRANSPORT_COMPANIES.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                    {order.transportCompany && (
                      <span className="transport-saved-badge">✓ Ruajtur</span>
                    )}
                  </div>

                  {/* Order Footer with Total */}
                  <div className="order-item-footer">
                    <span>Totali i Faturës:</span>
                    <strong className="order-grand-total">€{order.total ? order.total.toFixed(2) : '0.00'}</strong>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
