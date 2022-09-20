import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "authStatus",
  initialState: {
    isAuth: false
  },
  reducers: {
    setOffline: state => {
      state.isAuth = false;
    },
    setOnline: state => {
      state.isAuth = true;
    }
  }
});

export const {setOffline, setOnline} = authSlice.caseReducers;
export default authSlice.reducer;
