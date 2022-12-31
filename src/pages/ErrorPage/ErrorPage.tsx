import styles from "./ErrorPage.module.scss";
import errorLogo from "../../assets/images/error.jpg";
import {useLocation, useNavigate} from "react-router-dom";

export const ErrorPage = () => {

  const {state} = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.errorImage}
        src={errorLogo}
        alt="Error"
      />
      <div className={styles.errorText}>
        {
          typeof state === "string" ? state : "Sorry, unknown error, please try again or write to our support"
        }
      </div>
      <button
        className={styles.button}
        onClick={() => navigate("../")}
      >HOME
      </button>
    </div>
  );
}
