import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AppRoute } from '../../routes'
import { UserContext } from '../../context'
import LandingPage from './LandingPage'
import LoginForm from '../LoginForm'
import Callback from '../spotify/Callback'
import AlbumPage from '../albums/AlbumPage'
import SearchPage from './SearchPage'

const AppContainer: React.FC = () => {
  const { user } = React.useContext(UserContext)

  return (
    <Router>
      <Routes>
        <Route path={AppRoute.Home}>
          {user ? (<Route index element={<LandingPage />} />) : <Route index element={<LoginForm />} />}
          <Route path=':albumId' element={<AlbumPage />} />
        </Route>
        <Route path={AppRoute.Callback}>
          <Route index element={<Callback />} />
        </Route>
        <Route path={AppRoute.Search}>
          <Route index element={<SearchPage inputValue={null} />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppContainer