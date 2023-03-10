import {createAsyncThunk} from "@reduxjs/toolkit";
import {TQuiz} from "../quizConstructor/quizSlice";
import api from "../../../api";
import axios from "axios";
import {clearFailedResponse, TError, TQuizAnswer} from "./enteredQuizSlice";

export const fetchQuizByCode = createAsyncThunk<TQuiz, { code: string }, {rejectValue: TError | null}>(
  'enteredQuiz/fetchQuizByCode',
  async function ({code}, thunkAPI) {
    const params = new URLSearchParams([['code', code]]);
    const response = await api.get<TQuiz>('/quiz', { params });
    if (!axios.isAxiosError(response)) return response.data;
    if (!response.response?.data) {
      return thunkAPI.rejectWithValue({
        statusCode: 0,
        message: 'Unknown error, please write to out support',
        error: 'unknown_error'
      });
    }
    const errorData = response.response?.data as TError;
    return thunkAPI.rejectWithValue(errorData);
  }
);

export const clearEnteredQuizStatus = createAsyncThunk<void, void>(
  'enteredQuiz/clearEnteredQuizLoadingStatus',
  function (_, thunkAPI) {
    thunkAPI.dispatch(clearFailedResponse());
    return;
  }
)

export const submitQuizAnswer = createAsyncThunk<
  void, {answer: TQuizAnswer, code: string}
>(
  'enteredQuiz/submitQuizAnswer',
  async function ({code, answer}) {
    const params = new URLSearchParams([['code', code]]);
    const response = api.post('/quiz-answer', {}, {params});
  }
)
