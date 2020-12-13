import { LOGIN_AUTH, LOGOUT_AUTH } from './actionTypes'

export interface LoginAction {
  type: typeof LOGIN_AUTH
  email: string
  isAuth: boolean
}

export interface LogoutAction {
  type: typeof LOGOUT_AUTH
}

export type AuthActionTypes = LoginAction | LogoutAction

export interface AuthState {
  email: string
  passwd: string
  isAuth: boolean
}
