import {ChangeEvent, MouseEvent, FC, useCallback, useEffect, useRef, useState} from "react";
import {QUESTION_TYPES} from "../../../types/questionTypes";
import styles from "./QuestionConstructor.module.scss";
import trashCanIcon from "../../../assets/icons/trash-can.svg";
import uploadFileIcon from "../../../assets/icons/upload.svg";
import downloadFileIcon from "../../../assets/icons/download_icon.svg";
import {QuestionText} from "./QuestionTypes/QuestionText/QuestionText";
import {QuestionOption} from "./QuestionTypes/QuestionOption/QuestionOption";
import {
  setActiveQuestion,
  TQuestion,
  clearQuestionEditingLoading,
  clearQuestionEditingError,
  clearQuestionDeletingLoading,
  clearQuestionDeletingError,
  TDeleteResponse,
  TError,
  removeQuestionFromState,
  setQuizForChangingOrder,
  setQuestionMoving
} from "../../../store/reducer/quiz/quizSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {isArray} from "lodash";
import Swal from "sweetalert2";
import {
  deleteQuestion,
  deleteQuestionAttachment,
  updateQuestion,
  uploadQuestionAttachment
} from '../../../store/reducer/quiz/quizThunks';
import {cutQuestionAttachmentName} from '../../../utils/questionUtils';
import api from '../../../api';

const QUESTION_TYPES_ARR: QUESTION_TYPES[] = ["TEXT", "FLAG", "SELECT", "OPTION"];

type propTypes = {
  data: TQuestion;
  isFocused: boolean;
  isUnfocused: boolean;
}

