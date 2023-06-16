import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { refreshToken } from "../store/reducer/auth/authThunk";
import { useNavigate } from "react-router-dom";

type PropsType = {
  children: JSX.Element;
  shouldNavigateToAuth: boolean;
};

export const AuthProvider: FC<PropsType> = ({
  children,
  shouldNavigateToAuth,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.auth);
  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    dispatch(refreshToken());
    if (isAuth) return;
    if (shouldNavigateToAuth) {
      //navigate("/sign-in");
    } else {
      setShowChildren(true);
    }
  }, [dispatch, isAuth]);

  // if (!showChildren) {
  //   return null;
  // }

  return children;
};
