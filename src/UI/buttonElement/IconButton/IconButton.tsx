import styles from "./IconButton.module.scss";
import { FC, MouseEvent } from "react";

type PropTypes = {
  icon: string;
  alt: string;
  hoverColor: "yellow" | "red";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  width: number;
  height: number;
};

export const IconButton: FC<PropTypes> = ({
  alt,
  hoverColor,
  icon,
  onClick,
  height,
  width,
}) => {
  return (
    <button
      onClick={onClick}
      style={{ width, height }}
      className={`${styles["button"]} ${styles[`button--hover-${hoverColor}`]}`}
    >
      <img src={icon} alt={alt} />
    </button>
  );
};
