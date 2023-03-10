import styles from "./QuizPageHeader.module.scss";
import {useAppSelector} from "../../../hooks/redux";
import {formatDate} from "../../../utils/formatDate";

export const QuizPageHeader = () => {
  const {loading, quiz} = useAppSelector(state => state.enteredQuiz);

  if (loading === 'pending' || !quiz) return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.quizNameWrapper}>
          <div className={styles.quizNameContainer}>
            <div className={styles.quizNameContainerPreloader} />
          </div>
        </div>
        <div className={styles.quizInfoWrapper}>
          <div className={styles.quizInfoContainer}>
            <div className={styles.quizInfoTextContainer}>
              <div className={styles.quizInfoTextPreloader} />
            </div>
            <div className={styles.quizInfoTextContainer}>
              <div className={styles.quizInfoTextPreloader} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.quizNameWrapper}>
          <div className={styles.quizNameContainer}>
            <h1 className={styles.quizNameText}>
              {quiz.name}
            </h1>
          </div>
        </div>
        <div className={styles.quizInfoWrapper}>
          <div className={styles.quizInfoContainer}>
            <div className={styles.quizInfoTextContainer}>
              <p className={styles.quizInfoText}>
                last updated: { formatDate(quiz.lastUpdated) }
              </p>
            </div>
            <div className={styles.quizInfoTextContainer}>
              <p className={styles.quizInfoText}>
                Total questions: {quiz.questions.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
