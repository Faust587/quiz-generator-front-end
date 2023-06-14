import styles from "../../../Quiz.module.scss";
import { FC } from "react";
import { useAppDispatch } from "../../../../../hooks/redux";
import { setIntAnswer } from "../../../../../store/reducer/enteredQuiz/enteredQuizSlice";

type PropsType = {
  questionId: string;
  index: number;
  value: string;
};

export const RadioOption: FC<PropsType> = ({ questionId, index, value }) => {
  const dispatch = useAppDispatch();

  const changeActiveOption = () => {
    dispatch(setIntAnswer({ id: questionId, value: index }));
  };

  return (
    <div
      key={`${questionId}_${index}`}
      className={styles["answer__variant-input"]}
    >
      <label className={styles["variant-block__container"]}>
        <input
          className={styles["radio-variant"]}
          onChange={changeActiveOption}
          type="radio"
          id={`${questionId}_${index}`}
          name={questionId}
        />
        <div className={styles["answer__variant__wrapper"]}>
          <div className={styles["answer__variant"]}>{value}</div>
        </div>
      </label>
    </div>
  );
};
