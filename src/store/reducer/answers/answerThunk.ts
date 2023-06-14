import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAnswer } from "./types";
import api from "../../../api";
import axios from "axios";
import { TQuestionAnswer } from "../enteredQuiz/enteredQuizSlice";

export const fetchQuizAnswers = createAsyncThunk<IAnswer[], { code: string }>(
  "answer/fetchQuizAnswers",
  async function ({ code }, thunkAPI) {
    const response = await api.get<IAnswer[]>("/quiz-answer/list", {
      params: { code },
    });
    if (axios.isAxiosError(response)) {
      return thunkAPI.rejectWithValue(null);
    }
    return response.data;
  }
);

export const createQuizAnswer = createAsyncThunk<
  null,
  { code: string; answers: TQuestionAnswer[] }
>("answer/createQuizAnswer", async function ({ code, answers }, thunkAPI) {
  const body = {
    //TODO: I will get fired for this, refactor it
    answers: answers.map((answer) => {
      return { questionId: answer.id, ...answer };
    }),
  };
  const response = await api.post<IAnswer[]>("/quiz-answer", body, {
    params: { code },
  });
  if (axios.isAxiosError(response)) {
    return thunkAPI.rejectWithValue(null);
  }
  return null;
});
