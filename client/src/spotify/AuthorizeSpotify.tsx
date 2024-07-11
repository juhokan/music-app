import React from 'react'
import { CLIENT_ID } from './../config'
import { Link } from 'react-router-dom'

const AuthorizeSpotify: React.FC = () => {
  const authUrl = () => {
    const state = generateRandomString(16)
    const scope = 'user-read-private user-read-email user-library-read'
      
    const queryParams = new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: 'http://localhost:5173/callback',
      state: state
    })
      
    return `https://accounts.spotify.com/authorize?` + queryParams.toString()
  }

  const generateRandomString = (length: number) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let randomString = ''
  
    if (window.crypto && window.crypto.getRandomValues) {
      const values = new Uint32Array(length)
      window.crypto.getRandomValues(values)
  
      for (let i = 0; i < length; i++) {
        randomString += charset[values[i] % charset.length]
      }
    } else {
      // Fallback for browsers that do not support window.crypto
      for (let i = 0; i < length; i++) {
        randomString += charset.charAt(Math.floor(Math.random() * charset.length))
      }
    }
  
    return randomString
  }

  return (
    <Link className='validate-token' to={authUrl()}>Validate Token</Link>
  )
}

export default AuthorizeSpotify
