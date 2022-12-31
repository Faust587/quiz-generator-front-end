import styles from "./styles.module.scss";
import profileIcon from "../../../../../assets/icons/user-icon.svg";
import refreshIcon from "../../../../../assets/icons/reload-icon.svg";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { refreshQuizCode, updateQuizParameters } from "../../../../../services/quizService";
import { GeneratorPageContext } from "../../../../../context/generatorPageContext";
import axios, { AxiosError } from "axios";
import { FailResponse } from "../../../../../services/authService";

export const DesktopHeader = () => {

  const { quiz, setQuiz } = useContext(GeneratorPageContext);

  const [isChanged, setIsChanged] = useState<boolean>(false);

  const [name, setName] = useState<string>();
  const [code, setCode] = useState<string>();
  const [isClosed, setIsClosed] = useState<boolean>();
  const [isOnlyAuth, setIsOnlyAuth] = useState<boolean>();

  useEffect(() => {
    const { id, name, code, closed, onlyAuthUsers, questions, author } = quiz;
    setName(name);
    setCode(code);
    setIsClosed(closed);
    setIsOnlyAuth(onlyAuthUsers);
  }, [quiz]);

  const refreshCode = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure?',
      text: "The old quiz code will be invalid!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#E44061',
      confirmButtonText: 'Yes, refresh it!'
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      if (!code) {
        Swal.fire(
          'Error!',
          'We can\'t update quiz code :(\nPlease, try again.',
          'error'
        );
        return;
      }
      const refreshResult = await refreshQuizCode(code);
      if (axios.isAxiosError(refreshResult) || !refreshResult.data) {
        const error = refreshResult as unknown as AxiosError<FailResponse>; //TODO very bad
        Swal.fire(
          'Error!',
          error.message,
          'error'
        );
        return;
      }
      setQuiz(refreshResult.data);
      Swal.fire(
        'Success!',
        'Your quiz code has been updated.',
        'success'
      );
    });
  }

  const deleteQuiz = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    Swal.fire({
      title: 'Do you really want to permanently delete quiz?',
      text: "All question answers will be deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#E44061',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (!result.isConfirmed) return;
      Swal.fire(
        'Deleted!',
        'Your quiz has been deleted.',
        'success'
      );
    });
  }

  const updateParameters = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (isClosed === undefined || isOnlyAuth === undefined || !name || !code) {
      Swal.fire(
        'Error!',
        'We can\'t update quiz code :(\nPlease, try again.',
        'error'
      );
    } else {
      const updateResult = await updateQuizParameters(code, isClosed, isOnlyAuth, name);
      if (axios.isAxiosError(updateResult)) {

      } else {
        setIsChanged(false);
        Swal.fire(
          'Updated!',
          'Your quiz has been updated.',
          'success'
        );
      }
      console.log(updateResult.data);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <form
          className={styles.form}
          action=""
        >
          <section className={styles.formSection}>
            <div>
              <h2 className={styles.title}>Quiz name:</h2>
            </div>
            <input
              className={styles.textInput}
              type="text"
              value={name}
              onChange={e => {
                setName(e.target.value);
                (e.target.value === quiz.name
                  && isClosed === quiz.closed
                  && isOnlyAuth === quiz.onlyAuthUsers) ? setIsChanged(false) : setIsChanged(true);
              }}
            />
            <div className={`${styles.buttonContainer}`}>
              <button
                className={`${styles.formButton} ${isChanged ? "" : styles.hidden}`}
                onClick={updateParameters}
              >
                save
              </button>
            </div>
          </section>
          <section className={styles.formSection}>
            <div className={styles.codeContainer}>
              <h2 className={styles.codeTitle}>
                code:&nbsp;
              </h2>
              <div className={styles.code}>{code}</div>
              &nbsp;
              <button
                className={styles.refreshCodeButton}
                onClick={refreshCode}
              >
                <img
                  className={styles.refreshCodeIcon}
                  src={refreshIcon}
                  alt="refresh icon"
                />
              </button>
            </div>
            <label className={styles.checkboxParameter}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={isOnlyAuth}
                onChange={() => {
                  setIsOnlyAuth(prevState => {
                    if (!prevState === quiz.onlyAuthUsers && isClosed === quiz.closed && name === quiz.name) {
                      setIsChanged(false)
                    } else {
                      setIsChanged(true);
                    }
                    return !prevState;
                  });
                }}
              />
              Only for auth users
            </label>
            <label className={styles.checkboxParameter}>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={isClosed}
                onChange={() => {
                  setIsClosed(prevState => {
                    if (!prevState === quiz.closed && isOnlyAuth === quiz.onlyAuthUsers && name === quiz.name) {
                      setIsChanged(false)
                    } else {
                      setIsChanged(true);
                    }
                    return !prevState;
                  });
                }}
              />
              Closed
            </label>
            <div className={`${styles.buttonContainer} ${styles.left}`}>
              <button
                className={`${styles.formButton} ${styles.red}`}
                onClick={deleteQuiz}
              >
                delete
              </button>
            </div>
          </section>
        </form>
      </div>
      <div className={styles.infoContainer}>
        Info
        <div className={styles.infoBlock}>
          Total questions: {quiz.questions.length}
        </div>
        <div className={styles.infoBlock}>
          Total answers: 32
        </div>
        <div className={styles.infoBlock}>
          Created: 24.12.2022
        </div>
      </div>
      <button className={styles.homeButton}>
        <img
          className={styles.homeIcon}
          src={profileIcon}
          alt="home icon"
        />
      </button>
    </div>
  );
}
