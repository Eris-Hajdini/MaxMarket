import React from 'react';
import { X, Truck, Package, Clock, CheckCircle2, MapPin, Calendar } from 'lucide-react';

export default function CustomerOrdersModal({ isOpen, onClose, orders, currentUser }) {
  if (!isOpen) return null;

  // Filter orders matching ONLY current logged in client email
  const displayOrders = currentUser
    ? orders.filter((o) => o.email?.toLowerCase() === currentUser.email?.toLowerCase())
    : [];

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
          <p>Këtu mund të shihni statusin në kohë reale të dërgesave tuaja nga MaxMarket.</p>
        </div>

        <div className="customer-orders-body">
          {displayOrders.length === 0 ? (
            <div className="customer-no-orders">
              <Package size={48} className="empty-box-icon" />
              <h3>Nuk keni asnjë porosi aktive</h3>
              <p>Kur të bëni një porosi, mund ta ndiqni statusin e dërgesës këtu.</p>
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
