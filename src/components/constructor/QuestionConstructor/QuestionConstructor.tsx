import React, { type FC, useCallback, useEffect, useState } from 'react';
import { type QUESTION_TYPES } from '../../../types/questionTypes';
import styles from './QuestionConstructor.module.scss';
import { QuestionText } from './QuestionTypes/QuestionText/QuestionText';
import { QuestionOption } from './QuestionTypes/QuestionOption/QuestionOption';
import {
  setActiveQuestion,
  type TQuestion,
  clearQuestionEditingLoading,
  clearQuestionEditingError,
  clearQuestionDeletingLoading,
  clearQuestionDeletingError,
  setQuizForChangingOrder,
  setQuestionMoving
} from '../../../store/reducer/quizConstructor/quizSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { isArray } from 'lodash';
import SweetAlert from 'sweetalert2';
import { updateQuestion } from '../../../store/reducer/quizConstructor/quizThunks';
import { cutQuestionAttachmentName } from '../../../utils/questionUtils';
import { MoveQuestion } from './MoveQuestion/MoveQuestion';
import { QuestionConstructorHeader } from './QuestionConstructorHeader/QuestionConstructorHeader';
import { QuestionConstructorFooter } from './QuestionConstructorFooter/QuestionConstructorFooter';

interface propTypes {
  data: TQuestion
  isFocused: boolean
  isUnfocused: boolean
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
  const [attachmentName, setAttachmentName] = useState<string | undefined>(data.attachmentName);
  const quiz = useAppSelector(state => state.quizzes.currentQuiz);

  const {
    questionEditingLoading,
    questionEditingError,
    questionDeletingLoading,
    changeQuestionOrder
  } = useAppSelector(state => state.quizzes);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFocused) {
      setType(data.type);
      setName(data.name);
      setIsRequired(data.isRequired);
      setValue(data.value);
      setAttachmentName(data.attachmentName);
    }
  }, [data, isFocused]);

  useEffect(() => {
    if (questionEditingLoading === 'failed') {
      let errorText: string;
      if (questionEditingError == null) {
        errorText = 'Sorry, unknown error, try again!';
      } else {
        if (isArray(questionEditingError.message)) {
          errorText = questionEditingError.message.join();
        } else {
          errorText = questionEditingError.message;
        }
      }
      SweetAlert.fire(
        'Error!',
        errorText,
        'error'
      ).then(() => {
        dispatch(clearQuestionEditingLoading());
        dispatch(clearQuestionEditingError());
      }).catch(reason => { console.log(reason); });
    } else if (questionEditingLoading === 'succeeded') {
      dispatch(clearQuestionEditingLoading());
    }
  }, [dispatch, questionEditingError, questionEditingLoading]);

  useEffect(() => {
    if (questionDeletingLoading === 'failed') {
      let errorText: string;
      if (questionEditingError == null) {
        errorText = 'Sorry, unknown error, try again!';
      } else {
        if (isArray(questionEditingError.message)) {
          errorText = questionEditingError.message.join();
        } else {
          errorText = questionEditingError.message;
        }
      }
      SweetAlert.fire(
        'Error!',
        errorText,
        'error'
      ).then(() => {
        dispatch(clearQuestionDeletingLoading());
        dispatch(clearQuestionDeletingError());
      }).catch(reason => { console.log(reason); });
    } else if (questionDeletingLoading === 'succeeded') {
      dispatch(clearQuestionDeletingLoading());
    }
  }, [dispatch, questionDeletingLoading, questionEditingError]);

  const addValue = (): void => {
    if (quiz == null) return;
    dispatch(updateQuestion({
      id: data.id,
      type,
      name,
      isRequired,
      value: [...value, 'Variant'],
      quizId: quiz.id,
      index: data.index,
      attachmentName,
      isFileUploaded: !!attachmentName
    })).catch(reason => { console.log(reason); });
    setValue([...value, 'Variant']);
  };

  const getTypeStructure = (): JSX.Element | null => {
    if (quiz == null) return null;
    switch (type) {
      case 'TEXT':
        return (
          <QuestionText isFocused={isFocused}/>
        );
      case 'OPTION':
      case 'FLAG':
      case 'SELECT':
        return (
          <div>
            {value.map((item, index) => (
              <div
                className={styles.optionContainer}
                key={`${item}${index}`}
              >
                <QuestionOption
                  key={`${item}${index}`}
                  questionId={data.id}
                  quizId={quiz.id}
                  type={type}
                  value={item}
                  index={index}
                  values={value}
                  setValue={setValue}
                  isFocused={isFocused}
                  isFileUploaded={!!attachmentName}
                />
              </div>
            ))}
            {isFocused
              ? <div className={styles.addVariantButtonContainer}>
              <button
                onClick={addValue}
                className={styles.addVariantButton}
              >
                ADD VARIANT
              </button>
            </div>
              : null}
          </div>
        );
      default:
        return null;
    }
  };
  const isQuestionMoves = useAppSelector(state => state.quizzes.isQuestionMoves);

  const onDocumentClick = useCallback(function (_: any) {
    dispatch(setQuestionMoving(false));
    dispatch(setQuizForChangingOrder(null));
  }, [dispatch]);

  useEffect(() => {
    if (isQuestionMoves) {
      document.addEventListener('click', onDocumentClick, false);
    } else {
      document.removeEventListener('click', onDocumentClick, false);
    }
  }, [isQuestionMoves, onDocumentClick]);

  if (quiz == null) return <p>Loading...</p>;
  return (
      <article
        className={
          `${styles.block} ${isFocused ? styles.blockFocused : ''} 
          ${changeQuestionOrder === data.index ? styles.changeOrderBlock : ''}
          ${
            (isQuestionMoves && changeQuestionOrder !== data.index) ? styles.changeOrderBlockHidden : ''}`
        }
        onClick={(event): void => {
          event.stopPropagation();
          dispatch(setActiveQuestion(data.id));
          dispatch(setQuestionMoving(false));
          dispatch(setQuizForChangingOrder(null));
        }}
      >
        <MoveQuestion
          isFocused={isFocused}
          isQuestionMoves={isQuestionMoves}
          questionIndex={data.index}
        />
        <QuestionConstructorHeader
          isFocused={isFocused}
          question={data}
          quizId={quiz.id}
          questionName={name}
          questionType={type}
          isRequired={isRequired}
        />
        <main className={styles.questionValue}>
          {
            getTypeStructure()
          }
        </main>
        <QuestionConstructorFooter
          isFocused={isFocused}
          question={data}
          quizId={quiz.id}
          questionAttachmentName={attachmentName}
        />
      </article>
  );
};
