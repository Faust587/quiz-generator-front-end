import styles from "../../../../../../../../../components/quiz/Quiz.module.scss";
import { FC } from "react";

type PropsType = {
  value: string;
  active: boolean;
};

export const CheckBoxOption: FC<PropsType> = ({ value, active }) => {
  return (
    <div className={styles["answer__variant-input"]}>
      <label className={styles["variant-block__container"]}>
        <input
          disabled={true}
          checked={active}
          className={styles["checkbox-variant"]}
          type="checkbox"
        />
        <div className={styles["answer__variant__wrapper"]}>
          <div className={styles["answer__variant"]}>{value}</div>
        </div>
      </label>
    </div>
  );
};
