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

    </div>
  );
};
