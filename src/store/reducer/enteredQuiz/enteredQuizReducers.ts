import { type TEnteredQuizInitialState } from './enteredQuizSlice';

export const enteredQuizReducers = {
  clearEnteredQuiz: (state: TEnteredQuizInitialState) => {
    state.quiz = null;
  },
  clearAnswer: (state: TEnteredQuizInitialState) => {
    state.answer = null;
  }
};
