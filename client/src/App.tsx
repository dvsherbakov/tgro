import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { selectors } from './features/auth'
import { Navbar } from './components/Navbar/Navbar'
import { About } from './pages/About'
import { AuthPage } from './pages/AuthPage'
import { Home } from './pages/Home'
import RegisterPage from './pages/RegisterPage'

const App: FC = () => {
  const isAuth = useSelector(selectors.isAuthenticate)
  const isRegisterSuccess = useSelector(selectors.isRegisterSuccess)
  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <div className="container">
        {isAuth && (
          <Switch>
            <Route path="/auth" component={Home} exact />
            <Route path="/" component={Home} exact />
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
