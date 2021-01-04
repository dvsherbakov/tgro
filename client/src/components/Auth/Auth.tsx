import React, { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { emailAction, passwdAction, selectors } from '../../features/auth'
import './auth.css'

export const AuthForm: FC = () => {
  const dispatch = useDispatch()
  const email = useSelector(selectors.getEmail)
  const passwd = useSelector(selectors.getPasswd)

  const getAuthHandler = () => {}

  return (
    <div className="auth">
      <h4>Авторизуйтесь:</h4>
      <div className="auth__group">
        <input
          id="input-1"
          className="auth__input"
          type="email"
          value={email}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            dispatch(emailAction(e.currentTarget.value))
          }}
          placeholder=" "
        />
        <label htmlFor="input-1" className="auth__label">
          email
        </label>
      </div>

      <div className="auth__group">
        <input
          className="auth__input"
          type="password"
          value={passwd}
          placeholder=" "
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            dispatch(passwdAction(e.currentTarget.value))
          }}
          id="passwd-input"
        />
        <label className="auth__label" htmlFor="passwd-input">
          password
        </label>
      </div>

      <button type="submit" className="auth__button" onClick={getAuthHandler}>
        Войти
      </button>
    </div>
  )
}
