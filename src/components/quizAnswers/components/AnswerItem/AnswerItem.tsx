import { FC } from "react";
import styles from "./AnswerItem.module.scss";
import { formatDate } from "../../../../utils/formatDate";
import { useNavigate } from "react-router-dom";

type PropsType = {
  code: string;
  index: number;
  username: string;
  answeredAt: number;
};

const AnswerItem: FC<PropsType> = ({ code, username, answeredAt, index }) => {
  const navigate = useNavigate();
  const date = formatDate(answeredAt);

  function redirectToAnswerPage() {
    navigate(`/answer/${code}`);
  }

  return (
    <div className={styles["container"]} onClick={redirectToAnswerPage}>
      <div className={styles["info-block"]}>{`${index}.`}</div>
      <div className={styles["info-block"]}>{username}</div>
      <div className={styles["info-block"]}>{`answered: ${date}`}</div>
    </div>
  );
};

export default AnswerItem;
