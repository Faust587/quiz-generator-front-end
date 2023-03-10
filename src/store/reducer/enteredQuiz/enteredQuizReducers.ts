import { type TEnteredQuizInitialState } from './enteredQuizSlice';
import {PayloadAction} from "@reduxjs/toolkit";

export const enteredQuizReducers = {
  clearEnteredQuiz: (state: TEnteredQuizInitialState) => {
    state.quiz = null;
  },
  clearAnswer: (state: TEnteredQuizInitialState) => {
    state.answer = null;
  },
  clearEnteredQuizLoading: (state: TEnteredQuizInitialState) => {
    state.loading = "idle";
  },
  clearEnteredQuizError: (state: TEnteredQuizInitialState) => {
    state.error = null;
  },
  clearFailedResponse: (state: TEnteredQuizInitialState) => {
    state.loading = "idle";
    state.error = null;
  },
  setTextAnswer: (state: TEnteredQuizInitialState, action: PayloadAction<{value: string, id: string}>) => {
    if (!state.answer) return;
    state.answer.answers = state.answer.answers.map((answer) => {
      if (answer.id !== action.payload.id) return answer;
      answer.answerText = action.payload.value;
      return answer;
    });
  },
  setIntAnswer: (state: TEnteredQuizInitialState, action: PayloadAction<{value: number, id: string}>) => {
    if (!state.answer) return;
    state.answer.answers = state.answer.answers.map((answer) => {
      if (answer.id !== action.payload.id) return answer;
      answer.answerInt = action.payload.value;
      return answer;
    });
  },
  addArrIntAnswer: (state: TEnteredQuizInitialState, action: PayloadAction<{value: number, id: string}>) => {
    if (!state.answer) return;
    state.answer.answers = state.answer.answers.map((answer) => {
      if (answer.id !== action.payload.id) return answer;
      if (!answer.answerArrInt) return {...answer, answerArrInt: [action.payload.value]};
      const isAnswerExists = !!answer.answerArrInt.find(index => index === action.payload.value);
      if (!isAnswerExists) {
        const newAnswer = [...answer.answerArrInt, action.payload.value];
        return {...answer, answerArrInt: newAnswer};
      }
      return answer;
    });
  },
  removeArrIntAnswer: (state: TEnteredQuizInitialState, action: PayloadAction<{value: number, id: string}>) => {
    if (!state.answer) return;
    state.answer.answers = state.answer.answers.map((answer) => {
      if (answer.id !== action.payload.id) return answer;
      if (!answer.answerArrInt) return answer;
      const newAnswer = answer.answerArrInt.filter(index => index !== action.payload.value);
      return {...answer, answerArrInt: newAnswer};
    });
  },
};
