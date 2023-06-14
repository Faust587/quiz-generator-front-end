import { createContext, type Dispatch, type SetStateAction } from "react";
import { type TQuiz } from "../store/reducer/quizConstructor/quizSlice";

interface quizPageContextValue {
  activeModal: boolean;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
  quizList: TQuiz[];
  setQuizList: Dispatch<SetStateAction<TQuiz[]>>;
}

export const QuizPageContext = createContext<quizPageContextValue>(
  {} as quizPageContextValue
);
