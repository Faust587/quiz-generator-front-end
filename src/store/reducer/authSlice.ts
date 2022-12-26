import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authStatus",
  initialState: {
    isAuth: false,
    username: ""
  },
  reducers: {
    setOffline: state => {
      state.isAuth = false;
    },
    setOnline: state => {
      state.isAuth = true;
    },
    setUsername: (state, data) => {
      state.username = data.payload;
    }
  }
});

export const {
  setOffline,
  setOnline,
  setUsername
} = authSlice.caseReducers;
export default authSlice.reducer;
