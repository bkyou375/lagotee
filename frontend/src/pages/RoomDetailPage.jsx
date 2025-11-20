import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RoomDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBook = () => {
    navigate('/reservar');
  };

  return (
    <div>
      <h2>Detalle de la habitación {id}</h2>
      <p>Información detallada de la habitación y sus servicios.</p>
      <button onClick={handleBook}>Reservar esta habitación</button>
    </div>
  );
}

export default RoomDetailPage;
