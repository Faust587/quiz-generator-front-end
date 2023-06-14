import styles from "./Answer.module.scss";
import { IQuestionAnswer } from "../../../../store/reducer/answers/types";
import { FC } from "react";
import { AnswerItem } from "./components/AnswerItem/AnswerItem";
import { isArray, isNumber } from "lodash";
import { SimpleButton } from "../../../../UI/buttonElement/SimpleButton/SimpleButton";
import { useNavigate } from "react-router-dom";

type PropsType = {
  quizId: string;
  answers: IQuestionAnswer[];
};

export const Answer: FC<PropsType> = ({ answers, quizId }) => {
  const navigate = useNavigate();
  return (
    <div className={styles["container"]}>
      {answers.map(
        ({
          index,
          type,
          name,
          answerText,
          answerInt,
          answerArrInt,
          value,
          id,
        }) => {
          let answer: string | number | number[] | null;
          if (answerText) {
            answer = answerText;
          } else if (isNumber(answerInt) || answerInt === null) {
            answer = answerInt;
          } else if (isArray(answerArrInt)) {
            answer = answerArrInt;
          } else {
            return null;
          }
          return (
            <AnswerItem
              key={id}
              id={id}
              index={index}
              type={type}
              name={name}
              answer={answer}
              variants={value}
            />
          );
        }
      )}
      <SimpleButton
        text={"Back"}
        onClick={() => navigate(`/quiz-generator/${quizId}`)}
      />
    </div>
  );
};
