import { createContext, type Dispatch, type SetStateAction } from "react";

export interface ContextType {
  name: string;
  code: string;
  closed: boolean;
  onlyAuthUsers: boolean;
  questionsAmount: number;
  setName: Dispatch<SetStateAction<string>>;
  setCode: Dispatch<SetStateAction<string>>;
  setClosed: Dispatch<SetStateAction<boolean>>;
  setOnlyAuthUsers: Dispatch<SetStateAction<boolean>>;
  setQuestionsAmount: Dispatch<SetStateAction<number>>;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
}

export const HeaderConstructorContext = createContext<ContextType>(
  {} as ContextType
);
