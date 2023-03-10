import styles from "./SimpleButton.module.scss";
import React, {FC} from "react";

type SimpleButtonProps = {
  text: string;
  onClick: () => void;
}

export const SimpleButton: FC<SimpleButtonProps> = (
  {text, onClick}
) => {

  return (
    <div className={styles['button__container']}>
      <button
        className={styles['button']}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
