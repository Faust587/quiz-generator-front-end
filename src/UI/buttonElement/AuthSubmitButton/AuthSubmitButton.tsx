import React, { FC } from "react";
import "./AuthSubmitButtonStyles.scss";

type propsType = {
  text: string
}

export const AuthSubmitButton: FC<propsType> = (
  {
    text
  }
) => {

  return (
    <button
      className="authorization-submit-button"
      type="submit"
    >
      { text }
    </button>
  );
};
