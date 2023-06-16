import styles from "./Header.module.scss";
import { reloadIcon, trashCanIcon } from "../../../assets/";
import { BigScreenHeader } from "./screens/big";
import { SmallScreenHeader } from "./screens/small";
import React, { useEffect, useState } from "react";
import { ModalWindow } from "../../modalWindow/ModalWindow";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  clearCodeError,
  clearCodeLoading,
  clearParametersError,
  clearParametersLoading,
  clearQuizDeleteLoading,
  clearQuizDeleteError,
} from "../../../store/reducer/quizConstructor/quizSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { isArray } from "lodash";
import {
  deleteQuizByCode,
  refreshQuizCode,
  updateQuizParametersById,
} from "../../../store/reducer/quizConstructor/quizThunks";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isChanged, setIsChanged] = useState<boolean>(false);

  const {
    currentQuiz,
    quizLoading,
    parametersLoading,
    parametersError,
    codeLoading,
    codeError,
    quizDeletingLoading,
    quizDeletingError,
  } = useAppSelector((state) => state.quizzes);

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [closed, setClosed] = useState<boolean>(false);
  const [onlyAuthUsers, setOnlyAuthUsers] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [questionsAmount, setQuestionsAmount] = useState<number>(0);

  useEffect(() => {
    if (currentQuiz == null) return;
    setId(currentQuiz.id);
    setName(currentQuiz.name);
    setCode(currentQuiz.code);
    setClosed(currentQuiz.closed);
    setOnlyAuthUsers(currentQuiz.onlyAuthUsers);
    setQuestionsAmount(currentQuiz.questions.length);
  }, [currentQuiz]);

  useEffect(() => {
    if (codeLoading === "failed") {
      let errorText: string;
      if (codeError == null) {
        errorText = "Sorry, unknown error, try again!";
      } else {
        if (isArray(codeError.message)) {
          errorText = codeError.message.join();
        } else {
          errorText = codeError.message;
        }
      }
      Swal.fire("Error!", errorText, "error").then(() => {
        dispatch(clearCodeLoading());
        dispatch(clearCodeError());
      });
    } else if (codeLoading === "succeeded") {
      Swal.fire(
        "Success!",
        "Your quizConstructor code has been updated.",
        "success"
      ).then(() => {
        dispatch(clearCodeLoading());
      });
    }
  }, [codeLoading]);

  useEffect(() => {
    if (parametersLoading === "failed") {
      let errorText: string;
      if (parametersError == null) {
        errorText = "Sorry, unknown error, try again!";
      } else {
        if (isArray(parametersError.message)) {
          errorText = parametersError.message.join();
        } else {
          errorText = parametersError.message;
        }
      }
      Swal.fire("Error!", errorText, "error").then(() => {
        dispatch(clearParametersError());
        dispatch(clearParametersLoading());
      });
    } else if (parametersLoading === "succeeded") {
      Swal.fire(
        "Success!",
        "Your quizConstructor parameters has been updated.",
        "success"
      ).then(() => {
        dispatch(clearParametersLoading());
        setIsChanged(false);
      });
    }
  }, [parametersLoading]);

  useEffect(() => {
    if (quizDeletingLoading === "failed") {
      let errorText: string;
      if (quizDeletingError == null) {
        errorText = "Sorry, unknown error, try again!";
      } else {
        if (isArray(quizDeletingError.message)) {
          errorText = quizDeletingError.message.join();
        } else {
          errorText = quizDeletingError.message;
        }
      }
      Swal.fire("Error!", errorText, "error").then(() => {
        dispatch(clearQuizDeleteError());
        dispatch(clearQuizDeleteLoading());
      });
    } else if (quizDeletingLoading === "succeeded") {
      setIsChanged(false);
      navigate("../");
      dispatch(clearQuizDeleteLoading());
      Swal.fire(
        "Success!",
        "Your quizConstructor has been deleted.",
        "success"
      ).then(() => {
        return null;
      });
    }
  }, [quizDeletingLoading]);

  const deleteQuiz = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you really want to permanently delete quizConstructor?",
      text: "All question answers will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#E44061",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (!result.isConfirmed) return;
      dispatch(deleteQuizByCode(code));
    });
  };

  const updateQuiz = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    dispatch(
      updateQuizParametersById({
        parameters: { name, closed, onlyAuthUsers },
        quizId: id,
      })
    );
  };

  const refreshCode = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    dispatch(refreshQuizCode(code));
  };

  if (quizLoading === "pending") return null;

  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.desktopContainer}>
          <BigScreenHeader
            id={id}
            name={name}
            setName={setName}
            code={code}
            questionsAmount={questionsAmount}
            closed={closed}
            isChanged={isChanged}
            setIsChanged={setIsChanged}
            setClosed={setClosed}
            onlyAuthUsers={onlyAuthUsers}
            setOnlyAuthUsers={setOnlyAuthUsers}
          />
        </div>
        <div className={styles.tabletContainer}>
          <SmallScreenHeader setIsSettingsOpen={setIsSettingsOpen} />
        </div>
      </div>
      {isSettingsOpen ? (
        <ModalWindow setIsOpen={setIsSettingsOpen}>
          <div className={styles.formWindow}>
            <form className={styles.updateForm}>
              <button
                className={styles.closeUpdateForm}
                onClick={() => {
                  setIsSettingsOpen(false);
                }}
              >
                ×
              </button>
              <header className={styles.formHeader}>
                Update quiz parameters
              </header>
              <main className={styles.formContent}>
                <section className={styles.topSection}>
                  <div className={styles.quizNameContainer}>
                    <label className={styles.quizNameLabel}>
                      <span className={styles.quizNameText}>Quiz name:</span>
                      <input
                        className={styles.quizNameInput}
                        type="text"
                        value={name}
                        placeholder="Ex: Web design kn-41"
                        onChange={(event) => {
                          setName(event.target.value);
                        }}
                      />
                    </label>
                  </div>
                  <div className={styles.codeContainer}>
                    <button className={styles.codeText}>{code}</button>
                    <button
                      onClick={refreshCode}
                      className={styles.refreshCode}
                    >
                      <img src={reloadIcon} alt="refresh code" />
                    </button>
                  </div>
                </section>
                <div className={styles.horizontalLine} />
                <section className={styles.middleSection}>
                  <h3>Privacy parameters:</h3>
                  <div className={styles.checkboxContainer}>
                    <label>
                      <input
                        className={styles.checkbox}
                        type="checkbox"
                        checked={onlyAuthUsers}
                        onChange={() => {
                          setOnlyAuthUsers((prevState) => !prevState);
                        }}
                      />
                      Only for authorized users
                    </label>
                    <div className={styles.checkboxDescription}>
                      Only users who have registered on our service will be able
                      to open this quiz
                    </div>
                  </div>
                  <div className={styles.checkboxContainer}>
                    <label>
                      <input
                        className={styles.checkbox}
                        type="checkbox"
                        checked={closed}
                        onChange={() => {
                          setClosed((prevState) => !prevState);
                        }}
                      />
                      Closed
                    </label>
                    <div className={styles.checkboxDescription}>
                      When it closed nobody can access this quiz and make some
                      answers or reply
                    </div>
                  </div>
                </section>
                <div className={styles.horizontalLine} />
                <section className={styles.bottomSection}>
                  <div className={styles.formButtonsContainer}>
                    <button
                      onClick={updateQuiz}
                      className={`${styles.formButton} ${styles.green}`}
                    >
                      apply
                    </button>
                    <button
                      onClick={() => {
                        setIsSettingsOpen(false);
                      }}
                      className={`${styles.formButton} ${styles.red}`}
                    >
                      discard
                    </button>
                  </div>
                  <button onClick={deleteQuiz} className={styles.deleteButton}>
                    <img src={trashCanIcon} alt="delete quiz" />
                  </button>
                </section>
              </main>
            </form>
          </div>
        </ModalWindow>
      ) : null}
    </header>
  );
};
