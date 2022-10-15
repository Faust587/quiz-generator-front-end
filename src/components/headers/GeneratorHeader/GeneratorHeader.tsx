import "./GeneratorHeaderStyles.scss";
import { Dispatch, FC, SetStateAction, useState } from "react";
import userLogo from "../../../assets/icons/user-icon.svg";

type propTypes = {
  page: boolean,
  setPage: Dispatch<SetStateAction<boolean>>
}

export const GeneratorHeader: FC<propTypes> = (
  {
    page,
    setPage
  }
) => {
  const [ quizName, setQuizName ] = useState("Quiz name");

  return (
    <div className="generator-header-container">
      <section className="generator-header-top-section">
        <input
          className="generator-header-top-section__quiz-name"
          value={ quizName }
          size={ quizName.length - 3 } // perfect for input size
          maxLength={ 20 }
          minLength={ 1 }
          onChange={ e => setQuizName(e.target.value) }
          type="text"
        />
        <button className="generator-header-top-section__home-button">
          <img
            src={ userLogo }
            alt="Home page"
          />
        </button>
      </section>
      <nav className="generator-header-navbar">
        <div
          className={ `generator-header-navbar__question ${ page ? "active" : "inactive" }` }
          onClick={ () => setPage(!page) }
        >
          Questions
        </div>
        <div
          className={ `generator-header-navbar__settings ${ page ? "inactive" : "active" }` }
          onClick={ () => setPage(!page) }
        >
          Settings
        </div>
      </nav>
    </div>
  );
};
