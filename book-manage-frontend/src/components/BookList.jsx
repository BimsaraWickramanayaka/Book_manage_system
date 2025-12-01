import React, { useEffect, useState } from 'react';
import api from '../api/api';
import CategoryFilter from './CategoryFilter';

export default function BookList({ onEdit }) {
  const [books, setBooks] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const params = categoryId ? { category_id: categoryId } : {};
      const res = await api.get('/books', { params });
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [categoryId]);

  const remove = async (id) => {
    if (!confirm('Delete this book?')) return;
    try {
      await api.delete(`/books/${id}`);
      await load();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:12}}>
        <CategoryFilter value={categoryId} onChange={setCategoryId} />
        <div>
          <button onClick={load}>Refresh</button>
        </div>
      </div>

      {loading ? <div>Loading...</div> : (
        <table>
          <thead>
            <tr>
              <th>Title</th><th>Author</th><th>Price</th><th>Stock</th><th>Category</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 && (<tr><td colSpan="6" style={{padding:12}}>No books found</td></tr>)}
            {books.map(b => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>{b.price}</td>
                <td>
                  {b.stock}
                  {b.stock <= 0 && <span className="out-of-stock"> (Out of stock)</span>}
                </td>
                <td>{b.category}</td>
                <td>
                  <button onClick={() => onEdit(b)}>Edit</button>{' '}
                  <button onClick={() => remove(b.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
