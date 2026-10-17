import { createContext, useContext, useReducer, useEffect } from 'react'
import API_URL from '../config.js'

const AuthContext = createContext()

const tokenGuardado = localStorage.getItem('token')
const usuarioGuardado = localStorage.getItem('usuario')

const estadoInicial = {
  isAuthenticated: tokenGuardado && usuarioGuardado ? true : false,
  usuario: usuarioGuardado ? JSON.parse(usuarioGuardado) : null,
  token: tokenGuardado ? tokenGuardado : null,
  sesionExpirada: false,
  error: ''
}

function authReducer(estado, accion) {
  switch (accion.type) {
    case 'LOGIN':
      return {
        ...estado,
        isAuthenticated: true,
        usuario: accion.datos,
        token: accion.token,
        sesionExpirada: false,
        error: ''
      }
    case 'LOGOUT':
      return {
        ...estado,
        isAuthenticated: false,
        usuario: null,
        token: null,
        sesionExpirada: false,
        error: ''
      }
    case 'SESION_EXPIRADA':
      return {
        ...estado,
        sesionExpirada: true
      }
    case 'SET_ERROR':
      return {
        ...estado,
        error: accion.mensaje
      }
    case 'UPDATE_PROFILE':
      return {
        ...estado,
        usuario: { ...estado.usuario, ...accion.datos }
      }
    default:
      return estado
  }
}

function AuthProvider({ children }) {
  const [estado, dispatch] = useReducer(authReducer, estadoInicial)

  useEffect(function () {
    if (estado.token) {
      localStorage.setItem('token', estado.token)
      localStorage.setItem('usuario', JSON.stringify(estado.usuario))
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
    }
  }, [estado.token])

  // Función central: todas las peticiones protegidas pasan por aquí
  async function peticion(ruta, opciones) {
    const configuracion = opciones || {}
    const cabeceras = { 'Content-Type': 'application/json' }

    if (estado.token) {
      cabeceras.Authorization = `Bearer ${estado.token}`
    }

    const respuesta = await fetch(`${API_URL}${ruta}`, {
      ...configuracion,
      headers: cabeceras
    })

    // Manejo global: token vencido o inválido
    if (respuesta.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      dispatch({ type: 'LOGOUT' })
      dispatch({ type: 'SESION_EXPIRADA' })
    }

    return respuesta
  }

  return (
    <AuthContext.Provider value={{ estado, dispatch, peticion }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }