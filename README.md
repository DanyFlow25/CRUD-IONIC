# Backend - Ionic + MongoDB CRUD

Este backend es una API REST simple usando Node.js, Express y MongoDB (Mongoose).

Pasos para ejecutar (PowerShell en Windows):

1. Abrir terminal en `c:\Users\Danie\Documents\IONIC\backend`
2. Instalar dependencias:

```powershell
npm install
```

3. Crear un archivo `.env` basado en `.env.example` y configurar `MONGODB_URI` si necesario.

4. Ejecutar en modo desarrollo (recomendado):

```powershell
npm run dev
```

La API quedará disponible por defecto en `http://localhost:3000` y los endpoints CRUD en `/api/items`.

Ejemplos de endpoints:
- GET /api/items
- POST /api/items { name, description }
- PUT /api/items/:id
- DELETE /api/items/:id
