import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  emailAction,
  firstNameAction,
  lastNameAction,
  passwdAction,
  registerThunk,
} from '../../../features/auth/actions'
import { selectors } from '../../../features/auth'

import '../styles/auth.css'

export function Register() {
  const dispatch = useDispatch()
  const email = useSelector(selectors.getEmail)
  const passwd = useSelector(selectors.getPasswd)
  const firstName = useSelector(selectors.getFirstName)
  const lastName = useSelector(selectors.getLastName)
  const data = useSelector(selectors.getComplexAuthData)

  const handlerRegister = () => {
    dispatch(registerThunk(data))
  }

  return (
    <div className="auth">
      <h4>Зарегистрируйтесь:</h4>
      <div className="auth__group">
        <input
          id="name_id"
          className="auth__input"
          type="email"
          placeholder=" "
          value={firstName}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            dispatch(firstNameAction(e.currentTarget.value))
          }}
        />
        <label htmlFor="name_id" className="auth__label">
          Имя
        </label>
      </div>

      <div className="auth__group">
        <input
          id="last_name_id"
          className="auth__input"
          type="text"
          placeholder=" "
          value={lastName}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            dispatch(lastNameAction(e.currentTarget.value))
          }}
        />
        <label htmlFor="last_name_id" className="auth__label">
          Фамилия
        </label>
      </div>

      <div className="auth__group">
        <input
          id="email_id"
          className="auth__input"
          type="text"
          placeholder=" "
          value={email}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            dispatch(emailAction(e.currentTarget.value))
          }}
        />
        <label htmlFor="input-1" className="auth__label">
          email
        </label>
      </div>

      <div className="auth__group">
        <input
          className="auth__input"
          type="password"
          placeholder=" "
          id="passwd-input"
          value={passwd}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            dispatch(passwdAction(e.currentTarget.value))
          }}
        />
        <label className="auth__label" htmlFor="passwd-input">
          password
        </label>
      </div>

      <button type="submit" className="auth__button" onClick={handlerRegister}>
        Регистрация
      </button>
    </div>
  )
}
