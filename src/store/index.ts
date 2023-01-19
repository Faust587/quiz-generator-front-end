import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer/authSlice";
import quizSlice from "./reducer/quizSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    quizzes: quizSlice,
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
