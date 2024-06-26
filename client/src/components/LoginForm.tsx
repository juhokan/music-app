import React from 'react'
import loginService from '../services/loginService'
import { UserContext } from '../context'

const LoginForm: React.FC = () => {
  const [loginUsername, setLoginUsername] = React.useState('')
  const [loginPassword, setLoginPassword] = React.useState('')
  const { setUser } = React.useContext(UserContext)

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()


    const newUser = await loginService.login({ username: loginUsername, password: loginPassword })
    if (newUser?.name && newUser?.username && newUser?.token) {
      setUser(newUser)

    }
    resetForm()
  }

  const resetForm = () => {
    setLoginUsername('')
    setLoginPassword('')
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={loginUsername}
            name='Username'
            onChange={({ target }) => setLoginUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={loginPassword}
            name='Password'
            onChange={({ target }) => setLoginPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )
}

export default LoginForm
