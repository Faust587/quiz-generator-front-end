import styles from "./QuizList.module.scss";
import {getQuizList} from "../../services/quizService";
import {useContext, useLayoutEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {QuizPageContext} from "../../context/quizPageContext";
import {QuizItem} from "./quizItem/QuizItem";
import quizIcon1 from "../../assets/icons/quiz-icon-1.svg";

export const QuizList = () => {

  const navigate = useNavigate();
  const {setActiveModal, quizList, setQuizList} = useContext(QuizPageContext);

  useLayoutEffect(() => {
    const fetchQuizList = async () => {
      const quizList = await getQuizList();
      if (axios.isAxiosError(quizList)) {
        navigate("../sign-in");
        return;
      }
      let closedCounters = 0;
      let onlyAuthCounter = 0;
      quizList.data.forEach(quiz => {
        if (quiz.closed) closedCounters++;
        if (quiz.onlyAuthUsers) onlyAuthCounter++;
      })
      setClosedQuizzesCounter(closedCounters);
      setOnlyAuthQuizzesCounter(onlyAuthCounter);
      setQuizList(quizList.data);
    }
    fetchQuizList();
  }, [])

  const [onlyAuthFilter, setOnlyAuthFilter] = useState<boolean>(false);
  const [isClosedFilter, setIsClosedFilter] = useState<boolean>(false);
  const [nameFilter, setNameFilter] = useState<string>("");

  const [closedQuizzesCounter, setClosedQuizzesCounter] = useState<number>();
  const [onlyAuthQuizzesCounter, setOnlyAuthQuizzesCounter] = useState<number>();

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Your quizzes:</h1>
        <button
          className={styles.createQuizBtn}
          onClick={() => setActiveModal(true)}
        >
          new quiz
        </button>
      </header>
      <div className={styles.filterContainer}>
        <div className={styles.filterButtonContainer}>
          <button
            className={`${styles.filterButton} ${onlyAuthFilter ? styles.active : null}`}
            onClick={() => setOnlyAuthFilter(prev => !prev)}
          >
            only auth&nbsp;<span className={styles.quizCountText}>({onlyAuthQuizzesCounter})</span>
          </button>
          <button
            className={`${styles.filterButton} ${isClosedFilter ? styles.active : null}`}
            onClick={() => setIsClosedFilter(prev => !prev)}
          >
            closed&nbsp;<span className={styles.quizCountText}>({closedQuizzesCounter})</span>
          </button>
        </div>
        <div className={styles.searchInputContainer}>
          <div className={styles.searchInputText}>search: </div>
          <input
            className={styles.searchInput}
            type="text"
            value={nameFilter}
            placeholder="search"
            onChange={e => setNameFilter(e.target.value)}
          />
        </div>
      </div>
      <main className={styles.quizList}>
        {
          (!quizList) ? null : quizList.map((
            quiz
          ) => {
            if (nameFilter !== "") {
              if (quiz.name.toUpperCase().search(nameFilter.toUpperCase()) === -1) return null;
            }
            if (onlyAuthFilter) {
              if (!quiz.onlyAuthUsers) return null;
            }
            if (isClosedFilter) {
              if (!quiz.closed) return null;
            }
            return (
              <div key={quiz.id} className={styles.itemWrapper}>
                <QuizItem
                  title={quiz.name}
                  iconURL={quizIcon1}
                  authOnly={quiz.onlyAuthUsers}
                  closed={quiz.closed}
                  data={quiz}
                />
              </div>
            );
          })
        }
      </main>
    </section>
  );
};
