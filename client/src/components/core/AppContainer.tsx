import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AppRoute } from '../../routes'
import { UserContext } from '../../context'
import LandingPage from './LandingPage'
import LoginForm from '../LoginForm'

const AppContainer: React.FC = () => {
  const { user } = React.useContext(UserContext)

  return (
    <Router>
      <div>
        <Routes>

          <Route path={AppRoute.Home}>
            {user ? (<Route index element={<LandingPage />} />) : <Route index element={<LoginForm />} />}
          </Route>
          
        </Routes>
      </div>
    </Router>
  )
}

export default AppContainer