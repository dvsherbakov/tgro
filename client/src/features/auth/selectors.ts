import { AuthState } from './types'

export const getEmail = (state: AuthState) => state.auth.email
export const getPasswd = (state: AuthState) => state.auth.passwd
export const getFirstName = (state: AuthState) => state.auth.firstName
export const getLastName = (state: AuthState) => state.auth.lastName
export const isAuthenticate = (state: AuthState) => state.auth.isAuth
export const isRegisterSuccess = (state: AuthState) =>
  state.auth.isRegisterSuccess
export const getCreditance = (state: AuthState) => ({
  email: state.auth.email,
  password: state.auth.passwd,
})
export const getComplexAuthData = (state: AuthState) => ({
  email: state.auth.email,
  password: state.auth.passwd,
  firstName: state.auth.firstName,
  lastName: state.auth.lastName,
})
