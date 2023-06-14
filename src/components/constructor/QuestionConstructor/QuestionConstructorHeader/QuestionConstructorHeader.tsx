import styles from "../QuestionConstructor.module.scss";
import { type QUESTION_TYPES } from "../../../../types/questionTypes";
import {
  type ChangeEvent,
  type Dispatch,
  type FC,
  type SetStateAction,
  useState,
} from "react";
import { updateQuestion } from "../../../../store/reducer/quizConstructor/quizThunks";
import { useAppDispatch } from "../../../../hooks/redux";
import { type TQuestion } from "../../../../store/reducer/quizConstructor/quizSlice";

interface PropsType {
  questionName: string;
  questionType: QUESTION_TYPES;
  isFocused: boolean;
  isRequired: boolean;
  question: TQuestion;
  quizId: string;
}

const QUESTION_TYPES_ARR: QUESTION_TYPES[] = [
  "TEXT",
  "FLAG",
  "SELECT",
  "OPTION",
];

export const QuestionConstructorHeader: FC<PropsType> = ({
  questionName,
  questionType,
  isRequired,
  isFocused,
  question,
  quizId,
}) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>(questionName);
  const [type, setType] = useState<QUESTION_TYPES>(questionType);
  const changeName = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };

  const updateQuestionAction = (): void => {
    const { id, type, name } = question;
    dispatch(
      updateQuestion({
        id,
        type,
        name,
        quizId,
      })
    );
  };

  const changeQuestionType = (event: ChangeEvent<HTMLSelectElement>) => {
    const type = event.target.value as QUESTION_TYPES;
    const { id, name } = question;
    dispatch(
      updateQuestion({
        id,
        type,
        name,
        quizId,
      })
    );
    setType(type);
  };

  return (
    <header>
      <div className={styles.wrapper}>
        <div className={styles.headerContainer}>
          <div className={styles.name}>
            <div>
              <span>{`${question.index + 1}. `}</span>
              <input
                className={styles.nameInput}
                value={name}
                onChange={changeName}
                type="text"
                onBlur={updateQuestionAction}
                placeholder="question name"
              />
            </div>
            {!isFocused && isRequired ? (
              <div className={styles.isRequiredLabel}>required*</div>
            ) : null}
          </div>
          <div className={`${styles.type} ${!isFocused ? styles.hidden : ""}`}>
            <select
              className={styles.selectType}
              name="questionType"
              value={question.type}
              onChange={changeQuestionType}
            >
              {QUESTION_TYPES_ARR.map((value: QUESTION_TYPES) => {
                return (
                  <option defaultValue={type} key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
