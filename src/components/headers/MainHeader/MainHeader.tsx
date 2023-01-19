import styles from "./MainHeader.module.scss";
import { mainIcon } from "../../../assets";
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
            src={mainIcon}
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
