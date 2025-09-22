## Requisitos
- Node.js 18+
- Docker Desktop (opcional si quieres levantar Mongo local con docker-compose)

## Variables de entorno
Copia `.env.example` a `.env` y ajusta `MONGO_URI_ATLAS` si usarás Atlas.


## Levantar con Docker (app + mongo local)
1. `docker-compose up --build`
2. La API queda en `http://localhost:3000`


## Levantar en local sin Docker
1. `npm install`
2. `npm run dev` (requiere nodemon) o `npm start`


## Endpoints principales
- `POST /api/auth/register` { name, email, password }
- `POST /api/auth/login` { email, password }
- `GET /api/auth/me` (Bearer token)
- `GET /api/computos` listar
- `POST /api/computos` crear (Bearer token)
- `GET /api/computos/:id` ver
- `PUT /api/computos/:id` actualizar (Bearer token)
- `DELETE /api/computos/:id` borrar (Bearer token)


``