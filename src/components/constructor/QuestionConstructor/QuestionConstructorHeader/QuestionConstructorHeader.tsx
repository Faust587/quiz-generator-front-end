import styles from '../QuestionConstructor.module.scss';
import {QUESTION_TYPES} from '../../../../types/questionTypes';
import {ChangeEvent, Dispatch, FC, SetStateAction} from 'react';
import {updateQuestion} from '../../../../store/reducer/quizConstructor/quizThunks';
import {useAppDispatch} from '../../../../hooks/redux';
import {TQuestion} from '../../../../store/reducer/quizConstructor/quizSlice';

type PropsType = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  isFocused: boolean;
  isRequired: boolean;
  question: TQuestion;
  quizId: string;
  setType: Dispatch<SetStateAction<QUESTION_TYPES>>;
}

const QUESTION_TYPES_ARR: QUESTION_TYPES[] = ['TEXT', 'FLAG', 'SELECT', 'OPTION'];

export const QuestionConstructorHeader: FC<PropsType> = (
  {
    setName,
    name,
    isRequired,
    isFocused,
    question,
    quizId,
    setType
  }
) => {

  const dispatch = useAppDispatch()
  const changeName = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value)
  }

  const updateQuestionAction = (): void => {
    const {
      id, type, name, isRequired, attachmentName, isFileUploaded, value, index
    } = question;
    dispatch(updateQuestion({
      questionId: id,
      type,
      name,
      isRequired,
      value,
      quizId,
      index,
      attachmentName,
      isFileUploaded,
    }));
  };

  const changeQuestionType = (event: ChangeEvent<HTMLSelectElement>) => {
    const type = event.target.value as QUESTION_TYPES;
    const {
      id, name, isRequired, attachmentName, isFileUploaded, value, index
    } = question;
    dispatch(updateQuestion({
      questionId: id,
      type,
      name,
      isRequired,
      value,
      quizId,
      index,
      attachmentName,
      isFileUploaded,
    }));
    setType(type);
  };

  return (
    <header>
      <div className={styles.wrapper}>
        <div className={styles.headerContainer}>
          <div className={styles.name}>
            <div>
                  <span>
                    {`${question.index + 1}. `}
                  </span>
              <input
                className={styles.nameInput}
                value={name}
                onChange={changeName}
                type="text"
                onBlur={updateQuestionAction}
                placeholder="question name"
              />
            </div>
            {
              (!isFocused && isRequired)
                ? (
                  <div className={styles.isRequiredLabel}>
                    required*
                  </div>
                )
                : null
            }
          </div>
          <div className={`${styles.type} ${!isFocused ? styles.hidden : ''}`}>
            <select
              className={styles.selectType}
              name="questionType"
              value={question.type}
              onChange={changeQuestionType}
            >
              {
                QUESTION_TYPES_ARR.map((value: QUESTION_TYPES) => {
                  return (
                    <option
                      key={value}
                      value={value}
                    >
                      {value}
                    </option>
                  )
                })
              }
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
