import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../../api';
import axios from 'axios';
import {TDeleteResponse, TError, TParameters, TQuestion, TQuiz} from './quizSlice';

export const fetchQuizById = createAsyncThunk<TQuiz, string, { rejectValue: TError }>(
  "quiz/fetchQuizById",
  async function (quizId: string, thunkAPI) {
    const response = await api.get<TQuiz>(`/quiz/constructor/${quizId}`);
    if (!axios.isAxiosError(response)) return response.data;
    if (!response.response?.data) {
      return thunkAPI.rejectWithValue({
        statusCode: 0,
        message: ["Unknown error, please write to out support"]
      });
    }
    const errorData = response.response?.data as TError;
    return thunkAPI.rejectWithValue(errorData);
  }
);

export const updateQuizParametersById = createAsyncThunk<TQuiz, { parameters: TParameters, quizId: string }, { rejectValue: TError }>(
  "quiz/updateQuizParametersById",
  async function (data, thunkAPI) {
    const {quizId, parameters} = data;
    const response = await api.put<TQuiz>('/quiz/update-quiz-parameters', {quizId, ...parameters});
    if (!axios.isAxiosError(response)) return response.data;
    if (!response.response?.data) {
      return thunkAPI.rejectWithValue({
        statusCode: 0,
        message: ["Unknown error, please write to out support"]
      });
    }
    const errorData = response.response?.data as TError;
    return thunkAPI.rejectWithValue(errorData);
  }
);

export const refreshQuizCode = createAsyncThunk<TQuiz, string, { rejectValue: TError }>(
  'quiz/refreshQuizCode',
  async function (code, thunkAPI) {
    const params = new URLSearchParams([['code', code]]);
    const response = await api.get<TQuiz>('/quiz/refresh-quiz-code', { params });
    if (!axios.isAxiosError(response)) return response.data;
    if (!response.response?.data) {
      return thunkAPI.rejectWithValue({
        statusCode: 0,
        message: ["Unknown error, please write to out support"]
      });
    }
    const errorData = response.response?.data as TError;
    return thunkAPI.rejectWithValue(errorData);
  }
);

export const deleteQuizByCode = createAsyncThunk<TDeleteResponse, string, { rejectValue: TError }>(
  "quiz/deleteQuizByCode",
  async function (code, thunkAPI) {
    const params = new URLSearchParams([['code', code]]);
    const response = await api.delete<TDeleteResponse>('/quiz', { params });
    if (!axios.isAxiosError(response)) return response.data;
    if (!response.response?.data) {
      return thunkAPI.rejectWithValue({
        statusCode: 0,
        message: ["Unknown error, please write to out support"]
      });
    }
    const errorData = response.response?.data as TError;
    return thunkAPI.rejectWithValue(errorData);
  }
);

export const createQuestion = createAsyncThunk<TQuestion, Omit<TQuestion, 'id' | "index"> & {quizId: string}, { rejectValue: TError }>(
  'quiz/createQuestion',
  async function (question, thunkAPI) {
    const response = await api.post<TQuestion>('/question', question);
    if (!axios.isAxiosError(response)) return response.data;
    if (!response.response?.data) {
      return thunkAPI.rejectWithValue({
        statusCode: 0,
        message: ["Unknown error, please write to out support"]
      });
    }
    const errorData = response.response?.data as TError;
    return thunkAPI.rejectWithValue(errorData);
  }
);

export const updateQuestion = createAsyncThunk<TQuestion, Omit<TQuestion, "id"> & {questionId: string, quizId: string}, { rejectValue: TError }>(
  'quiz/updateQuestion',
  async function (question, thunkAPI) {
    if (question.type !== "TEXT" && !question.value.length) {
      question.value = ["Variant"];
    } else if (question.type === "TEXT") {
      question.value = [];
    }
    const response = await api.patch<TQuestion>('/question', question);
    if (!axios.isAxiosError(response)) return response.data;
    if (!response.response?.data) {
      return thunkAPI.rejectWithValue({
        statusCode: 0,
        message: ["Unknown error, please write to out support"]
      });
    }
    const errorData = response.response?.data as TError;
    return thunkAPI.rejectWithValue(errorData);
  }
);

export const deleteQuestion = createAsyncThunk<TDeleteResponse, {questionId: string, quizId: string}, { rejectValue: TError }>(
  'quiz/deleteQuestion',
  async function (data, thunkAPI) {
    const response = await api.delete<TDeleteResponse>('/question', {data});
    if (!axios.isAxiosError(response)) return response.data;
    if (!response.response?.data) {
      return thunkAPI.rejectWithValue({
        statusCode: 0,
        message: ["Unknown error, please write to out support"],
      });
    }
    const errorData = response.response?.data as TError;
    return thunkAPI.rejectWithValue(errorData);
  }
);

export const uploadQuestionAttachment = createAsyncThunk<TQuestion, {quizId: string, questionId: string, formData: FormData,}, { rejectValue: TError }>(
  'quiz/uploadQuestionAttachment',
  async function ({quizId, questionId, formData}, thunkAPI) {
    const response = await api.post(`question/upload/${quizId}/${questionId}`, formData);
    if (!axios.isAxiosError(response)) return response.data;
    if (!response.response?.data) {
      return thunkAPI.rejectWithValue({
        statusCode: 0,
        message: ["Unknown error, please write to out support"],
      });
    }
    const errorData = response.response?.data as TError;
    return thunkAPI.rejectWithValue(errorData);
  }
);

export const deleteQuestionAttachment = createAsyncThunk<TQuestion, {quizId: string, questionId: string,}, { rejectValue: TError }>(
  'quiz/deleteQuestionAttachment',
  async function ({quizId, questionId}, thunkAPI) {
    const response = await api.delete(`question/attachment/${quizId}/${questionId}`);
    if (!axios.isAxiosError(response)) return response.data;
    if (!response.response?.data) {
      return thunkAPI.rejectWithValue({
        statusCode: 0,
        message: ["Unknown error, please write to out support"],
      });
    }
    const errorData = response.response?.data as TError;
    return thunkAPI.rejectWithValue(errorData);
  }
);
