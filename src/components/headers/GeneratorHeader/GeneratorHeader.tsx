import "./GeneratorHeaderStyles.scss";
import { Dispatch, FC, memo, SetStateAction } from "react";
import userLogo from "../../../assets/icons/user-icon.svg";

type propsType = {
  quizName: string,
  setQuizName: Dispatch<SetStateAction<string>>
}

const GeneratorHeaderComponent: FC<propsType> = (
  {
    quizName,
    setQuizName
  }
) => {

  return (
    <header className="generator-header">
      <input
        value={ quizName }
        onChange={ event => setQuizName(event.target.value) }
        type="text"
        placeholder="Type your quiz name"
        className="generator-header__quiz-name"
      />
      <button className="generator-header__home-page-button">
        <img
          src={ userLogo }
          alt="home page"
          className="generator-header__home-page-icon"
        />
      </button>
    </header>
  );
};

export const GeneratorHeader = memo(GeneratorHeaderComponent);
