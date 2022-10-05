import "./QuizItemStyles.scss";
import { FC } from "react";

type propsType = {
  iconURL: string,
  title: string,
  subtitle: number
}

export const QuizItem: FC<propsType> = (
  {
    iconURL,
    subtitle,
    title
  }
) => {

  return (
    <div className="quiz-item-container">
      <div className="quiz-item-icon-container">
        <img
          src={ iconURL }
          alt={ title }
          className="quiz-item-icon"
        />
      </div>
      <div className="quiz-item-info">
        <div className="quiz-item-title">
          { title }
        </div>
        <div className="quiz-item-subtitle">
          { `${subtitle} questions` }
        </div>
      </div>
    </div>
  );
};
