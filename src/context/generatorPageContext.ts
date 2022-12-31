import { createContext, Dispatch, SetStateAction } from "react";
import { GeneratorTabs } from "../pages/GeneratorPage/GeneratorPage";
import { TQuiz } from "../store/reducer/quizSlice";

type ContextValue = {
  tab: GeneratorTabs,
  setTab: Dispatch<SetStateAction<GeneratorTabs>>,
  quiz: TQuiz,
  setQuiz: Dispatch<SetStateAction<TQuiz>>,
}

export const GeneratorPageContext = createContext<ContextValue>({} as ContextValue);
