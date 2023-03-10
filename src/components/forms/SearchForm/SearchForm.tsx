import styles from './SearchForm.module.scss'
import {type FormEvent, useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchQuizByCode} from "../../../store/reducer/enteredQuiz/enteredQuizThunks";
import SweetAlert from "sweetalert2";

export const SearchForm = () => {
  const [code, setCode] = useState('')

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector(state => state.enteredQuiz);

  const onSubmit = (e: FormEvent<EventTarget>): void => {
    e.preventDefault();
    if (!code) return;
    dispatch(fetchQuizByCode({code}));
  }

  useEffect((): void => {
    if (loading === "succeeded") {
      navigate("./quiz");
      return;
    }
    if (loading !== "failed") return;
    if (!error) {
      SweetAlert.fire({
        icon: "error",
        title: "Oops...",
        text: "Unknown error, please try again"
      }).then();
    } else {
      SweetAlert.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      }).then();
    }
  }, [loading, error]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Enter quiz code</h1>
      <h2 className={styles.subtitle}>To start a quiz</h2>
      <form
        className={styles.form}
        onSubmit={onSubmit}
      >
        <input
          className={styles.input}
          type="text"
          value={code}
          onChange={e => { setCode(e.target.value) }}
          placeholder="Ex: cS09S"
        />
        <button
          className={styles.submitButton}
          type="submit"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
