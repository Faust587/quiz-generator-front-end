import {ActionReducerMapBuilder} from "@reduxjs/toolkit";
import {fetchQuizByCode} from "./enteredQuizThunks";
import {TEnteredQuizInitialState} from "./enteredQuizSlice";
import {compare} from "../quizConstructor/quizSlice";

export const quizExtraReducers = (builder: ActionReducerMapBuilder<TEnteredQuizInitialState>): void => {
  builder.addCase(fetchQuizByCode.pending, state => {
    state.loading = 'pending';
  });
  builder.addCase(fetchQuizByCode.fulfilled, (state, {payload}) => {
    payload.questions.sort(compare);
    state.quiz = payload;
    const {id, questions, author} = payload;
    state.answer = {
      id,
      authorId: author,
      answeredAt: undefined,
      answers: questions.map(({id}) => {
        return {id};
      }),
    };
    state.loading = 'succeeded';
  });
  builder.addCase(fetchQuizByCode.rejected, (state, {payload}) => {
    state.loading = 'failed';
    state.error = payload ?? null;
  });
}
