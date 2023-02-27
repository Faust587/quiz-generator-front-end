import React, { type FC } from 'react'
import './AuthSubmitButtonStyles.scss'

interface propsType {
  text: string
}

export const AuthSubmitButton: FC<propsType> = (
  {
    text
  }
) => {
  return (
    <button
      className="authorization-submit-button"
      type="submit"
    >
      { text }
    </button>
  )
}
