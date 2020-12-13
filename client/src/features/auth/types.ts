import { LOGIN_AUTH, LOGOUT_AUTH } from './actionTypes'

interface LoginAction {
  type: typeof LOGIN_AUTH
}

interface LogoutAction {
  type: typeof LOGIN_AUTH
}

export type AuthActionTypes = LoginAction | LogoutAction

export interface AuthState {
  userName: string
  passwd: string
}
