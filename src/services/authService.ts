import { type AxiosResponse } from "axios";

import api from "../api";
import {
  IRegistrationData,
  IRegistrationResponse,
} from "../store/reducer/auth/types";

interface LoginResponse {
  user: {
    _id: string;
    username: string;
    email: string;
    activated: boolean;
  };
  accessToken: string;
}

export interface FailResponse {
  statusCode: number;
  message: string;
  error: string;
}

export async function login(
  username: string,
  password: string
): Promise<AxiosResponse<LoginResponse>> {
  return await api.post<LoginResponse>("/auth/login", { username, password });
}

export async function register(
  data: IRegistrationData
): Promise<AxiosResponse<IRegistrationResponse>> {
  const { username, password, email } = data;
  return api.post<IRegistrationResponse>("/auth/register", {
    username,
    password,
    email,
  });
}
