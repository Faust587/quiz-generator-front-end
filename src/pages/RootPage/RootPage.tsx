import "./RootPageStyles.scss";
import useAuthorization from "../../hooks/useAuthorization";
import { MainPage } from "../MainPage/MainPage";

export const RootPage = () => {
  const { isLoading } = useAuthorization();

  if (isLoading) return <h1>Loading...</h1>;

  return <MainPage />;
};
