import { prisma } from '../prisma.js';

/**
 * Rutas públicas del API. Estas rutas están disponibles sin autenticación
 * y permiten a los clientes buscar disponibilidad, crear reservas y procesar pagos.
 */
export async function publicRoutes(app, options) {
  // Búsqueda de disponibilidad
  app.post('/search-availability', async (request, reply) => {
    const { checkIn, checkOut, guests } = request.body;
    // Aquí se implementaría la lógica real para consultar habitaciones
    // disponibles y calcular precios. Devolvemos datos dummy por ahora.
    const roomTypes = await prisma.roomType.findMany();
    const results = roomTypes.map((rt) => ({
      roomTypeId: rt.id,
      name: rt.name,
      description: rt.description,
      price: rt.basePricePerNight, // simplificado
      available: true
    }));
    return { availableRooms: results };
  });

  // Creación de reserva preliminar
  app.post('/book', async (request, reply) => {
    const { roomTypeId, checkIn, checkOut, guestName, guestEmail, guestPhone } = request.body;
    // En una implementación real, comprobaríamos disponibilidad, crearíamos la reserva y calcularíamos el total.
    const booking = await prisma.booking.create({
      data: {
        roomTypeId,
        checkInDate: new Date(checkIn),
        checkOutDate: new Date(checkOut),
        guestName,
        guestEmail,
        guestPhone,
        status: 'PENDING',
        totalPrice: 0
      }
    });
    return { bookingId: booking.id, status: booking.status };
  });

  // Webhook de pagos
  app.post('/payments/webhook', async (request, reply) => {
    // En una implementación real se verificaría la firma de Stripe
    // y se actualizaría el estado de la reserva.
    reply.code(200).send({ received: true });
  });
}
