import React, {FC} from "react";
import "./buttonStyles.scss";

type propsType = {
  text: string
  submit: (event: React.FormEvent<EventTarget>) => void
}

export const AuthSubmitButton: FC<propsType> = (
  {
    text
  }
) => {

  return (
    <button className="authorization-submit-button"
            type="submit">
      {text}
    </button>
  );
}
