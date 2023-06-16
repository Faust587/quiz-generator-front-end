import styles from "./Quiz.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Question } from "./question/Question";
import { SimpleButton } from "../../UI/buttonElement/SimpleButton/SimpleButton";

import { checkMissingAnswer } from "../../store/reducer/enteredQuiz/enteredQuizSlice";
import { createQuizAnswer } from "../../store/reducer/answers/answerThunk";
import { useNavigate } from "react-router-dom";

export const Quiz = () => {
  const navigate = useNavigate();
  const { quiz, answer } = useAppSelector((state) => state.enteredQuiz);
  const { isLoading, errors } = useAppSelector((state) => state.answers);
  const dispatch = useAppDispatch();

  const submitQuizAnswer = () => {
    if (!answer || !quiz) {
      alert("error");
      return;
    }
    dispatch(checkMissingAnswer());
    dispatch(createQuizAnswer({ code: quiz.code, answers: answer.answers }));
    //navigate("/success", { state: "Answer successfully created" });
    if (!errors) {
      navigate("/success", { state: "Answer successfully created" });
    } else {
      navigate("/error");
    }
  };

  if (!quiz || !answer || isLoading) return <p>Loading</p>;

  return (
    <div className={styles["question-list__container"]}>
      {quiz.questions.map((question) => {
        return (
          <Question key={question.id} quizId={quiz.id} question={question} />
        );
      })}
      <SimpleButton text="Submit" onClick={submitQuizAnswer} />
    </div>
  );
};
