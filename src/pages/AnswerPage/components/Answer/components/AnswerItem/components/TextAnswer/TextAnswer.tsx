import React, { FC } from "react";
import styles from "../../../../../../../../components/quiz/Quiz.module.scss";

type PropsType = {
  answer: string;
};

export const TextAnswer: FC<PropsType> = ({ answer }) => {
  return (
    <input
      value={answer}
      className={styles["answer__text-input"]}
      type="text"
      disabled
    />
  );
};
