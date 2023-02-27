import { type FC, type MouseEvent } from 'react'
import styles from '../../QuestionConstructor.module.scss'
import downloadFileIcon from '../../../../../assets/icons/download_icon.svg'
import api from '../../../../../api/index'

interface PropsTypes {
  quizId: string
  questionId: string
  attachmentName: string | undefined
  isFileUploaded: boolean
}

export const QuestionAttachmentView: FC<PropsTypes> = (
  { questionId, quizId, isFileUploaded, attachmentName }
) => {
  const downloadAttachment = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (!isFileUploaded) return
    const file = await api.get(
      `/question/attachment/${quizId}/${questionId}`,
      { responseType: 'arraybuffer' }
    )
    const blob = new Blob([file.data], {
      type: file.headers['content-type'] || 'application/octet-stream',
      endings: 'native'
    })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = attachmentName || 'file'
    a.click()
    a.remove()
  }

  if (!isFileUploaded) return null
  return (
    <div style={{ display: 'flex' }}>
      <button
        className={`${styles.iconButton} ${styles.iconButtonGray}`}
        onClick={downloadAttachment}
      >
        <img src={downloadFileIcon} alt="download file"/>
      </button>
      <span className={styles.description}>
        {attachmentName}
      </span>
    </div>
  )
}
