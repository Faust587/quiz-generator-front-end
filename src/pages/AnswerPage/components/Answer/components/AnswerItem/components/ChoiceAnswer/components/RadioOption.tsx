import styles from "../../../../../../../../../components/quiz/Quiz.module.scss";
import { FC } from "react";

type PropsType = {
  value: string;
  active: boolean;
};

export const RadioOption: FC<PropsType> = ({ value, active }) => {
  return (
    <div className={styles["answer__variant-input"]}>
      <label className={styles["variant-block__container"]}>
        <input
          disabled={true}
          className={styles["radio-variant"]}
          type="radio"
          checked={active}
        />
        <div className={styles["answer__variant__wrapper"]}>
          <div className={styles["answer__variant"]}>{value}</div>
        </div>
      </label>
    </div>
  );
};
