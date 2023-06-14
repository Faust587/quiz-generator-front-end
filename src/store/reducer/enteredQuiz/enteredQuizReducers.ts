import { type TEnteredQuizInitialState } from "./enteredQuizSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { isNumber } from "lodash";

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
  setTextAnswer: (
    state: TEnteredQuizInitialState,
    action: PayloadAction<{ value: string; id: string }>
  ) => {
    if (!state.answer) return;
    state.answer.answers = state.answer.answers.map((answer) => {
      if (answer.id !== action.payload.id) return answer;
      answer.answerText = action.payload.value;
      return answer;
    });
  },
  setIntAnswer: (
    state: TEnteredQuizInitialState,
    action: PayloadAction<{ value: number; id: string }>
  ) => {
    if (!state.answer) return;
    state.answer.answers = state.answer.answers.map((answer) => {
      if (answer.id !== action.payload.id) return answer;
      answer.answerInt = action.payload.value;
      return answer;
    });
  },
  addArrIntAnswer: (
    state: TEnteredQuizInitialState,
    action: PayloadAction<{ value: number; id: string }>
  ) => {
    if (!state.answer) return;
    state.answer.answers = state.answer.answers.map((answer) => {
      if (answer.id !== action.payload.id) return answer;
      if (!answer.answerArrInt)
        return { ...answer, answerArrInt: [action.payload.value] };
      const isAnswerExists = !!answer.answerArrInt.find(
        (index) => index === action.payload.value
      );
      if (!isAnswerExists) {
        const newAnswer = [...answer.answerArrInt, action.payload.value];
        return { ...answer, answerArrInt: newAnswer };
      }
      return answer;
    });
  },
  removeArrIntAnswer: (
    state: TEnteredQuizInitialState,
    action: PayloadAction<{ value: number; id: string }>
  ) => {
    if (!state.answer) return;
    state.answer.answers = state.answer.answers.map((answer) => {
      if (answer.id !== action.payload.id) return answer;
      if (!answer.answerArrInt) return answer;
      const newAnswer = answer.answerArrInt.filter(
        (index) => index !== action.payload.value
      );
      return { ...answer, answerArrInt: newAnswer };
    });
  },
  checkMissingAnswer: (state: TEnteredQuizInitialState) => {
    state.missingAnswer = null;
    if (!state.answer || !state.quiz) return;
    const quiz = state.quiz;
    state.answer.answers.forEach((answer, index) => {
      const { isRequired, type, id } = quiz.questions[index];
      if (isRequired) {
        switch (type) {
          case "OPTION": {
            if (!isNumber(answer.answerInt)) {
              alert(`ERROR ${index} NOT ANSWERED`);
            }
            break;
          }
          case "SELECT": {
            if (!answer.answerInt) {
              state.missingAnswer = id;
            } else if (answer.answerInt === -1) {
              state.missingAnswer = id;
            }
            break;
          }
          case "FLAG": {
            if (!answer.answerArrInt) {
              state.missingAnswer = id;
            } else if (answer.answerArrInt.length === 0) {
              state.missingAnswer = id;
            }
            break;
          }
          case "TEXT": {
            if (!answer.answerText) {
              state.missingAnswer = id;
            } else if (answer.answerText.trim().length === 0) {
              state.missingAnswer = id;
            }
            break;
          }
        }
      }
    });
  },
};
