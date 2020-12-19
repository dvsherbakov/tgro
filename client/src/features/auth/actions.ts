import { EMAIL_AUTH, PASSWD_AUTH } from './actionTypes'
import { SetEmailAction } from './types'

export const emailAction = (email: string) => {
  return { type: EMAIL_AUTH, email } as SetEmailAction
}

export const passwdAction = (passwd: string) => {
  return { type: PASSWD_AUTH, passwd }
}
