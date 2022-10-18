import "./GeneratorPageStyles.scss";
import { GeneratorHeader } from "../../components/headers/GeneratorHeader/GeneratorHeader";
import { useState } from "react";
import { GeneratorNavBar } from "../../components/navBars/GeneratorNavBar/GeneratorNavBar";

export const GeneratorPage = () => {
  const [ quizName, setQuizName ] = useState("Quiz name");
  const [ page, setPage ] = useState(true);

  return (
    <div className="generator-page-container">
      <GeneratorHeader
        quizName={ quizName }
        setQuizName={ setQuizName }
      />
      <GeneratorNavBar
        page={ page }
        setPage={ setPage }
      />
    </div>
  );
};
