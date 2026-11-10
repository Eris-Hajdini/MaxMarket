import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, Plus, Minus } from 'lucide-react';

export default function CartModal({ 
  isOpen = true, 
  onClose, 
  cart = [], 
  onUpdateQuantity, 
  onRemoveFromCart, 
  onRemove,
  onCheckout, 
  onProceedToCheckout 
}) {
  if (!isOpen) return null;

  const handleRemove = (id) => {
    if (onRemoveFromCart) onRemoveFromCart(id);
    else if (onRemove) onRemove(id);
  };

  const handleProceed = () => {
    if (onCheckout) onCheckout();
    else if (onProceedToCheckout) onProceedToCheckout();
  };

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const freeShippingThreshold = 50.0;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingCost = isFreeShipping || subtotal === 0 ? 0 : 2.0;
  const grandTotal = subtotal + shippingCost;

  return (
    <div className="clean-modal-backdrop" onClick={onClose}>
      <div className="clean-drawer-panel right-side" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="clean-drawer-header">
          <div className="drawer-header-left">
            <div className="drawer-icon-badge">
              <ShoppingBag size={20} color="#1e473b" />
            </div>
            <div>
              <h3 className="drawer-title">Shporta e Blerjeve</h3>
              <span className="drawer-subtitle">{totalItems} {totalItems === 1 ? 'artikull' : 'artikuj'}</span>
            </div>
          </div>
          <button 
            className="clean-drawer-close-btn" 
            onClick={onClose}
            aria-label="Mbyll shportën"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Strip */}
        <div className="shipping-progress-strip">
          <div className="progress-info-row">
            <span className="progress-truck-icon">🚚</span>
            {isFreeShipping ? (
              <span className="progress-text-success">
                Urime! Keni fituar <strong>Dërgesë Falas</strong>!
              </span>
            ) : (
              <span className="progress-text">
                Shtoni edhe <strong>{remainingForFreeShipping.toFixed(2).replace('.', ',')} €</strong> për <strong>Dërgesë Falas</strong>!
              </span>
            )}
          </div>
          <div className="progress-bar-track">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
            />
          </div>
        </div>

        {/* Cart Content */}
        <div className="clean-drawer-body">
          {cart.length === 0 ? (
            <div className="clean-cart-empty">
              <div className="empty-cart-circle">
                <ShoppingBag size={48} strokeWidth={1.5} color="#94a3b8" />
              </div>
              <h4>Shporta juaj është e zbrazët</h4>
              <p>Zbuloni setet e enëve, aksesorët e organizimit dhe zbukurimet për shtëpinë tuaj.</p>
              <button 
                className="clean-start-shopping-btn"
                onClick={() => {
                  onClose();
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Fillo Blerjet Tani →
              </button>
            </div>
          ) : (
            <div className="clean-cart-items-list">
              {cart.map((item) => {
                const qty = item.quantity || 1;
                const itemTotal = item.price * qty;

                return (
                  <div key={item.id} className="clean-cart-item-card">
                    <div className="cart-item-image-wrap">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="cart-item-info-col">
                      <div className="cart-item-top-row">
                        <h4 className="cart-item-title" title={item.name}>{item.name}</h4>
                        <button 
                          className="cart-item-delete-btn"
                          onClick={() => handleRemove(item.id)}
                          title="Hiq nga shporta"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="cart-item-unit-price">
                        {item.price.toFixed(2).replace('.', ',')} € / copë
                      </div>

                      <div className="cart-item-bottom-row">
                        {/* Quantity Counter */}
                        <div className="clean-qty-stepper">
                          <button 
                            className="qty-btn"
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            disabled={qty <= 1}
                            aria-label="Zvogëlo"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="qty-value">{qty}</span>
                          <button 
                            className="qty-btn"
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            aria-label="Rrit"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="cart-item-total-price">
                          {itemTotal.toFixed(2).replace('.', ',')} €
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with Totals & Checkout Button */}
        {cart.length > 0 && (
          <div className="clean-drawer-footer">
            <div className="cart-summary-line">
              <span>Nëntotali</span>
              <strong>{subtotal.toFixed(2).replace('.', ',')} €</strong>
            </div>

            <div className="cart-summary-line">
              <span>Transporti në Kosovë</span>
              {isFreeShipping ? (
                <span className="shipping-free-badge">FALAS</span>
              ) : (
                <span>{shippingCost.toFixed(2).replace('.', ',')} €</span>
              )}
            </div>

            <div className="cart-summary-divider" />

            <div className="cart-summary-total-line">
              <span>Totali për Pagesë</span>
              <strong className="grand-total-amount">{grandTotal.toFixed(2).replace('.', ',')} €</strong>
            </div>

            <button 
              className="clean-checkout-proceed-btn"
              onClick={handleProceed}
            >
              <span>Vazhdo te Porosia (Checkout)</span>
              <ArrowRight size={18} />
            </button>

            <div className="cart-security-badge">
              <ShieldCheck size={14} color="#1e473b" />
              <span>Pagesë e sigurt gjatë pranimit të porosisë (Cash)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
