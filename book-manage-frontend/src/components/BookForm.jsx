import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function BookForm({ book, onDone }) {
  const [form, setForm] = useState({
    title: '',
    author: '',
    price: '',
    stock: '',
    book_category_id: ''
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/categories').then(res => setCategories(res.data)).catch(()=>setCategories([]));
  }, []);

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title || '',
        author: book.author || '',
        price: book.price || '',
        stock: book.stock || '',
        book_category_id: book.book_category_id || ''
      });
    } else {
      setForm({ title:'', author:'', price:'', stock:'', book_category_id:'' });
    }
    setErrors(null);
  }, [book]);

  const handleChange = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrors(null);

    // Basic client-side validation
    if (!form.title || !form.author) {
      setErrors({ general: 'Title and author are required' });
      setSaving(false);
      return;
    }

    try {
      if (book && book.id) {
        await api.put(`/books/${book.id}`, form);
      } else {
        await api.post('/books', form);
      }
      onDone();
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ general: err.response?.data?.message || 'Save failed' });
      }
    } finally { setSaving(false); }
  };

  return (
    <form onSubmit={onSubmit}>
      {errors?.general && <div style={{color:'red'}}>{errors.general}</div>}

      <div>
        <label>Title *</label>
        <input value={form.title} onChange={e => handleChange('title', e.target.value)} />
        {errors?.title && <div style={{color:'red'}}>{errors.title[0]}</div>}
      </div>

      <div>
        <label>Author *</label>
        <input value={form.author} onChange={e => handleChange('author', e.target.value)} />
        {errors?.author && <div style={{color:'red'}}>{errors.author[0]}</div>}
      </div>

      <div>
        <label>Price *</label>
        <input type="number" step="0.01" value={form.price} onChange={e => handleChange('price', e.target.value)} />
        {errors?.price && <div style={{color:'red'}}>{errors.price[0]}</div>}
      </div>

      <div>
        <label>Stock *</label>
        <input type="number" value={form.stock} onChange={e => handleChange('stock', e.target.value)} />
        {errors?.stock && <div style={{color:'red'}}>{errors.stock[0]}</div>}
      </div>

      <div>
        <label>Category *</label>
        <select value={form.book_category_id} onChange={e => handleChange('book_category_id', e.target.value)}>
          <option value="">Select</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div style={{marginTop:10}}>
        <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>{' '}
        <button type="button" onClick={onDone}>Cancel</button>
      </div>
    </form>
  );
}
