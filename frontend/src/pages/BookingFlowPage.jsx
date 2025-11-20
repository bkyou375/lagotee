import React, { useState } from 'react';

function BookingFlowPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    roomTypeId: '',
    checkIn: '',
    checkOut: '',
    guestName: '',
    guestEmail: '',
    guestPhone: ''
  });
  const [bookingResult, setBookingResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/public/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setBookingResult(data);
      setStep(3);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Proceso de reserva</h2>
      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
          <div>
            <label>Tipo de habitación:</label>
            <input name="roomTypeId" value={formData.roomTypeId} onChange={handleChange} required />
          </div>
          <div>
            <label>Fecha entrada:</label>
            <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required />
          </div>
          <div>
            <label>Fecha salida:</label>
            <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} required />
          </div>
          <button type="submit">Continuar</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre:</label>
            <input name="guestName" value={formData.guestName} onChange={handleChange} required />
          </div>
          <div>
            <label>Email:</label>
            <input name="guestEmail" type="email" value={formData.guestEmail} onChange={handleChange} required />
          </div>
          <div>
            <label>Teléfono:</label>
            <input name="guestPhone" value={formData.guestPhone} onChange={handleChange} required />
          </div>
          <button type="submit">Confirmar reserva</button>
        </form>
      )}
      {step === 3 && bookingResult && (
        <div>
          <h3>Reserva creada</h3>
          <p>ID de reserva: {bookingResult.bookingId}</p>
          <p>Estado: {bookingResult.status}</p>
        </div>
      )}
    </div>
  );
}

export default BookingFlowPage;
