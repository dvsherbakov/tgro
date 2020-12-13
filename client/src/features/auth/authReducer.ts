import { LOGIN_AUTH } from './actionTypes'
import { AuthState } from './types'
import { AuthActionTypes, LoginAction, LogoutAction } from './types'

const initialState: AuthState = {
  email: '',
  passwd: '123',
  isAuth: false,
}

export default (state = initialState, action: LoginAction | LogoutAction) => {
  switch (action.type) {
    case LOGIN_AUTH:
      return { ...state }
    default:
      return state
  }
}
