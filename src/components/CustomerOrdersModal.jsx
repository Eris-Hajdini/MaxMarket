import React, { useState } from 'react';
import { X, Truck, Package, Clock, CheckCircle2, MapPin, Calendar, Filter } from 'lucide-react';

export default function CustomerOrdersModal({ isOpen, onClose, orders, currentUser }) {
  const [filterStatus, setFilterStatus] = useState('all');

  if (!isOpen) return null;

  // Filter orders matching ONLY current logged in client email
  const userOrders = currentUser
    ? orders.filter((o) => o.email?.toLowerCase() === currentUser.email?.toLowerCase())
    : [];

  const onTheWayOrders = userOrders.filter((o) => o.status === 'on_the_way');
  const completedOrders = userOrders.filter((o) => o.status === 'completed');
  const pendingOrders = userOrders.filter((o) => o.status === 'pending');

  const displayOrders = filterStatus === 'all'
    ? userOrders
    : filterStatus === 'on_the_way'
      ? onTheWayOrders
      : filterStatus === 'completed'
        ? completedOrders
        : pendingOrders;

  return (
    <div className="add-product-backdrop" onClick={onClose}>
      <div className="customer-status-modal" onClick={(e) => e.stopPropagation()}>
        <button className="add-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="customer-status-header">
          <div className="client-pill-badge">
            <Package size={15} /> Porositë e Mia
          </div>
          <h2>Gjurmo Porositë Tuaja</h2>
          <p>Filtroni dhe ndiqni statusin e dërgesave tuaja nga MaxMarket.</p>

          {/* Customer Orders Filter Tabs */}
          <div className="orders-status-tabs client-filter-tabs">
            <button
              className={`status-tab-btn ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              <Filter size={13} />
              <span>Të Gjitha ({userOrders.length})</span>
            </button>

            <button
              className={`status-tab-btn on-the-way ${filterStatus === 'on_the_way' ? 'active' : ''}`}
              onClick={() => setFilterStatus('on_the_way')}
            >
              <Truck size={13} />
              <span>Rrugës ({onTheWayOrders.length})</span>
            </button>

            <button
              className={`status-tab-btn completed ${filterStatus === 'completed' ? 'active' : ''}`}
              onClick={() => setFilterStatus('completed')}
            >
              <CheckCircle2 size={13} />
              <span>Të Kompletuara ({completedOrders.length})</span>
            </button>

            <button
              className={`status-tab-btn pending ${filterStatus === 'pending' ? 'active' : ''}`}
              onClick={() => setFilterStatus('pending')}
            >
              <Clock size={13} />
              <span>Në Përgatitje ({pendingOrders.length})</span>
            </button>
          </div>
        </div>

        <div className="customer-orders-body">
          {displayOrders.length === 0 ? (
            <div className="customer-no-orders">
              <Package size={48} className="empty-box-icon" />
              <h3>
                {filterStatus === 'on_the_way'
                  ? 'Nuk keni asnjë porosi që është rrugës aktualisht'
                  : filterStatus === 'completed'
                    ? 'Nuk keni asnjë porosi të kompletuar'
                    : filterStatus === 'pending'
                      ? 'Nuk keni asnjë porosi në përgatitje'
                      : 'Nuk keni asnjë porosi të regjistruar'}
              </h3>
              <p>Kur bëni porosi në dyqan, statusi i tyre do të përditësohet në kohë reale këtu.</p>
            </div>
          ) : (
            displayOrders.map((order) => {
              const isOnTheWay = order.status === 'on_the_way';
              const isCompleted = order.status === 'completed';
              const isPending = order.status === 'pending';

              return (
                <div 
                  key={order.orderId} 
                  className={`client-order-tracker-card ${isOnTheWay ? 'card-ontheway' : isCompleted ? 'card-completed' : ''}`}
                >
                  <div className="tracker-top-row">
                    <div>
                      <span className="tracker-code">{order.orderId}</span>
                      <span className="tracker-date">
                        <Calendar size={13} /> {order.createdAt || 'Sot'}
                      </span>
                    </div>

                    <div className="tracker-status-tag">
                      {isOnTheWay ? (
                        <span className="live-ontheway-tag">
                          <Truck size={17} className="truck-bounce-icon" />
                          <span>Porosia është Rrugës!</span>
                        </span>
                      ) : isCompleted ? (
                        <span className="completed-tag">
                          <CheckCircle2 size={16} />
                          <span>E Dorëzuar me Sukses</span>
                        </span>
                      ) : (
                        <span className="pending-tag">
                          <Clock size={16} />
                          <span>Në Përgatitje</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Visual Progress Stepper */}
                  <div className="delivery-stepper-wrap">
                    <div className={`step-item ${isPending || isOnTheWay || isCompleted ? 'reached' : ''}`}>
                      <div className="step-circle">1</div>
                      <span className="step-text">Pranuar</span>
                    </div>
                    <div className={`step-connector ${isOnTheWay || isCompleted ? 'active' : ''}`}></div>

                    <div className={`step-item ${isOnTheWay || isCompleted ? 'reached' : ''} ${isOnTheWay ? 'pulsing-step' : ''}`}>
                      <div className="step-circle">
                        <Truck size={14} />
                      </div>
                      <span className="step-text">Rrugës te Ju</span>
                    </div>
                    <div className={`step-connector ${isCompleted ? 'active' : ''}`}></div>

                    <div className={`step-item ${isCompleted ? 'reached' : ''}`}>
                      <div className="step-circle">✓</div>
                      <span className="step-text">Dorëzuar</span>
                    </div>
                  </div>

                  {/* Highlights if On The Way */}
                  {isOnTheWay && (
                    <div className="ontheway-live-alert">
                      <Truck size={20} className="text-orange" />
                      <div>
                        <strong>Kujdes: Porosia juaj po vjen!</strong>
                        <p>Korrieri i MaxMarket është rrugës drejt adresës: <b>{order.address}, {order.city}</b>. Mbani telefonin hapur ({order.phone}).</p>
                        {order.transportCompany && (
                          <p className="transport-info-client">🚚 Transportohet nga: <strong>{order.transportCompany}</strong></p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Items preview */}
                  <div className="client-items-preview">
                    {order.items && order.items.map((it) => (
                      <div key={it.id} className="client-item-line">
                        <img src={it.image} alt={it.name} />
                        <span>{it.quantity}× {it.name}</span>
                        <strong>€{(it.price * it.quantity).toFixed(2)}</strong>
                      </div>
                    ))}
                  </div>

                  <div className="client-order-bottom">
                    <div className="client-address-detail">
                      <MapPin size={14} />
                      <span>{order.address}, {order.city}</span>
                    </div>
                    <div className="client-order-total">
                      Totali: <strong>€{order.total ? order.total.toFixed(2) : '0.00'}</strong>
                    </div>
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
