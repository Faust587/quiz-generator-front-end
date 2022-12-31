import styles from "./MainHeader.module.scss";
import userIcon from "../../../assets/icons/user-icon.svg";
import {SearchForm} from "../../forms/SearchForm/SearchForm";

export const MainHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <h1 className={styles.title}>Let's play</h1>
            <h2 className={styles.subtitle}>And be the first</h2>
          </div>
          <img
            className={styles.userIcon}
            src={userIcon}
            alt="profile icon"
          />
        </div>
        <div className={styles.formContainer}>
          <SearchForm/>
        </div>
      </div>
    </header>
  );
};
