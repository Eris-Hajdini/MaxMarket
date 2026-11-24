import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Image as ImageIcon, Tag, FileText, DollarSign, Trash2, Edit3, Check, Upload } from 'lucide-react';
import confetti from 'canvas-confetti';

const SAMPLE_IMAGES = [
  { label: 'Set Porcelani', url: 'https://images.unsplash.com/photo-1614088445129-843c085e6834?auto=format&fit=crop&w=800&q=80' },
  { label: 'Mbulesa Satina', url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80' },
  { label: 'Vazo Moderne', url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80' },
  { label: 'Tigan Graniti', url: 'https://images.unsplash.com/photo-1584990347449-3995f32a7629?auto=format&fit=crop&w=800&q=80' },
  { label: 'Peshqirë Banjo', url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80' }
];

const PRESET_BADGES = ['E Re', 'Top Brend', 'Më e Shitura', 'Koleksion i Ri', 'Ekskluzive'];

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
  const [stock, setStock] = useState('50');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const availableCategories = (categories || []).filter(c => c.id !== 'all' && c.id !== 'offers');
  const [category, setCategory] = useState(availableCategories[0]?.id || 'kitchen');
  const [badge, setBadge] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price ? product.price.toString() : '');
      setStock(product.stock !== undefined ? product.stock.toString() : '50');
      setDescription(product.description || '');
      setPhoto(product.image || '');
      setCategory(product.category || availableCategories[0]?.id || 'kitchen');
      // If badge starts with '-' or is a discount, we leave it or allow non-discount badges
      setBadge(product.badge || '');
      setError('');
    }
  }, [product]);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setError('Madhësia e fotos nuk duhet të kalojë 8MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target.result);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen || !product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price || !description.trim()) {
      setError('Ju lutem plotësoni Emrin, Çmimin dhe Përshkrimin!');
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Çmimi duhet të jetë një numër pozitiv.');
      return;
    }

    const parsedStock = parseInt(stock);
    const finalStock = isNaN(parsedStock) || parsedStock < 0 ? 0 : parsedStock;

    // Preserve existing discount configuration if set from Discounts section
    const updated = {
      ...product,
      name: name.trim(),
      price: parsedPrice,
      stock: finalStock,
      // oldPrice remains untouched here (managed strictly in Discounts)
      description: description.trim(),
      image: photo.trim() || product.image,
      category,
      badge: badge.trim()
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

  return (
    <div className="modern-modal-backdrop" onClick={onClose}>
      <div className="modern-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modern-modal-header">
          <div className="modern-modal-badge blue">
            <Edit3 size={14} /> Modifiko të Dhënat
          </div>
          <h2 className="modern-modal-title">Ndrysho Produktin</h2>
          <p className="modern-modal-subtitle">
            Përditësoni emrin, kategorinë, çmimin bazë ose fotografinë e këtij artikulli.
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  required
                />
              </div>
            </div>

            {/* Price, Stock & Category (Discount fields removed per request) */}
            <div className="modern-form-row" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
              <div className="modern-form-group">
                <label className="modern-label">
                  <DollarSign size={15} /> Çmimi Bazë (€) *
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
                  {categories && categories.length > 0 ? (
                    categories
                      .filter((c) => c.id !== 'all' && c.id !== 'offers')
                      .map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))
                  ) : (
                    <>
                      <option value="kuhinja">Kuzhina</option>
                      <option value="organizim">Organizim & Ruajtje</option>
                      <option value="shtepia">Shtëpia</option>
                      <option value="pastrimi">Pastrimi</option>
                    </>
                  )}
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

            {/* Photo Upload from PC (Browse) & Preview */}
            <div className="modern-form-group">
              <label className="modern-label">
                <ImageIcon size={15} /> Foto e Produktit *
              </label>

              {/* Browse from PC Button & Dropzone */}
              <div 
                className="modern-file-dropzone"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                title="Kliko për të zgjedhur foto nga kompjuteri"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <div className="dropzone-icon-circle">
                  <Upload size={22} color="#ea580c" />
                </div>
                <div className="dropzone-text-group">
                  <span className="dropzone-main-text">
                    <strong>Zgjidh foto nga kompjuteri (Browse PC)</strong>
                  </span>
                  <span className="dropzone-sub-text">
                    Kliko këtu për të ngarkuar foto nga PC (PNG, JPG, WEBP)
                  </span>
                </div>
              </div>

              {/* Optional URL input & Samples fallback */}
              <div style={{ marginTop: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Ose shkruaj URL / zgjidh nga shembujt:</span>
                <div className="modern-input-wrap" style={{ marginTop: '4px' }}>
                  <input
                    type="url"
                    className="modern-input no-icon"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={photo.startsWith('data:') ? '' : photo}
                    onChange={(e) => setPhoto(e.target.value)}
                  />
                </div>
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
                  />
                  <div className="preview-card-info" style={{ flex: 1 }}>
                    <span className="preview-success-tag">✓ Foto e ngarkuar me sukses</span>
                    <span className="preview-desc-tag">
                      {photo.startsWith('data:') ? 'Ngarkuar nga kompjuteri juaj (PC)' : 'Pamje e përzgjedhur'}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="preview-remove-btn"
                    onClick={() => setPhoto('')}
                    title="Hiq foton"
                  >
                    ✕
                  </button>
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="modern-modal-footer">
            <button
              type="button"
              className="modern-btn-delete"
              onClick={handleDelete}
              title="Fshij produktin nga katalogu"
            >
              <Trash2 size={16} />
              <span>Fshij Produktin</span>
            </button>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button type="button" className="modern-btn-cancel" onClick={onClose}>
                Anulo
              </button>
              <button type="submit" className="modern-btn-primary">
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
