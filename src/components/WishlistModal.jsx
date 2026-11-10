import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WishlistModal({ 
  isOpen = true, 
  onClose, 
  wishlist = [], 
  onRemoveFromWishlist, 
  onAddToCart,
  onOpenCart 
}) {
  const [addedIds, setAddedIds] = useState([]);

  if (!isOpen) return null;

  const handleAddSingle = (product) => {
    onAddToCart(product);
    setAddedIds((prev) => [...prev, product.id]);

    try {
      confetti({
        particleCount: 20,
        spread: 50,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 1500);
  };

  const handleAddAll = () => {
    wishlist.forEach((p) => onAddToCart(p));
    try {
      confetti({
        particleCount: 45,
        spread: 75,
        origin: { y: 0.5 }
      });
    } catch (e) {}
    onClose();
    if (onOpenCart) onOpenCart();
  };

  return (
    <div className="clean-modal-backdrop" onClick={onClose}>
      <div className="clean-drawer-panel right-side" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="clean-drawer-header">
          <div className="drawer-header-left">
            <div className="drawer-icon-badge wishlist-badge">
              <Heart size={20} fill="#e53935" color="#e53935" />
            </div>
            <div>
              <h3 className="drawer-title">Të Preferuarat e Mia</h3>
              <span className="drawer-subtitle">{wishlist.length} {wishlist.length === 1 ? 'produkt i ruajtur' : 'produkte të ruajtura'}</span>
            </div>
          </div>
          <button 
            className="clean-drawer-close-btn" 
            onClick={onClose}
            aria-label="Mbyll listën"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="clean-drawer-body">
          {wishlist.length === 0 ? (
            <div className="clean-cart-empty">
              <div className="empty-cart-circle wishlist-empty-circle">
                <Heart size={48} strokeWidth={1.5} color="#cbd5e1" />
              </div>
              <h4>Nuk keni ende asnjë produkt të ruajtur</h4>
              <p>Shtypni ikonën e zemrës ♡ tek çdo produkt për ta ruajtur këtu dhe për ta blerë më vonë.</p>
              <button 
                className="clean-start-shopping-btn"
                onClick={() => {
                  onClose();
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Eksploro Katalogun →
              </button>
            </div>
          ) : (
            <div className="clean-cart-items-list">
              {wishlist.map((item) => {
                const isJustAdded = addedIds.includes(item.id);

                return (
                  <div key={item.id} className="clean-cart-item-card">
                    <div className="cart-item-image-wrap">
                      <img src={item.image} alt={item.name} />
                      {item.oldPrice && (
                        <span className="wishlist-sale-mini-tag">Zbritje</span>
                      )}
                    </div>

                    <div className="cart-item-info-col">
                      <div className="cart-item-top-row">
                        <h4 className="cart-item-title" title={item.name}>{item.name}</h4>
                        <button 
                          className="cart-item-delete-btn"
                          onClick={() => onRemoveFromWishlist(item)}
                          title="Hiq nga dëshirat"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="cart-item-unit-price">
                        <strong>{item.price.toFixed(2).replace('.', ',')} €</strong>
                        {item.oldPrice && (
                          <span className="clean-old-price" style={{ marginLeft: '8px' }}>
                            {item.oldPrice.toFixed(2).replace('.', ',')} €
                          </span>
                        )}
                      </div>

                      <div className="wishlist-action-row">
                        <button 
                          className={`wishlist-add-single-btn ${isJustAdded ? 'is-added' : ''}`}
                          onClick={() => handleAddSingle(item)}
                        >
                          {isJustAdded ? (
                            <>
                              <Check size={14} />
                              <span>U shtua në shportë</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag size={14} />
                              <span>Shto në Shportë</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="clean-drawer-footer">
            <button 
              className="clean-checkout-proceed-btn"
              onClick={handleAddAll}
            >
              <ShoppingBag size={18} />
              <span>Shto të Gjitha në Shportë ({wishlist.length})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
