import { createSlice } from "@reduxjs/toolkit";
import { authExtraReducers } from "./authExtraReducers";

export type TAuthInitialState = {
  isAuth: boolean;
  isLoading: boolean;
};

const initialState: TAuthInitialState = {
  isAuth: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUnauthorised: (state) => {
      state.isAuth = false;
    },
  },
  extraReducers: authExtraReducers,
});

export const { setUnauthorised } = authSlice.actions;
export default authSlice.reducer;
