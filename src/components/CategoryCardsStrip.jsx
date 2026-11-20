import React from 'react';
import { CATEGORY_CARDS } from '../data';

const DEFAULT_IMAGES = {
  kitchen: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
  kuhinja: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
  storage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
  organizim: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
  cleaning: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80',
  pastrimi: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80',
  dining: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
  decor: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
  home: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
  shtepia: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
};

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
];

export default function CategoryCardsStrip({ onSelectCategory, activeCategory, categories = [] }) {
  const handleCardClick = (catId) => {
    if (onSelectCategory) onSelectCategory(catId);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Use CATEGORY_CARDS as the base cards (matches screenshot 5 cards), plus any custom admin-added categories
  const cardsToShow = CATEGORY_CARDS;

  return (
    <section className="mz-cats-section" id="categories-section">
      <div className="mz-cats-header">
        <h2 className="mz-cats-title">Shop by category</h2>
        <button
          className="mz-cats-viewall"
          onClick={() => {
            if (onSelectCategory) onSelectCategory('all');
            const el = document.getElementById('products-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          View all →
        </button>
      </div>
      <div className="mz-cats-grid">
        {cardsToShow.map((card, idx) => {
          const cardTitle = card.name || card.title;
          const cardImg = card.image || DEFAULT_IMAGES[card.id] || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length];
          return (
            <div
              key={card.id}
              className={`mz-cat-card ${activeCategory === card.id ? 'selected' : ''}`}
              onClick={() => handleCardClick(card.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') handleCardClick(card.id); }}
            >
              <img src={cardImg} alt={cardTitle} loading="lazy" className="mz-cat-img" />
              <div className="mz-cat-label">{cardTitle}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
