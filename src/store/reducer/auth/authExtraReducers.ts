import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { TAuthInitialState } from "./authSlice";
import { refreshToken } from "./authThunk";

export const authExtraReducers = (
  builder: ActionReducerMapBuilder<TAuthInitialState>
) => {
  builder.addCase(refreshToken.pending, (state: TAuthInitialState) => {
    state.isLoading = true;
  });
  builder.addCase(refreshToken.rejected, (state: TAuthInitialState) => {
    state.isAuth = false;
    state.isLoading = false;
  });
  builder.addCase(
    refreshToken.fulfilled,
    (state: TAuthInitialState, action) => {
      state.isAuth = true;
      state.isLoading = false;
      localStorage.setItem("accessToken", action.payload.accessToken);
    }
  );
};
