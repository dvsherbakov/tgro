import { LOGIN_AUTH, LOGOUT_AUTH } from './actionTypes'

interface LoginAction {
  type: typeof LOGIN_AUTH
  email: string
}

interface LogoutAction {
  type: typeof LOGOUT_AUTH
}

export type AuthActionTypes = LoginAction | LogoutAction

export interface AuthState {
  email: string
  passwd: string
  isAuth: boolean
}
