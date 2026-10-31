import React, { useState } from 'react';
import { X, Plus, Image as ImageIcon, Tag, FileText, DollarSign, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const SAMPLE_IMAGES = [
  { label: 'Set Porcelani', url: 'https://images.unsplash.com/photo-1614088445129-843c085e6834?auto=format&fit=crop&w=800&q=80' },
  { label: 'Mbulesa Satina', url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80' },
  { label: 'Vazo Moderne', url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80' },
  { label: 'Tigan Graniti', url: 'https://images.unsplash.com/photo-1584990347449-3995f32a7629?auto=format&fit=crop&w=800&q=80' },
  { label: 'Peshqirë Banjo', url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80' }
];

export default function AddProductModal({ isOpen, onClose, onAddProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [category, setCategory] = useState('kitchen');
  const [badge, setBadge] = useState('E Re');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price || !description.trim()) {
      setError('Ju lutem plotësoni të paktën Emrin, Çmimin dhe Përshkrimin!');
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Çmimi duhet të jetë një numër pozitiv.');
      return;
    }

    const finalPhoto = photo.trim() || 'https://images.unsplash.com/photo-1584990347449-3995f32a7629?auto=format&fit=crop&w=800&q=80';

    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      price: parsedPrice,
      oldPrice: null,
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
    setDescription('');
    setPhoto('');
    setError('');
    onClose();
  };

  return (
    <div className="add-product-backdrop" onClick={onClose}>
      <div className="add-product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="add-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="add-modal-header">
          <div className="admin-pill-tag">
            <Sparkles size={14} /> Paneli i Administratorit
          </div>
          <h2>Shto Produktin e Ri</h2>
          <p>Plotësoni të dhënat e artikullit për ta listuar në katalogun e MaxMarket.</p>
        </div>

        {error && <div className="add-error-box">{error}</div>}

        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-grid-2">
            <div className="form-field">
              <label>Emri i Produktit *</label>
              <div className="input-with-icon">
                <Tag size={17} />
                <input
                  type="text"
                  placeholder="psh. Set Filxhana Porcelani..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label>Çmimi (€) *</label>
              <div className="input-with-icon">
                <DollarSign size={17} />
                <input
                  type="number"
                  step="0.01"
                  min="0.1"
                  placeholder="psh. 29.99"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-field">
              <label>Kategoria</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="kitchen">Kuzhinë & Enë</option>
                <option value="bedding">Tekstil & Fjetje</option>
                <option value="decor">Dekor & Living</option>
                <option value="bath">Banjë & Spa</option>
              </select>
            </div>

            <div className="form-field">
              <label>Etiketë / Badge</label>
              <input
                type="text"
                placeholder="psh. E Re, Zbritje, Top Brend"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
              />
            </div>
          </div>

          <div className="form-field">
            <label>Linku i Fotos (URL)</label>
            <div className="input-with-icon">
              <ImageIcon size={17} />
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </div>
            
            {/* Quick image picker helpers */}
            <div className="quick-img-suggestions">
              <span className="suggestion-label">Ose zgjidhni një foto shembull:</span>
              <div className="sample-photos-row">
                {SAMPLE_IMAGES.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="sample-img-btn"
                    onClick={() => setPhoto(sample.url)}
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Photo preview */}
            {photo && (
              <div className="img-preview-box">
                <img src={photo} alt="Preview" onError={(e) => { e.target.style.display = 'none'; }} />
                <span>Pamja paraprake e fotos</span>
              </div>
            )}
          </div>

          <div className="form-field">
            <label>Përshkrimi i Produktit *</label>
            <div className="textarea-with-icon">
              <FileText size={17} className="textarea-icon" />
              <textarea
                rows="3"
                placeholder="Shkruani materialin, dimensionet dhe veçoritë e produktit..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="add-actions-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Anulo
            </button>
            <button type="submit" className="save-product-btn">
              <Plus size={18} />
              <span>Publiko Produktin</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
