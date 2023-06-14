import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Header } from "./components/Header/Header";
import { Answer } from "./components/Answer/Answer";
import { useEffect } from "react";
import { fetchQuizAnswers } from "../../store/reducer/answers/answerThunk";

const AnswerPage = () => {
  const { code } = useParams();
  const { answers, isLoading } = useAppSelector((state) => state.answers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (code && answers.length === 0) {
      dispatch(fetchQuizAnswers({ code }));
    }
  }, [dispatch, code]);

  if (!code || !answers) return <span>ERROR</span>;

  const answer = answers.find(
    (answerFromList) => answerFromList.quizId.code === code
  );

  if (isLoading) return <span>Loading...</span>;

  if (!answer) return <span>ERROR: cannot get answer</span>;
  return (
    <>
      <Header
        answeredAt={answer.answeredAt}
        username={answer.authorId?.username || "[unauthorized]"}
        name={answer.quizId.name}
      />
      <Answer quizId={answer.quizId.id} answers={answer.answers} />
    </>
  );
};

export default AnswerPage;
