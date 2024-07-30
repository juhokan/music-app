import React from 'react'
import { UserContext } from '../../context'
import { login } from '../../services/userService'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { FloatLabel } from "primereact/floatlabel"
import { useNavigate } from 'react-router-dom'
import { AppRoute } from '../../routes'

const LoginForm: React.FC = () => {
  const [loginUsername, setLoginUsername] = React.useState('')
  const [loginPassword, setLoginPassword] = React.useState('')
  const { setUser } = React.useContext(UserContext)
  const navigate = useNavigate()

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newUser = await login({ username: loginUsername, password: loginPassword })
    if (newUser?.name && newUser?.username && newUser?.token) {
      setUser(newUser)
      resetForm()
      navigate(AppRoute.Home)
    }
  }

  const resetForm = () => {
    setLoginUsername('')
    setLoginPassword('')
  }

  return (
    <>
      <h1 className='m-2'>Login</h1>
      <form onSubmit={handleLogin}>
        <div className='mx-2 mt-4 mb-4'>
          <FloatLabel>
            <InputText id='username' value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
            <label htmlFor='username'>Username</label>
          </FloatLabel>
        </div>
        <div className='mx-2 mt-4 mb-2'>
          <FloatLabel>
            <Password
              id='password'
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              feedback={false}
            />
            <label htmlFor='password'>Password</label>
          </FloatLabel>
        </div>
        <Button type='submit' label='Login' className='m-2'/>
      </form>
    </>
  )
}

export default LoginForm