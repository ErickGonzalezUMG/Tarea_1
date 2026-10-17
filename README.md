# TecnoStore - Tarea 5 (Seguridad con JWT)

Evolución de la Tarea 4 de TecnoStore (React + Node + Express + Mongoose + MongoDB Atlas). En esta tarea se agrega autenticación con JSON Web Tokens (JWT): el servidor firma un token al iniciar sesión, las rutas de administración están protegidas con un middleware y el frontend envía el token en cada petición protegida y maneja la sesión expirada.

## Estudiante

| Nombre completo | Carné | Responsabilidades |
|---|---|---|
| Erick Enrique González Canel | 9490-20-2571 | Todo el proyecto: backend (login con firma de JWT, middleware de validación, protección de rutas), frontend (almacenamiento del token, función central de peticiones, manejo global de sesión expirada y redirección a /login), pruebas en Postman, despliegue y documentación |

## Enlaces

- Frontend publicado: https://9490-20-2571-tarea5.netlify.app/
- Backend publicado: https://tecnostore-api-9mxh.onrender.com
- Repositorio: https://github.com/ErickGonzalezUMG/Tarea_1
- Rama: Tarea5

## Tecnologías

- Frontend: React (Vite), React Router DOM, React-Bootstrap / Bootstrap, Bootstrap Icons, Context API + useReducer
- Backend: Node.js, Express, Mongoose, bcryptjs, jsonwebtoken, cors, dotenv
- Base de datos: MongoDB Atlas (cluster gratuito)

## Explicación técnica de la seguridad con JWT

### Backend

**Configuración del token.** El secreto y la expiración se leen de variables de entorno en `backend/.env`, que no se sube al repositorio:

- `JWT_SECRET`: clave con la que se firma y se verifica el token.
- `JWT_EXPIRES_IN=5m`: el token vence exactamente a los 5 minutos.

**Login (`POST /api/auth/login`).** Si el correo y la contraseña son correctos, el servidor firma un token con `jwt.sign`. El payload lleva `id`, `correo` y `rol`, nunca la contraseña. El token se devuelve junto con los datos públicos del usuario.

**Middleware reutilizable (`backend/middlewares/auth.js`).** Lee la cabecera `Authorization: Bearer <token>` y verifica el token con `jwt.verify` y el secreto. Respuestas:

- Sin cabecera o sin token: 401 con `{ "error": "No se proporcionó un token" }`.
- Token vencido (`TokenExpiredError`): 401 con `{ "error": "token_expired", "message": "La sesión ha expirado o ya no es válida. Por favor, inicie sesión nuevamente." }`.
- Token alterado o inválido: 401 con `{ "error": "Token inválido" }`.
- Token válido: guarda los datos del token en `request.usuario` y continúa con `next()`.

**Rutas protegidas.** `POST`, `PUT` y `DELETE` de `/api/recursos` y `GET /api/auth/perfil/:id` usan el middleware. Las consultas públicas de productos (`GET /api/recursos` y `GET /api/recursos/:id`), `register` y `login` no lo requieren.

### Frontend

**Almacenamiento del token.** `AuthContext` guarda el token y el usuario en el estado (Context + useReducer) y los sincroniza con `localStorage`, para que la sesión sobreviva a recargar la página.

**Cliente HTTP centralizado.** La función `peticion(ruta, opciones)` del contexto agrega la cabecera `Authorization: Bearer <token>` a todas las peticiones protegidas. `Perfil` y `AdminProductos` la usan.

**Interceptación global de 401.** Cuando `peticion` recibe una respuesta 401 (token vencido o inválido):

1. Elimina `token` y `usuario` de `localStorage`.
2. Ejecuta `dispatch({ type: 'LOGOUT' })` y luego `dispatch({ type: 'SESION_EXPIRADA' })`.
3. El componente `VigilanteSesion`, ubicado dentro del `BrowserRouter`, detecta la bandera `sesionExpirada` y redirige con `useNavigate` a `/login`.
4. La página de login muestra un Alert: "Su sesión ya no es válida o ha caducado. Por favor, inicie sesión nuevamente."

## Arquitectura del backend

```text
backend/
├── config/
│   └── db.js                   # Conexión a MongoDB Atlas con Mongoose
├── models/
│   ├── User.js                 # nombre, correo, password, rol (admin/cliente), timestamps
│   └── Producto.js             # codigo, nombre, categoria, precio, existencia, icono, specs, caja
├── controllers/
│   ├── authController.js       # register, login (firma el JWT), perfil
│   └── productoController.js   # CRUD de productos
├── middlewares/
│   └── auth.js                 # Valida el token Bearer (validarToken)
├── routes/
│   ├── authRoutes.js           # /api/auth
│   └── productoRoutes.js       # /api/recursos
├── index.js                    # Servidor Express: middlewares, rutas y arranque
├── .env                        # Variables secretas (NO se sube al repositorio)
└── .gitignore                  # Ignora .env y node_modules
```

## Endpoints

### Autenticación (`/api/auth`)

| Método | Ruta | Protegida | Descripción | Body (JSON) |
|---|---|---|---|---|
| POST | /api/auth/register | No | Registra un usuario (contraseña encriptada con bcrypt) | `{ "nombre": "...", "correo": "...", "password": "..." }` |
| POST | /api/auth/login | No | Inicia sesión; devuelve los datos del usuario y el token JWT (vence en 5 minutos) | `{ "correo": "...", "password": "..." }` |
| GET | /api/auth/perfil/:id | Sí | Devuelve los datos del usuario desde la base de datos | - |

### Productos (`/api/recursos`)

| Método | Ruta | Protegida | Descripción |
|---|---|---|---|
| GET | /api/recursos | No | Lista productos. Filtros opcionales: `?categoria=...` y `?buscar=...` |
| GET | /api/recursos/:id | No | Obtiene un producto por su id |
| POST | /api/recursos | Sí | Crea un producto |
| PUT | /api/recursos/:id | Sí | Actualiza un producto |
| DELETE | /api/recursos/:id | Sí | Elimina un producto |

Las rutas protegidas requieren la cabecera `Authorization: Bearer <token>`.

Códigos de respuesta usados: 200, 201, 400 (datos inválidos, id inválido o código duplicado), 401 (credenciales inválidas, token ausente, inválido o expirado), 404 (no encontrado) y 500 (error del servidor).

## Páginas / Rutas del frontend

| Ruta | Contenido |
|---|---|
| / | Inicio: bienvenida y productos destacados desde la API |
| /productos | Búsqueda/filtro y tabla de productos desde la API |
| /productos/:id | Detalle del producto desde la API |
| /carrito | Tabla del carrito y formulario de datos de envío |
| /registro | Registro de usuario (guarda en MongoDB) |
| /login | Inicio de sesión contra la API; muestra errores 401 y el aviso de sesión expirada |
| /contacto | Formulario de contacto y tabla de sucursales (público) |
| /perfil | Perfil del usuario autenticado (petición protegida con token) |
| /admin | Crear, editar y eliminar productos (peticiones protegidas con token) |

## Variables de entorno

Archivo `backend/.env` (no se sube al repositorio). Solo se indican los nombres:

```text
PORT=
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=
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

Las pruebas se hicieron con Postman. La colección exportada está en `postman/` e incluye: login (obtención del token), una petición protegida exitosa con un token válido y una petición fallida con 401 después de que pasan los 5 minutos.

## Credenciales de prueba

Crear un usuario desde la página `/registro` e iniciar sesión con ese correo y contraseña.