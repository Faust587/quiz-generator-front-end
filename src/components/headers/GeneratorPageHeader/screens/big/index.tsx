import styles from './styles.module.scss'
import { mainIcon, reloadIcon } from '../../../../../assets'
import React, { type Dispatch, type FC, type SetStateAction } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux'
import { updateQuizParametersById, refreshQuizCode, deleteQuizByCode } from '../../../../../store/reducer/quizConstructor/quizThunks'
import { setCurrentQuiz } from '../../../../../store/reducer/quizConstructor/quizSlice'
import {formatDate} from "../../../../../utils/formatDate";

interface propTypes {
  id: string
  name: string
  code: string
  closed: boolean
  onlyAuthUsers: boolean
  questionsAmount: number
  isChanged: boolean
  setIsChanged: Dispatch<SetStateAction<boolean>>
  setName: Dispatch<SetStateAction<string>>
  setClosed: Dispatch<SetStateAction<boolean>>
  setOnlyAuthUsers: Dispatch<SetStateAction<boolean>>
}

export const BigScreenHeader: FC<propTypes> = (
  {
    id,
    name,
    setName,
    code,
    closed,
    setClosed,
    onlyAuthUsers,
    setOnlyAuthUsers,
    questionsAmount,
    isChanged,
    setIsChanged
  }
) => {
  const navigate = useNavigate()
  const quiz = useAppSelector(state => state.quizzes.currentQuiz)
  const dispatch = useAppDispatch()

  const refreshCodeAction = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    dispatch(refreshQuizCode(code))
  }

  const deleteQuiz = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    Swal.fire({
      title: 'Do you really want to permanently delete quizConstructor?',
      text: 'All question answers will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#E44061',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (!result.isConfirmed) return
      dispatch(deleteQuizByCode(code))
    })
  }

  const updateParameters = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    dispatch(updateQuizParametersById({ parameters: { name, closed, onlyAuthUsers }, quizId: id }))
  }

  if (quiz == null) return <h1>Loading...</h1>

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <form
          className={styles.form}
          action="src/components/headers/GeneratorPageHeader/devices/desktop"
        >
          <section className={styles.formSection}>
            <div>
              <h2 className={styles.title}>Quiz name:</h2>
            </div>
            <input
              className={styles.textInput}
              type="text"
              value={name}
              onChange={e => {
                setName(e.target.value);
                (e.target.value === quiz.name &&
                  closed === quiz.closed &&
                  onlyAuthUsers === quiz.onlyAuthUsers)
                  ? setIsChanged(false)
                  : setIsChanged(true)
              }}
            />
            <div className={`${styles.buttonContainer}`}>
              <button
                className={`${styles.formButton} ${isChanged ? '' : styles.hidden}`}
                onClick={updateParameters}
                disabled={!isChanged}
              >
                save
              </button>
            </div>
          </section>
          <section className={styles.formSection}>
            <div className={styles.codeContainer}>
              <h2 className={styles.codeTitle}>
                code:&nbsp;
              </h2>
              <div className={styles.code}>{code}</div>
              &nbsp;
              <button
                className={styles.refreshCodeButton}
                onClick={refreshCodeAction}
              >
                <img
                  className={styles.refreshCodeIcon}
                  src={reloadIcon}
                  alt="refresh icon"
                />
              </button>
            </div>
            <label className={styles.checkboxParameter}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={onlyAuthUsers}
                onChange={() => {
                  setOnlyAuthUsers(prevState => {
                    if (!prevState === quiz.onlyAuthUsers && closed === quiz.closed && name === quiz.name) {
                      setIsChanged(false)
                    } else {
                      setIsChanged(true)
                    }
                    return !prevState
                  })
                }}
              />
              Only for auth users
            </label>
            <label className={styles.checkboxParameter}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={closed}
                onChange={() => {
                  setClosed(prevState => {
                    if (!prevState === quiz.closed && onlyAuthUsers === quiz.onlyAuthUsers && name === quiz.name) {
                      setIsChanged(false)
                    } else {
                      setIsChanged(true)
                    }
                    return !prevState
                  })
                }}
              />
              Closed
            </label>
            <div className={`${styles.buttonContainer} ${styles.left}`}>
              <button
                className={`${styles.formButton} ${styles.red}`}
                onClick={deleteQuiz}
              >
                delete
              </button>
            </div>
          </section>
        </form>
      </div>
      <div className={styles.infoContainer}>
        Info
        <div className={styles.infoBlock}>
          Total questions: {questionsAmount}
        </div>
        <div className={styles.infoBlock}>
          Total answers: 32
        </div>
        <div className={styles.infoBlock}>
          Last updated: { formatDate(quiz.lastUpdated) }
        </div>
      </div>
      <button
        className={styles.homeButton}
        onClick={() => {
          dispatch(setCurrentQuiz(null))
          navigate('../')
        }}
      >
        <img
          className={styles.homeIcon}
          src={mainIcon}
          alt="home icon"
        />
      </button>
    </div>
  )
}
