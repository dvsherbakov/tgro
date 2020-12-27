import {
  EMAIL_AUTH,
  FIRST_NAME_AUTH,
  LAST_NAME_AUTH,
  LOGIN_AUTH,
  LOGOUT_AUTH,
  PASSWD_AUTH,
} from './actionTypes'
import {
  SetEmailAction,
  AuthActionTypes,
  SetPasswdAction,
  SetFirstNameAction,
  SetLastNameAction,
} from './types'

export interface IDefaultAuthState {
  firstName: string
  lastName: string
  email: string
  passwd: string
  isAuth: boolean
}

const initialState: IDefaultAuthState = {
  firstName: '',
  lastName: '',
  email: '',
  passwd: '',
  isAuth: false,
}

function authReducer(
  state: IDefaultAuthState = initialState,
  action: AuthActionTypes
) {
  switch (action.type) {
    case LOGIN_AUTH:
      return { ...state, isAuth: true }
    case FIRST_NAME_AUTH:
      return { ...state, firstName: (<SetFirstNameAction>action).payload }
    case LAST_NAME_AUTH:
      return { ...state, lastName: (<SetLastNameAction>action).payload }
    case EMAIL_AUTH:
      return { ...state, email: (<SetEmailAction>action).payload }
    case PASSWD_AUTH:
      return { ...state, passwd: (<SetPasswdAction>action).payload }
    case LOGOUT_AUTH:
      return { ...state, isAuth: false }
    default:
      return state
  }
}

export default authReducer
