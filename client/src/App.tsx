import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Header from './components/Header'
import { selectors } from './features/auth'
import Navbar from './components/Navbar'
import { About } from './pages/About'
import { AuthPage } from './pages/AuthPage'
import { Home } from './pages/Home'
import RegisterPage from './pages/RegisterPage'
import { ProfilePage } from './pages/ProfilePage'
import { updateThunk } from './features/auth/actions'

const App: FC = () => {
  const isAuth = useSelector(selectors.isAuthenticate)
  const isRegisterSuccess = useSelector(selectors.isRegisterSuccess)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateThunk())
    return () => {}
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <div className="container">
        {isAuth && (
          <Switch>
            <Route path="/auth" component={Home} exact />
            <Route path="/" component={Home} exact />
            <Route path="/profile" component={ProfilePage} exact />
            <Route path="/about" component={About} />
          </Switch>
        )}
        {!isAuth && isRegisterSuccess && <Redirect to="/auth" />}
        {!isAuth && (
          <Switch>
            <Route path="/" component={AuthPage} exact />
            <Route path="/register" component={RegisterPage} exact />
            <Route path="/auth" component={AuthPage} exact />
          </Switch>
        )}
      </div>
    </BrowserRouter>
  )
}

export default App
