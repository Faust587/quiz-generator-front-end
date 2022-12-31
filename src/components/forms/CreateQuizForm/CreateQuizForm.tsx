import "./CreateQuizFormStyles.scss";
import React, {useContext, useState} from "react";
import redCrossIcon from "../../../assets/icons/red-cross.svg";
import {createNewQuiz} from "../../../services/quizService";
import axios, {AxiosError} from "axios";
import {FailResponse} from "../../../services/authService";
import {QuizPageContext} from "../../../context/quizPageContext";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addQuiz} from "../../../store/reducer/quizSlice";

export const CreateQuizForm = () => {

  const [errors, setErrors] = useState<string[]>([]);
  const [isError, setIsErrors] = useState<boolean>(false);

  const [name, setName] = useState("");
  const [onlyAuthUsers, setOnlyAuthUsers] = useState(false);

  const {setActiveModal, setQuizList} = useContext(QuizPageContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const reqResult = await createNewQuiz(name, onlyAuthUsers);
    if (axios.isAxiosError(reqResult)) {
      setIsErrors(true)
      const errorResponse = reqResult as AxiosError<FailResponse>;
      if (reqResult.response?.data) {
        const errorMessage = errorResponse.response ? [errorResponse.response.data.message] : ["Unknown error"];
        setErrors(errorMessage);
      }
    } else {
      setQuizList(prevState => [...prevState, reqResult.data]);
      setActiveModal(false);
      dispatch(addQuiz(reqResult.data));
      navigate("../quiz-generator");
    }
  }

  return (
    <form
      className="create-quiz-form__container"
      onSubmit={onSubmit}
    >
      <header
        className="create-quiz-form__header"
      >
        Create your quiz
      </header>
      <div className="create-quiz-form__wrapper">
        <label
          className="create-quiz-form__title block"
          htmlFor="quiz-form__input-field"
        >
          Enter your quiz name
        </label>
        <label
          className="create-quiz-form__subtitle block middle-size"
          htmlFor="quiz-form__input-field"
        >
          This name can see another people
        </label>
        <div className="create-quiz-form__input-field">
          <input
            className="create-quiz-form__input"
            id="quiz-form__input-field"
            type="text"
            value={name}
            onChange={e => {
              setName(e.target.value);
              setIsErrors(false);
            }}
            placeholder="Ex: Web design quiz kn-41"
          />
          {isError ? <img
            width="50px"
            height="50px"
            className="create-quiz-form__input-error-icon"
            src={redCrossIcon}
            alt="error"
          /> : null}
        </div>
      </div>
      <div className="create-quiz-form__horizontal-line-container">
        <div className="create-quiz-form__horizontal-line"/>
      </div>
      <div className="create-quiz-form__wrapper">
        <label
          className="create-quiz-form__title without-padding"
        >
          <input
            className={`create-quiz-form__checkbox`}
            id="create-quiz-form__only-is-auth-users"
            type="checkbox"
            onChange={() => setOnlyAuthUsers(!onlyAuthUsers)}
            checked={onlyAuthUsers}
          />
          Only for authorized users
        </label>
        <label
          className="create-quiz-form__subtitle block small-size"
          htmlFor="create-quiz-form__only-is-auth-users"
        >
          Only users who have registered on our service will be able to open this quiz
        </label>
      </div>
      <div className="create-quiz-form__errors-wrapper">
        {errors.length ? <div className="create-quiz-form__errors">{errors.join(", ")}</div> : null}
      </div>
      <div className="create-quiz-form__submit-button-wrapper">
        <button
          className="create-quiz-form__submit-button"
          type="submit"
        >
          create
        </button>
      </div>
    </form>
  );
}
