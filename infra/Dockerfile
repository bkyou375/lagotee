FROM node:18-alpine as base

WORKDIR /app

# Instala dependencias del backend
COPY backend/package.json backend/package-lock.json* ./backend/
WORKDIR /app/backend
RUN npm install --production

# Copia el código del backend
COPY backend/ ./

# Expone el puerto en el que escucha Fastify
EXPOSE 3000

# Comando por defecto
CMD ["node", "dist/server.js"]
