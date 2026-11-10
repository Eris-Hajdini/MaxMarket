import React, { useState } from 'react';
import { Heart, ShoppingBag, Check, Edit3 } from 'lucide-react';
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
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 22,
        spread: 55,
        origin: { x, y },
        colors: ['#1e473b', '#2d6a4f', '#d8f3dc']
      });
    } catch (err) {}

    setTimeout(() => setJustAdded(false), 1600);
  };

  // Derive SKU if not present
  const sku = product.sku || (
    product.category === 'kuhinja' ? `KU-0${product.id + 100}` :
    product.category === 'organizim' ? `OR-0${product.id + 200}` :
    product.category === 'shtepia' ? `SH-0${product.id + 300}` :
    product.category === 'pastrimi' ? `PA-0${product.id + 400}` :
    `MX-0${product.id + 100}`
  );

  // Derive discount percent badge if oldPrice is present
  const discountPercent = product.discountBadge || (
    product.oldPrice && product.oldPrice > product.price
      ? `-${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%`
      : null
  );

  return (
    <div 
      className="clean-product-card" 
      onClick={() => onQuickView && onQuickView(product)}
    >
      {/* Product Image Area */}
      <div className="clean-card-image-box">
        <img 
          src={product.image} 
          alt={product.name} 
          className="clean-card-img" 
          loading="lazy"
        />

        {/* Top-Left Discount Badge matching screenshot */}
        {discountPercent && (
          <span className="clean-discount-tag">
            {discountPercent}
          </span>
        )}

        {/* Top-Right Heart Wishlist Button */}
        <button 
          className={`clean-wishlist-circle ${isWishlisted ? 'is-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? "Hiq nga dëshirat" : "Shto në dëshirat"}
          title={isWishlisted ? "Hiq nga dëshirat" : "Shto në dëshirat"}
        >
          <Heart 
            size={16} 
            fill={isWishlisted ? "#e53935" : "none"} 
            color={isWishlisted ? "#e53935" : "#64748b"} 
          />
        </button>

        {/* Admin Quick Edit Button */}
        {isAdmin && (
          <button 
            className="clean-admin-edit-circle"
            onClick={(e) => {
              e.stopPropagation();
              onEditProduct(product);
            }}
            title="Ndrysho produktin (Admin)"
          >
            <Edit3 size={15} />
          </button>
        )}
      </div>

      {/* Product Details Area */}
      <div className="clean-card-info">
        <div className="clean-card-sku">
          {sku}
        </div>

        <h3 className="clean-card-title" title={product.name}>
          {product.name}
        </h3>

        {/* Price Row matching screenshot */}
        <div className="clean-card-price-row">
          <span className="clean-current-price">
            {product.price.toFixed(2).replace('.', ',')} €
          </span>
          {product.oldPrice && (
            <span className="clean-old-price">
              {product.oldPrice.toFixed(2).replace('.', ',')} €
            </span>
          )}
        </div>

        {/* Bottom "Shto në shportë" Button matching screenshot */}
        <div className="clean-card-action-row">
          <button 
            className={`clean-add-cart-btn ${justAdded ? 'added' : ''}`}
            onClick={handleAdd}
          >
            {justAdded ? (
              <>
                <Check size={16} />
                <span>U shtua</span>
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                <span>Shto në shportë</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
