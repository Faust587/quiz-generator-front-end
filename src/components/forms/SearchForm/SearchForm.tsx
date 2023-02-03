import styles from "./SearchForm.module.scss";
import {FormEvent, FormEventHandler, useState} from "react";
import api from "../../../api";
import Swal from "sweetalert2";
import axios, {AxiosError} from "axios";
import {TQuiz} from "../../../store/reducer/quizSlice";

export const SearchForm = () => {

  const [code, setCode] = useState("");

  const onSubmit = async (e: FormEvent<EventTarget>) => {
    e.preventDefault();
    const params = new URLSearchParams([["code", code]])
    const fetchQuiz = await api.get<TQuiz>("/quiz", {params});

    if (axios.isAxiosError(fetchQuiz)) {
      const error = fetchQuiz as AxiosError<{statusCode: number, message: string}>;
      Swal.fire(
        'Error!',
        error.response?.data.message || "unknown error",
        'error'
      )
    } else {

    }
  }

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
          onChange={e => setCode(e.target.value)}
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
};
