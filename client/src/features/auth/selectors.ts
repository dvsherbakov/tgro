import { AuthState } from './types'

export const getEmail = (state: AuthState) => state.email
export const getPasswd = (state: AuthState) => state.passwd
export const isAuthenticate = (state: AuthState) => state.isAuth
