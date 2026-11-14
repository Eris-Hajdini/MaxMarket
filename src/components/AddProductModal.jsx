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

const PRESET_BADGES = ['E Re', 'Top Brend', 'Më e Shitura', 'Koleksion i Ri', 'Ekskluzive'];

export default function AddProductModal({ isOpen = true, onClose, onAddProduct, categories = [] }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('50');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [category, setCategory] = useState(categories.find(c => c.id !== 'all' && c.id !== 'offers')?.id || 'kuhinja');
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
      setError('Çmimi duhet të jetë një numër pozitiv.');
      return;
    }

    const parsedStock = parseInt(stock);
    const finalStock = isNaN(parsedStock) || parsedStock < 0 ? 0 : parsedStock;

    const finalPhoto = photo.trim() || 'https://images.unsplash.com/photo-1584990347449-3995f32a7629?auto=format&fit=crop&w=800&q=80';

    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      price: parsedPrice,
      stock: finalStock,
      oldPrice: null, // Discounts are managed exclusively in the Discounts section
      description: description.trim(),
      image: finalPhoto,
      category: category,
      badge: badge.trim(),
      rating: 5.0,
      reviews: 1
    };

    if (onAddProduct) {
      onAddProduct(newProduct);
    }

    try {
      confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}

    // Reset and close
    setName('');
    setPrice('');
    setStock('50');
    setDescription('');
    setPhoto('');
    setError('');
    onClose();
  };

  return (
    <div className="modern-modal-backdrop" onClick={onClose}>
      <div className="modern-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modern-modal-header">
          <div className="modern-modal-badge emerald">
            <Sparkles size={14} /> Shto në Katalog
          </div>
          <h2 className="modern-modal-title">Shto Produkt të Ri</h2>
          <p className="modern-modal-subtitle">
            Plotësoni të dhënat e artikullit për ta shfaqur menjëherë në dyqanin e MaxMarket.
          </p>
          <button className="modern-modal-close" onClick={onClose} title="Mbyll">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          <div className="modern-modal-body">
            {error && (
              <div className="modern-error-box">
                {error}
              </div>
            )}

            {/* Product Name */}
            <div className="modern-form-group">
              <label className="modern-label">
                <Tag size={15} /> Emri i Produktit *
              </label>
              <div className="modern-input-wrap">
                <input
                  type="text"
                  className="modern-input no-icon"
                  placeholder="Emri i plotë i artikullit"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  required
                />
              </div>
            </div>

            {/* Price, Stock & Category */}
            <div className="modern-form-row" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
              <div className="modern-form-group">
                <label className="modern-label">
                  <DollarSign size={15} /> Çmimi (€) *
                </label>
                <div className="modern-input-wrap">
                  <input
                    type="number"
                    step="0.01"
                    min="0.1"
                    className="modern-input no-icon"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modern-form-group">
                <label className="modern-label">
                  Stoku (Copë) *
                </label>
                <div className="modern-input-wrap">
                  <input
                    type="number"
                    min="0"
                    className="modern-input no-icon"
                    placeholder="50"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modern-form-group">
                <label className="modern-label">
                  Kategoria *
                </label>
                <select
                  className="modern-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories
                    .filter((c) => c.id !== 'all' && c.id !== 'offers')
                    .map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
              </div>
            </div>

            {/* Badges / Etiketa */}
            <div className="modern-form-group">
              <label className="modern-label">
                Etiketë / Badge (Opsionale)
              </label>
              <div className="modern-badge-chips">
                {PRESET_BADGES.map((b) => (
                  <button
                    key={b}
                    type="button"
                    className={`modern-badge-chip ${badge === b ? 'is-active' : ''}`}
                    onClick={() => setBadge(badge === b ? '' : b)}
                  >
                    {badge === b && <Check size={13} />}
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Photo URL & Suggestions */}
            <div className="modern-form-group">
              <label className="modern-label">
                <ImageIcon size={15} /> Foto e Produktit (URL)
              </label>
              <div className="modern-input-wrap">
                <input
                  type="url"
                  className="modern-input no-icon"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                />
              </div>

              {/* Sample Images */}
              <div className="sample-images-bar">
                <span className="sample-images-label">Shembuj:</span>
                {SAMPLE_IMAGES.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="sample-image-pill"
                    onClick={() => setPhoto(sample.url)}
                  >
                    {sample.label}
                  </button>
                ))}
              </div>

              {/* Live Preview */}
              {photo && (
                <div className="modern-img-preview-card">
                  <img
                    src={photo}
                    alt="Preview"
                    className="modern-img-thumbnail"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className="preview-card-info">
                    <span className="preview-success-tag">✓ Foto e ngarkuar me sukses</span>
                    <span className="preview-desc-tag">Kjo pamje do të shfaqet në kartën e produktit.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="modern-form-group">
              <label className="modern-label">
                <FileText size={15} /> Përshkrimi i Artikullit *
              </label>
              <textarea
                className="modern-textarea"
                rows="3"
                placeholder="Përshkruani materialin, veçoritë dhe specifikat e artikullit..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Footer */}
          <div className="modern-modal-footer">
            <button type="button" className="modern-btn-cancel" onClick={onClose}>
              Anulo
            </button>
            <button type="submit" className="modern-btn-primary">
              <Plus size={18} />
              <span>Shto Produktin</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
