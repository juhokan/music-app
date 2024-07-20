import React from 'react'
import { AppRoute } from '../../routes'
import { useNavigate } from 'react-router-dom'
import { MdArrowForwardIos } from "react-icons/md"

interface HeaderLinkProps {
  readonly header: string,
  readonly route: AppRoute
}

const HeaderLink: React.FC<HeaderLinkProps> = ({ header, route }) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(route)
  }
  return (
    <div className='header-link-container' onClick={handleNavigate}>
      <h1 className='header-link-title'>{header}</h1>
      <MdArrowForwardIos className='header-link-icon '/>
    </div>
  )
}

export default HeaderLink
