import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import BorrowReturn from './components/BorrowReturn';
import LoginPage from './components/LoginPage';

export default function App() {
  const [view, setView] = useState('list'); // 'list' | 'form' | 'borrow'
  const [editingBook, setEditingBook] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  // Listen for logout events (from axios interceptor)
  useEffect(() => {
    const handleLogout = () => {
      setIsAuthenticated(false);
      setUser(null);
    };

    window.addEventListener('logout', handleLogout);
    return () => window.removeEventListener('logout', handleLogout);
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    setView('list');
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  const openCreate = () => { setEditingBook(null); setView('form'); };
  const openEdit = (book) => { setEditingBook(book); setView('form'); };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Show main app if authenticated
  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <h1>Book Management</h1>
        </div>
        <nav>
          <button onClick={() => setView('list')}>List</button>
          <button onClick={openCreate}>Create Book</button>
          <button onClick={() => setView('borrow')}>Borrow / Return</button>
        </nav>
        <div className="header-right">
          <span className="user-info">👤 {user?.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="container">
        {view === 'list' && <BookList onEdit={openEdit} />}
        {view === 'form' && <BookForm book={editingBook} onDone={() => setView('list')} />}
        {view === 'borrow' && <BorrowReturn />}
      </main>
    </div>
  );
}
