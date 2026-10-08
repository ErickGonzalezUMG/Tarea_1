# TecnoStore - Tarea 4 (React + Node + Express + Mongoose + MongoDB Atlas)

Evolución de la Tarea 3 de TecnoStore. El frontend en React ahora consume un backend propio (Node + Express + Mongoose) conectado a MongoDB Atlas. Los productos y los usuarios ya no son datos estáticos: se guardan y se consultan desde la base de datos.

## Estudiante

| Nombre completo | Carné | Módulos desarrollados |
|---|---|---|
| Erick Enrique González Canel | 9490-20-2571 | Todos: backend (config, modelos, controladores, rutas), conexión a MongoDB Atlas, autenticación con bcrypt, CRUD de productos, y frontend (Login, Registro, Productos, Detalle, Administrar, Perfil) |

## Enlaces

- Frontend publicado: (pendiente: agregar URL de Netlify/Vercel)
- Backend publicado: (pendiente: agregar URL de Render/Railway)
- Repositorio: https://github.com/ErickGonzalezUMG/Tarea_1
- Rama: Tarea4

## Tecnologías

- Frontend: React (Vite), React Router DOM, React-Bootstrap / Bootstrap, Bootstrap Icons, Context API + useReducer
- Backend: Node.js, Express, Mongoose, bcryptjs, cors, dotenv
- Base de datos: MongoDB Atlas (cluster gratuito)

## Arquitectura del backend

```text
backend/
├── config/
│   └── db.js                   # Conexión a MongoDB Atlas con Mongoose
├── models/
│   ├── User.js                 # nombre, correo, password, rol (admin/cliente), timestamps
│   └── Producto.js             # codigo, nombre, categoria, precio, existencia, icono, specs, caja
├── controllers/
│   ├── authController.js       # register, login, perfil
│   └── productoController.js   # CRUD de productos
├── routes/
│   ├── authRoutes.js           # /api/auth
│   └── productoRoutes.js       # /api/recursos
├── index.js                    # Servidor Express: middlewares, rutas y arranque
├── .env                        # Variables secretas (NO se sube al repositorio)
└── .gitignore                  # Ignora .env y node_modules
```

## Endpoints

### Autenticación (`/api/auth`)

| Método | Ruta | Descripción | Body (JSON) |
|---|---|---|---|
| POST | /api/auth/register | Registra un usuario (contraseña encriptada con bcrypt) | `{ "nombre": "...", "correo": "...", "password": "..." }` |
| POST | /api/auth/login | Inicia sesión; devuelve los datos del usuario sin la contraseña | `{ "correo": "...", "password": "..." }` |
| GET | /api/auth/perfil/:id | Devuelve los datos del usuario desde la base de datos | - |

### Productos (`/api/recursos`)

| Método | Ruta | Descripción |
|---|---|---|
| GET | /api/recursos | Lista productos. Filtros opcionales: `?categoria=...` y `?buscar=...` |
| GET | /api/recursos/:id | Obtiene un producto por su id |
| POST | /api/recursos | Crea un producto |
| PUT | /api/recursos/:id | Actualiza un producto |
| DELETE | /api/recursos/:id | Elimina un producto |

Códigos de respuesta usados: 200, 201, 400 (datos inválidos, id inválido o código duplicado), 401 (credenciales inválidas), 404 (no encontrado) y 500 (error del servidor).

## Páginas / Rutas del frontend

| Ruta | Contenido |
|---|---|
| / | Inicio: bienvenida y productos destacados desde la API |
| /productos | Búsqueda/filtro y tabla de productos desde la API |
| /productos/:id | Detalle del producto desde la API |
| /carrito | Tabla del carrito y formulario de datos de envío |
| /registro | Registro de usuario (guarda en MongoDB) |
| /login | Inicio de sesión contra la API; muestra errores 401 con Alert |
| /contacto | Formulario de contacto y tabla de sucursales (público) |
| /perfil | Perfil del usuario autenticado, consultado desde la base de datos |
| /admin | Crear, editar y eliminar productos (requiere sesión) |

## Variables de entorno

Archivo `backend/.env` (no se sube al repositorio). Solo se indican los nombres:

```text
PORT=
MONGO_URI=
```

En el frontend, la URL del backend se configura con `VITE_API_URL` (por defecto `http://localhost:3001`).

## Correr el proyecto localmente

Backend (en una terminal):

```bash
cd backend
npm install
node --watch index.js
```

Frontend (en otra terminal, en la raíz del proyecto):

```bash
npm install
npm run dev
```

## Pruebas de la API

Las pruebas de los endpoints se hicieron con Postman. La colección exportada se incluye en el repositorio (pendiente: agregar el archivo `.json`).

## Credenciales de prueba

Crear un usuario desde la página `/registro` e iniciar sesión con ese correo y contraseña.