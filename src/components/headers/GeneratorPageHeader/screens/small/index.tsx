import styles from "./styles.module.scss";
import homeButtonIcon from "../../../../../assets/icons/user-icon.svg";
import settingsButtonIcon from "../../../../../assets/icons/settings.svg";
import Swal from "sweetalert2";
import {Dispatch, FC, SetStateAction} from "react";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../../../../../hooks/redux";

type propTypes = {
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>
}

export const SmallScreenHeader: FC<propTypes> = (
  {
    setIsSettingsOpen
  }
) => {
  const quiz = useAppSelector(state => state.quizzes.currentQuiz);
  const navigate = useNavigate();

  const copyCodeToClipboard = () => {
    if (!quiz) return;
    navigator.clipboard.writeText(quiz.code).catch(() => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Code didn't copied... try again"
      });
    }).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Your code has been copied',
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  if (!quiz) return null;

  return (
    <div className={styles.container}>
      <section className={styles.infoContainer}>
        <h2 className={styles.infoTitle}>quiz name:</h2>
        <div className={styles.nameBlock}>{quiz.name}</div>
      </section>
      <div className={styles.quizCodeWrapper}>
        <section className={styles.infoContainer}>
          <h2 className={styles.infoTitle}>code:</h2>
          <button
            className={styles.codeBlock}
            onClick={copyCodeToClipboard}
          >
            {quiz.code}
          </button>
        </section>
      </div>
      <section className={styles.infoContainer}>
        <button
          className={styles.homeButton}
          onClick={() => navigate("../")}
        >
          <img src={homeButtonIcon} alt="home page"/>
        </button>
      </section>
      <button
        className={styles.settingsButton}
        onClick={() => setIsSettingsOpen(true)}
      >
        <img src={settingsButtonIcon} alt="settings"/>
      </button>
    </div>
  );
}
