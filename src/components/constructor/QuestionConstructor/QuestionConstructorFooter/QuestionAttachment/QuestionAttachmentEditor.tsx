import { type Dispatch, type FC, type SetStateAction, useRef, useState } from 'react'
import styles from '../../QuestionConstructor.module.scss'
import trashCanIcon from '../../../../../assets/icons/trash-can.svg'
import uploadFileIcon from '../../../../../assets/icons/upload.svg'
import { deleteQuestionAttachment, uploadQuestionAttachment } from '../../../../../store/reducer/quizConstructor/quizThunks'
import { useAppDispatch } from '../../../../../hooks/redux'

interface PropsTypes {
  attachmentName: string | undefined
  setAttachmentName: Dispatch<SetStateAction<string | undefined>>
  quizId: string
  questionId: string
  isFileUploaded: boolean
}

export const QuestionAttachmentEditor: FC<PropsTypes> = (
  {
    attachmentName,
    setAttachmentName,
    quizId,
    questionId,
    isFileUploaded
  }
) => {
  const dispatch = useAppDispatch()
  const inputFile = useRef<HTMLInputElement>(null)
  const [isFileUploading, setIsFileUploading] = useState(false)
  const onFileChanges = async () => {
    if ((inputFile.current == null) || (inputFile.current.files == null)) return
    const file = inputFile?.current.files[0]
    if (file.name.length > 15) {
      setAttachmentName(`${file.name.slice(0, 15)}...`)
    }
    const encodedFileName = encodeURIComponent(file.name)
    const formData = new FormData()
    formData.append('file', file, encodedFileName)
    setIsFileUploading(true)
    dispatch(uploadQuestionAttachment({ quizId, questionId, formData }))
    setIsFileUploading(false)
  }

  const removeAttachment = () => {
    dispatch(deleteQuestionAttachment({ quizId, questionId }))
  }

  return (
    <div className={styles.parameterContainer}>
      <input ref={inputFile} onChange={onFileChanges} style={{ display: 'none' }} type="file"/>
      {(isFileUploaded && !isFileUploading)
        ? (
          <button
            className={`${styles.iconButton} ${styles.iconButtonRed}`}
            onClick={removeAttachment}
          >
            <img src={trashCanIcon} alt="delete"/>
          </button>
          )
        : (
          <button
            className={`${styles.iconButton} ${styles.iconButtonGray}`}
            onClick={() => {
              if (inputFile.current != null) inputFile.current.click()
            }
            }
          >
            <img src={uploadFileIcon} alt="upload file"/>
          </button>
          )}
      <span
        className={styles.description}
        onClick={onFileChanges}
      >
            {(attachmentName && !isFileUploading) ? attachmentName : null}
        {(!attachmentName && !isFileUploading) ? 'Upload your file here' : null}
        {isFileUploading ? 'uploading...' : null}
          </span>
    </div>
  )
}
