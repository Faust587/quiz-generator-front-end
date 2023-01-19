import {useEffect, useState} from "react";
import {useAppSelector} from "./redux";

export function useQuiz() {
  const currentQuiz = useAppSelector(state => state.quizzes.currentQuiz);
  const [isLoading, setIsLoading] = useState(!currentQuiz);

  useEffect(() => {
    setIsLoading(!currentQuiz);
  }, [currentQuiz]);

  return {
    isLoading
  }
}
