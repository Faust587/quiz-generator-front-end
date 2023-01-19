import { createContext, Dispatch, SetStateAction } from "react";
import { TABS } from "../pages/GeneratorPage/GeneratorPage";
import { TQuiz } from "../store/reducer/quizSlice";

type ContextValue = {
  tab: TABS,
  setTab: Dispatch<SetStateAction<TABS>>,
}

export const GeneratorPageContext = createContext<ContextValue>({} as ContextValue);
