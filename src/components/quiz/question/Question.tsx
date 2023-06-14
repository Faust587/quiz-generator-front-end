import styles from "../Quiz.module.scss";
import { FC } from "react";
import { TQuestion } from "../../../store/reducer/quizConstructor/quizSlice";
import { QuizInput } from "../../../UI/inputElement/quizInput/QuizInput";
import { QuestionType } from "./questionTypes/QuestionType";
import { QuestionAttachment } from "./questionAttachment/QuestionAttachment";
import { useAppSelector } from "../../../hooks/redux";

type PropsType = {
  question: TQuestion;
  quizId: string;
};

export const Question: FC<PropsType> = ({ question, quizId }) => {
  const {
    id,
    name,
    attachmentName,
    type,
    value,
    index,
    isRequired,
    isFileUploaded,
  } = question;
  const { missingAnswer } = useAppSelector((state) => state.enteredQuiz);
  return (
    <div className={styles["question__wrapper"]}>
      {missingAnswer === id && "ANSWER THIS"}
      <div className={styles["question__container"]}>
        <section className={styles["question__header"]}>
          <div className={styles["question__text"]}>
            {`${index + 1}. `}
            <QuizInput value={name} isDisabled={true} />
          </div>
          {isRequired && (
            <div className={styles["question__is-required__wrapper"]}>
              <div className={styles["question__text--red"]}>required*</div>
            </div>
          )}
        </section>
        <section className={styles["question__values-block"]}>
          <QuestionType type={type} values={value} questionId={id} />
        </section>
        <section>
          <QuestionAttachment
            attachmentName={attachmentName}
            isFileUploaded={isFileUploaded}
            questionId={id}
            quizId={quizId}
          />
        </section>
      </div>
    </div>
  );
};
