import "./AuthFormsStyles.scss";
import { AuthInput } from "../../../UI/inputElement/AuthInput/AuthInput";
import React, { useState } from "react";
import { validationErrors } from "../../../types/validationError";
import { AuthErrorContainer } from "../../errorBlock/AuthErrorContainer";
import { AuthSubmitButton } from "../../../UI/buttonElement/AuthSubmitButton/AuthSubmitButton";

export const SignInForm = () => {

  const [ errors, setErrors ] = useState<validationErrors[]>([]);

  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const [ usernameError, setUsernameError ] = useState(false);
  const [ passwordError, setPasswordError ] = useState(false);

  const signInSubmit = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
  };

  return (
    <form
      className="authorization-form"
      onSubmit={ signInSubmit }
    >
      <div className="authorization-input-wrapper">
        <AuthInput
          name="username"
          placeholder="Username"
          isError={ usernameError }
          type="text"
          value={ username }
          setValue={ setUsername }
        />
      </div>
      <div className="authorization-input-wrapper">
        <AuthInput
          name="password"
          placeholder="Password"
          isError={ passwordError }
          type="password"
          value={ password }
          setValue={ setPassword }
        />
      </div>
      {
        errors.length !== 0 ? (
          <AuthErrorContainer errors={ errors } />
        ) : null
      }
      <div className="authorization-button-wrapper">
        <AuthSubmitButton
          text="Log In"
        />
      </div>
    </form>
  );
};
