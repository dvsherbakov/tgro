import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { About } from './pages/About'
import { AuthPage } from './pages/AuthPage'
import { Home } from './pages/Home'
import RegisterPage from './pages/RegisterPage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/auth" component={AuthPage} />
          <Route path="/about" component={About} />
          <Route path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
