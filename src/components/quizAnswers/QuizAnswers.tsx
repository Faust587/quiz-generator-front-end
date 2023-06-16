import styles from "./QuizAnswers.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import { fetchQuizAnswers } from "../../store/reducer/answers/answerThunk";
import AnswerItem from "./components/AnswerItem/AnswerItem";
import { SimpleButton } from "../../UI/buttonElement/SimpleButton/SimpleButton";

const QuizAnswers = () => {
  const dispatch = useAppDispatch();
  const { currentQuiz } = useAppSelector((state) => state.quizzes);
  const { isLoading, answers, errors } = useAppSelector(
    (state) => state.answers
  );
  useEffect(() => {
    if (currentQuiz) {
      dispatch(fetchQuizAnswers({ code: currentQuiz.code }));
    }
  }, [dispatch, currentQuiz]);

  if (errors) return <span>{errors}</span>;

  if (!currentQuiz || isLoading) return <span>Loading</span>;

  return (
    <>
      <div className={styles["container"]}>
        {answers.map((answer, index) => {
          const { quizId, id, authorId, answeredAt } = answer;
          const username = authorId?.username || "[unauthorized]";
          return (
            <AnswerItem
              key={id}
              index={index + 1}
              answeredAt={answeredAt}
              username={username}
              code={quizId.code}
            />
          );
        })}
      </div>
      <SimpleButton
        text="refresh list"
        onClick={() => {
          dispatch(fetchQuizAnswers({ code: currentQuiz.code }));
        }}
      />
    </>
  );
};

export default QuizAnswers;
