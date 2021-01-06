import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { selectors } from './features/auth'
import { Navbar } from './components/Navbar/Navbar'
import { About } from './pages/About'
import { AuthPage } from './pages/AuthPage'
import { Home } from './pages/Home'
import RegisterPage from './pages/RegisterPage'

const App: FC = () => {
  const isAuth = useSelector(selectors.isAuthenticate)
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
        {!isAuth && (
          <Switch>
            <Route path="/" component={AuthPage} />
            <Route path="/auth" component={AuthPage} />
            <Route path="/register" component={RegisterPage} />
          </Switch>
        )}
      </div>
    </BrowserRouter>
  )
}

export default App
