import './AuthFormsStyles.scss'
import { AuthInput } from '../../../UI/inputElement/authInput/AuthInput'
import React, { useState } from 'react'
import { AuthErrorContainer } from '../../errorBlock/AuthErrorContainer'
import ValidationService from '../../../services/validationService'
import { type FailResponse, login } from '../../../services/authService'
import axios, { type AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

export const SignInForm = () => {
  const navigate = useNavigate()

  const [errors, setErrors] = useState<string[]>([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const dataValidation = () => {
    const usernameValidation = ValidationService.usernameValidation(username)
    const passwordValidation = ValidationService.passwordValidation(password)

    const err: string[] = []

    if (usernameValidation.length > 0) {
      err.push(...usernameValidation)
      setUsernameError(true)
    } else {
      setUsernameError(false)
    }

    if (passwordValidation.length > 0) {
      err.push(...passwordValidation)
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }

    if (err.length === 0) {
      setErrors([])
      return true
    }
    setErrors(err)
    return false
  }

  const signInSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    const validationResult = dataValidation()
    if (!validationResult) return
    const loginResponse = await login(username, password)
    if (axios.isAxiosError(loginResponse)) {
      const errorResponse = loginResponse as AxiosError<FailResponse>
      const errorMessage = (errorResponse?.response?.data?.message) ? [errorResponse.response.data.message] : ['Unknown error']
      setErrors(errorMessage)
    } else {
      localStorage.setItem('accessToken', loginResponse.data.accessToken)
      navigate('/main-page')
    }
  }

  return (
    <form
      className="authorization-form"
      onSubmit={signInSubmit}
    >
      <div className="authorization-input-wrapper">
        <AuthInput
          name="username"
          placeholder="Username"
          isError={usernameError}
          type="text"
          value={username}
          setValue={setUsername}
        />
      </div>
      <div className="authorization-input-wrapper">
        <AuthInput
          name="password"
          placeholder="Password"
          isError={passwordError}
          type="password"
          value={password}
          setValue={setPassword}
        />
      </div>
      {
        errors.length !== 0
          ? (
          <AuthErrorContainer errors={errors}/>
            )
          : null
      }
      <div className="authorization-button-wrapper">
        <button className="authorization-submit-button" type="submit">
          Log In
        </button>
      </div>
    </form>
  )
}
