import React, { useState, useEffect } from 'react';
import { X, Save, Image as ImageIcon, Tag, FileText, DollarSign, Trash2, Percent } from 'lucide-react';
import confetti from 'canvas-confetti';

const SAMPLE_IMAGES = [
  { label: 'Set Porcelani', url: 'https://images.unsplash.com/photo-1614088445129-843c085e6834?auto=format&fit=crop&w=800&q=80' },
  { label: 'Mbulesa Satina', url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80' },
  { label: 'Vazo Moderne', url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80' },
  { label: 'Tigan Graniti', url: 'https://images.unsplash.com/photo-1584990347449-3995f32a7629?auto=format&fit=crop&w=800&q=80' },
  { label: 'Peshqirë Banjo', url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80' }
];

export default function EditProductModal({ 
  isOpen = true, 
  onClose, 
  product, 
  onSave, 
  onSaveProduct,
  onDelete, 
  onDeleteProduct,
  categories = [] 
}) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [category, setCategory] = useState('kuhinja');
  const [badge, setBadge] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price ? product.price.toString() : '');
      setOldPrice(product.oldPrice ? product.oldPrice.toString() : '');
      setDescription(product.description || '');
      setPhoto(product.image || '');
      setCategory(product.category || 'kuhinja');
      setBadge(product.badge || '');
      setError('');
    }
  }, [product]);

  if (!isOpen || !product) return null;

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

    let parsedOldPrice = null;
    if (oldPrice.trim() !== '') {
      parsedOldPrice = parseFloat(oldPrice);
      if (isNaN(parsedOldPrice) || parsedOldPrice <= 0) {
        setError('Çmimi i vjetër duhet të jetë numër pozitiv ose lëreni bosh.');
        return;
      }
    }

    let finalBadge = badge.trim();
    if (parsedOldPrice && parsedOldPrice > parsedPrice && !finalBadge) {
      const discountPercent = Math.round(((parsedOldPrice - parsedPrice) / parsedOldPrice) * 100);
      finalBadge = `-${discountPercent}%`;
    }

    const updated = {
      ...product,
      name: name.trim(),
      price: parsedPrice,
      oldPrice: parsedOldPrice,
      description: description.trim(),
      image: photo.trim() || product.image,
      category,
      badge: finalBadge
    };

    const saveFn = onSave || onSaveProduct;
    if (saveFn) {
      saveFn(updated);
    }

    try {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}

    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`A jeni të sigurt që dëshironi të fshini produktin: "${product.name}"?`)) {
      const deleteFn = onDelete || onDeleteProduct;
      if (deleteFn) {
        deleteFn(product.id);
      }
      onClose();
    }
  };

  const currentNum = parseFloat(price);
  const oldNum = parseFloat(oldPrice);
  const hasDiscount = !isNaN(currentNum) && !isNaN(oldNum) && oldNum > currentNum;
  const calculatedPercent = hasDiscount ? Math.round(((oldNum - currentNum) / oldNum) * 100) : null;

  return (
    <div className="add-product-backdrop" onClick={onClose}>
      <div className="add-product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="add-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="add-modal-header">
          <div className="admin-pill-tag">
            ✏️ Modifiko Çmimin & Zbritjen
          </div>
          <h2>Ndrysho të dhënat e artikullit</h2>
          <p>Mund të vendosni çmimin e ri, zbritjen me çmimin e vjetër, emrin apo foton.</p>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label>Kategoria</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories && categories.length > 0 ? (
                  categories.filter(c => c.id !== 'all' && c.id !== 'offers').map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))
                ) : (
                  <>
                    <option value="kuhinja">Kuhinja</option>
                    <option value="organizim">Organizim & Ruajtje</option>
                    <option value="shtepia">Shtëpia</option>
                    <option value="pastrimi">Pastrimi</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Pricing & Discount Row */}
          <div className="form-grid-2">
            <div className="form-field">
              <label>Çmimi Aktual me Zbritje (€) *</label>
              <div className="input-with-icon">
                <DollarSign size={17} />
                <input
                  type="number"
                  step="0.01"
                  min="0.1"
                  placeholder="psh. 49.90"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label>Çmimi Fillestar / i Vjetër (€) (Zbritja)</label>
              <div className="input-with-icon">
                <Percent size={17} />
                <input
                  type="number"
                  step="0.01"
                  min="0.1"
                  placeholder="psh. 69.90 (e vizuar)"
                  value={oldPrice}
                  onChange={(e) => setOldPrice(e.target.value)}
                />
              </div>
              <span className="field-hint">
                {hasDiscount 
                  ? `🔥 Zbritje prej ${calculatedPercent}% (Kurseni €${(oldNum - currentNum).toFixed(2)})` 
                  : 'Lëreni bosh nëse nuk dëshironi zbritje.'}
              </span>
            </div>
          </div>

          <div className="form-field">
            <label>Etiketë / Badge (psh. Zbritje, -30%, Top Brend)</label>
            <input
              type="text"
              placeholder="psh. Zbritje, -20%, Më e Shitura..."
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label>Linku i Fotos (URL)</label>
            <div className="input-with-icon">
              <ImageIcon size={17} />
              <input
                type="url"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </div>

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

            {photo && (
              <div className="img-preview-box">
                <img src={photo} alt="Preview" onError={(e) => { e.target.style.display = 'none'; }} />
                <span>Pamja aktuale</span>
              </div>
            )}
          </div>

          <div className="form-field">
            <label>Përshkrimi i Produktit *</label>
            <div className="textarea-with-icon">
              <FileText size={17} className="textarea-icon" />
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="edit-actions-footer">
            <button 
              type="button" 
              className="delete-product-btn" 
              onClick={handleDelete}
              title="Fshij këtë produkt nga dyqani"
            >
              <Trash2 size={17} />
              <span>Fshij Produktin</span>
            </button>

            <div className="right-action-buttons">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Anulo
              </button>
              <button type="submit" className="save-product-btn">
                <Save size={18} />
                <span>Ruaj Ndryshimet</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
