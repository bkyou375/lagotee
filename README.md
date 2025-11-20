# Lagotee

Este repositorio contiene el código fuente de **Llagotel**, una aplicación web para gestión y reservas de un hotel. La arquitectura se ha dividido en dos partes principales: un frontend desarrollado con React y Vite, y un backend construido con Fastify y Prisma ORM.

## Estructura del proyecto

lagotee/
├── frontend/        # Aplicación React que sirve la web pública y el panel de administración
├── backend/         # Servidor Fastify, API REST y esquema de base de datos (Prisma)
├── infra/           # Configuración de infraestructura (Dockerfiles, etc.)
├── docs/            # Documentación y diagramas de la arquitectura
└── README.md        # Este archivo

### Frontend
La aplicación del cliente está en `frontend/` y se compila con [Vite](https://vitejs.dev/). Incluye un pequeño router para navegar entre la portada, el listado de habitaciones, el detalle de cada habitación y el flujo de reserva. El objetivo es proporcionar una base sólida sobre la que extender el diseño y la funcionalidad.

### Backend
El servidor se encuentra en `backend/` y está construido sobre [Fastify](https://www.fastify.io/). La base de datos se modela con [Prisma](https://www.prisma.io/), lo que facilita la gestión de modelos y migraciones. Se incluyen algunos endpoints públicos de ejemplo para comenzar (búsqueda de disponibilidad, creación de reservas) y rutas privadas protegidas por JWT para la administración.

### Infra
En `infra/` hay ficheros de infraestructura (por ejemplo, un `Dockerfile`) que permiten construir imágenes del backend para desplegar en un proveedor como Railway, Render o Fly.io.

### Docs
La carpeta `docs/` incluye documentación adicional, como diagramas de arquitectura y descripciones de flujos de usuario. Consulta `docs/architecture.md` para una explicación más detallada.
