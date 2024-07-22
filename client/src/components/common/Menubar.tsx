import React, { useEffect } from "react"
import { AppRoute } from "../../routes"
import { SearchContext, SpotifyContext, UserContext } from "../../context"
import { useLocation, useNavigate } from 'react-router-dom'
import search from '../../assets/search.svg'
import { IoPersonSharp } from "react-icons/io5"
import { getMe } from "../../services/spotifyService"
import { SpotifyUserData } from "../../types"



const Menubar: React.FC = () => {

  const { user } = React.useContext(UserContext)
  const { tokens } = React.useContext(SpotifyContext) 
  const { setInput } = React.useContext(SearchContext)
  const [spotiyUser, setSpotiyUser] = React.useState<SpotifyUserData | null>(null)
  const [isMobile, setMobile] = React.useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const MAX_WIDTH = 768

  const isSearchActive = () => {
    setMobile(window.innerWidth <= MAX_WIDTH)
  }
  

  useEffect(() => {

    isSearchActive()
    window.addEventListener('resize', isSearchActive)

    return () => {
      window.removeEventListener('resize', isSearchActive)
    }

  }, [user])

  useEffect(() => {
    fetchSpotifyProfile()
  }, [user, tokens])

  const fetchSpotifyProfile = async () => {
    if (user && tokens && tokens.token) {
      const u = await getMe(tokens.token)
      setSpotiyUser(u)
    }
  }


  const headerImage = () => {
    return (
      <a href={AppRoute.Home} className='menubar-image'>
        <h4>music review app</h4>
      </a>
    )
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const i = (event.target as HTMLFormElement).querySelector<HTMLInputElement>('input[type="text"]')?.value
    if (i) {
      setInput(i)
      navigate(AppRoute.Search)
    }
  }
  
  const headerLinks = () => {
    return (
      <div className='menubar-link-container'>
        {isMobile ? (
          pathname !== AppRoute.Search && (
            <a className='search-mobile' href={AppRoute.Search} >
              <img src={search} style={{height: '16px', width: '16px'}} />
            </a>
          )
        ) : (
          <div className='search-container'>
            <form onSubmit={handleSubmit}>
              <input type='text' className='search-hover' aria-label='search input' />
            </form>
          </div>
        )}

        {pathname !== AppRoute.Profile && profileLink()}


      </div>
    )
  }

  const handleNavigate = () => {
    navigate(AppRoute.Login)
  }

  const profileLink = () => {
    return (
      user ? (
        (spotiyUser ? 
          <a className='menubar-profile-link' href={AppRoute.Profile}>
            <img className='menubar-profile-image' src={spotiyUser.images[0].url} alt='profile image' />
          </a> 
          :
          <a className='menubar-profile-link' href={AppRoute.Profile}>
            <div className='menubar-profile-image'>
              <IoPersonSharp size={'12px'}/>
            </div>
          </a> 
        ) 
      ) : (
        <div onClick={handleNavigate}>
          <h3>Log In</h3>
        </div>
      )
    )
  }
 
  return (
    <div className='menubar'>
      {headerImage()}
      {headerLinks()}
    </div>
  )
}

export default Menubar