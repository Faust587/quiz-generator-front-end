import styles from "../../../Quiz.module.scss";
import { FC } from "react";
import { useAppDispatch } from "../../../../../hooks/redux";
import { setIntAnswer } from "../../../../../store/reducer/enteredQuiz/enteredQuizSlice";

type PropsType = {
  value: string;
  index: number;
  questionId: string;
  isQuestionOpen: boolean;
};

export const SelectOption: FC<PropsType> = ({
  value,
  index,
  questionId,
  isQuestionOpen,
}) => {
  const dispatch = useAppDispatch();
  const selectOption = () => {
    if (!isQuestionOpen) return;
    dispatch(setIntAnswer({ value: index - 1, id: questionId }));
  };

  return (
    <div
      role="option"
      className={styles["select__option"]}
      onClick={selectOption}
    >
      {value}
    </div>
  );
};
