import React from 'react';

const CATEGORY_ITEMS = [
  {
    id: 'kitchen',
    title: 'Kuzhina',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'storage',
    title: 'Organizim & Ruajtje',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cleaning',
    title: 'Pastrimi',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dining',
    title: 'Tavolina & Servirje',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'decor',
    title: 'Dekori i Shtëpisë',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
  }
];

export default function CategoryCardsStrip({ onSelectCategory, activeCategory, categories = [] }) {
  const handleCardClick = (catId) => {
    if (onSelectCategory) onSelectCategory(catId);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="mz-cats-section" id="categories-section">
      <div className="mz-cats-header">
        <h2 className="mz-cats-title">Bli sipas kategorisë</h2>
        <button
          className="mz-cats-viewall"
          onClick={() => {
            if (onSelectCategory) onSelectCategory('all');
            const el = document.getElementById('products-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Shiko të gjitha →
        </button>
      </div>
      <div className="mz-cats-grid">
        {CATEGORY_ITEMS.map((card) => {
          const isSelected = activeCategory === card.id ||
            (card.id === 'kitchen' && activeCategory === 'kuhinja') ||
            (card.id === 'storage' && activeCategory === 'organizim') ||
            (card.id === 'cleaning' && activeCategory === 'pastrimi') ||
            (card.id === 'decor' && activeCategory === 'shtepia');

          return (
            <div
              key={card.id}
              className={`mz-cat-card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleCardClick(card.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter') handleCardClick(card.id); }}
            >
              <img src={card.image} alt={card.title} loading="lazy" className="mz-cat-img" />
              <div className="mz-cat-label">{card.title}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
