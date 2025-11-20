import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import RoomsPage from './pages/RoomsPage.jsx';
import RoomDetailPage from './pages/RoomDetailPage.jsx';
import BookingFlowPage from './pages/BookingFlowPage.jsx';

function App() {
  return (
    <>
      <header style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/">Inicio</Link>
          <Link to="/habitaciones">Habitaciones</Link>
          <Link to="/reservar">Reservar</Link>
        </nav>
      </header>
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/habitaciones" element={<RoomsPage />} />
          <Route path="/habitaciones/:id" element={<RoomDetailPage />} />
          <Route path="/reservar" element={<BookingFlowPage />} />
        </Routes>
      </main>
      <footer style={{ padding: '1rem', borderTop: '1px solid #eee', marginTop: '2rem' }}>
        <p>&copy; {new Date().getFullYear()} Llagotel</p>
      </footer>
    </>
  );
}

export default App;
