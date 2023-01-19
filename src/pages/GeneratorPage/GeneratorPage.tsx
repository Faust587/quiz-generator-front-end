import styles from "./GeneratorPage.module.scss";
import {GeneratorPageContext} from "../../context/generatorPageContext";
import {useEffect, useState} from "react";
import {Header} from "../../components/headers/GeneratorPageHeader/Header";
import {useNavigate, useParams} from "react-router-dom";
import {fetchQuizById, setCurrentQuiz} from "../../store/reducer/quizSlice";
import {NavBar} from "../../components/navbar/ConstructorPageNavbar/ConstructorPageNavbar";
import {QuestionList} from "../../components/constructor/QuestionList";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

export enum TABS {
  QUESTIONS,
  ANSWERS
}

export const GeneratorPage = () => {
  const [tab, setTab] = useState<TABS>(TABS.QUESTIONS);
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { quizLoading, quizError } = useAppSelector(state => state.quizzes);

  useEffect(() => {
    const getQuiz = async () => {
      if (id === undefined) {
        navigate("../error", {state: "Invalid link..."});
        return;
      }
      dispatch(fetchQuizById(id));
    }
    getQuiz();
  }, []);

  useEffect(() => {
    if (quizLoading === 'failed') {
      if (quizError?.statusCode === 401) {
        navigate("../");
      } else {
        navigate("../error", {state: quizError?.message});
      }
    }
  }, [quizLoading]);

  if (quizLoading === 'pending') return <h1>LOADING</h1>;
  return (
    <GeneratorPageContext.Provider value={{tab, setTab}}>
      <div className={styles.wrapper}>
        <Header/>
        <NavBar />
        <main className={styles.mainWrapper}>
          {
            tab == TABS.QUESTIONS ? <QuestionList /> : <></>
          }
        </main>
      </div>
    </GeneratorPageContext.Provider>
  );
};
