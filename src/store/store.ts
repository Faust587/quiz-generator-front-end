import { combineReducers, configureStore } from "@reduxjs/toolkit";
import quizSlice from "./reducer/quizConstructor/quizSlice";
import enteredQuizSlice from "./reducer/enteredQuiz/enteredQuizSlice";
import authSlice from "./reducer/auth/authSlice";
import answerSlice from "./reducer/answers/answerSlice";

const rootReducer = combineReducers({
  quizzes: quizSlice,
  enteredQuiz: enteredQuizSlice,
  auth: authSlice,
  answers: answerSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
