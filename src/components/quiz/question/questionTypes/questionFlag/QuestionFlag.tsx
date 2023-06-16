import { FC } from "react";
import styles from "../../../Quiz.module.scss";
import { CheckboxOption } from "./CheckboxOption";

type PropsType = {
  questionId: string;
  values: string[];
};

export const QuestionFlag: FC<PropsType> = ({ values, questionId }) => {
  return (
    <div className={styles["answer__variants-block"]}>
      {values.map((value, index) => {
        return (
          <CheckboxOption
            key={`${questionId}_${index}`}
            questionId={questionId}
            index={index}
            value={value}
          />
        );
      })}
    </div>
  );
};
