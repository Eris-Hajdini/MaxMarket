import React, { useState, useEffect } from 'react';
import { X, Percent, DollarSign, Tag, Check, Trash2, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const DISCOUNT_PRESETS = [10, 20, 25, 30, 40, 50, 70];

export default function DiscountModal({
  isOpen = true,
  onClose,
  products = [],
  initialProduct = null,
  onSaveDiscount,
  onRemoveDiscount
}) {
  const [selectedProductId, setSelectedProductId] = useState(
    initialProduct ? initialProduct.id : products[0]?.id || ''
  );
  const [basePrice, setBasePrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [percent, setPercent] = useState('');
  const [error, setError] = useState('');

  // Selected product object
  const currentProduct = products.find(p => String(p.id) === String(selectedProductId)) || initialProduct;

  useEffect(() => {
    if (currentProduct) {
      const orig = currentProduct.oldPrice ? Number(currentProduct.oldPrice) : Number(currentProduct.price);
      const curr = Number(currentProduct.price);
      
      setBasePrice(orig.toFixed(2));

      if (currentProduct.oldPrice && orig > curr) {
        setDiscountPrice(curr.toFixed(2));
        const p = Math.round(((orig - curr) / orig) * 100);
        setPercent(p.toString());
      } else {
        // Default to a 20% discount if not already discounted
        const defaultDiscount = (orig * 0.8).toFixed(2);
        setDiscountPrice(defaultDiscount);
        setPercent('20');
      }
      setError('');
    }
  }, [selectedProductId, currentProduct?.id]);

  if (!isOpen) return null;

  // Handle price input change -> recompute percent
  const handleDiscountPriceChange = (val) => {
    setDiscountPrice(val);
    const parsedVal = parseFloat(val);
    const parsedBase = parseFloat(basePrice);
    if (!isNaN(parsedVal) && !isNaN(parsedBase) && parsedBase > 0) {
      if (parsedVal < parsedBase) {
        const p = Math.round(((parsedBase - parsedVal) / parsedBase) * 100);
        setPercent(p.toString());
      } else {
        setPercent('0');
      }
    }
  };

  // Handle percent preset button or change -> recompute discount price
  const handlePercentPreset = (pVal) => {
    setPercent(pVal.toString());
    const parsedBase = parseFloat(basePrice);
    if (!isNaN(parsedBase) && parsedBase > 0) {
      const newPrice = (parsedBase * (1 - pVal / 100)).toFixed(2);
      setDiscountPrice(newPrice);
    }
  };

  const handleBasePriceChange = (val) => {
    setBasePrice(val);
    const parsedBase = parseFloat(val);
    const parsedPercent = parseFloat(percent);
    if (!isNaN(parsedBase) && !isNaN(parsedPercent) && parsedBase > 0) {
      const newPrice = (parsedBase * (1 - parsedPercent / 100)).toFixed(2);
      setDiscountPrice(newPrice);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentProduct) {
      setError('Zgjidhni një produkt!');
      return;
    }

    const parsedBase = parseFloat(basePrice);
    const parsedDiscount = parseFloat(discountPrice);

    if (isNaN(parsedBase) || parsedBase <= 0) {
      setError('Çmimi fillestar duhet të jetë numër pozitiv.');
      return;
    }

    if (isNaN(parsedDiscount) || parsedDiscount <= 0) {
      setError('Çmimi me zbritje duhet të jetë numër pozitiv.');
      return;
    }

    if (parsedDiscount >= parsedBase) {
      setError('Çmimi me zbritje duhet të jetë më i vogël se çmimi fillestar!');
      return;
    }

    const discountP = Math.round(((parsedBase - parsedDiscount) / parsedBase) * 100);

    const updatedProduct = {
      ...currentProduct,
      price: parsedDiscount,
      oldPrice: parsedBase,
      badge: `-${discountP}%`
    };

    if (onSaveDiscount) {
      onSaveDiscount(updatedProduct);
    }

    try {
      confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}

    onClose();
  };

  const handleRemove = () => {
    if (!currentProduct) return;
    if (window.confirm(`Dëshironi të hiqni zbritjen nga "${currentProduct.name}"?`)) {
      if (onRemoveDiscount) {
        onRemoveDiscount(currentProduct.id);
      } else if (onSaveDiscount) {
        // Reset to original price
        const resetProduct = {
          ...currentProduct,
          price: currentProduct.oldPrice ? Number(currentProduct.oldPrice) : currentProduct.price,
          oldPrice: null,
          badge: currentProduct.badge && currentProduct.badge.startsWith('-') ? '' : currentProduct.badge
        };
        onSaveDiscount(resetProduct);
      }
      onClose();
    }
  };

  const numBase = parseFloat(basePrice) || 0;
  const numDiscount = parseFloat(discountPrice) || 0;
  const savings = numBase > numDiscount ? (numBase - numDiscount).toFixed(2) : '0.00';
  const calcPercent = numBase > numDiscount ? Math.round(((numBase - numDiscount) / numBase) * 100) : 0;
  const hasExistingDiscount = Boolean(currentProduct?.oldPrice);

  return (
    <div className="modern-modal-backdrop" onClick={onClose}>
      <div className="modern-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modern-modal-header">
          <div className="modern-modal-badge amber">
            <Tag size={14} /> Menaxhimi i Zbritjes
          </div>
          <h2 className="modern-modal-title">
            {hasExistingDiscount ? 'Modifiko Zbritjen' : 'Apliko Zbritje Promocionale'}
          </h2>
          <p className="modern-modal-subtitle">
            Përcaktoni ofertën speciale dhe përqindjen e zbritjes që do të shfaqet në dyqan.
          </p>
          <button className="modern-modal-close" onClick={onClose} title="Mbyll">
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          <div className="modern-modal-body">
            {error && (
              <div className="modern-error-box">
                {error}
              </div>
            )}

            {/* If opening from scratch, allow picking product */}
            {(!initialProduct || products.length > 1) && (
              <div className="modern-form-group">
                <label className="modern-label">
                  Zgjidhni Produktin për Zbritje
                </label>
                <select
                  className="modern-select"
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — €{p.price.toFixed(2)} {p.oldPrice ? `(Zbritje aktuale -${Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}%)` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Current Product Selected Info Card */}
            {currentProduct && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px 16px',
                background: '#f8fafc',
                borderRadius: '14px',
                border: '1px solid #e2e8f0'
              }}>
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ margin: '0 0 2px', fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {currentProduct.name}
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Kategoria: <span style={{ textTransform: 'capitalize', fontWeight: '600', color: '#334155' }}>{currentProduct.category}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.74rem', color: '#64748b' }}>Çmimi në katalog</div>
                  <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>€{currentProduct.price.toFixed(2)}</strong>
                </div>
              </div>
            )}

            {/* Pricing Controls: Original Price vs Promotional Price */}
            <div className="modern-form-row">
              <div className="modern-form-group">
                <label className="modern-label">
                  <DollarSign size={15} /> Çmimi Fillestar / i Vjetër (€)
                </label>
                <div className="modern-input-wrap">
                  <input
                    type="number"
                    step="0.01"
                    min="0.1"
                    className="modern-input no-icon"
                    placeholder="psh. 69.90"
                    value={basePrice}
                    onChange={(e) => handleBasePriceChange(e.target.value)}
                    required
                  />
                </div>
                <span style={{ fontSize: '0.74rem', color: '#64748b' }}>Ky çmim do të shfaqet i vizuar.</span>
              </div>

              <div className="modern-form-group">
                <label className="modern-label" style={{ color: '#ea580c' }}>
                  <Tag size={15} color="#ea580c" /> Çmimi i Ri me Zbritje (€) *
                </label>
                <div className="modern-input-wrap">
                  <input
                    type="number"
                    step="0.01"
                    min="0.1"
                    className="modern-input no-icon"
                    placeholder="psh. 49.90"
                    value={discountPrice}
                    onChange={(e) => handleDiscountPriceChange(e.target.value)}
                    style={{ borderColor: '#fdba74', background: '#fffaf5' }}
                    required
                  />
                </div>
                <span style={{ fontSize: '0.74rem', color: '#ea580c', fontWeight: '600' }}>Ky do të jetë çmimi i shitjes.</span>
              </div>
            </div>

            {/* Quick Percentage Presets */}
            <div className="modern-form-group">
              <label className="modern-label">
                <Percent size={15} /> Zgjidhni Përqindjen e Zbritjes:
              </label>
              <div className="modern-badge-chips">
                {DISCOUNT_PRESETS.map((pVal) => (
                  <button
                    key={pVal}
                    type="button"
                    className={`modern-badge-chip ${percent === pVal.toString() ? 'is-active' : ''}`}
                    onClick={() => handlePercentPreset(pVal)}
                    style={{
                      background: percent === pVal.toString() ? '#fff7ed' : '#ffffff',
                      borderColor: percent === pVal.toString() ? '#ea580c' : '#e2e8f0',
                      color: percent === pVal.toString() ? '#c2410c' : '#475569'
                    }}
                  >
                    -{pVal}%
                  </button>
                ))}
              </div>
            </div>

            {/* Real-time Calculation & Visual Preview Box */}
            <div className="discount-live-calc-box">
              <div className="discount-calc-left">
                <span className="discount-calc-title">Pamja Paraprake e Ofertës</span>
                <div className="discount-calc-values">
                  <span className="discount-new-price">€{numDiscount.toFixed(2)}</span>
                  <span className="discount-old-price">€{numBase.toFixed(2)}</span>
                </div>
                <span style={{ fontSize: '0.78rem', color: '#c2410c', marginTop: '2px', fontWeight: '600' }}>
                  Klienti kursen €{savings} (-{calcPercent}%)
                </span>
              </div>

              <div className="discount-saving-pill">
                <Sparkles size={14} />
                <span>-{calcPercent}%</span>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="modern-modal-footer">
            {hasExistingDiscount ? (
              <button
                type="button"
                className="modern-btn-delete"
                onClick={handleRemove}
                title="Hiq zbritjen dhe rikthe çmimin normal"
              >
                <Trash2 size={16} />
                <span>Hiq Zbritjen</span>
              </button>
            ) : (
              <div></div>
            )}

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button type="button" className="modern-btn-cancel" onClick={onClose}>
                Anulo
              </button>
              <button type="submit" className="modern-btn-discount">
                <Check size={18} />
                <span>Ruaj Zbritjen</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
