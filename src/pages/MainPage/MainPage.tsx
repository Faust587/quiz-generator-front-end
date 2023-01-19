import "./MainPageStyles.scss";
import {MainHeader} from "../../components/headers/MainHeader/MainHeader";
import {QuizList} from "../../components/quizList/QuizList";
import {ModalWindow} from "../../components/modalWindow/ModalWindow";
import {QuizPageContext} from "../../context/quizPageContext";
import {useState} from "react";
import {CreateQuizForm} from "../../components/forms/CreateQuizForm/CreateQuizForm";
import {TQuiz} from "../../store/reducer/quizSlice";

export const MainPage = () => {
  const [activeModal, setActiveModal] = useState(false);
  const [quizList, setQuizList] = useState<TQuiz[]>([])

  return (
    <div className="main-page-container">
      <QuizPageContext.Provider value={{activeModal, setActiveModal, quizList, setQuizList}}>
        {
          activeModal ? <ModalWindow setIsOpen={setActiveModal}>
            <CreateQuizForm />
          </ModalWindow> : null
        }
        <MainHeader/>
        <QuizList/>
      </QuizPageContext.Provider>
    </div>
  );
};
