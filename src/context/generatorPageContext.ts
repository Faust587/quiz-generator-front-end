import { createContext, Dispatch, SetStateAction } from "react";
import { TABS } from "../pages/GeneratorPage/GeneratorPage";

type ContextValue = {
  tab: TABS,
  setTab: Dispatch<SetStateAction<TABS>>,
}

export const GeneratorPageContext = createContext<ContextValue>({} as ContextValue);
