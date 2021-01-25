import { Dispatch } from 'redux'
import Api from '../../Api/Api'
import {
  EMAIL_AUTH,
  FIRST_NAME_AUTH,
  LAST_NAME_AUTH,
  FAIL_AUTH,
  LOGIN_AUTH,
  MY_SUCCESS,
  PASSWD_AUTH,
  REGISTER_FAIL_AUTH,
  REGISTER_SUCCESS_AUTH,
} from './actionTypes'
import {
  LoginAction,
  LoginFailAuth,
  MyAction,
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

export const authFailAction = (): LoginFailAuth => ({
  type: FAIL_AUTH,
})

export const authSuccessAction = (): LoginAction => ({
  type: LOGIN_AUTH,
})

export const mySuccessAcrion = (data: any): MyAction => ({
  type: MY_SUCCESS,
  payload: data,
})

export const myThunk = () => async (dispatch: Dispatch<AuthActionTypes>) => {
  const tkns = localStorage.getItem('tokens')
  if (tkns) {
    const { refresh, token } = JSON.parse(tkns)
    const api = new Api({ refreshToken: refresh, token })
    const { data } = await api.my()
    dispatch(mySuccessAcrion(data))
  } else dispatch(authFailAction())
}

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
    if (resp === 200) {
      localStorage.setItem(
        'tokens',
        JSON.stringify({ token: api.token, refresh: api.refreshToken })
      )
      dispatch(authSuccessAction())
    } else {
      dispatch(authFailAction())
    }
  } catch (e) {
    dispatch(authFailAction())
  }
}

export const updateThunk = () => async (
  dispatch: Dispatch<AuthActionTypes>
) => {
  try {
    const tkns = localStorage.getItem('tokens')
    if (tkns) {
      const { refresh, token } = JSON.parse(tkns)
      const api = new Api({ refreshToken: refresh, token })
      const resp = await api.refresh()
      if (resp.status === 200) {
        const { data } = resp
        localStorage.setItem(
          'tokens',
          JSON.stringify({
            token: data.accessToken,
            refresh: data.refreshToken,
          })
        )
        dispatch(authSuccessAction())
      } else dispatch(authFailAction())
    } else dispatch(authFailAction())
  } catch (e) {
    dispatch(authFailAction())
  }
}
