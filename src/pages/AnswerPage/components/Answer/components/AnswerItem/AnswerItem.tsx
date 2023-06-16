import { FC } from "react";
import { ChoiceAnswer } from "./components/ChoiceAnswer/ChoiceAnswer";
import { TextAnswer } from "./components/TextAnswer/TextAnswer";
import _ from "lodash";
import styles from "../../../../../../components/quiz/Quiz.module.scss";
import { QuizInput } from "../../../../../../UI/inputElement/quizInput/QuizInput";

type PropsType = {
  id: string;
  index: number;
  type: "FLAG" | "TEXT" | "SELECT" | "OPTION";
  name: string;
  answer: string | number | number[] | null;
  variants?: string[];
};

export const AnswerItem: FC<PropsType> = ({
  id,
  index,
  type,
  name,
  answer,
  variants,
}) => {
  function getType() {
    switch (type) {
      case "FLAG":
      case "SELECT":
      case "OPTION": {
        if (
          (_.isNumber(answer) || answer === null || _.isArray(answer)) &&
          !!variants
        ) {
          return (
            <ChoiceAnswer
              key={`${id}_${index}`}
              type={type}
              chosenVariant={answer}
              variants={variants}
            />
          );
        }
        return null;
      }
      case "TEXT": {
        if (typeof answer === "string") {
          return <TextAnswer answer={answer} />;
        }
        return null;
      }
      default: {
        return null;
      }
    }
  }

  return (
    <div className={styles["question__wrapper"]}>
      <div className={styles["question__container"]}>
        <section className={styles["question__header"]}>
          <div className={styles["question__text"]}>
            {`${index + 1}. `}
            <QuizInput value={name} isDisabled={true} />
          </div>
        </section>
        <section className={styles["question__values-block"]}>
          {getType()}
        </section>
      </div>
    </div>
  );
};
