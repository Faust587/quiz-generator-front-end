import { type FC } from "react";
import "./errorBlockStyles.scss";

interface propsType {
  errors: string[];
}

export const AuthErrorContainer: FC<propsType> = ({ errors }) => {
  return (
    <div className="authorization-error-container">
      {errors.map((error) => {
        return <p key={error}>{error}</p>;
      })}
    </div>
  );
};
