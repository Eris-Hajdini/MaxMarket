import React, { useState } from 'react';
import { X, Search, Edit3, Trash2, Tag, ArrowRight } from 'lucide-react';

export default function EditProductSelectorModal({ 
  isOpen, 
  onClose, 
  products, 
  onSelectProductToEdit, 
  onDeleteProduct 
}) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="add-product-backdrop" onClick={onClose}>
      <div className="product-manager-modal" onClick={(e) => e.stopPropagation()}>
        <button className="add-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="manager-header">
          <div className="admin-pill-tag">
            <Edit3 size={14} /> Menaxhimi i Produkteve
          </div>
          <h2>Zgjidhni produktin që dëshironi të modifikoni</h2>
          <p>Këtu mund të shihni të gjitha produktet e dyqanit dhe të zgjidhni cilindo për editim apo fshirje.</p>

          <div className="manager-search-box">
            <Search size={18} className="manager-search-icon" />
            <input
              type="text"
              placeholder="Filtro produktet me emër ose kategori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="count-tag">{filtered.length} produkte</span>
          </div>
        </div>

        <div className="manager-products-list">
          {filtered.length === 0 ? (
            <div className="manager-empty-state">
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
                    <span className="desc-preview">{item.description.slice(0, 65)}...</span>
                  </div>
                </div>

                <div className="manager-item-actions">
                  <button 
                    className="select-to-edit-btn"
                    onClick={() => {
                      onSelectProductToEdit(item);
                    }}
                  >
                    <span>Zgjidh Produktin</span>
                    <ArrowRight size={16} />
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
