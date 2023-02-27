import './AuthHeadeStyles.scss'
import { type FC } from 'react'

interface propsType {
  title: string
  subtitle: string
}

export const AuthHeader: FC<propsType> = (
  {
    title,
    subtitle
  }) => {
  return (
    <header className="authorization-header">
      <h1 className="authorization-header__title">
        { title }
      </h1>
      <h2 className="authorization-header__subtitle">
        { subtitle }
      </h2>
    </header>
  )
}
