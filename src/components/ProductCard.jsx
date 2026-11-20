import React, { useState } from 'react';
import { Heart, ShoppingBag, Check, Edit3, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProductCard({
  product,
  isWishlisted,
  isAdmin,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  onEditProduct
}) {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    try {
      const rect = e.target.getBoundingClientRect();
      confetti({
        particleCount: 22,
        spread: 55,
        origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight },
        colors: ['#111827', '#f59e0b', '#3b82f6']
      });
    } catch (err) {}
    setTimeout(() => setJustAdded(false), 1600);
  };

  const discountPercent = product.discountBadge || (
    product.oldPrice && product.oldPrice > product.price
      ? `-${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%`
      : null
  );

  const rating = product.rating || 4.7;
  const reviewCount = product.reviews || product.reviewCount || 48;

  return (
    <div className="mz-product-card" onClick={() => onQuickView && onQuickView(product)}>
      {/* Product Image Area */}
      <div className="mz-pcard-img-wrap">
        <img src={product.image} alt={product.name} className="mz-pcard-img" loading="lazy" />

        {discountPercent && (
          <span className="mz-pcard-badge">{discountPercent}</span>
        )}

        <button
          className={`mz-pcard-heart ${isWishlisted ? 'active' : ''}`}
          onClick={e => { e.stopPropagation(); onToggleWishlist(product); }}
          aria-label="Wishlist"
        >
          <Heart size={16} fill={isWishlisted ? '#e53935' : 'none'} color={isWishlisted ? '#e53935' : '#888'} />
        </button>

        {isAdmin && (
          <button
            className="mz-pcard-edit"
            onClick={e => { e.stopPropagation(); onEditProduct(product); }}
            title="Edit product"
          >
            <Edit3 size={14} />
          </button>
        )}
      </div>

      {/* Info Area matching reference screenshot */}
      <div className="mz-pcard-info">
        <h3 className="mz-pcard-name" title={product.name}>{product.name}</h3>

        <div className="mz-pcard-bottom-row">
          <div className="mz-pcard-price-stars">
            <div className="mz-pcard-price-row">
              <span className="mz-pcard-price">€{Number(product.price).toFixed(2)}</span>
              {product.oldPrice && Number(product.oldPrice) > Number(product.price) && (
                <span className="mz-pcard-old-price">€{Number(product.oldPrice).toFixed(2)}</span>
              )}
            </div>

            <div className="mz-pcard-stars">
              {[1, 2, 3, 4, 5].map(i => (
                <Star
                  key={i}
                  size={12}
                  fill={i <= Math.round(rating) ? '#f59e0b' : 'none'}
                  color={i <= Math.round(rating) ? '#f59e0b' : '#d1d5db'}
                />
              ))}
              <span className="mz-pcard-rating-text">{rating} ({reviewCount})</span>
            </div>
          </div>

          <button
            className={`mz-pcard-cart-btn ${justAdded ? 'added' : ''}`}
            onClick={handleAdd}
          >
            {justAdded ? (
              <><Check size={14} /> Added</>
            ) : (
              <><ShoppingBag size={14} /> Add to cart</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
