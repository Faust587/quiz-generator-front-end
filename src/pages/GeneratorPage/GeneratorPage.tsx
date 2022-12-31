import styles from "./GeneratorPage.module.scss";
import { GeneratorPageContext } from "../../context/generatorPageContext";
import { useEffect, useLayoutEffect, useState } from "react";
import { Header } from "../../components/headers/GeneratorPageHeader/Header";
import { getQuizById } from "../../services/quizService";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { addQuiz, TQuiz } from "../../store/reducer/quizSlice";
import { useDispatch } from "react-redux";

export enum GeneratorTabs {
  QUESTIONS,
  ANSWERS
}

export const GeneratorPage = () => {
  const [tab, setTab] = useState<GeneratorTabs>(GeneratorTabs.QUESTIONS);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState<TQuiz>({} as TQuiz);

  useEffect(() => {
    const getQuiz = async () => {
      if (id === undefined) {
        navigate("../error", { state: "Invalid link..." });
        return;
      }
      const quiz = await getQuizById(id);
      console.log(quiz);

      if (axios.isAxiosError(quiz)) {
        navigate("../error", { state: "We can't open this quiz... try again or write to our support" });
      } else {
        setQuiz(quiz.data);
        //dispatch(addQuiz(quiz.data));
      }
    }
    getQuiz();
  }, [id]);


  return (
    <GeneratorPageContext.Provider value={{ tab, setTab, quiz, setQuiz }}>
      <div className={styles.wrapper}>
        <Header />
      </div>
    </GeneratorPageContext.Provider>
  );
};
