import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function CategoryFilter({ value, onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let mounted = true;
    api.get('/categories').then(res => {
      if (mounted) setCategories(res.data);
    }).catch(() => setCategories([]));
    return () => { mounted = false; };
  }, []);

  return (
    <select value={value || ''} onChange={(e) => onChange(e.target.value || null)}>
      <option value="">All categories</option>
      {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
    </select>
  );
}
