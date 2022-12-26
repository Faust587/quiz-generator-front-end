import styles from "./QuizItem.module.scss";
import {FC, useEffect, useState} from "react";
import {TQuiz} from "../../../services/quizService";
import authOnlyIcon from "../../../assets/icons/auth-only.svg";
import closedIcon from "../../../assets/icons/closed.svg";
import successIcon from "../../../assets/icons/success_icon.svg";
import copyIcon from "../../../assets/icons/copy-icon.svg";

type propsType = {
  iconURL: string,
  title: string,
  closed: boolean,
  authOnly: boolean
  data: TQuiz,
}

export const QuizItem: FC<propsType> = (
  {
    iconURL,
    title,
    authOnly,
    closed,
    data
  }
) => {

  const [isCopied, setIsCopied] = useState<boolean>(false);
/*  const [shortTitle, setShortTitle] = useState<string>(title);

  useEffect(() => {
    if (title.length > 15) {
      const editedTitle = title.slice(0, 15 - title.length - 2) + "...";
      setShortTitle(editedTitle);
    }
    console.log(title)
  }, [])*/

  return (
    <div className={styles.container} onClick={() => console.log(data)}>
      <div className={styles.iconContainer}>
        {authOnly ? <img src={authOnlyIcon} alt="only for auth users"/> : null}
        {closed ? <img src={closedIcon} alt="closed for users"/> : null}
      </div>
      <div className={styles.infoContainer}>
        <img src={iconURL} alt="icon"/>
        <div className={styles.title}>
          {title}
        </div>
      </div>
      <div className={styles.code} onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(data.code).catch(() => false);
        setIsCopied(() => {
          setTimeout(() => setIsCopied(false), 1000);
          return true;
        })
      }}>
        {data.code}
        &nbsp;
        {
          isCopied ?
            <img className={`${styles.isCopied} ${isCopied ? styles.show : null}`} src={successIcon} alt="" width={15}
                 height={15}/>
            :
            <img src={copyIcon} className={styles.copyIcon} alt="" width={15} height={15}/>
        }
      </div>
    </div>
  );
};
