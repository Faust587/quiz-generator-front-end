import styles from "./SuccessPage.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

export const SuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <div className={styles["container"]}>
      <div className={styles["text-container"]}>
        <span className={styles["text"]}>
          {typeof state === "string" ? state : "Success"}
        </span>
      </div>
      <button
        className={styles.button}
        onClick={() => {
          navigate("/main-page");
        }}
      >
        HOME
      </button>
    </div>
  );
};
