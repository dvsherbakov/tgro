import { AuthState } from './types'

export const getEmail = (state: AuthState) => state.auth.email
export const getPasswd = (state: AuthState) => state.auth.passwd
export const isAuthenticate = (state: AuthState) => state.auth.isAuth
