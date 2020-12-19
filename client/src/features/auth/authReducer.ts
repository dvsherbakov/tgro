import { EMAIL_AUTH, LOGIN_AUTH, LOGOUT_AUTH, PASSWD_AUTH } from './actionTypes'
import { SetEmailAction, AuthActionTypes, SetPasswdAction } from './types'

const initialState = {
  email: '',
  passwd: '123',
  isAuth: false,
}

export default (state = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case LOGIN_AUTH:
      return { ...state, isAuth: true }
    case EMAIL_AUTH:
      return { ...state, email: (<SetEmailAction>action).email }
    case PASSWD_AUTH:
      return { ...state, passwd: (<SetPasswdAction>action).passwd }
    case LOGOUT_AUTH:
      return { ...state, isAuth: false }
    default:
      return state
  }
}
