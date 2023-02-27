import { type Dispatch, type FC, type SetStateAction, type ChangeEvent, useState } from 'react'
import styles from '../QuestionType.module.scss'
import { updateQuestion } from '../../../../../store/reducer/quizConstructor/quizThunks'
import { useAppDispatch } from '../../../../../hooks/redux'
import { type QUESTION_TYPES } from '../../../../../types/questionTypes'
import { type TQuestion } from '../../../../../store/reducer/quizConstructor/quizSlice'

interface propTypes {
  quizId: string
  type: QUESTION_TYPES
  data: TQuestion
  isFocused: boolean
  value: string
  values: string[]
  index: number
  setValue: Dispatch<SetStateAction<string[]>>
  isFileUploaded: boolean
}

export const QuestionOption: FC<propTypes> = (
  {
    isFocused,
    quizId,
    data,
    value,
    type,
    setValue,
    index,
    values,
    isFileUploaded
  }
) => {
  const [localValue, setLocalValue] = useState<string>(value)
  const dispatch = useAppDispatch()

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValues = [...values]
    newValues.splice(index, 1, e.target.value)
    dispatch(updateQuestion({
      questionId: data.id,
      type: data.type,
      name: data.name,
      isRequired: data.isRequired,
      value: newValues,
      quizId,
      index: data.index,
      isFileUploaded,
      attachmentName: data.attachmentName
    }))
    setValue(newValues)
  }

  const deleteVariant = () => {
    const newValues = [...values]
    newValues.splice(index, 1)
    dispatch(updateQuestion({
      questionId: data.id,
      type: data.type,
      name: data.name,
      isRequired: data.isRequired,
      value: newValues,
      quizId,
      index: data.index,
      isFileUploaded,
      attachmentName: data.attachmentName
    }))
    setValue(newValues)
  }

  return (
    <label className={styles.radioButtonItem}>
      <div className={styles.radioButtonContainer}>
        {(type === 'OPTION') ? <div className={styles.radioButton}/> : null}
        {(type === 'FLAG') ? <div className={styles.flagButton}/> : null}
        {(type === 'SELECT') ? `${index + 1}.` : null}
      </div>
      <input
        onBlur={onValueChange}
        onChange={event => { setLocalValue(event.target.value) }}
        className={styles.descriptionInput}
        value={localValue}
        type="text"/>
      <div className={styles.removeItemButtonContainer}>
        {(isFocused && values.length > 1)
          ? <button
          className={styles.removeItemButton}
          onClick={deleteVariant}
        >
          ×
        </button>
          : null}
      </div>
    </label>
  )
}
