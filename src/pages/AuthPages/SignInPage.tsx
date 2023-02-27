import './AuthPagesStyles.scss'
import { type FC } from 'react'
import { AuthSlider } from '../../components/sliders/AuthSlider'
import { AuthHeader } from '../../components/headers/AuthHeader/AuthHeader'
import { SignInForm } from '../../components/forms/AuthForms/SignInForm'
import { AuthFooter } from '../../components/footers/AuthFooter'

const PUBLIC_URL = process.env.PUBLIC_URL

export const SignInPage: FC = (): JSX.Element => {
  return (
    <div className="authorization-content">
      <AuthSlider />
      <div className="auth-form-container">
        <AuthHeader
          title="Log in to your account"
          subtitle="Welcome back to your quizzes"
        />
        <SignInForm />
        <div className="authorization-footer-wrapper">
          <AuthFooter
            text="Don't have an account?"
            urlText="Sign Up"
            url={ `${PUBLIC_URL}/sign-up` }
          />
        </div>
      </div>
    </div>
  )
}
