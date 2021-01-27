import {
  EMAIL_AUTH,
  FAIL_AUTH,
  FIRST_NAME_AUTH,
  LAST_NAME_AUTH,
  LOGIN_AUTH,
  LOGOUT_AUTH,
  PASSWD_AUTH,
  MY_SUCCESS,
  REGISTER_FAIL_AUTH,
  REGISTER_SUCCESS_AUTH,
} from './actionTypes'
import {
  SetEmailAction,
  AuthActionTypes,
  SetPasswdAction,
  SetFirstNameAction,
  SetLastNameAction,
  MyAction,
} from './types'

export interface IDefaultAuthState {
  firstName: string
  lastName: string
  middleName: string
  email: string
  passwd: string
  organization: string
  isAuth: boolean
  isRegisterSuccess: boolean
}

const initialState: IDefaultAuthState = {
  firstName: '',
  lastName: '',
  middleName: '',
  email: '',
  passwd: '',
  organization: '',
  isAuth: false,
  isRegisterSuccess: false,
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
    case FAIL_AUTH:
      return { ...state, isAuth: false }
    case REGISTER_SUCCESS_AUTH:
      return { ...state, isRegisterSuccess: true }
    case REGISTER_FAIL_AUTH:
      return { ...state, isRegisterSuccess: false }
    case MY_SUCCESS:
      return {
        ...state,
        firstName: (<MyAction>action).payload.firstName,
        lastName: (<MyAction>action).payload.lastName,
        middleName: (<MyAction>action).payload.middleName,
        email: (<MyAction>action).payload.email,
        organization: (<MyAction>action).payload.organizaiton?.name,
      }
    default:
      return state
  }
}

export default authReducer
