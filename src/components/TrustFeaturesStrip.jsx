import React from 'react';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function TrustFeaturesStrip() {
  return (
    <section className="clean-trust-section">
      <div className="container">
        <div className="clean-trust-grid">
          <div className="clean-trust-item">
            <div className="trust-icon-wrap">
              <ShieldCheck size={26} strokeWidth={1.8} color="#1b4332" />
            </div>
            <div className="trust-text-wrap">
              <h4 className="trust-title">Pagesë e sigurt</h4>
              <p className="trust-desc">Bleni me besim</p>
            </div>
          </div>

          <div className="clean-trust-divider" />

          <div className="clean-trust-item">
            <div className="trust-icon-wrap">
              <Truck size={26} strokeWidth={1.8} color="#1b4332" />
            </div>
            <div className="trust-text-wrap">
              <h4 className="trust-title">Dërgesë në Kosovë</h4>
              <p className="trust-desc">Shpejt dhe në çdo qytet</p>
            </div>
          </div>

          <div className="clean-trust-divider" />

          <div className="clean-trust-item">
            <div className="trust-icon-wrap">
              <RotateCcw size={26} strokeWidth={1.8} color="#1b4332" />
            </div>
            <div className="trust-text-wrap">
              <h4 className="trust-title">Kthim i lehtë</h4>
              <p className="trust-desc">Brenda 14 ditëve</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
