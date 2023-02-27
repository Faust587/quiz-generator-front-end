import './QuizInputStyles.scss'
import errorIcon from '../../../assets/icons/red-cross.svg'
import React, { type FC, useCallback, useState } from 'react'

interface propsType {
  maxLength: number
  placeholder: string
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export const QuizInput: FC<propsType> = (
  {
    maxLength,
    placeholder
  }
) => {
  const [error, setError] = useState(false)
  const [text, setText] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const setIsFocusedTrue = useCallback(() => {
    setIsFocused(true)
  }, [])

  const setIsFocusedFalse = useCallback(() => {
    setIsFocused(false)
  }, [])

  const validation = (text: string): void => {
    if (text.length > maxLength) {
      setError(true)
    } else {
      setError(false)
    }
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    validation(event.target.value)
    setText(event.target.value)
  }

  return (
    <div className="quiz-input">
      <div className="quiz-input__content">
        <input
          className="quiz-input__input"
          type="text"
          onFocus={ setIsFocusedTrue }
          onBlur={ setIsFocusedFalse }
          value={ text }
          onChange={ onInputChange }
          placeholder={ placeholder }
        />
        {
          error
            ? (<img
            className="quiz-input__error-icon"
            src={ errorIcon }
            alt={ 'errorMessage' }
          />)
            : null
        }
      </div>
      <div className={ `quiz-input__underline ${isFocused ? 'quiz-input__underline--focused' : ''}` } />
    </div>
  )
}
