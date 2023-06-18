import { Dispatch, FC, SetStateAction, FocusEvent } from "react";
import styles from "../../../components/constructor/QuestionConstructor/QuestionConstructor.module.scss";

type PropsType = {
  value: string;
  setValue?: Dispatch<SetStateAction<string>>;
  isDisabled: boolean;
  onBlurAction?: (event: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export const QuizInput: FC<PropsType> = ({
  value,
  setValue,
  isDisabled,
  onBlurAction,
  placeholder,
}) => {
  console.log('worked!!!')
  if (isDisabled) {
    return <div className={styles.nameInput}>{value}</div>;
  }
  return (
    <input
      className={styles.nameInput}
      value={value}
      onChange={(event) => (setValue ? setValue(event.target.value) : null)}
      onBlur={onBlurAction}
      type="text"
      disabled={isDisabled}
      placeholder={placeholder}
    />
  );
};
