import { prisma } from '../prisma.js';

/**
 * Rutas privadas para los administradores. Se requiere autenticación JWT.
 */
export async function adminRoutes(app, options) {
  // Autenticación de usuario administrador
  app.get('/me', { preValidation: [app.authenticate] }, async (request, reply) => {
    // Devuelve información del usuario autenticado
    return { user: request.user };
  });

  // Listado de reservas
  app.get('/bookings', { preValidation: [app.authenticate] }, async (request, reply) => {
    const bookings = await prisma.booking.findMany();
    return { bookings };
  });

  // Listado de habitaciones
  app.get('/rooms', { preValidation: [app.authenticate] }, async (request, reply) => {
    const rooms = await prisma.room.findMany({ include: { roomType: true } });
    return { rooms };
  });

  // Crear o modificar una habitación (ejemplo básico)
  app.post('/rooms', { preValidation: [app.authenticate] }, async (request, reply) => {
    const { roomNumber, roomTypeId, isActive } = request.body;
    const room = await prisma.room.create({
      data: {
        roomNumber,
        roomTypeId,
        isActive: isActive ?? true
      }
    });
    return { room };
  });
}
