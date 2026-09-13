import { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext()

const estadoInicial = {
  isAuthenticated: false,
  usuario: null,
  error: ''
}

function authReducer(estado, accion) {
  switch (accion.type) {
    case 'LOGIN':
      return {
        ...estado,
        isAuthenticated: true,
        usuario: accion.datos,
        error: ''
      }
    case 'LOGOUT':
      return {
        ...estado,
        isAuthenticated: false,
        usuario: null,
        error: ''
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

  return (
    <AuthContext.Provider value={{ estado, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }