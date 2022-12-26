import "./QuestionConstructorStyles.scss";
import { FC } from "react";

type propsType = {
  children: JSX.Element,
}

export const QuestionConstructor: FC<propsType> = (
  {
    children
  }
) => {

  return (
    <article className="question-constructor">
      <div className="question-constructor__wrapper">
        <header className="question-constructor__header">
          <input
            type="text"
            className="question-constructor__input"
          />
          <select
            name="Question"
            id="questionType"
            className="question-constructor__question-type"
          >
            <option>Text option</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </header>
        { children }
        <footer className="question-constructor__footer">
          <div className="question-constructor__is-required-option">

          </div>
          <div className="question-constructor__another-options">

          </div>
        </footer>
      </div>
    </article>
  );
};
