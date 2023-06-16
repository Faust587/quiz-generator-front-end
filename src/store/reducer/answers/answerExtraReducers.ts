import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { InitialAnswersState } from "./types";
import { createQuizAnswer, fetchQuizAnswers } from "./answerThunk";

export const answerExtraReducers = (
  builder: ActionReducerMapBuilder<InitialAnswersState>
) => {
  builder.addCase(fetchQuizAnswers.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(fetchQuizAnswers.fulfilled, (state, action) => {
    state.isLoading = false;
    state.answers = action.payload;
  });
  builder.addCase(fetchQuizAnswers.rejected, (state) => {
    state.isLoading = false;
    state.errors = "error";
  });
  builder.addCase(createQuizAnswer.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(createQuizAnswer.fulfilled, (state) => {
    state.isLoading = false;
  });
  builder.addCase(createQuizAnswer.rejected, (state) => {
    state.isLoading = false;
    state.errors = "error";
  });
};
