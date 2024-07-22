import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AppRoute } from '../routes'
import { SearchContext } from '../context'
import LandingPage from './HomePage'
import Callback from '../spotify/Callback'
import AlbumPage from './AlbumPage'
import SearchPage from './SearchPage'
import Menubar from './common/Menubar'
import ProfilePage from './ProfilePage'
import Footer from './common/Footer'
import LoginForm from './LoginPage/LoginForm'
import RatingPage from './ProfilePage/RatingPage'
import RecentsPage from './RecentsPage'

const AppContainer: React.FC = () => {
  const { input } = React.useContext(SearchContext)

  return (
    <Router>
      <Menubar />
      <div id='main'>
        <Routes>
          <Route path={AppRoute.Home}>
            <Route index element={<LandingPage />} />
            <Route path=':albumId' element={<AlbumPage />} />
          </Route>
          <Route path={AppRoute.Callback}>
            <Route index element={<Callback />} />
          </Route>
          <Route path={AppRoute.Search}>
            <Route index element={<SearchPage inputValue={input} />} />
          </Route>
          <Route path={AppRoute.Recent}>
            <Route index element={<RecentsPage />} />
          </Route>
          <Route path={AppRoute.Profile}>
            <Route index element={<ProfilePage />} />
          </Route>
          <Route path={AppRoute.Login}>
            <Route index element={<LoginForm />} />
          </Route>
          <Route path={AppRoute.UserRatings}>
            <Route index element={<RatingPage />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default AppContainer