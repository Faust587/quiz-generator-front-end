import "./ModalWindowStyles.scss"
import {Dispatch, FC, SetStateAction, useContext} from "react";
import {QuizPageContext} from "../../context/quizPageContext";

type propTypes = {
  children: JSX.Element,
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const ModalWindow: FC<propTypes> = ({children, setIsOpen}) => {
  return (
    <div
      className="background"
      onClick={() => setIsOpen(false)}
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
