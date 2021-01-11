import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectors } from '../../features/auth'

import './navbar.css'

export const Navbar: React.FC = () => {
  const isAuth = useSelector(selectors.isAuthenticate)

  const links = isAuth ? (
    <Fragment>
      <ul id="nav-mobile" className="menu">
        <li>
          <NavLink to="/" activeClassName="active-link">
            Главная
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" activeClassName="active-link">
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active-link">
            About
          </NavLink>
        </li>
      </ul>
    </Fragment>
  ) : (
    <Fragment>
      <ul id="nav-mobile" className="menu">
        <li>
          <NavLink to="/auth">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register">Регистрация</NavLink>
        </li>
      </ul>
    </Fragment>
  )
  return <nav className="menu container">{links}</nav>
}
