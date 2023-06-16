import React, { type FC, useState } from "react";
import "./AuthFormsStyles.scss";
import { AuthInput } from "../../../UI/inputElement/authInput/AuthInput";
import { AuthSubmitButton } from "../../../UI/buttonElement";
import { AuthErrorContainer } from "../../errorBlock/AuthErrorContainer";
import ValidationService from "../../../services/validationService";
import { FailResponse, register } from "../../../services/authService";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const SignUpForm: FC = (): JSX.Element => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState<string[]>([]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [repeatedPasswordError, setRepeatedPasswordError] = useState(false);

  const dataValidation = () => {
    const usernameValidation = ValidationService.usernameValidation(username);
    const passwordValidation = ValidationService.passwordValidation(password);
    const repeatedPasswordValidation =
      ValidationService.repeatedPasswordValidation(repeatedPassword, password);
    const emailValidation = ValidationService.emailValidation(email);

    const err: string[] = [];

    if (usernameValidation.length !== 0) {
      err.push(...usernameValidation);
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
    if (passwordValidation.length !== 0) {
      err.push(...passwordValidation);
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (repeatedPasswordValidation.length !== 0) {
      err.push(...repeatedPasswordValidation);
      setRepeatedPasswordError(true);
    } else {
      setRepeatedPasswordError(false);
    }
    if (emailValidation.length !== 0) {
      err.push(...emailValidation);
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (err.length === 0) return true;

    setErrors(err);
    return false;
  };

  const signUpSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const validation = dataValidation();
    if (!validation) return;
    const loginResponse = await register({ username, password, email });
    if (axios.isAxiosError(loginResponse)) {
      const errorResponse = loginResponse as AxiosError<FailResponse>;
      const errorMessage = errorResponse?.response?.data?.error
        ? [errorResponse.response.data.error]
        : ["Unknown error"];
      setErrors(errorMessage);
    } else {
      localStorage.setItem("accessToken", loginResponse.data.accessToken);
      navigate("/main-page");
    }
  };

  return (
    <form className="authorization-form" onSubmit={signUpSubmit}>
      <div className="authorization-input-wrapper">
        <AuthInput
          name="username"
          type="text"
          value={username}
          setValue={setUsername}
          isError={usernameError}
          placeholder="Username"
        />
      </div>
      <div className="authorization-input-wrapper">
        <AuthInput
          name="email"
          type="text"
          value={email}
          setValue={setEmail}
          isError={emailError}
          placeholder="Email"
        />
      </div>
      <div className="authorization-input-wrapper">
        <AuthInput
          name="password"
          type="password"
          value={password}
          setValue={setPassword}
          isError={passwordError}
          placeholder="Password"
        />
      </div>
      <div className="authorization-input-wrapper">
        <AuthInput
          name="repeated password"
          type="password"
          value={repeatedPassword}
          setValue={setRepeatedPassword}
          isError={repeatedPasswordError}
          placeholder="Repeat password"
        />
      </div>
      {errors.length !== 0 ? <AuthErrorContainer errors={errors} /> : null}
      <div className="authorization-button-wrapper">
        <AuthSubmitButton text="Create account" />
      </div>
    </form>
  );
};
