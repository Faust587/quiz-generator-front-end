import {combineReducers, configureStore} from '@reduxjs/toolkit'
import quizSlice from './reducer/quizConstructor/quizSlice'
import enteredQuizSlice from './reducer/enteredQuiz/enteredQuizSlice'

const rootReducer = combineReducers({
  quizzes: quizSlice,
  enteredQuiz: enteredQuizSlice
});


export const store = configureStore({
  reducer: rootReducer,
});
