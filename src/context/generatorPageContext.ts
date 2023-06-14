import { createContext, type Dispatch, type SetStateAction } from "react";
import { type TABS } from "../pages/GeneratorPage/GeneratorPage";

interface ContextValue {
  tab: TABS;
  setTab: Dispatch<SetStateAction<TABS>>;
}

export const GeneratorPageContext = createContext<ContextValue>(
  {} as ContextValue
);
