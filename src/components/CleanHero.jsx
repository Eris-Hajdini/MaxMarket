import React from 'react';

export default function CleanHero({ onShopNow, onViewOffers }) {
  return (
    <section className="mz-hero">
      <div className="mz-hero-inner">
        {/* Left: text */}
        <div className="mz-hero-left">
          <h1 className="mz-hero-title">
            Everyday essentials<br />for a better home
          </h1>
          <p className="mz-hero-subtitle">Stylish. Practical. Affordable.</p>
          <button className="mz-hero-btn" onClick={onShopNow}>
            Shop now →
          </button>
        </div>

        {/* Right: kitchen photo */}
        <div className="mz-hero-right">
          <img
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85"
            alt="Modern kitchen with elegant accessories"
            className="mz-hero-img"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
