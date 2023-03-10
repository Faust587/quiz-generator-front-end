import {useLocation, useNavigate} from "react-router-dom";
import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {clearEnteredQuizStatus, fetchQuizByCode} from "../store/reducer/enteredQuiz/enteredQuizThunks";

export const QuizLayout: FC<{children: JSX.Element}> = ({children}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {quiz, loading, error} = useAppSelector(state => state.enteredQuiz);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
    if (!code && !quiz) {
      navigate('../error', {state: 'Code does not valid'});
      return;
    }
    if (!code && !!quiz) return;
    if (!!code) dispatch(fetchQuizByCode({code}));
  }, [location, dispatch]);

  useEffect(() => {
    if (loading === "failed") {
      const errorMessage = error?.message ?? "Unknown error";
      dispatch(clearEnteredQuizStatus()).then(() => {
        navigate('../error', {state: errorMessage});
      });
    }
  }, [loading, error]);

  return (
    <div>
      {children}
    </div>
  )
}
