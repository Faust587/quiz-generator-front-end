import styles from "./ConstructorPageNavbar.module.scss";
import {useContext} from "react";
import {GeneratorPageContext} from "../../../context/generatorPageContext";
import {TABS} from "../../../pages/GeneratorPage/GeneratorPage";

export const NavBar = () => {

  const { tab, setTab } = useContext(GeneratorPageContext);

  return (
    <nav>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <button
            className={`${styles.tab} ${styles.left} ${TABS.QUESTIONS === tab ? styles.active : ""}`}
            onClick={() => setTab(TABS.QUESTIONS)}
          >
            constructor
          </button>
          <button
            className={`${styles.tab} ${styles.right} ${TABS.ANSWERS === tab ? styles.active : ""}`}
            onClick={() => setTab(TABS.ANSWERS)}
          >
            answers
          </button>
        </div>
      </div>
    </nav>
  );
}
