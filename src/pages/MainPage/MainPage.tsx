import "./MainPageStyles.scss";
import { MainHeader } from "../../components/headers/MainHeader/MainHeader";
import { QuizList } from "../../components/quizList/QuizList";

export const MainPage = () => {

  return (
    <div className="main-page-container">
      <MainHeader />
      <QuizList />
    </div>
  );
};
