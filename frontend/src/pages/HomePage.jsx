import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Por simplicidad navegamos directamente al listado de habitaciones
    navigate('/habitaciones');
  };

  return (
    <div>
      <h1>Bienvenido a Llagotel</h1>
      <p>Tu alojamiento c\u00f3modo y acogedor cerca de Barcelona.</p>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <input type="date" name="checkIn" required />
        <input type="date" name="checkOut" required />
        <input type="number" name="guests" min="1" defaultValue="1" />
        <button type="submit">Buscar disponibilidad</button>
      </form>
    </div>
  );
}

export default HomePage;
