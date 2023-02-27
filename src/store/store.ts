import { configureStore } from "@reduxjs/toolkit";
import quizSlice from "./reducer/quizConstructor/quizSlice";
import enteredQuizSlice from './reducer/enteredQuiz/enteredQuizSlice';

export const store = configureStore({
  reducer: {
    quizzes: quizSlice,
    enteredQuiz: enteredQuizSlice,
  }
});
