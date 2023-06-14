import { TQuiz } from "../quizConstructor/quizSlice";
import { User } from "../auth/types";

export type InitialAnswersState = {
  isLoading: boolean;
  errors: string | string[] | null;
  answers: IAnswer[];
};

export interface IAnswer {
  id: string;
  quizId: TQuiz;
  authorId?: User;
  answers: IQuestionAnswer[];
  answeredAt: number;
}

export interface IQuestionAnswer {
  id: string;
  type: "TEXT" | "OPTION" | "SELECT" | "FLAG";
  isRequired: boolean;
  name: string;
  value: string[];
  index: number;
  answerText: string | undefined;
  answerInt: null | number | undefined;
  answerArrInt: number[] | undefined;
}

export interface IAnswerQuery {
  questionId: string;
  answerText?: string;
  answerInt?: number;
  answerArrInt?: number;
}
