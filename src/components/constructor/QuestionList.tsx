import React, { useEffect, useRef } from 'react';
import styles from './QuestionList.module.scss';
import { isArray } from 'lodash';
import SweetAlert from 'sweetalert2';
import { useSelector } from 'react-redux';

import {
  useAppDispatch,
  useAppSelector
} from '../../hooks/redux';
import {
  clearQuestionCreatingError,
  clearQuestionCreatingLoading,
  setActiveQuestion,
  type TQuestion
} from '../../store/reducer/quizConstructor/quizSlice';
import { OrderZone } from './OrderZone/OrderZone';
import { createQuestion } from '../../store/reducer/quizConstructor/quizThunks';
import { QuestionConstructor } from './QuestionConstructor/QuestionConstructor';
import { type RootState } from '../../store';

export const QuestionList = (): JSX.Element => {
  const {
    currentQuiz,
    quizLoading,
    questionCreatingLoading,
    questionCreatingError
  } = useAppSelector(state => state.quizzes);
  const focusedQuestion = useSelector<RootState>(state => state.quizzes.focusedQuestion);
  const unfocusedQuestion = useSelector<RootState>(state => state.quizzes.unfocusedQuestion);
  const isQuestionMoves = useAppSelector(state => state.quizzes.isQuestionMoves);
  const dispatch = useAppDispatch();
  const createQuestionButton = useRef<HTMLButtonElement>(null);
  const addQuestion = async (): Promise<void> => {
    if (currentQuiz == null) return;
    const sampleQuestion: Omit<TQuestion, 'id' | 'index'> & { quizId: string } = {
      quizId: currentQuiz.id,
      name: 'Question',
      value: [],
      type: 'TEXT',
      isRequired: false,
      isFileUploaded: false,
      attachmentName: undefined
    };
    dispatch(createQuestion(sampleQuestion)).catch((data) => {
      console.log(data);
    });
  };

  useEffect(() => {
    if (questionCreatingLoading === 'failed') {
      let errorText: string;
      if (questionCreatingError == null) {
        errorText = 'Sorry, unknown error, try again!';
      } else {
        if (isArray(questionCreatingError.message)) {
          errorText = questionCreatingError.message.join();
        } else {
          errorText = questionCreatingError.message;
        }
      }
      SweetAlert.fire(
        'Error!',
        errorText,
        'error'
      ).then(() => {
        dispatch(clearQuestionCreatingLoading());
        dispatch(clearQuestionCreatingError());
      }).catch((reason) => {
        console.log(reason);
      });
    } else if (questionCreatingLoading === 'succeeded') {
      dispatch(clearQuestionCreatingLoading());
      if (createQuestionButton.current == null) return;
      createQuestionButton.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [questionCreatingLoading]);

  if (quizLoading === 'pending' || (currentQuiz == null)) return <p>Loading</p>;

  return (
    <div
      className={styles.container}
      onClick={() => dispatch(setActiveQuestion(null))}
    >
      <div className={styles.wrapper}>
        {
          currentQuiz.questions.map((question, index) => (
            <div key={question.id}>
              <OrderZone show={isQuestionMoves} index={index} />
              <QuestionConstructor
                data={question}
                isFocused={focusedQuestion === question.id}
                isUnfocused={unfocusedQuestion === question.id}
              />
            </div>
          ))
        }
        <OrderZone show={isQuestionMoves} index={currentQuiz.questions.length} />
        <div className={styles.addQuestionButtonContainer}>
          <button
            className={styles.addQuestionButton}
            onClick={() => addQuestion()}
            ref={createQuestionButton}
          >
            ADD QUESTION
          </button>
        </div>
      </div>
    </div>
  );
};
