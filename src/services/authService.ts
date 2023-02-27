import { type AxiosResponse } from 'axios';

import api from '../api';

interface LoginResponse {
  user: {
    _id: string
    username: string
    email: string
    activated: boolean
  }
  accessToken: string
}

export interface FailResponse {
  statusCode: number
  message: string
  error: string
}

export async function login (
  username: string,
  password: string
): Promise<AxiosResponse<LoginResponse>> {
  return await api.post<LoginResponse>('/auth/login', { username, password });
}
