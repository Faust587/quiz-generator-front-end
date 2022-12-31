import styles from "./Header.module.scss";
import {DesktopHeader} from "./devices/desktop";
import {TabletHeader} from "./devices/tablet";
import {PhoneHeader} from "./devices/phone";

export const Header = () => {

  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.desktopContainer}>
          <DesktopHeader />
        </div>
        <div className={styles.tabletContainer}>
          <TabletHeader />
        </div>
        <div className={styles.phoneContainer}>
          <PhoneHeader />
        </div>
      </div>
    </header>
  );
}
