import React, { FC, useState } from "react";
import styles from "../../../Quiz.module.scss";
import { useAppDispatch } from "../../../../../hooks/redux";
import { setTextAnswer } from "../../../../../store/reducer/enteredQuiz/enteredQuizSlice";

type PropsType = {
  questionId: string;
};

export const QuestionText: FC<PropsType> = ({ questionId }) => {
  const [answer, setAnswer] = useState<string>("");
  const dispatch = useAppDispatch();

  const saveAnswer = () => {
    dispatch(setTextAnswer({ id: questionId, value: answer }));
  };

  return (
    <input
      onBlur={saveAnswer}
      value={answer}
      onChange={(event) => setAnswer(event.target.value)}
      className={styles["answer__text-input"]}
      placeholder="Answer to this question"
      type="text"
    />
  );
};
