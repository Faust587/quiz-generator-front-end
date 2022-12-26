import api from "../api";
import {AxiosResponse} from "axios";

type LoginResponse = {
  user: {
    _id: string,
    username: string,
    email: string,
    activated: boolean,
  },
  accessToken: string,
}

export type FailResponse = {
  statusCode: number,
  message: string,
  error: string,
}

export async function login(username: string, password: string): Promise<AxiosResponse<LoginResponse>> {
  return await api.post<LoginResponse>('/auth/login', {username, password});
}
