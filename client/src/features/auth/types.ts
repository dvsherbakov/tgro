import { EMAIL_AUTH, LOGIN_AUTH, LOGOUT_AUTH, PASSWD_AUTH } from './actionTypes'

export interface LoginAction {
  type: typeof LOGIN_AUTH
}

export interface SetEmailAction {
  type: typeof EMAIL_AUTH
  email: string
}

export interface SetPasswdAction {
  type: typeof PASSWD_AUTH
  passwd: string
}

export interface LogoutAction {
  type: typeof LOGOUT_AUTH
}

export type AuthActionTypes = LoginAction | LogoutAction | SetPasswdAction

export interface AuthState {
  auth: {
    email: string
    passwd: string
    isAuth: boolean
  }
}
