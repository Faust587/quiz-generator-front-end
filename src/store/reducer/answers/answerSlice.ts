import { InitialAnswersState } from "./types";
import { createSlice } from "@reduxjs/toolkit";
import { answerExtraReducers } from "./answerExtraReducers";

const initialState: InitialAnswersState = {
  isLoading: false,
  errors: null,
  answers: [],
};

const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {},
  extraReducers: answerExtraReducers,
});

export default answerSlice.reducer;
export const {} = answerSlice.actions;
