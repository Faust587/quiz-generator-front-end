import './RootPageStyles.scss'
import useAuthorization from '../../hooks/useAuthorization'
import { MainPage } from '../MainPage/MainPage'
import { SignUpPage } from '../AuthPages/SignUpPage'
import {useEffect} from "react";
import api from "../../api";

export const RootPage = () => {
  const { isAuth } = useAuthorization()

  useEffect(() => {
    
  }, []);

  return (
    <>
      {isAuth ? <MainPage/> : <SignUpPage/>}
    </>
  )
}
