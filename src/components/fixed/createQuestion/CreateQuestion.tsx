import "./CreateQuestionStyles.scss";
import { useState } from "react";

export const CreateQuestion = () => {

  const [ firstClicked, setFirstClicked ] = useState(true);

  function click() {
    setFirstClicked(false);
  }

  return (
    <div className="create-question">
      <div className="create-question__container">
        <button
          className={ `create-question__button ${ firstClicked ? "create-question__button--focused" : "" }` }
          onClick={ click }
        >
          +
        </button>
      </div>
    </div>
  );
};
