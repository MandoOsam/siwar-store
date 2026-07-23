'use client';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { useStore } from '@/lib/StoreContext';
import { useToast } from '@/lib/ToastContext';
import { uploadImageToImgBB } from '@/lib/uploadImage';

export default function ProductForm({ productId, onClose }) {
  const { t } = useLanguage();
  const { products, setProducts } = useStore();
  const { showToast } = useToast();

  const editing = productId && productId !== 'new';
  const existing = editing ? products.find((p) => p.id === productId) : null;

  const [form, setForm] = useState({
    name: existing?.name || '',
    price: existing?.price ?? '',
    stock: existing?.stock ?? '',
    category: existing?.category || '',
    image: existing?.image || '',
    description: existing?.description || '',
  });
  const [uploadStatus, setUploadStatus] = useState(form.image ? '' : t('orUseUrl'));

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadStatus(t('uploading'));
    const res = await uploadImageToImgBB(file);
    if (res.ok) {
      setForm((f) => ({ ...f, image: res.url }));
      setUploadStatus(t('uploaded'));
    } else if (res.reason === 'no-key') {
      showToast(t('imgbbMissing'));
      setUploadStatus('');
    } else {
      setUploadStatus(t('uploadFailed'));
    }
  };

  const save = async () => {
    if (!form.name.trim()) {
      showToast(t('nameRequired'));
      return;
    }
    const payload = {
      name: form.name.trim(),
      price: parseFloat(form.price) || 0,
      stock: parseInt(form.stock, 10) || 0,
      category: form.category.trim(),
      image: form.image.trim(),
      description: form.description.trim(),
    };
    let next;
    if (editing) {
      next = products.map((p) => (p.id === productId ? { ...p, ...payload } : p));
    } else {
      next = [...products, { id: 'p' + Date.now(), ...payload }];
    }
    await setProducts(next);
    showToast(t('saved'));
    onClose();
  };

  return (
    <div className="overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sheet">
        <button className="close-x" onClick={onClose}>✕</button>
        <h2 style={{ marginTop: 0 }}>{editing ? t('editProduct') : t('newProduct')}</h2>

        <div className="field">
          <label>{t('productName')}</label>
          <input value={form.name} onChange={update('name')} />
        </div>

        <div className="row2">
          <div className="field">
            <label>{t('priceEgp')}</label>
            <input type="number" value={form.price} onChange={update('price')} />
          </div>
          <div className="field">
            <label>{t('availableStock')}</label>
            <input type="number" value={form.stock} onChange={update('stock')} />
          </div>
        </div>

        <div className="field">
          <label>{t('category')}</label>
          <input value={form.category} onChange={update('category')} placeholder={t('categoryHint')} />
        </div>

        <div className="field">
          <label>{t('productImage')}</label>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: 10, overflow: 'hidden', background: 'var(--surface-2)', border: '1px solid var(--line)', flexShrink: 0 }}>
              {form.image && <img src={form.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            </div>
            <div style={{ flex: 1 }}>
              <input type="file" accept="image/*" onChange={handleFile} />
              <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 4 }}>{uploadStatus}</div>
            </div>
          </div>
        </div>
        <div className="field">
          <input value={form.image} onChange={update('image')} placeholder="https://..." />
        </div>

        <div className="field">
          <label>{t('description')}</label>
          <textarea rows={3} value={form.description} onChange={update('description')} />
        </div>

        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 6 }} onClick={save}>
          {t('saveProduct')}
        </button>
      </div>
    </div>
  );
}
