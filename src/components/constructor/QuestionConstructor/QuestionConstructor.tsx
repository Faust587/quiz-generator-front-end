import { type FC, useCallback, useEffect, useState } from 'react'
import { type QUESTION_TYPES } from '../../../types/questionTypes'
import styles from './QuestionConstructor.module.scss'
import { QuestionText } from './QuestionTypes/QuestionText/QuestionText'
import { QuestionOption } from './QuestionTypes/QuestionOption/QuestionOption'
import {
  setActiveQuestion,
  type TQuestion,
  clearQuestionEditingLoading,
  clearQuestionEditingError,
  clearQuestionDeletingLoading,
  clearQuestionDeletingError,
  setQuizForChangingOrder,
  setQuestionMoving
} from '../../../store/reducer/quizConstructor/quizSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { isArray } from 'lodash'
import Swal from 'sweetalert2'
import {updateQuestion} from '../../../store/reducer/quizConstructor/quizThunks'
import {cutQuestionAttachmentName} from '../../../utils/questionUtils';
import {MoveQuestion} from './MoveQuestion/MoveQuestion';
import {QuestionConstructorHeader} from './QuestionConstructorHeader/QuestionConstructorHeader';
import {QuestionConstructorFooter} from './QuestionConstructorFooter/QuestionConstructorFooter';

interface propTypes {
  data: TQuestion
  isFocused: boolean
  isUnfocused: boolean
}

export const QuestionConstructor: FC<propTypes> = (
  {
    data, isFocused
  }
) => {
  const [type, setType] = useState<QUESTION_TYPES>(data.type)
  const [name, setName] = useState<string>(data.name)
  const [isRequired, setIsRequired] = useState<boolean>(data.isRequired)
  const [value, setValue] = useState<string[]>(data.value)
  const [attachmentName, setAttachmentName] = useState<string | undefined>(
    cutQuestionAttachmentName(data.attachmentName)
  );
  const quiz = useAppSelector(state => state.quizzes.currentQuiz)

  const {
    questionEditingLoading,
    questionEditingError,
    questionDeletingLoading,
    changeQuestionOrder,
  } = useAppSelector(state => state.quizzes)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isFocused) {
      setType(data.type)
      setName(data.name)
      setIsRequired(data.isRequired)
      setValue(data.value)
      setAttachmentName(cutQuestionAttachmentName(data.attachmentName))
    }
  }, [data, isFocused])

  useEffect(() => {
    if (questionEditingLoading === 'failed') {
      let errorText: string
      if (questionEditingError == null) {
        errorText = 'Sorry, unknown error, try again!'
      } else {
        if (isArray(questionEditingError.message)) {
          errorText = questionEditingError.message.join()
        } else {
          errorText = questionEditingError.message
        }
      }
      Swal.fire(
        'Error!',
        errorText,
        'error'
      ).then(() => {
        dispatch(clearQuestionEditingLoading())
        dispatch(clearQuestionEditingError())
      })
    } else if (questionEditingLoading === 'succeeded') {
      dispatch(clearQuestionEditingLoading())
    }
  }, [dispatch, questionEditingError, questionEditingLoading])

  useEffect(() => {
    if (questionDeletingLoading === 'failed') {
      let errorText: string
      if (questionEditingError == null) {
        errorText = 'Sorry, unknown error, try again!'
      } else {
        if (isArray(questionEditingError.message)) {
          errorText = questionEditingError.message.join()
        } else {
          errorText = questionEditingError.message
        }
      }
      Swal.fire(
        'Error!',
        errorText,
        'error'
      ).then(() => {
        dispatch(clearQuestionDeletingLoading())
        dispatch(clearQuestionDeletingError())
      })
    } else if (questionDeletingLoading === 'succeeded') {
      dispatch(clearQuestionDeletingLoading())
    }
  }, [dispatch, questionDeletingLoading, questionEditingError])

  const addValue = (): void => {
    if (quiz == null) return
    dispatch(updateQuestion({
      questionId: data.id,
      type,
      name,
      isRequired,
      value: [...value, 'Variant'],
      quizId: quiz.id,
      index: data.index,
      attachmentName,
      isFileUploaded: !!attachmentName
    }))
    setValue([...value, 'Variant'])
  }

  const getTypeStructure = () => {
    if (quiz == null) return
    switch (type) {
      case 'TEXT':
        return (
          <QuestionText isFocused={isFocused}/>
        )
      case 'OPTION':
      case 'FLAG':
      case 'SELECT':
        return (
          <div>
            {value.map((item, index) => (
              <div
                className={styles.optionContainer}
                key={`${item}${index}`}
              >
                <QuestionOption
                  key={`${value}${index}`}
                  quizId={quiz.id}
                  type={type}
                  data={data}
                  value={item}
                  index={index}
                  values={value}
                  setValue={setValue}
                  isFocused={isFocused}
                  isFileUploaded={!!attachmentName}
                />
              </div>
            ))}
            {isFocused
              ? <div className={styles.addVariantButtonContainer}>
              <button
                onClick={addValue}
                className={styles.addVariantButton}
              >
                ADD VARIANT
              </button>
            </div>
              : null}
          </div>
        )
      default:
        return null
    }
  }
  const isQuestionMoves = useAppSelector(state => state.quizzes.isQuestionMoves)

  const onDocumentClick = useCallback(function (_: any) {
    dispatch(setQuestionMoving(false))
    dispatch(setQuizForChangingOrder(null))
  }, [dispatch])

  useEffect(() => {
    if (isQuestionMoves) {
      document.addEventListener('click', onDocumentClick, false)
    } else {
      document.removeEventListener('click', onDocumentClick, false)
    }
  }, [isQuestionMoves, onDocumentClick])

  if (!quiz) return null;
  return (
      <article
        className={
          `${styles.block} ${isFocused && styles.blockFocused} 
          ${changeQuestionOrder === data.index && styles.changeOrderBlock}
          ${isQuestionMoves && changeQuestionOrder !== data.index && styles.changeOrderBlockHidden}`
        }
        onClick={(event) => {
          event.stopPropagation()
          dispatch(setActiveQuestion(data.id))
          dispatch(setQuestionMoving(false))
          dispatch(setQuizForChangingOrder(null))
        }}
      >
        <MoveQuestion
          isFocused={isFocused}
          isQuestionMoves={isQuestionMoves}
          questionIndex={data.index}
        />
        <QuestionConstructorHeader
          isFocused={isFocused}
          question={data}
          quizId={quiz.id}
          setType={setType}
          name={name}
          isRequired={isRequired}
          setName={setName}
        />
        <main className={styles.questionValue}>
          {
            getTypeStructure()
          }
        </main>
        <QuestionConstructorFooter
          isFocused={isFocused}
          question={data}
          quizId={quiz.id}
          attachmentName={attachmentName}
          setAttachmentName={setAttachmentName}
        />
      </article>
  )
}
