import {ChangeEvent, FC, useEffect, useRef, useState} from "react";
import {QUESTION_TYPES} from "../../../types/questionTypes";
import styles from "./QuestionConstructor.module.scss";
import trashCanIcon from "../../../assets/icons/trash-can.svg";
import uploadFileIcon from "../../../assets/icons/upload.svg";
import {QuestionText} from "./QuestionTypes/QuestionText/QuestionText";
import {QuestionFlag} from "./QuestionTypes/QuestionFlag/QuestionFlag";
import {QuestionOption} from "./QuestionTypes/QuestionOption/QuestionOption";
import {QuestionSelect} from "./QuestionTypes/QuestionSelect/QuestionSelect";
import {
  setActiveQuestion,
  updateQuestion,
  TQuestion,
  clearQuestionEditingLoading,
  clearQuestionEditingError
} from "../../../store/reducer/quizSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {isArray} from "lodash";
import Swal from "sweetalert2";

const QUESTION_TYPES_ARR: QUESTION_TYPES[] = ["FLAG", "TEXT", "SELECT", "OPTION"];

type propTypes = {
  data: TQuestion;
  isFocused: boolean;
  isUnfocused: boolean;
}

export const QuestionConstructor: FC<propTypes> = (
  {
    data, isFocused, isUnfocused
  }
) => {
  const [type, setType] = useState<QUESTION_TYPES>(data.type);
  const [name, setName] = useState<string>(data.name);
  const [isRequired, setIsRequired] = useState<boolean>(data.isRequired);
  const [value, setValue] = useState<string[]>(data.value);
  const quiz = useAppSelector(state => state.quizzes.currentQuiz);
  const { questionEditingLoading, questionEditingError } = useAppSelector(state => state.quizzes);
  const dispatch = useAppDispatch();

  const inputFile = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused) {
      setType(data.type);
      setName(data.name);
      setIsRequired(data.isRequired);
      setValue(data.value);
    }
  }, [data]);

  useEffect(() => {
    if (questionEditingLoading === 'failed') {
      let errorText: string;
      if (!questionEditingError) {
        errorText = "Sorry, unknown error, try again!"
      } else {
        if (isArray(questionEditingError.message)) {
          errorText = questionEditingError.message.join();
        } else {
          errorText = questionEditingError.message;
        }
      }
      Swal.fire(
        'Error!',
        errorText,
        'error'
      ).then(() => {
        dispatch(clearQuestionEditingLoading());
        dispatch(clearQuestionEditingError());
      });
    } else if (questionEditingLoading === 'succeeded') {
      dispatch(clearQuestionEditingLoading());
    }
  }, [questionEditingLoading]);

  const addValue = () => {
    if (!quiz) return;
    dispatch(updateQuestion({questionId: data.id, type, name, isRequired, value: [...value, "Variant"], quizId: quiz.id}));
    setValue([...value, "Variant"]);
  }

  const updateQuestionAction = () => {
    if (!quiz) return;
    dispatch(updateQuestion({questionId: data.id, type, name, isRequired, value, quizId: quiz.id}));
  }

  const changeQuestionType = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!quiz) return;
    const type = event.target.value as QUESTION_TYPES;
    dispatch(updateQuestion({questionId: data.id, type, name, isRequired, value, quizId: quiz.id}));
    setType(type);
  }

  const getTypeStructure = () => {
    if (!quiz) return;
    switch (type) {
      case "TEXT":
        return (
          <QuestionText isFocused={isFocused}/>
        );
      case "FLAG":
        return (
          <QuestionFlag isFocused={isFocused}/>
        );
      case "OPTION":
        return (
          <div>
            {value.map((item, index) => (
              <div
                className={styles.optionContainer}
                key={`${item}${index}`}
              >
                <QuestionOption
                  key={`${value}${index}`}
                  quizId={quiz.id}
                  data={data}
                  value={item}
                  index={index}
                  values={value}
                  setValue={setValue}
                  isFocused={isFocused}
                />
              </div>
            ))}
            {isFocused ? <div className={styles.addVariantButtonContainer}>
              <button
                onClick={addValue}
                className={styles.addVariantButton}
              >
                ADD VARIANT
              </button>
            </div> : null}
          </div>
        )
      case "SELECT":
        return (
          <QuestionSelect isFocused={isFocused}/>
        );
      default:
        return null
    }
  }

  return (
    <article
      className={`${styles.block} ${isFocused ? styles.blockFocused : ""}`}
      onClick={() => dispatch(setActiveQuestion(data.id))}
    >
      <header>
        <div className={styles.wrapper}>
          <div className={styles.headerContainer}>
            <div className={styles.name}>
              <input
                className={styles.nameInput}
                value={name}
                onChange={event => setName(event.target.value)}
                type="text"
                onBlur={updateQuestionAction}
                placeholder="question name"/>
              {
                (!isFocused && isRequired) ? (
                  <div className={styles.isRequiredLabel}>
                    required*
                  </div>
                ) : null
              }
            </div>
            <div className={`${styles.type} ${!isFocused ? styles.hidden : ""}`}>
              <select
                className={styles.selectType}
                name="questionType"
                value={type}
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
      <main className={styles.questionValue}>
        {
          getTypeStructure()
        }
      </main>
      <div className={styles.parameters}>
        {isFocused ? <div className={styles.parameterContainer}>
          <input ref={inputFile} style={{display: "none"}} type="file"/>
          <button
            className={`${styles.iconButton} ${styles.iconButtonGray}`}
            onClick={() => inputFile.current ? inputFile.current.click() : null}
          >
            <img src={uploadFileIcon} alt="upload file"/>
          </button>
          <span className={styles.description}>
            Upload any file here
          </span>
        </div> : null}
        <div className={`${!isFocused ? styles.hidden : null}`}>
          <div className={styles.parameterContainer}>
            <div className={styles.parameterContainer}>
              <label className={styles.checkboxContainer}>
                <input
                  className={styles.checkbox}
                  checked={isRequired}
                  onChange={() => {
                    if (!quiz) return;
                    dispatch(updateQuestion({questionId: data.id, type, name, isRequired: !isRequired, value, quizId: quiz.id}));
                  }}
                  type="checkbox"
                />
                <h3 className={`${styles.title} ${styles.titleRed}`}>question is required*</h3>
              </label>
            </div>
            <div className={styles.parameterContainer}>
              <button className={`${styles.iconButton} ${styles.iconButtonRed}`}>
                <img src={trashCanIcon} alt="delete"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
