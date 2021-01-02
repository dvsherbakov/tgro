import { useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import Api from '../../Api/Api'
import { selectors } from '.'
import {
  EMAIL_AUTH,
  FIRST_NAME_AUTH,
  LAST_NAME_AUTH,
  PASSWD_AUTH,
  REGISTER_FAIL_AUTH,
} from './actionTypes'
import {
  SetEmailAction,
  SetFirstNameAction,
  SetLastNameAction,
  SetPasswdAction,
  RegisterActionsType,
  RegistarFailAction,
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

export const registerFailAction = (): RegistarFailAction => ({
  type: REGISTER_FAIL_AUTH,
})

export const registerThunk = () => async (
  dispatch: Dispatch<RegisterActionsType>
) => {
  console.log('start dispath')
  try {
    const api = new Api()

    const { email, passwd, firstName, lastName } = useSelector(
      selectors.getComplexAuthData
    )
    const registerRes = await api.register({
      email,
      password: passwd,
      firstName,
      lastName,
    })
    console.log(registerRes)
  } catch (e) {
    dispatch(registerFailAction())
  }
}
