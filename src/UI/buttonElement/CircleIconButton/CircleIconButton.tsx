import "./CircleIconButtonStyles.scss";
import React, { FC } from "react";

type propsType = {
  imageURL: string,
  imageALT: string,
  width: string,
  height: string,
  type?: "submit" | "button" | "reset",
}


export const CircleIconButton: FC<propsType> = (
  {
    imageURL,
    imageALT,
    height,
    width,
    type = "button",
  }
) => {

  return (
    <button
      type={ type }
      className="circle-button"
      style={ {
        height,
        width
      } }
    >
      <img
        className="button-icon"
        src={ imageURL }
        alt={ imageALT }
      />
    </button>
  );
};
