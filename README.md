# TecnoStore - Gestión de Estado Global (React + Context API)

Evolución de la Tarea 2 de TecnoStore. Se implementa manejo de estado global con Context API y useReducer para el flujo de autenticación (Login, Logout, Perfil), renderizado condicional en el Navbar y un dashboard de usuario.

## Justificación de la arquitectura

Se eligió **Context API + useReducer** porque:

- useReducer centraliza la lógica de estado en un solo reducer con acciones definidas (LOGIN, LOGOUT, SET_ERROR, UPDATE_PROFILE), lo que facilita el mantenimiento y la trazabilidad de cambios.
- Context API permite compartir el estado de autenticación entre componentes (Navbar, Login, Perfil) sin necesidad de pasar props manualmente en cada nivel.
- El custom hook `useAuth()` encapsula el acceso al contexto, simplificando su uso en cualquier componente.
- No se requiere instalar librerías externas como Redux, ya que Context + useReducer cubre las necesidades del proyecto.

## Estudiante

| Nombre completo | Carné | Módulos desarrollados |
|---|---|---|
| Erick Enrique González Canel | 9490-20-2571 | Todos (AuthContext, Login, Perfil, Navbar condicional) |

## Enlaces

- Sitio publicado: URL_PENDIENTE
- Repositorio: https://github.com/ErickGonzalezUMG/Tarea_1
- Rama: Tarea3

## Tecnologías

- React (Vite)
- React Router DOM
- React-Bootstrap / Bootstrap
- Bootstrap Icons
- Context API + useReducer

## Estructura de estado global

```text
src/
├── context/
│   └── AuthContext.jsx      # Provider, reducer y hook useAuth
├── pages/
│   ├── Login.jsx            # Formulario con autenticación simulada
│   └── Perfil.jsx           # Dashboard del usuario autenticado
└── components/
    └── NavbarPrincipal.jsx   # Renderizado condicional según sesión
```

## Acciones del reducer

| Acción | Descripción |
|---|---|
| LOGIN | Autentica al usuario y guarda sus datos |
| LOGOUT | Cierra sesión y limpia el estado |
| SET_ERROR | Muestra mensajes de error en el formulario |
| UPDATE_PROFILE | Actualiza datos del perfil del usuario |

## Páginas / Rutas

| Ruta | Contenido |
|---|---|
| / | Inicio: bienvenida, carousel de productos destacados, categorías |
| /productos | Búsqueda/filtro y tabla de productos |
| /productos/:id | Especificaciones, contenido de caja, formulario de compra |
| /carrito | Tabla del carrito y formulario de datos de envío |
| /registro | Formulario de registro de usuario |
| /login | Inicio de sesión con validación y autenticación simulada |
| /contacto | Formulario de contacto y tabla de sucursales |
| /perfil | Dashboard del usuario autenticado con opción de cerrar sesión |

## Credenciales de prueba

- Correo: admin@tecnostore.com
- Contraseña: 1234

## Correr el proyecto localmente

```bash
npm install
npm run dev
```