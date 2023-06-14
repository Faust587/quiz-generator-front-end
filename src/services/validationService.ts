import { validationErrors } from "../types/validationError";

export interface IValidationMethods {
  usernameValidation: (username: string) => string[];
  passwordValidation: (password: string) => string[];
  repeatedPasswordValidation: (
    repeatedPassword: string,
    password: string
  ) => validationErrors[];
  emailValidation: (email: string) => validationErrors[];
}

class ValidationService implements IValidationMethods {
  usernameValidation = (username: string): string[] => {
    const errors: string[] = [];
    if (username.length >= 15) {
      errors.push(validationErrors.USERNAME_MUST_HAVE_LESS);
    }
    if (username.length <= 2) {
      errors.push(validationErrors.USERNAME_MUST_HAVE_MORE);
    }
    return errors;
  };

  passwordValidation = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length >= 15) {
      errors.push(validationErrors.PASSWORD_MUST_HAVE_LESS);
    }
    if (password.length <= 7) {
      errors.push(validationErrors.PASSWORD_MUST_HAVE_MORE);
    }

    return errors;
  };

  repeatedPasswordValidation = (
    repeatedPassword: string,
    password: string
  ): validationErrors[] => {
    const errors: validationErrors[] = [];
    if (repeatedPassword !== password) {
      errors.push(validationErrors.PASSWORDS_ARE_NOT_THE_SAME);
    }
    return errors;
  };

  emailValidation = (email: string): validationErrors[] => {
    const errors: validationErrors[] = [];
    const emailRegExp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegExp.test(email)) {
      errors.push(validationErrors.EMAIL_IS_NOT_VALID);
    }
    return errors;
  };
}

export default new ValidationService();
