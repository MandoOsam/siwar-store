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

  const existingImages = existing?.images?.length
    ? existing.images
    : existing?.image
      ? [existing.image]
      : [];

  const [form, setForm] = useState({
    name: existing?.name || '',
    price: existing?.price ?? '',
    oldPrice: existing?.oldPrice ?? '',
    stock: existing?.stock ?? '',
    category: existing?.category || '',
    description: existing?.description || '',
  });
  const [images, setImages] = useState(existingImages);
  const [uploadStatus, setUploadStatus] = useState('');

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const addImage = () => setImages((prev) => [...prev, '']);

  const removeImage = (idx) => setImages((prev) => prev.filter((_, i) => i !== idx));

  const updateImage = (idx, val) => setImages((prev) => prev.map((v, i) => (i === idx ? val : v)));

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadStatus(t('uploading'));
    const res = await uploadImageToImgBB(file);
    if (res.ok) {
      setImages((prev) => [...prev, res.url]);
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
    const cleanImages = images.filter((u) => u && u.trim());
    const payload = {
      name: form.name.trim(),
      price: parseFloat(form.price) || 0,
      oldPrice: parseFloat(form.oldPrice) || null,
      stock: parseInt(form.stock, 10) || 0,
      category: form.category.trim(),
      image: cleanImages[0] || '',
      images: cleanImages,
      description: form.description.trim(),
    };
    let next;
    if (editing) {
      next = products.map((p) => (p.id === productId ? { ...p, ...payload } : p));
    } else {
      next = [...products, { id: 'p' + Date.now(), ...payload }];
    }
    const res = await setProducts(next);
    if (res && res.ok === false) {
      showToast(t('saveFailed'));
      return;
    }
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
          <label>{t('oldPriceOptional')}</label>
          <input type="number" value={form.oldPrice} onChange={update('oldPrice')} placeholder="—" />
        </div>

        <div className="field">
          <label>{t('category')}</label>
          <input value={form.category} onChange={update('category')} placeholder={t('categoryHint')} />
        </div>

        <div className="field">
          <label>{t('productImages')}</label>
          <div className="images-list">
            {images.map((url, idx) => (
              <div key={idx} className="image-row">
                <div className="image-thumb">
                  {url ? <img src={url} alt="" /> : <span className="image-thumb-empty">{idx + 1}</span>}
                </div>
                <input
                  className="image-url-input"
                  value={url}
                  onChange={(e) => updateImage(idx, e.target.value)}
                  placeholder="https://..."
                />
                <button className="icon-btn image-remove-btn" onClick={() => removeImage(idx)}>✕</button>
              </div>
            ))}
          </div>
          <div className="image-actions">
            <button className="btn-ghost" type="button" onClick={addImage}>+ {t('addImage')}</button>
            <label className="btn-ghost image-upload-label">
              {t('uploadImage')}
              <input type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
            </label>
          </div>
          {uploadStatus && <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 4 }}>{uploadStatus}</div>}
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
