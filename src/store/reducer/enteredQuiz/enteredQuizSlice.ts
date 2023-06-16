import { TLoading, type TQuiz } from "../quizConstructor/quizSlice";
import { createSlice } from "@reduxjs/toolkit";
import { enteredQuizReducers } from "./enteredQuizReducers";
import { quizExtraReducers } from "./enteredQuizExtraReducers";

export interface TQuizAnswer {
  id: string;
  authorId: string;
  answeredAt: number | undefined;
  answers: TQuestionAnswer[];
}

export interface TQuestionAnswer {
  id: string;
  answerText?: string;
  answerInt?: number;
  answerArrInt?: number[];
}

export type TError = {
  statusCode: number;
  message: string;
  error: string;
};

export interface TEnteredQuizInitialState {
  quiz: TQuiz | null;
  answer: TQuizAnswer | null;
  loading: TLoading;
  error: TError | null;
  missingAnswer: string | null;
}

const initialState: TEnteredQuizInitialState = {
  quiz: null,
  answer: null,
  loading: "idle",
  error: null,
  missingAnswer: null,
};

const enteredQuizSlice = createSlice({
  name: "enteredQuiz",
  initialState,
  reducers: enteredQuizReducers,
  extraReducers: quizExtraReducers,
});

export default enteredQuizSlice.reducer;
export const {
  clearAnswer,
  clearEnteredQuiz,
  clearEnteredQuizLoading,
  clearEnteredQuizError,
  clearFailedResponse,
  setIntAnswer,
  removeArrIntAnswer,
  addArrIntAnswer,
  setTextAnswer,
  checkMissingAnswer,
} = enteredQuizSlice.actions;
