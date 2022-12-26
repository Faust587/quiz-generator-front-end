import "./RootPageStyles.scss"
import useAuthorization from "../../hooks/useAuthorization";
import {MainPage} from "../MainPage/MainPage";
import {SignUpPage} from "../AuthPages/SignUpPage";

export const RootPage = () => {

  const {isAuth} = useAuthorization();

  return (
    <>
      {isAuth ? <MainPage/> : <SignUpPage/>}
    </>
  )
}
