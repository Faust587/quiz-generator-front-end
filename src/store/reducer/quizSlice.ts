import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TQuiz = {
  id: string,
  name: string,
  closed: boolean,
  onlyAuthUsers: boolean,
  code: string,
  author: string,
  questions: TQuestion[]
}

export type TQuestion = {
  id: string,
  type: string,
  value: string[],
  isRequired: boolean,
  name: string;
}

const initialState: TQuiz[] = [];

const quizSlice = createSlice({
  name: "quizzesList",
  initialState,
  reducers: {
    addQuiz: (state, action: PayloadAction<TQuiz>) => {
      const isExists = !!state.find(quiz => quiz.id === action.payload.id);
      if (isExists) return;
      state.push(action.payload);
    }
  }
});

export const {addQuiz} = quizSlice.actions;
export default quizSlice.reducer;
