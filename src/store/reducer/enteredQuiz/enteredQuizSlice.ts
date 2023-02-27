import {TQuiz} from '../quizConstructor/quizSlice';
import {createSlice} from '@reduxjs/toolkit';
import {enteredQuizReducers} from './enteredQuizReducers';

type TQuizAnswer = {
  id: string,
  quizId: string;
  authorId: string;
  answeredAt: number;
  answers: TQuestionAnswer[];
}

type TQuestionAnswer = {
  id: string;
  name: string;
  type: string;
  value: string[];
  isRequired: string;
  isFileUploaded: string;
  attachmentName: string;
  index: number;
  answerText?: string;
  answerInt?: number;
  answerArrInt?: number[];
}

export type TEnteredQuizInitialState = {
  quiz: TQuiz | null;
  answer: TQuizAnswer | null;
}

const initialState: TEnteredQuizInitialState = {
  quiz: null,
  answer: null,
}

const enteredQuizSlice = createSlice({
  name: "enteredQuiz",
  initialState,
  reducers: enteredQuizReducers,
});

export default enteredQuizSlice.reducer;
