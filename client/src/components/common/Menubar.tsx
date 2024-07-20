import React, { useEffect } from "react"
import { AppRoute } from "../../routes"
import { SearchContext, UserContext } from "../../context"
import { useLocation, useNavigate } from 'react-router-dom'
import { MdOutlineSearch } from "react-icons/md"
import profile from '../../assets/profile.png'



const Menubar: React.FC = () => {

  const { user } = React.useContext(UserContext)
  const { setInput } = React.useContext(SearchContext)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [isMobile, setMobile] = React.useState(false)

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
              <MdOutlineSearch size='16px' aria-label='search link' />
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
        <a className='menubar-profile-link' href={AppRoute.Profile}>
          <img src={profile} alt='Profile Icon' className='icon' />
        </a>
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