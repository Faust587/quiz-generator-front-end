import styles from "./QuestionList.module.scss";
import {QuestionConstructor} from "./QuestionConstructor/QuestionConstructor";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {
  clearQuestionCreatingError,
  clearQuestionCreatingLoading,
  createQuestion,
  TQuestion
} from "../../store/reducer/quizSlice";
import {useEffect, useRef} from "react";
import {isArray} from "lodash";
import Swal from "sweetalert2";

export const QuestionList = () => {

  const { currentQuiz, quizLoading, questionCreatingLoading, questionCreatingError } = useAppSelector(state =>  state.quizzes);
  const focusedQuestion = useSelector<RootState>(state => state.quizzes.focusedQuestion);
  const unfocusedQuestion = useSelector<RootState>(state => state.quizzes.unfocusedQuestion);
  const dispatch = useAppDispatch();
  const createQuestionButton = useRef<HTMLButtonElement>(null);
  const addQuestion = async () => {
    if (!currentQuiz) return;
    const sampleQuestion: Omit<TQuestion, "id">  & { quizId: string } = {
      quizId: currentQuiz.id,
      name: "Question",
      value: [],
      type: "TEXT",
      isRequired: false,
    }
    dispatch(createQuestion(sampleQuestion));
  }

  useEffect(() => {
    if (questionCreatingLoading === 'failed') {
      let errorText: string;
      if (!questionCreatingError) {
        errorText = "Sorry, unknown error, try again!"
      } else {
        if (isArray(questionCreatingError.message)) {
          errorText = questionCreatingError.message.join();
        } else {
          errorText = questionCreatingError.message;
        }
      }
      Swal.fire(
        'Error!',
        errorText,
        'error'
      ).then(() => {
        dispatch(clearQuestionCreatingLoading());
        dispatch(clearQuestionCreatingError());
      });
    } else if (questionCreatingLoading === 'succeeded') {
      dispatch(clearQuestionCreatingLoading());
      if (!createQuestionButton.current) return;
      createQuestionButton.current.scrollIntoView({behavior: "smooth"});
    }
  }, [questionCreatingLoading]);

  if (quizLoading === "pending" || !currentQuiz) return null;
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {
          currentQuiz.questions.map((question) => <QuestionConstructor
            key={question.id}
            data={question}
            isFocused={focusedQuestion === question.id}
            isUnfocused={unfocusedQuestion === question.id}
          />)
        }
        <div className={styles.addQuestionButtonContainer}>
          <button
            className={styles.addQuestionButton}
            onClick={addQuestion}
            ref={createQuestionButton}
          >
            ADD QUESTION
          </button>
        </div>
      </div>
    </div>
  );
}
