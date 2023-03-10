import { type FC, type MouseEvent } from 'react'
import styles from '../../QuestionConstructor.module.scss'
import {downloadIcon} from '../../../../../assets/'
import api from '../../../../../api/index'
import {IconButton} from "../../../../../UI/buttonElement";
import {cutQuestionAttachmentName} from "../../../../../utils/questionUtils";

interface PropsTypes {
  quizId: string
  questionId: string
  attachmentName: string | undefined
  isFileUploaded: boolean
}

export const QuestionAttachmentView: FC<PropsTypes> = (
  { questionId, quizId, isFileUploaded, attachmentName }
) => {
  const downloadAttachment = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.stopPropagation()
    if (!isFileUploaded) return;
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

  if (!isFileUploaded) return null;
  return (
    <div style={{ display: 'flex' }}>
      <IconButton
        onClick={downloadAttachment}
        icon={downloadIcon}
        alt="download attachment"
        hoverColor='yellow'
        width={40}
        height={40}
      />
      <span className={styles.description}>
        {cutQuestionAttachmentName(attachmentName)}
      </span>
    </div>
  )
}
