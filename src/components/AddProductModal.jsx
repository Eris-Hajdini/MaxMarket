import React, { useState } from 'react';
import { X, Plus, Image as ImageIcon, Tag, FileText, Sparkles, Check, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';

const SAMPLE_IMAGES = [
  { label: 'Set Porcelani', url: 'https://images.unsplash.com/photo-1614088445129-843c085e6834?auto=format&fit=crop&w=800&q=80' },
  { label: 'Mbulesa Satina', url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80' },
  { label: 'Vazo Moderne', url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80' },
  { label: 'Tigan Graniti', url: 'https://images.unsplash.com/photo-1584990347449-3995f32a7629?auto=format&fit=crop&w=800&q=80' },
  { label: 'Peshqirë Banjo', url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80' }
];

const PRESET_BADGES = ['E Re', 'Zbritje', 'Më e Shitura', 'Top Brend', 'Koleksion i Ri', 'Ekskluzive'];

export default function AddProductModal({ isOpen, onClose, onAddProduct, categories = [] }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [category, setCategory] = useState(categories[1]?.id || 'kitchen');
  const [badge, setBadge] = useState('E Re');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price || !description.trim()) {
      setError('Ju lutem plotësoni Emrin, Çmimin dhe Përshkrimin e produktit!');
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Çmimi duhet të jetë një numër pozitiv (psh. 29.90).');
      return;
    }

    const parsedOldPrice = oldPrice ? parseFloat(oldPrice) : null;
    const finalPhoto = photo.trim() || 'https://images.unsplash.com/photo-1584990347449-3995f32a7629?auto=format&fit=crop&w=800&q=80';

    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      price: parsedPrice,
      oldPrice: parsedOldPrice && parsedOldPrice > parsedPrice ? parsedOldPrice : null,
      description: description.trim(),
      image: finalPhoto,
      category: category,
      badge: badge.trim() || 'E Re',
      rating: 5.0,
      reviews: 1
    };

    onAddProduct(newProduct);

    try {
      confetti({ particleCount: 50, spread: 80, origin: { y: 0.5 } });
    } catch (e) {}

    // Reset and close
    setName('');
    setPrice('');
    setOldPrice('');
    setDescription('');
    setPhoto('');
    setError('');
    onClose();
  };

  return (
    <div className="add-product-backdrop" onClick={onClose}>
      <div
        className="add-product-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '680px',
          borderRadius: '20px',
          padding: '0',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(15, 23, 42, 0.25)',
          background: '#ffffff'
        }}
      >
        {/* Modern Modal Header with Gradient Bar */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: '#ffffff',
            padding: '24px 28px',
            position: 'relative'
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            <X size={18} />
          </button>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(37, 99, 235, 0.25)',
              color: '#60a5fa',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.78rem',
              fontWeight: '700',
              marginBottom: '10px'
            }}
          >
            <Sparkles size={14} /> Shto në Katalog
          </div>
          <h2 style={{ margin: '0 0 4px', fontSize: '1.45rem', fontWeight: '800', letterSpacing: '-0.3px' }}>
            Shto Produkt të Ri
          </h2>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
            Plotësoni të dhënat e artikullit për ta shfaqur menjëherë në dyqanin e MaxMarket.
          </p>
        </div>

        {error && (
          <div style={{ margin: '16px 28px 0', padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', color: '#dc2626', fontSize: '0.85rem', fontWeight: '600' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ padding: '24px 28px' }}>
          {/* Section 1: Basic Information */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Emri i Produktit *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="psh. Set Pjatash Porcelani Royal Imperial (24 copë)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.92rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
                onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
              />
            </div>
          </div>

          {/* Section 2: Pricing & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                Çmimi (€) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0.1"
                placeholder="psh. 49.90"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.92rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#64748b', marginBottom: '6px' }}>
                Çmimi i Vjetër (€)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="psh. 69.90"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.92rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                Kategoria *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  fontSize: '0.92rem',
                  fontFamily: 'inherit',
                  background: '#ffffff',
                  outline: 'none',
                  boxSizing: 'border-box',
                  cursor: 'pointer'
                }}
              >
                {categories.filter(c => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 3: Badge Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
              Etiketë / Badge
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {PRESET_BADGES.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBadge(b)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: '1.5px solid',
                    borderColor: badge === b ? '#2563eb' : '#e2e8f0',
                    background: badge === b ? '#eff6ff' : '#ffffff',
                    color: badge === b ? '#2563eb' : '#475569',
                    fontSize: '0.8rem',
                    fontWeight: badge === b ? '700' : '500',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  {badge === b && <Check size={13} style={{ display: 'inline', marginRight: '4px' }} />}
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Photo URL with Quick Picker */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Foto e Produktit (URL)
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '10px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.92rem',
                fontFamily: 'inherit',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />

            {/* Quick Sample Image Buttons */}
            <div style={{ marginTop: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>Shembuj:</span>
              {SAMPLE_IMAGES.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPhoto(sample.url)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: '#f1f5f9',
                    border: '1px solid #e2e8f0',
                    fontSize: '0.75rem',
                    color: '#334155',
                    cursor: 'pointer'
                  }}
                >
                  {sample.label}
                </button>
              ))}
            </div>

            {/* Live Image Preview */}
            {photo && (
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <img
                  src={photo}
                  alt="Preview"
                  style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div>
                  <strong style={{ fontSize: '0.85rem', color: '#16a34a' }}>✓ Foto e ngarkuar me sukses</strong>
                  <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#64748b' }}>Kjo foto do të shfaqet në kartën e produktit.</p>
                </div>
              </div>
            )}
          </div>

          {/* Section 5: Description */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
              Përshkrimi i Artikullit *
            </label>
            <textarea
              rows="3"
              placeholder="Shënoni materialin, veçoritë, ngjyrat dhe dimensionet e këtij produkti..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '10px',
                border: '1.5px solid #cbd5e1',
                fontSize: '0.9rem',
                fontFamily: 'inherit',
                outline: 'none',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '18px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '11px 20px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                color: '#475569',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Anulo
            </button>

            <button
              type="submit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 24px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                color: '#ffffff',
                fontSize: '0.92rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
                transition: 'transform 0.15s'
              }}
            >
              <Plus size={18} />
              <span>Publiko Produktin</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
