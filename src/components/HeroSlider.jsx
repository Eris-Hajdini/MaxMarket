import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../data';

export default function HeroSlider({ onShopNow, onViewDiscounts }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="hero-section">
      <div className="hero-slider-wrapper">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div 
              key={idx} 
              className={`hero-slide ${isActive ? 'active' : ''}`}
              style={{
                backgroundImage: `linear-gradient(to right, rgba(18, 18, 24, 0.85) 0%, rgba(18, 18, 24, 0.35) 60%, rgba(18, 18, 24, 0.7) 100%), url(${slide.image})`
              }}
            >
              <div className="container hero-container">
                <div className="hero-text-content">
                  <div className="hero-tag-badge">
                    <Sparkles size={15} />
                    <span>{slide.tag}</span>
                  </div>
                  <h1 className="hero-heading">{slide.title}</h1>
                  <p className="hero-description">{slide.subtitle}</p>
                  
                  <div className="hero-actions-row">
                    <button 
                      className="hero-primary-btn" 
                      onClick={onShopNow}
                    >
                      <span>{slide.cta}</span>
                      <ArrowRight size={18} />
                    </button>
                    <button
                      type="button"
                      className="hero-secondary-btn"
                      onClick={onViewDiscounts}
                      style={{ cursor: 'pointer' }}
                    >
                      Shiko Zbritjet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Slide Controls */}
        <button className="slider-arrow prev" onClick={prevSlide} aria-label="Previous slide">
          <ChevronLeft size={24} />
        </button>
        <button className="slider-arrow next" onClick={nextSlide} aria-label="Next slide">
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="slider-dots">
          {HERO_SLIDES.map((_, i) => (
            <button 
              key={i} 
              className={`dot ${i === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
