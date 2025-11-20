import { config } from 'dotenv';
import { buildApp } from './app.js';

// Carga variables de entorno desde .env si existe
config();

const app = buildApp({ logger: true });

const PORT = process.env.PORT || 3000;

app.listen({ port: PORT, host: '0.0.0.0' })
  .then(() => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
