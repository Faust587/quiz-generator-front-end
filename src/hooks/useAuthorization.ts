import { useAppDispatch, useAppSelector } from "./redux";
import { useEffect } from "react";
import { refreshToken } from "../store/reducer/auth/authThunk";

function useAuthorization() {
  const dispatch = useAppDispatch();
  const { isAuth, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(refreshToken());
  }, []);

  return { isAuth, isLoading };
}

export default useAuthorization;