export const QuestionConstructor: FC<propTypes> = (
  {
    data, isFocused
  }
) => {
  const [type, setType] = useState<QUESTION_TYPES>(data.type);
  const [name, setName] = useState<string>(data.name);
  const [isRequired, setIsRequired] = useState<boolean>(data.isRequired);
  const [value, setValue] = useState<string[]>(data.value);
  const [attachmentName, setAttachmentName] = useState<string | undefined>(
    cutQuestionAttachmentName(data.attachmentName)
  );
  const [isFileUploading, setIsFileUploading] = useState(false);
  const quiz = useAppSelector(state => state.quizzes.currentQuiz);

  const {
    questionEditingLoading,
    questionEditingError,
    questionDeletingLoading,
    changeQuestionOrder,
    currentQuiz,
  } = useAppSelector(state => state.quizzes);
  const dispatch = useAppDispatch();

  const inputFile = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused) {
      setType(data.type);
      setName(data.name);
      setIsRequired(data.isRequired);
      setValue(data.value);
      setAttachmentName(cutQuestionAttachmentName(data.attachmentName));
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

  useEffect(() => {
    if (questionDeletingLoading === 'failed') {
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
        dispatch(clearQuestionDeletingLoading());
        dispatch(clearQuestionDeletingError());
      });
    } else if (questionDeletingLoading === 'succeeded') {
      dispatch(clearQuestionDeletingLoading());
    }
  }, [questionDeletingLoading]);

  const addValue = () => {
    if (!quiz) return;
    dispatch(updateQuestion({
      questionId: data.id,
      type,
      name,
      isRequired,
      value: [...value, "Variant"],
      quizId: quiz.id,
      index: data.index,
      attachmentName,
      isFileUploaded: !!attachmentName,
    }));
    setValue([...value, "Variant"]);
  }

  const updateQuestionAction = () => {
    if (!quiz) return;
    dispatch(updateQuestion({
      questionId: data.id,
      type,
      name,
      isRequired,
      value,
      quizId: quiz.id,
      index: data.index,
      attachmentName,
      isFileUploaded: !!attachmentName,
    }));
  }

  const changeQuestionType = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!quiz) return;
    const type = event.target.value as QUESTION_TYPES;
    dispatch(updateQuestion({
      questionId: data.id,
      type,
      name,
      isRequired,
      value,
      quizId: quiz.id,
      index: data.index,
      attachmentName,
      isFileUploaded: !!attachmentName,
    }));
    setType(type);
  }

  const isTError = (payload: TError | TDeleteResponse): payload is TError => {
    return (payload as TError).statusCode !== undefined;
  }

  const deleteCurrentQuestion = () => {
    if (!quiz) return;
    dispatch(deleteQuestion({questionId: data.id, quizId: quiz.id})).then((result) => {
      const payload = result.payload;
      if (!payload) return;
      if (!isTError(payload) && payload.acknowledged) {
        dispatch(removeQuestionFromState(data.id))
      }
    });
  }

  const getTypeStructure = () => {
    if (!quiz) return;
    switch (type) {
      case "TEXT":
        return (
          <QuestionText isFocused={isFocused}/>
        );
      case "OPTION":
      case "FLAG":
      case "SELECT":
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
                  type={type}
                  data={data}
                  value={item}
                  index={index}
                  values={value}
                  setValue={setValue}
                  isFocused={isFocused}
                  isFileUploaded={!!attachmentName}
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
        );
      default:
        return null
    }
  }
  const isQuestionMoves = useAppSelector(state => state.quizzes.isQuestionMoves);

  const onDocumentClick = useCallback(function (_: any) {
    dispatch(setQuestionMoving(false));
    dispatch(setQuizForChangingOrder(null));
  }, []);

  useEffect(() => {
    if (isQuestionMoves) {
      document.addEventListener("click", onDocumentClick, false);
    } else {
      document.removeEventListener("click", onDocumentClick, false);
    }
  }, [isQuestionMoves]);

  const onFileChanges = async () => {
    if (!inputFile.current || !inputFile.current.files || !currentQuiz) return;
    const file = inputFile?.current.files[0];
    if (file.name.length > 15) {
      setAttachmentName(`${file.name.slice(0, 15)}...`);
    }
    const encodedFileName = encodeURIComponent(file.name);
    let formData = new FormData();
    formData.append('file', file, encodedFileName);
    setIsFileUploading(true);
    dispatch(uploadQuestionAttachment({quizId: currentQuiz.id, questionId: data.id, formData}));
    setIsFileUploading(false);
  }

  const downloadAttachment = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!currentQuiz || !data.attachmentName) return;
    const file = await api.get(
      `/question/attachment/${currentQuiz.id}/${data.id}`,
      {responseType: 'arraybuffer'}
    );
    const blob = new Blob([file.data], {
      type: file.headers['content-type'] || 'application/octet-stream',
      endings: 'native',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = data.attachmentName;
    a.click();
  }

  const removeAttachment = () => {
    if (!currentQuiz) return;
    dispatch(deleteQuestionAttachment({quizId: currentQuiz.id, questionId: data.id}))
  }

  return (
      <article
        className={`${styles.block} ${isFocused ? styles.blockFocused : ""} 
        ${(changeQuestionOrder === data.index) ? styles.changeOrderBlock : ""}
        ${(isQuestionMoves && changeQuestionOrder !== data.index) ? styles.changeOrderBlockHidden : ""}`}
        onClick={(event) => {
          event.stopPropagation();
          dispatch(setActiveQuestion(data.id));
          dispatch(setQuestionMoving(false));
          dispatch(setQuizForChangingOrder(null));
        }}
      >
        {
          isFocused ? (
            <div
              className={styles.movableContainer}>
              <button
                className={styles.moveOrderButton}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setQuizForChangingOrder(data.index));
                  dispatch(setQuestionMoving(true))
                }}
              >
                Change order
              </button>
              {isQuestionMoves ? "Just click to another position" : null}
            </div>
          ) : null
        }
        <header>
          <div className={styles.wrapper}>
            <div className={styles.headerContainer}>
              <div className={styles.name}>
                <div>
                  <span>
                    {`${data.index + 1}. `}
                  </span>
                  <input
                    className={styles.nameInput}
                    value={name}
                    onChange={event => setName(event.target.value)}
                    type="text"
                    onBlur={updateQuestionAction}
                    placeholder="question name"
                  />
                </div>
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
            <input ref={inputFile} onChange={onFileChanges} style={{display: "none"}} type="file"/>
            {(attachmentName && !isFileUploading) ? (
              <button
                className={`${styles.iconButton} ${styles.iconButtonRed}`}
                onClick={removeAttachment}
              >
                <img src={trashCanIcon} alt="delete"/>
              </button>
            ) : (
              <button
                className={`${styles.iconButton} ${styles.iconButtonGray}`}
                onClick={() => inputFile.current ? inputFile.current.click() : null}
              >
                <img src={uploadFileIcon} alt="upload file"/>
              </button>
            )}
            <span
              className={styles.description}
              onClick={onFileChanges}
            >
            {(attachmentName && !isFileUploading) ? attachmentName : null}
            {(!attachmentName && !isFileUploading) ? "Upload your file here" : null}
            {isFileUploading ? "uploading..." : null}
          </span>
          </div> : data.isFileUploaded ? (
            <div style={{display: 'flex'}}>
              <button
                className={`${styles.iconButton} ${styles.iconButtonGray}`}
                onClick={downloadAttachment}
              >
                <img src={downloadFileIcon} alt="download file"/>
              </button>
              <span className={styles.description}>
                {attachmentName}
              </span>
            </div>
          ) : null}
          <div className={`${!isFocused ? styles.hidden : null}`}>
            <div className={styles.parameterContainer}>
              <div className={styles.parameterContainer}>
                <label className={styles.checkboxContainer}>
                  <input
                    className={styles.checkbox}
                    checked={isRequired}
                    onChange={() => {
                      if (!quiz) return;
                      dispatch(updateQuestion({
                        questionId: data.id,
                        type,
                        name,
                        isRequired: !isRequired,
                        value,
                        quizId: quiz.id,
                        index: data.index,
                        attachmentName,
                        isFileUploaded: !!attachmentName,
                      }));
                    }}
                    type="checkbox"
                  />
                  <h3 className={`${styles.title} ${styles.titleRed}`}>question is required*</h3>
                </label>
              </div>
              <div className={styles.parameterContainer}>
                <button
                  className={`${styles.iconButton} ${styles.iconButtonRed}`}
                  onClick={deleteCurrentQuestion}
                >
                  <img src={trashCanIcon} alt="delete"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
  );
}
