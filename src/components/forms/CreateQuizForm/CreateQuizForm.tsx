import "./CreateQuizFormStyles.scss";
import {
  useContext,
  useEffect,
  useState,
  type MouseEvent,
  type FormEvent,
} from "react";
import redCrossIcon from "../../../assets/icons/red-cross.svg";
import { createNewQuiz } from "../../../services/quizService";
import axios, { type AxiosError } from "axios";
import { type FailResponse } from "../../../services/authService";
import { QuizPageContext } from "../../../context/quizPageContext";
import { defaultQuizIcon } from "../../../assets/";
import { useNavigate } from "react-router-dom";
import api from "../../../api";

export const CreateQuizForm = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [isError, setIsErrors] = useState<boolean>(false);

  const [name, setName] = useState("");
  const [onlyAuthUsers, setOnlyAuthUsers] = useState(false);
  const [icon, setIcon] = useState<string>();
  const [iconList, setIconList] = useState<string[]>([]);

  const [isOpenIconList, setOpenIconList] = useState(false);

  const { setQuizList } = useContext(QuizPageContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIconList = async () => {
      const iconList = await api.get<{ icons: string[] }>("quiz-icon/list");
      if (axios.isAxiosError(iconList)) {
        setIsErrors(true);
        const errorResponse = iconList as AxiosError<FailResponse>;
        if (iconList.response?.data) {
          const errorMessage =
            errorResponse.response != null
              ? [errorResponse.response.data.message]
              : ["Unknown error"];
          setErrors(errorMessage);
        }
      } else {
        setIconList(iconList.data.icons);
        setIcon(iconList.data.icons[0]);
      }
    };
    fetchIconList();
  }, []);

  const onSubmit = async (e: FormEvent<EventTarget>) => {
    e.preventDefault();
    if (!icon) return;

    const reqResult = await createNewQuiz(name, onlyAuthUsers, icon);
    if (axios.isAxiosError(reqResult)) {
      setIsErrors(true);
      const errorResponse = reqResult as AxiosError<FailResponse>;
      if (reqResult.response?.data) {
        const errorMessage =
          errorResponse.response != null
            ? [errorResponse.response.data.message]
            : ["Unknown error"];
        setErrors(errorMessage);
      }
    } else {
      setQuizList((prevState) => [...prevState, reqResult.data]);
      navigate(`../quiz-generator/${reqResult.data.id}`);
    }
  };

  const setIconToQuizAction = (
    event: MouseEvent<HTMLButtonElement>,
    iconURL: string
  ) => {
    event.preventDefault();
    setIcon(iconURL);
    setOpenIconList(false);
  };

  return (
    <form className="create-quiz-form__container" onSubmit={onSubmit}>
      {isOpenIconList ? (
        <div
          className="create-quiz-form__quiz-list-container"
          onClick={() => {
            setOpenIconList(false);
          }}
        >
          <div
            className="create-quiz-form__quiz-list"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {iconList.map((value) => {
              return (
                <button
                  key={value}
                  style={{ backgroundColor: "transparent", margin: "20px" }}
                  onClick={(event) => {
                    setIconToQuizAction(event, value);
                  }}
                >
                  <img
                    className="create-quiz-form__icon"
                    src={value}
                    alt={value}
                  />
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
      <header className="create-quiz-form__header">Create your quiz</header>
      <div className="create-quiz-form__wrapper">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
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
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Choose quiz icon:
            <div
              className="create-quiz-form__choose-icon"
              onClick={() => {
                setOpenIconList(true);
              }}
            >
              <img
                src={icon || defaultQuizIcon}
                width={50}
                height={50}
                alt="quiz icon"
              />
            </div>
          </div>
        </div>
        <div className="create-quiz-form__input-field">
          <input
            className="create-quiz-form__input"
            id="quiz-form__input-field"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setIsErrors(false);
            }}
            placeholder="Ex: Web design quiz kn-41"
          />
          {isError ? (
            <img
              width="50px"
              height="50px"
              className="create-quiz-form__input-error-icon"
              src={redCrossIcon}
              alt="error"
            />
          ) : null}
        </div>
      </div>
      <div className="create-quiz-form__horizontal-line-container">
        <div className="create-quiz-form__horizontal-line" />
      </div>
      <div className="create-quiz-form__wrapper">
        <label className="create-quiz-form__title without-padding">
          <input
            className={"create-quiz-form__checkbox"}
            id="create-quiz-form__only-is-auth-users"
            type="checkbox"
            onChange={() => {
              setOnlyAuthUsers(!onlyAuthUsers);
            }}
            checked={onlyAuthUsers}
          />
          Only for authorized users
        </label>
        <label
          className="create-quiz-form__subtitle block small-size"
          htmlFor="create-quiz-form__only-is-auth-users"
        >
          Only users who have registered on our service will be able to open
          this quiz
        </label>
      </div>
      <div className="create-quiz-form__errors-wrapper">
        {errors.length > 0 ? (
          <div className="create-quiz-form__errors">{errors.join(", ")}</div>
        ) : null}
      </div>
      <div className="create-quiz-form__submit-button-wrapper">
        <button className="create-quiz-form__submit-button" type="submit">
          create
        </button>
      </div>
    </form>
  );
};
