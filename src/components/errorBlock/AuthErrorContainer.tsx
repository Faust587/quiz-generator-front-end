import { FC } from "react";
import "./errorBlockStyles.scss";
import { validationErrors } from "../../types/validationError";

type propsType = {
  errors: string[]
}

export const AuthErrorContainer: FC<propsType> = (
  {
    errors
  }
) => {

  return (
    <div className="authorization-error-container">
      {
        errors.map(error => {
          return <p key={ error }>{ error }</p>;
        })
      }
    </div>
  );
};
