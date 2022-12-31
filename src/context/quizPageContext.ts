import {createContext, Dispatch, SetStateAction, useState} from "react";
import {TQuiz} from "../store/reducer/quizSlice";

type quizPageContextValue = {
  activeModal: boolean;
  setActiveModal: Dispatch<SetStateAction<boolean>>;
  quizList: TQuiz[],
  setQuizList: Dispatch<SetStateAction<TQuiz[]>>;
}

export const QuizPageContext = createContext<quizPageContextValue>({} as quizPageContextValue);
