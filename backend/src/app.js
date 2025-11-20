import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import { publicRoutes } from './routes/public.js';
import { adminRoutes } from './routes/admin.js';

export function buildApp(options = {}) {
  const app = Fastify(options);

  // Register CORS
  app.register(fastifyCors, {
    origin: true,
    credentials: true
  });

  // Register JWT plugin
  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'supersecret'
  });

  // Decorator to verify JWT on protected routes
  app.decorate('authenticate', async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ message: 'No autorizado' });
    }
  });

  // Register routes
  app.register(publicRoutes, { prefix: '/api/public' });
  app.register(adminRoutes, { prefix: '/api/admin' });

  return app;
}
