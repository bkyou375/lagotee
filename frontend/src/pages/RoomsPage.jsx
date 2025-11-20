import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await fetch('/api/public/search-availability', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ checkIn: new Date(), checkOut: new Date(), guests: 1 })
        });
        const data = await res.json();
        setRooms(data.availableRooms || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  if (loading) return <p>Cargando habitaciones...</p>;

  return (
    <div>
      <h2>Habitaciones disponibles</h2>
      {rooms.length === 0 && <p>No hay habitaciones disponibles.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {rooms.map((room) => (
          <li key={room.roomTypeId} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
            <h3>{room.name}</h3>
            <p>{room.description}</p>
            <p>Precio desde {room.price} €/noche</p>
            <Link to={`/habitaciones/${room.roomTypeId}`}>Ver detalles</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomsPage;
