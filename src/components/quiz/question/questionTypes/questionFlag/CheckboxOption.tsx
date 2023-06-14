import styles from "../../../Quiz.module.scss";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch } from "../../../../../hooks/redux";
import {
  addArrIntAnswer,
  removeArrIntAnswer,
} from "../../../../../store/reducer/enteredQuiz/enteredQuizSlice";

type PropsType = {
  questionId: string;
  index: number;
  value: string;
};

export const CheckboxOption: FC<PropsType> = ({ questionId, index, value }) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (checked) {
      dispatch(addArrIntAnswer({ id: questionId, value: index }));
    } else {
      dispatch(removeArrIntAnswer({ id: questionId, value: index }));
    }
  }, [checked]);

  return (
    <div
      key={`${questionId}_${index}`}
      className={styles["answer__variant-input"]}
    >
      <label className={styles["variant-block__container"]}>
        <input
          checked={checked}
          className={styles["checkbox-variant"]}
          onChange={() => setChecked((prevState) => !prevState)}
          type="checkbox"
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
