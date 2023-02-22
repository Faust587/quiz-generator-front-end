import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer/authSlice";
import quizSlice from "./reducer/quiz/quizSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    quizzes: quizSlice,
  }
});
