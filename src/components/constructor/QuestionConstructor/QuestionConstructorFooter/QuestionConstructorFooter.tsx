import {type Dispatch, type FC, type SetStateAction, useState} from 'react'
import styles from '../QuestionConstructor.module.scss'
import { deleteQuestion, updateQuestion } from '../../../../store/reducer/quizConstructor/quizThunks'
import trashCanIcon from '../../../../assets/icons/trash-can.svg'
import { removeQuestionFromState, type TDeleteResponse, type TError, type TQuestion } from '../../../../store/reducer/quizConstructor/quizSlice'
import { useAppDispatch } from '../../../../hooks/redux'
import { QuestionAttachmentEditor } from './QuestionAttachment/QuestionAttachmentEditor'
import { QuestionAttachmentView } from './QuestionAttachment/QuestionAttachmentView'
import {cutQuestionAttachmentName} from "../../../../utils/questionUtils";

interface PropsTypes {
  isFocused: boolean
  question: TQuestion
  quizId: string
  questionAttachmentName: string | undefined
}

export const QuestionConstructorFooter: FC<PropsTypes> = (
  {
    isFocused,
    question,
    quizId,
    questionAttachmentName,
  }
) => {
  const dispatch = useAppDispatch()
  const {
    id, index, name, isRequired, type, value
  } = question;

  const [attachmentName, setAttachmentName] = useState<string | undefined>(questionAttachmentName);
  const isTError = (payload: TError | TDeleteResponse): payload is TError => {
    return (payload as TError).statusCode !== undefined
  }
  const deleteCurrentQuestion = (): void => {
    dispatch(deleteQuestion({ questionId: question.id, quizId })).then((result) => {
      const payload = result.payload
      if (payload == null) return
      if (!isTError(payload) && payload.acknowledged) {
        dispatch(removeQuestionFromState(question.id))
      }
    })
  }
  return (
    <div className={styles.parameters}>
      {
        isFocused
          ? (
          <QuestionAttachmentEditor
            attachmentName={attachmentName}
            setAttachmentName={setAttachmentName}
            quizId={quizId}
            questionId={question.id}
            isFileUploaded={question.isFileUploaded}
          />
            )
          : (
          <QuestionAttachmentView
            quizId={quizId}
            questionId={question.id}
            attachmentName={attachmentName}
            isFileUploaded={question.isFileUploaded}
          />
            )
      }
      {isFocused && (<div className={styles.parameterContainer}>
        <div className={styles.parameterContainer}>
          <label className={styles.checkboxContainer}>
            <input
              className={styles.checkbox}
              checked={isRequired}
              onChange={() => {
                dispatch(updateQuestion({
                  id,
                  type,
                  name,
                  isRequired: !isRequired,
                  value,
                  quizId,
                  index,
                  attachmentName,
                  isFileUploaded: question.isFileUploaded
                }))
              }}
              type="checkbox"
            />
            <h3 className={`${styles.title} ${styles.titleRed}`}>question is required*</h3>
          </label>
        </div>
        <div className={styles.parameterContainer}>
          <button
            className={`${styles.iconButton} ${styles.iconButtonRed}`}
            onClick={deleteCurrentQuestion}
          >
            <img src={trashCanIcon} alt="delete"/>
          </button>
        </div>
      </div>)}
    </div>
  )
}
