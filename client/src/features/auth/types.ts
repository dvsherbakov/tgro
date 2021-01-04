import {
  EMAIL_AUTH,
  FIRST_NAME_AUTH,
  LAST_NAME_AUTH,
  LOGIN_AUTH,
  LOGOUT_AUTH,
  PASSWD_AUTH,
  REGISTER_FAIL_AUTH,
  REGISTER_SUCCESS_AUTH,
} from './actionTypes'

export type LoginAction = {
  type: typeof LOGIN_AUTH
}

export type SetEmailAction = {
  type: typeof EMAIL_AUTH
  payload: string
}

export type SetPasswdAction = {
  type: typeof PASSWD_AUTH
  payload: string
}

export type SetFirstNameAction = {
  type: typeof FIRST_NAME_AUTH
  payload: string
}

export type SetLastNameAction = {
  type: typeof LAST_NAME_AUTH
  payload: string
}

export type LogoutAction = {
  type: typeof LOGOUT_AUTH
}

export type AuthActionTypes =
  | LoginAction
  | LogoutAction
  | SetPasswdAction
  | SetFirstNameAction
  | SetLastNameAction

export interface AuthState {
  auth: {
    email: string
    passwd: string
    firstName: string
    lastName: string
    isAuth: boolean
  }
}

export interface IRegisterThunk {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface IAuthThunk {
  email: string
  password: string
}

export type RegisterFailAction = {
  type: typeof REGISTER_FAIL_AUTH
}

export type RegisterSuccessAction = {
  type: typeof REGISTER_SUCCESS_AUTH
}

export type RegisterActionsType = RegisterSuccessAction | RegisterFailAction
