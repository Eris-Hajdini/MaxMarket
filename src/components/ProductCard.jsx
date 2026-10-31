import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Check, Edit3 } from 'lucide-react';
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

    // Fire small burst of confetti
    try {
      const rect = e.target.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { x, y },
        colors: ['#E65100', '#FF9800', '#FFD54F']
      });
    } catch (err) {}

    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="product-card group" onClick={() => onQuickView(product)}>
      {/* Image container */}
      <div className="product-image-box">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-img" 
          loading="lazy"
        />
        
        {/* Floating badge */}
        {product.badge && (
          <span className={`product-badge ${product.badge.includes('Zbritje') || product.badge.includes('Super') ? 'badge-sale' : 'badge-primary'}`}>
            {product.badge}
          </span>
        )}

        {/* Floating actions: Admin Edit button or Wishlist/View */}
        <div className="floating-actions">
          {isAdmin && (
            <button 
              className="action-circle edit-circle-btn"
              onClick={(e) => {
                e.stopPropagation();
                onEditProduct(product);
              }}
              title="Edito ose Fshij Produktin"
            >
              <Edit3 size={17} />
            </button>
          )}

          <button 
            className={`action-circle ${isWishlisted ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            title={isWishlisted ? "Hiq nga dëshirat" : "Shto në dëshirat"}
          >
            <Heart size={18} fill={isWishlisted ? "#e53935" : "none"} color={isWishlisted ? "#e53935" : "currentColor"} />
          </button>
          
          <button 
            className="action-circle"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            title="Pamje e shpejtë"
          >
            <Eye size={18} />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="product-info">
        <div className="product-meta">
          <div className="rating-pill">
            <Star size={13} fill="#FFB300" color="#FFB300" />
            <span>{product.rating}</span>
            <span className="reviews-count">({product.reviews})</span>
          </div>
          <span className="cat-slug">{product.category}</span>
        </div>

        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        {/* If Admin is logged in, show inline "Edit" button */}
        {isAdmin && (
          <div className="card-admin-row">
            <button 
              className="card-admin-edit-btn"
              onClick={(e) => {
                e.stopPropagation();
                onEditProduct(product);
              }}
            >
              <Edit3 size={14} />
              <span>Edit</span>
            </button>
          </div>
        )}

        <div className="product-bottom-row">
          <div className="price-stack">
            <span className="current-price">€{product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="old-price">€{product.oldPrice.toFixed(2)}</span>
            )}
          </div>

          <button 
            className={`add-cart-btn ${justAdded ? 'added' : ''}`}
            onClick={handleAdd}
            aria-label="Shto në shportë"
          >
            {justAdded ? (
              <>
                <Check size={18} />
                <span>U shtua</span>
              </>
            ) : (
              <>
                <ShoppingBag size={18} />
                <span>Bli</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
