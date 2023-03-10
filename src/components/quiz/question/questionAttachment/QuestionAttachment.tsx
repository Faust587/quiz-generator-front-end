import {FC} from "react";
import styles from '../../Quiz.module.scss';
import {
  QuestionAttachmentView
} from "../../../constructor/QuestionConstructor/QuestionConstructorFooter/QuestionAttachment/QuestionAttachmentView";

type PropsType = {
  attachmentName: string | undefined;
  isFileUploaded: boolean;
  questionId: string;
  quizId: string;
}

export const QuestionAttachment: FC<PropsType> = (
  {
    attachmentName,
    isFileUploaded,
    quizId,
    questionId,
  }
) => {

  return (
    <div className={styles['attachment__wrapper']}>
      <div className={styles['attachment__container']}>
        <QuestionAttachmentView
          questionId={questionId}
          attachmentName={attachmentName}
          isFileUploaded={isFileUploaded}
          quizId={quizId}
        />
      </div>
    </div>
  );
}
