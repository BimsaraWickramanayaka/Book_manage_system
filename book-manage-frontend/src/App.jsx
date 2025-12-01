import React, { useState } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import BorrowReturn from './components/BorrowReturn';

export default function App() {
  const [view, setView] = useState('list'); // 'list' | 'form' | 'borrow'
  const [editingBook, setEditingBook] = useState(null);

  const openCreate = () => { setEditingBook(null); setView('form'); };
  const openEdit = (book) => { setEditingBook(book); setView('form'); };

  return (
    <div className="app">
      <header className="header">
        <h1>Book Management</h1>
        <nav>
          <button onClick={() => setView('list')}>List</button>
          <button onClick={openCreate}>Create Book</button>
          <button onClick={() => setView('borrow')}>Borrow / Return</button>
        </nav>
      </header>

      <main className="container">
        {view === 'list' && <BookList onEdit={openEdit} />}
        {view === 'form' && <BookForm book={editingBook} onDone={() => setView('list')} />}
        {view === 'borrow' && <BorrowReturn />}
      </main>
    </div>
  );
}
