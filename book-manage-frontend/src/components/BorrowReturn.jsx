import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function BorrowReturn() {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ user_id: '', book_id: '' });
  const [loading, setLoading] = useState(false);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [uRes, bRes, rRes] = await Promise.all([
        api.get('/users').catch(() => ({ data: [] })),
        api.get('/books'),
        api.get('/borrow-records'),
      ]);
      setUsers(uRes.data || []);
      setBooks(bRes.data || []);
      setRecords(rRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  const borrow = async (e) => {
    e.preventDefault();
    if (!form.user_id || !form.book_id) { alert('Select user and book'); return; }
    try {
      await api.post('/borrow', form);
      setForm({ user_id: '', book_id: '' });
      await loadAll();
    } catch (err) {
      alert(err.response?.data?.message || 'Borrow failed');
    }
  };

  const doReturn = async (recordId) => {
    if (!confirm('Mark this book as returned?')) return;
    try {
      await api.post('/return', { borrow_record_id: recordId });
      await loadAll();
    } catch (err) {
      alert(err.response?.data?.message || 'Return failed');
    }
  };

  return (
    <div>
      <h3>Borrow a Book</h3>
      <form onSubmit={borrow}>
        <div>
          <label>User</label>
          <select value={form.user_id} onChange={e => setForm({...form, user_id: e.target.value})}>
            <option value="">Select user</option>
            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>

        <div>
          <label>Book</label>
          <select value={form.book_id} onChange={e => setForm({...form, book_id: e.target.value})}>
            <option value="">Select book</option>
            {books.map(b => <option key={b.id} value={b.id}>{b.title} (Stock: {b.stock})</option>)}
          </select>
        </div>

        <div style={{marginTop:10}}>
          <button type="submit">Borrow</button>{' '}
          <button type="button" onClick={loadAll}>Refresh</button>
        </div>
      </form>

      <h3 style={{marginTop:18}}>Borrow Records</h3>
      {loading ? <div>Loading...</div> : (
        <table>
          <thead>
            <tr>
              <th>User</th><th>Book</th><th>Borrowed At</th><th>Returned At</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 && <tr><td colSpan="6">No records</td></tr>}
            {records.map(r => (
              <tr key={r.id}>
                <td>{r.user?.name ?? r.user_id}</td>
                <td>{r.book?.title ?? r.book_id}</td>
                <td>{r.borrowed_at ? new Date(r.borrowed_at).toLocaleString() : '-'}</td>
                <td>{r.returned_at ? new Date(r.returned_at).toLocaleString() : '-'}</td>
                <td>{r.status}</td>
                <td>{r.status === 'borrowed' ? <button onClick={() => doReturn(r.id)}>Return</button> : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
