import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORY_CARDS } from '../data';

export default function CategoryCardsStrip({ onSelectCategory, activeCategory }) {
  const handleCardClick = (catId) => {
    if (onSelectCategory) onSelectCategory(catId);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="category-cards-section">
      <div className="container">
        <div className="category-cards-grid">
          {CATEGORY_CARDS.map((card) => {
            const isSelected = activeCategory === card.id;

            return (
              <div 
                key={card.id}
                className={`clean-category-card ${isSelected ? 'is-selected' : ''}`}
                onClick={() => handleCardClick(card.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCardClick(card.id); }}
                title={`Shfleto kategorinë ${card.title}`}
              >
                <div className="card-image-wrapper">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    loading="lazy" 
                  />
                </div>
                <div className="card-bottom-bar">
                  <span className="card-title">{card.title}</span>
                  <div className="card-arrow-wrap">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
