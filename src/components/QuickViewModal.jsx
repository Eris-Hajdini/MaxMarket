import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuickViewModal({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart, 
  isWishlisted, 
  onToggleWishlist,
  onOpenCart
}) {
  if (!isOpen || !product) return null;

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    onAddToCart({ ...product, quantity });
    setAdded(true);
    try {
      confetti({ particleCount: 35, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}

    // Open cart drawer after brief feedback so customer sees the item added to the bucket
    setTimeout(() => {
      setAdded(false);
      onClose();
      if (onOpenCart) onOpenCart();
    }, 800);
  };

  return (
    <div className="quickview-backdrop" onClick={onClose}>
      <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
        <button className="qv-close-btn" onClick={onClose}>
          <X size={22} />
        </button>

        <div className="qv-grid">
          <div className="qv-image-side">
            <img src={product.image} alt={product.name} className="qv-main-img" />
            {product.badge && <span className="qv-badge">{product.badge}</span>}
          </div>

          <div className="qv-details-side">
            <div className="qv-rating">
              <Star size={16} fill="#FFB300" color="#FFB300" />
              <span>{product.rating}</span>
              <span className="qv-reviews">({product.reviews} komente të verifikuara)</span>
            </div>

            <h2 className="qv-title">{product.name}</h2>

            <div className="qv-pricing">
              <span className="qv-current-price">€{product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="qv-old-price">€{product.oldPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="qv-description">{product.description}</p>

            <div className="qv-actions-row">
              <div className="qv-qty-picker">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              <button className={`qv-add-btn ${added ? 'added' : ''}`} onClick={handleAdd}>
                <ShoppingBag size={18} />
                <span>{added ? 'U shtua në shportë!' : 'Shto në Shportë'}</span>
              </button>

              <button 
                className={`qv-heart-btn ${isWishlisted ? 'active' : ''}`}
                onClick={() => onToggleWishlist(product)}
                title="Shto në dëshirat"
              >
                <Heart size={20} fill={isWishlisted ? "#e53935" : "none"} color={isWishlisted ? "#e53935" : "currentColor"} />
              </button>
            </div>

            <div className="qv-perks-box">
              <div className="qv-perk-item">
                <Truck size={18} />
                <span>Dërgesë e shpejtë në gjithë Kosovën brenda 24-48 orëve</span>
              </div>
              <div className="qv-perk-item">
                <RotateCcw size={18} />
                <span>Kthim falas brenda 14 ditëve pa asnjë komplikim</span>
              </div>
              <div className="qv-perk-item">
                <ShieldCheck size={18} />
                <span>Garanci cilësie 100% origjinale nga MaxMarket</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
