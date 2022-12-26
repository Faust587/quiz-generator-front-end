import "./ModalWindowStyles.scss"
import {FC, useContext} from "react";
import {QuizPageContext} from "../../context/quizPageContext";

export const ModalWindow: FC<{ children: JSX.Element }> = ({children}) => {
  const {setActiveModal} = useContext(QuizPageContext)
  return (
    <div
      className="background"
      onClick={() => setActiveModal(false)}
    >
      <div
        className="modal-window"
        onClick={event => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
