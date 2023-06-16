import { FC } from "react";
import { useAppSelector } from "../../../../hooks/redux";
import styles from "../../../../components/headers/QuizPageHeader/QuizPageHeader.module.scss";
import { formatDate } from "../../../../utils/formatDate";

type PropsType = {
  name: string;
  username: string;
  answeredAt: number;
};

export const Header: FC<PropsType> = ({ name, username, answeredAt }) => {
  const { isLoading } = useAppSelector((state) => state.answers);
  if (isLoading)
    return (
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
            <h1 className={styles.quizNameText}>{name}</h1>
          </div>
        </div>
        <div className={styles.quizInfoWrapper}>
          <div className={styles.quizInfoContainer}>
            <div className={styles.quizInfoTextContainer}>
              <p className={styles.quizInfoText}>
                answered at: {formatDate(answeredAt)}
              </p>
            </div>
            <div className={styles.quizInfoTextContainer}>
              <p className={styles.quizInfoText}>Author: {username}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
