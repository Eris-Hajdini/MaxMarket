import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CleanHero({ onShopNow, onViewOffers }) {
  return (
    <section className="clean-hero-section">
      <div className="container clean-hero-container">
        {/* Subtle decorative botanical doodle watermark */}
        <div className="hero-doodle-olive" aria-hidden="true">
          <svg width="48" height="96" viewBox="0 0 48 96" fill="none" opacity="0.35">
            <path d="M24 8V88M24 24C16 20 12 14 12 8C18 8 22 14 24 24ZM24 40C32 36 36 30 36 24C30 24 26 30 24 40ZM24 56C16 52 12 46 12 40C18 40 22 46 24 56ZM24 72C32 68 36 62 36 56C30 56 26 62 24 72Z" stroke="#708c7c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Decorative jar silhouette watermark */}
        <div className="hero-doodle-jar" aria-hidden="true">
          <svg width="56" height="74" viewBox="0 0 56 74" fill="#a3b899" opacity="0.25">
            <rect x="12" y="2" width="32" height="8" rx="3"/>
            <path d="M12 10L6 20V68C6 71 8.5 73.5 11.5 73.5H44.5C47.5 73.5 50 71 50 68V20L44 10H12Z"/>
          </svg>
        </div>

        {/* Left Column: Typography & CTAs */}
        <div className="clean-hero-left">
          <h1 className="clean-hero-title">
            <span>Gjithçka për</span>
            <span>shtëpinë,</span>
            <span>në një vend.</span>
          </h1>

          <p className="clean-hero-subtitle">
            Cilësi, stil dhe komoditet për çdo ditë.
          </p>

          <div className="clean-hero-actions">
            <button 
              className="clean-btn-primary"
              onClick={onShopNow}
            >
              <span>Shiko koleksionin</span>
              <ArrowRight size={18} />
            </button>

            <button 
              className="clean-btn-secondary"
              onClick={onViewOffers}
            >
              Vetëm ofertat
            </button>
          </div>

          <div className="clean-hero-perks">
            <span className="perk-item">Dërgesë falas mbi 50 €</span>
            <span className="perk-bullet">•</span>
            <span className="perk-item">Kthim brenda 14 ditëve</span>
          </div>
        </div>

        {/* Right Column: Hero Visual matching screenshot */}
        <div className="clean-hero-right">
          <div className="hero-image-card">
            <img 
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85" 
              alt="Kuzhinë moderne me aksesorë elegantë dhe bimë natyrale"
              className="hero-main-photo"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
