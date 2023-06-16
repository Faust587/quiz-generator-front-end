import { FC } from "react";
import styles from "../../../Quiz.module.scss";
import { RadioOption } from "./RadioOption";

type PropsType = {
  questionId: string;
  values: string[];
};

export const QuestionOption: FC<PropsType> = ({ values, questionId }) => {
  return (
    <div className={styles["answer__variants-block"]}>
      {values.map((value, index) => {
        return (
          <RadioOption
            key={`${value}_${index}`}
            questionId={questionId}
            index={index}
            value={value}
          />
        );
      })}
    </div>
  );
};
