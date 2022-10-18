import "./GeneratorNavBarStyles.scss";
import { Dispatch, FC, memo, SetStateAction } from "react";

type propTypes = {
  page: boolean,
  setPage: Dispatch<SetStateAction<boolean>>
}

const GeneratorNavBarComponent: FC<propTypes> = (
  {
    page,
    setPage
  }
) => {
  const setQuestionPage = () => setPage(true);

  const setSecondPage = () => setPage(false);

  return (
    <nav className="generator-page-navbar">
      <div className="generator-page-navbar-item-container">
        <div
          className="generator-page-navbar-item-container__item"
          onClick={ setQuestionPage }
        >
          Question
        </div>
        <div
          className="generator-page-navbar-item-container__item"
          onClick={ setSecondPage }
        >
          Settings
        </div>
      </div>
      <div className={ `generator-page-navbar-choice-container ${ page ? "start" : "end" }` }>
        <div className="generator-page-navbar-choice-container__scroll" />
      </div>
    </nav>
  );
};

export const GeneratorNavBar = memo(GeneratorNavBarComponent);
