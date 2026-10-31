import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send,
  ShieldCheck, 
  Truck, 
  Clock, 
  CreditCard,
  Share2,
  Globe
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* Features Bar */}
      <div className="footer-features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon"><Truck size={24} /></div>
              <div>
                <h4>Transport i Shpejtë</h4>
                <p>Në të gjithë Kosovën & Shqipërinë</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><ShieldCheck size={24} /></div>
              <div>
                <h4>Cilësi e Garantuar</h4>
                <p>100% Produkte origjinale të certifikuara</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><CreditCard size={24} /></div>
              <div>
                <h4>Pagesë e Sigurt</h4>
                <p>Me kartelë ose para në dorë (Cash on Delivery)</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon"><Clock size={24} /></div>
              <div>
                <h4>Mbështetje 24/7</h4>
                <p>Kujdesi për klientin gjithmonë pranë jush</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="container footer-grid">
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <span className="brand-max">MAX</span>
              <span className="brand-market">MARKET</span>
            </div>
            <p className="footer-tagline">
              Destinacioni juaj numër një për pajisje shtëpiake elegante, tekstile luksoze dhe setet më të bukura për kuzhinë.
            </p>
            <div className="footer-contacts">
              <div className="contact-line">
                <MapPin size={18} />
                <span>Rruga B, Prishtinë, Kosovë</span>
              </div>
              <div className="contact-line">
                <Phone size={18} />
                <span>+383 (44) 123 456 / +383 (49) 789 012</span>
              </div>
              <div className="contact-line">
                <Mail size={18} />
                <span>info@maxmarket-ks.com</span>
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h3>Kategoritë</h3>
            <ul>
              <li><a href="#kitchen">Kuzhinë & Servirje</a></li>
              <li><a href="#bedding">Tekstil Shtrati & Mbulesa</a></li>
              <li><a href="#decor">Dekorime & Aroma Shtëpie</a></li>
              <li><a href="#bath">Banjë & Pelerina</a></li>
              <li><a href="#paje">Pakoja e Pajës për Nuse</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Ndihmë & Informacion</h3>
            <ul>
              <li><a href="#">Rreth MaxMarket</a></li>
              <li><a href="#">Kushtet e Blerjes & Dorëzimit</a></li>
              <li><a href="#">Politika e Kthimit të Mallit</a></li>
              <li><a href="#">Programi i Pikëve & Loyalty Card</a></li>
              <li><a href="#">Kontakti & Lokacionet</a></li>
            </ul>
          </div>

          <div className="footer-col newsletter-col">
            <h3>Merr Zbritje Ekskluzive</h3>
            <p>Abonohu në buletinin tonë dhe përfito 10% zbritje në porosinë tënde të parë!</p>
            <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert("Faleminderit që u abonuat në MaxMarket!"); }}>
              <input type="email" placeholder="Emaili juaj këtu..." required />
              <button type="submit" aria-label="Subscribe">
                <Send size={18} />
              </button>
            </form>
            <div className="social-links">
              <a href="#" aria-label="Website" className="social-pill"><Globe size={18} /></a>
              <a href="#" aria-label="Share" className="social-pill"><Share2 size={18} /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-content">
          <p>© {new Date().getFullYear()} MaxMarket Sh.P.K. Të gjitha të drejtat të rezervuara.</p>
          <div className="payment-badges">
            <span className="pay-badge">VISA</span>
            <span className="pay-badge">Mastercard</span>
            <span className="pay-badge">Cash on Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
