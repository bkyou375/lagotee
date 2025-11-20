# Arquitectura de Lagotee

Este documento describe la arquitectura base de la aplicación **Lagotee**, el sistema de reservas y gestión de habitaciones para el hotel Llagotel. Está diseñado para ser escalable y fácil de mantener, permitiendo añadir nuevas funcionalidades según evolucionen las necesidades del negocio.

## Visión general

La aplicación se divide en dos grandes componentes:

1. **Frontend**: una SPA construida con React que ofrece la página pública para los clientes (portada, listado y detalle de habitaciones, motor de reservas) y un panel de administración para gestionar las reservas y la disponibilidad.
2. **Backend**: un API REST desarrollado con Fastify sobre Node.js. Se encarga de la lógica de negocio, la autenticación, la conexión con la base de datos (PostgreSQL mediante Prisma ORM) y la integración con servicios externos como Stripe para pagos.

Los componentes se despliegan de forma independiente: el frontend como sitio estático (por ejemplo, en Vercel) y el backend en un contenedor (Railway, Render, Fly.io…). La base de datos se aloja en un servicio gestionado.

## Diagrama de componentes

```
┌───────────────────────────────────┌       HTTPS        ┌──────────────────────────────────┐
│    Navegador     │ ───────────────────────────────────┐ │   Frontend (SPA)  │
└───────────────────────────────────┘                    └──────────────────────────────────┘
           ▲                                   │
           │                                   ▼
           │                        REST        ┌─────────────────────────────────┐
           │                  ───────────────────────────────────┐ │   API Fastify     │
           │                                   └─────────────────────────────────┘
           │                                            │
           │                                            ▼
           │                                   ┌─────────────────────────────────┐
           │                                   │ PostgreSQL (DB)   │
           │                                   └─────────────────────────────────┘
           │                                            │
           │                                   (Servicios externos)
           │                                            ▼
           │                              Stripe (pagos), Email, etc.
```

### Frontend

El frontend se desarrolla con React y Vite. La estructura se divide en módulos para las páginas públicas (`Home`, `Habitaciones`, `DetalleHabitación`, `Reserva`) y el panel de administración (`Dashboard`, `Reservas`, `Habitaciones`, `Calendario`). Se utiliza `react-router-dom` para gestionar la navegación. La comunicación con el backend se realiza mediante fetch/axios hacia la API REST.

### Backend

El backend está construido con Fastify. Utiliza `@fastify/jwt` para la autenticación mediante JSON Web Tokens y `@prisma/client` como ORM. La lógica principal se separa en módulos (auth, rooms, bookings, payments), siguiendo principios de responsabilidad única. Un fichero `app.ts` configura el servidor y registra las rutas, mientras que `server.ts` arranca la instancia.

El esquema de la base de datos se encuentra en `prisma/schema.prisma` e incluye tablas básicas para habitaciones (`Room` y `RoomType`), reservas (`Booking`), fechas bloqueadas (`BlockedDate`), usuarios (`User`) y pagos (`Payment`). Este esquema inicial se puede ampliar según los requisitos.

### Infraestructura

La carpeta `infra` contiene recursos para desplegar el backend. Incluye un `Dockerfile` simple que instala las dependencias, copia el código y expone el puerto 3000. También se podrían añadir archivos de configuración para un proxy inverso (por ejemplo, Caddy o Nginx) y scripts de despliegue.

### Flujos principales

#### Búsqueda de disponibilidad

1. El cliente selecciona fechas y número de huéspedes en la portada.
2. El frontend envía una solicitud `POST /api/public/search-availability` con las fechas.
3. El backend calcula qué tipos de habitación están libres y devuelve una lista con precios.
4. El cliente selecciona una opción y pasa al siguiente paso de reserva.

#### Proceso de reserva

1. Se crea una reserva preliminar (`Booking` con estado `PENDING`) mediante `POST /api/public/book`, guardando los datos del huésped.
2. El backend genera un `PaymentIntent` en Stripe y devuelve el `clientSecret` al frontend.
3. El cliente introduce los datos de la tarjeta; Stripe procesa el pago.
4. Stripe notifica mediante webhook (`/api/public/payments/webhook`). Si el pago es exitoso, la reserva se marca como `PAID` y se confirma la habitación.

#### Panel de administración

Los usuarios autorizados (Owner/Staff) acceden mediante credenciales. Una vez autenticados pueden:

- Ver el calendario de ocupación y bloquear habitaciones manualmente.
- Consultar y editar reservas.
- Añadir o modificar habitaciones y tipos de habitación.
- Ajustar precios y temporadas.
