import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";
import axios from "axios";
import {
  type TDeleteResponse,
  type TError,
  type TParameters,
  type TQuestion,
  type TQuiz,
} from "./quizSlice";
import { AppDispatch, RootState } from "../../index";
import { QUESTION_TYPES } from "../../../types/questionTypes";

type TQuestionUpdateFields = {
  id: string;
  quizId: string;
  type?: QUESTION_TYPES;
  value?: string[];
  index?: number;
  isRequired?: boolean;
  isFileUploaded?: boolean;
  attachmentName?: string | undefined;
  name?: string;
};

export const fetchQuizById = createAsyncThunk<
  TQuiz,
  string,
  { rejectValue: TError }
>("quizConstructor/fetchQuizById", async function (quizId: string, thunkAPI) {
  const response = await api.get<TQuiz>(`/quiz/constructor/${quizId}`);
  if (!axios.isAxiosError(response)) return response.data;
  if (!response.response?.data) {
    return thunkAPI.rejectWithValue({
      statusCode: 0,
      message: ["Unknown error, please write to out support"],
    });
  }
  const errorData = response.response?.data as TError;
  return thunkAPI.rejectWithValue(errorData);
});

export const updateQuizParametersById = createAsyncThunk<
  TQuiz,
  {
    parameters: TParameters;
    quizId: string;
  },
  { rejectValue: TError }
>("quizConstructor/updateQuizParametersById", async function (data, thunkAPI) {
  const { quizId, parameters } = data;
  const response = await api.put<TQuiz>("/quiz/update-quiz-parameters", {
    quizId,
    ...parameters,
  });
  if (!axios.isAxiosError(response)) return response.data;
  if (!response.response?.data) {
    return thunkAPI.rejectWithValue({
      statusCode: 0,
      message: ["Unknown error, please write to out support"],
    });
  }
  const errorData = response.response?.data as TError;
  return thunkAPI.rejectWithValue(errorData);
});

export const refreshQuizCode = createAsyncThunk<
  TQuiz,
  string,
  { rejectValue: TError }
>("quizConstructor/refreshQuizCode", async function (code, thunkAPI) {
  const params = new URLSearchParams([["code", code]]);
  const response = await api.get<TQuiz>("/quiz/refresh-quiz-code", { params });
  if (!axios.isAxiosError(response)) return response.data;
  if (!response.response?.data) {
    return thunkAPI.rejectWithValue({
      statusCode: 0,
      message: ["Unknown error, please write to out support"],
    });
  }
  const errorData = response.response?.data as TError;
  return thunkAPI.rejectWithValue(errorData);
});

export const deleteQuizByCode = createAsyncThunk<
  TDeleteResponse,
  string,
  { rejectValue: TError }
>("quizConstructor/deleteQuizByCode", async function (code, thunkAPI) {
  const params = new URLSearchParams([["code", code]]);
  const response = await api.delete<TDeleteResponse>("/quiz", { params });
  if (!axios.isAxiosError(response)) return response.data;
  if (!response.response?.data) {
    return thunkAPI.rejectWithValue({
      statusCode: 0,
      message: ["Unknown error, please write to out support"],
    });
  }
  const errorData = response.response?.data as TError;
  return thunkAPI.rejectWithValue(errorData);
});

export const createQuestion = createAsyncThunk<
  TQuestion,
  Omit<TQuestion, "id" | "index"> & { quizId: string },
  { rejectValue: TError }
>("quizConstructor/createQuestion", async function (question, thunkAPI) {
  const response = await api.post<TQuestion>("/question", question);
  if (!axios.isAxiosError(response)) return response.data;
  if (!response.response?.data) {
    return thunkAPI.rejectWithValue({
      statusCode: 0,
      message: ["Unknown error, please write to out support"],
    });
  }
  const errorData = response.response?.data as TError;
  return thunkAPI.rejectWithValue(errorData);
});

export const updateQuestion = createAsyncThunk<
  TQuestion,
  TQuestionUpdateFields,
  { state: RootState; dispatch: AppDispatch; rejectValue: TError }
>("quizConstructor/updateQuestion", async function (question, thunkAPI) {
  const { currentQuiz } = thunkAPI.getState().quizzes;
  if (!currentQuiz)
    return thunkAPI.rejectWithValue({
      statusCode: 0,
      message: ["Unknown error, please write to out support"],
    });

  const questions = [...currentQuiz.questions];
  const currentQuestion = questions.find((data) => data.id === question.id);
  if (!currentQuestion)
    return thunkAPI.rejectWithValue({
      statusCode: 0,
      message: ["Unknown error, please write to out support"],
    });
  if (question.type !== "TEXT") {
    if (!question.value || question.value.length === 0) {
      question.value = ["Variant"];
    }
  }
  const updatedQuestion = { ...currentQuestion, ...question };
  const reqBody = {
    questionId: question.id,
    ...updatedQuestion,
  };
  const response = await api.patch<TQuestion>("/question", reqBody);
  if (!axios.isAxiosError(response)) return response.data;
  if (!response.response?.data) {
    return thunkAPI.rejectWithValue({
      statusCode: 0,
      message: ["Unknown error, please write to out support"],
    });
  }
  const errorData = response.response?.data as TError;
  return thunkAPI.rejectWithValue(errorData);
});

export const deleteQuestion = createAsyncThunk<
  TDeleteResponse,
  { questionId: string; quizId: string },
  { rejectValue: TError }
>("quizConstructor/deleteQuestion", async function (data, thunkAPI) {
  const response = await api.delete<TDeleteResponse>("/question", { data });
  if (!axios.isAxiosError(response)) return response.data;
  if (!response.response?.data) {
    return thunkAPI.rejectWithValue({
      statusCode: 0,
      message: ["Unknown error, please write to out support"],
    });
  }
  const errorData = response.response?.data as TError;
  return thunkAPI.rejectWithValue(errorData);
});

export const uploadQuestionAttachment = createAsyncThunk<
  TQuestion,
  { quizId: string; questionId: string; formData: FormData },
  { rejectValue: TError }
>(
  "quizConstructor/uploadQuestionAttachment",
  async function ({ quizId, questionId, formData }, thunkAPI) {
    const response = await api.post(
      `question/upload/${quizId}/${questionId}`,
      formData
    );
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

export const deleteQuestionAttachment = createAsyncThunk<
  TQuestion,
  { quizId: string; questionId: string },
  { rejectValue: TError }
>(
  "quizConstructor/deleteQuestionAttachment",
  async function ({ quizId, questionId }, thunkAPI) {
    const response = await api.delete(
      `question/attachment/${quizId}/${questionId}`
    );
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
