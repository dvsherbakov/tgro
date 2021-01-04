import { Dispatch } from 'redux'
import Api from '../../Api/Api'
import {
  EMAIL_AUTH,
  FIRST_NAME_AUTH,
  LAST_NAME_AUTH,
  LOGIN_AUTH,
  PASSWD_AUTH,
  REGISTER_FAIL_AUTH,
  REGISTER_SUCCESS_AUTH,
} from './actionTypes'
import {
  LoginAction,
  SetEmailAction,
  SetFirstNameAction,
  SetLastNameAction,
  SetPasswdAction,
  RegisterActionsType,
  RegisterFailAction,
  IRegisterThunk,
  RegisterSuccessAction,
  IAuthThunk,
  AuthActionTypes,
} from './types'

export const emailAction = (email: string): SetEmailAction => {
  return { type: EMAIL_AUTH, payload: email }
}

export const passwdAction = (passwd: string): SetPasswdAction => {
  return { type: PASSWD_AUTH, payload: passwd }
}

export const firstNameAction = (payload: string): SetFirstNameAction => {
  return { type: FIRST_NAME_AUTH, payload }
}

export const lastNameAction = (payload: string): SetLastNameAction => {
  return { type: LAST_NAME_AUTH, payload }
}

export const registerFailAction = (): RegisterFailAction => ({
  type: REGISTER_FAIL_AUTH,
})

export const registerSuccessAction = (): RegisterSuccessAction => ({
  type: REGISTER_SUCCESS_AUTH,
})

export const authFailAction = (): LoginAction => ({
  type: LOGIN_AUTH,
})

export const registerThunk = (data: IRegisterThunk) => async (
  dispatch: Dispatch<RegisterActionsType>
) => {
  try {
    const api = new Api()
    const resp = await api.register(data)
    if (resp && resp.message) dispatch(registerSuccessAction())
    else dispatch(registerFailAction())
  } catch (e) {
    dispatch(registerFailAction())
  }
}

export const authThunk = (data: IAuthThunk) => async (
  dispatch: Dispatch<AuthActionTypes>
) => {
  try {
    const api = new Api()
    const resp = await api.login(data)
    console.log(resp)
  } catch (e) {
    dispatch(authFailAction())
  }
}
