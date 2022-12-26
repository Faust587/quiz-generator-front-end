import { validationErrors } from "../types/validationError";

export interface IValidationMethods {
  usernameValidation: (username: string) => string[],
  passwordValidation: (password: string) => string[],
  repeatedPasswordValidation: (repeatedPassword: string, password: string) => validationErrors[],
  emailValidation: (email: string) => validationErrors[],
}

class ValidationService implements IValidationMethods {
  usernameValidation = (username: string) => {
    const errors: string[] = [];
    if (username.length >= 15) {
      errors.push(validationErrors.USERNAME_MUST_HAVE_LESS);
    }
    if (username.length <= 2) {
      errors.push(validationErrors.USERNAME_MUST_HAVE_MORE);
    }
    return errors;
  };

  passwordValidation = (password: string) => {
    const errors: string[] = [];
    if (password.length >= 15) {
      errors.push(validationErrors.PASSWORD_MUST_HAVE_LESS);
    }
    if (password.length <= 7) {
      errors.push(validationErrors.PASSWORD_MUST_HAVE_MORE);
    }

    return errors;
  };

  repeatedPasswordValidation = (repeatedPassword: string, password: string) => {
    const errors: validationErrors[] = [];
    if (repeatedPassword !== password) {
      errors.push(validationErrors.PASSWORDS_ARE_NOT_THE_SAME);
    }
    return errors;
  };

  emailValidation = (email: string) => {
    const errors: validationErrors[] = [];
    const emailRegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!emailRegExp.test(email)) {
      errors.push(validationErrors.EMAIL_IS_NOT_VALID);
    }
    return errors;
  };
}

export default new ValidationService();
//TODO: DO SOMETHING
/*    const checkDigit = new RegExp(/(?=.*\d)/);
    const checkLowerCase = new RegExp(/(?=.*[a-z])/);
    const checkUpperCase = new RegExp(/(?=.*[A-Z])/);

    const isDigit = checkDigit.test(password);
    if (!isDigit) {
      errors.push(validationErrors.PASSWORD_MUST_HAVE_DIGIT);
    }

    const isLowerCase = checkLowerCase.test(password);
    if (!isLowerCase) {
      errors.push(validationErrors.PASSWORD_MUST_HAVE_LOWER_CASE);
    }

    const isUpperCase = checkUpperCase.test(password);
    if (!isUpperCase) {
      errors.push(validationErrors.PASSWORD_MUST_HAVE_UPPER_CASE);
    }*/
