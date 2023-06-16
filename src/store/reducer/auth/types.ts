export interface IRegistrationData {
  username: string;
  password: string;
  email: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  activated: boolean;
}

export interface IRegistrationResponse {
  user: User;
  accessToken: string;
}
