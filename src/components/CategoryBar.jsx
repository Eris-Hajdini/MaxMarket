import React from 'react';
import { 
  Sparkles, 
  UtensilsCrossed, 
  BedDouble, 
  Lamp, 
  Bath, 
  Flame 
} from 'lucide-react';
import { CATEGORIES } from '../data';

const iconMap = {
  Sparkles: Sparkles,
  UtensilsCrossed: UtensilsCrossed,
  BedDouble: BedDouble,
  Lamp: Lamp,
  Bath: Bath,
  Flame: Flame
};

export default function CategoryBar({ activeCategory, onSelectCategory, categories = CATEGORIES }) {
  const displayCategories = categories && categories.length > 0 ? categories : CATEGORIES;

  return (
    <div className="categories-pill-section">
      <div className="container">
        <div className="category-scroll-list">
          {displayCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || Sparkles;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                className={`category-pill-card ${isSelected ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <div className="cat-icon-wrap">
                  <Icon size={20} />
                </div>
                <div className="cat-text-wrap">
                  <span className="cat-title">{cat.name}</span>
                  <span className="cat-count">{cat.count} artikuj</span>
                </div>
                {cat.badge && <span className="cat-discount-badge">{cat.badge}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
