import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORY_CARDS } from '../data';

const DEFAULT_IMAGES = {
  kuhinja: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
  organizim: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
  shtepia: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
  pastrimi: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80'
};

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80'
];

export default function CategoryCardsStrip({ onSelectCategory, activeCategory, categories = [] }) {
  const handleCardClick = (catId) => {
    if (onSelectCategory) onSelectCategory(catId);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Derive cards dynamically from categoriesList (filtering out 'all' and 'offers')
  const activeCategories = categories && categories.length > 0
    ? categories.filter((c) => c.id !== 'all' && c.id !== 'offers')
    : CATEGORY_CARDS.map((c) => ({ id: c.id, name: c.title, image: c.image }));

  return (
    <section className="category-cards-section">
      <div className="container">
        <div className="category-cards-grid">
          {activeCategories.map((card, idx) => {
            const isSelected = activeCategory === card.id;
            const cardTitle = card.name || card.title;
            const cardImg = card.image || DEFAULT_IMAGES[card.id] || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];

            return (
              <div 
                key={card.id}
                className={`clean-category-card ${isSelected ? 'is-selected' : ''}`}
                onClick={() => handleCardClick(card.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCardClick(card.id); }}
                title={`Shfleto kategorinë ${cardTitle}`}
              >
                <div className="card-image-wrapper">
                  <img 
                    src={cardImg} 
                    alt={cardTitle}
                    loading="lazy" 
                  />
                </div>
                <div className="card-bottom-bar">
                  <span className="card-title">{cardTitle}</span>
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
