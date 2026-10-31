import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartModal({ isOpen, onClose, cart, onUpdateQuantity, onRemove, onProceedToCheckout }) {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-modal-backdrop" onClick={onClose}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag size={22} className="text-primary" />
            <h2>Shporta Juaj ({cart.reduce((s, i) => s + i.quantity, 0)})</h2>
          </div>
          <button className="cart-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-cart-icon">🛒</div>
              <h3>Shporta është e zbrazët</h3>
              <p>Zbuloni gamën tonë të enëve, tekstileve dhe zbukurimeve shtëpiake.</p>
              <button className="browse-btn" onClick={onClose}>Eksploro Katalogun</button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <span className="cart-item-price">€{item.price.toFixed(2)}</span>
                    <div className="cart-quantity-row">
                      <div className="quantity-counter">
                        <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                      </div>
                      <button 
                        className="remove-item-btn" 
                        onClick={() => onRemove(item.id)}
                        title="Fshij nga shporta"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary-line">
              <span>Transporti:</span>
              <span className="free-shipping-tag">{total >= 30 ? 'FALAS' : '€2.50'}</span>
            </div>
            <div className="cart-total-line">
              <span>Totali me TVSH:</span>
              <span className="grand-total">€{(total >= 30 ? total : total + 2.5).toFixed(2)}</span>
            </div>

            <button 
              className="checkout-btn" 
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
            >
              <span>Vazhdo te Porosia</span>
              <ArrowRight size={19} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
