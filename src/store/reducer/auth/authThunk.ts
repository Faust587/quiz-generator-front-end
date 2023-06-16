import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../api";
import axios from "axios";

export const refreshToken = createAsyncThunk<{ accessToken: string }, void>(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    console.log("refreshing");
    const response = await api.get<{ accessToken: string }>("auth/refresh");
    if (axios.isAxiosError(response)) {
      return thunkAPI.rejectWithValue(null);
    }
    return response.data;
  }
);
