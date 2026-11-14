import React, { useState } from 'react';
import { X, Search, Edit3, Trash2, ArrowRight } from 'lucide-react';

export default function EditProductSelectorModal({ 
  isOpen = true, 
  onClose, 
  products = [], 
  onSelectProduct,
  onSelectProductToEdit, 
  onDeleteProduct 
}) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const handleSelect = onSelectProduct || onSelectProductToEdit;

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modern-modal-backdrop" onClick={onClose}>
      <div className="modern-modal-card" style={{ maxWidth: '780px', maxHeight: '85vh' }} onClick={(e) => e.stopPropagation()}>
        <div className="modern-modal-header">
          <div className="modern-modal-badge blue">
            <Edit3 size={14} /> Menaxhimi i Produkteve
          </div>
          <h2 className="modern-modal-title">Zgjidhni produktin për modifikim</h2>
          <p className="modern-modal-subtitle">
            Kërkoni dhe zgjidhni cilindo produkt për të ndryshuar të dhënat e tij.
          </p>
          <button className="modern-modal-close" onClick={onClose} title="Mbyll">
            <X size={18} />
          </button>
        </div>

        {/* Search Bar */}
        <div style={{ padding: '16px 28px 12px', borderBottom: '1px solid #f1f5f9' }}>
          <div className="modern-input-wrap">
            <Search size={18} className="modern-input-icon" />
            <input
              type="text"
              className="modern-input"
              placeholder="Filtro me emër ose kategori artikulli..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {/* List of Products */}
        <div className="manager-products-list" style={{ padding: '16px 28px', flex: 1, overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
              <p>Nuk u gjet asnjë produkt me këtë kërkim.</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div key={item.id} className="manager-product-item">
                <img src={item.image} alt={item.name} className="manager-item-img" />
                
                <div className="manager-item-details">
                  <div className="manager-item-title-row">
                    <h4 className="manager-item-title">{item.name}</h4>
                    <span className="manager-item-price">€{item.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="manager-item-meta">
                    <span className="cat-chip">{item.category}</span>
                    {item.badge && <span className="badge-chip">{item.badge}</span>}
                    <span className="desc-preview">{item.description.slice(0, 60)}...</span>
                  </div>
                </div>

                <div className="manager-item-actions">
                  <button 
                    className="select-to-edit-btn"
                    onClick={() => {
                      if (handleSelect) handleSelect(item);
                    }}
                  >
                    <span>Modifiko</span>
                    <ArrowRight size={15} />
                  </button>

                  <button 
                    className="quick-trash-btn"
                    onClick={() => {
                      if (window.confirm(`A jeni të sigurt që dëshironi të fshini: "${item.name}"?`)) {
                        onDeleteProduct(item.id);
                      }
                    }}
                    title="Fshij menjëherë"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
