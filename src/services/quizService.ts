import api from "../api";
import {AxiosResponse} from "axios";

export type TQuiz = {
  _id: string;
  name: string;
  closed: boolean;
  onlyAuthUsers: boolean;
  code: string;
}

type CreateQuizResponse = {
  author: string,
  name: string,
  closed: boolean,
  onlyAuthUsers: boolean,
  code: string,
  _id: string,
}

export async function getQuizList(): Promise<AxiosResponse<TQuiz[]>> {
  return await api.get<TQuiz[]>('/quiz/list');
}

export async function createNewQuiz(name: string, isOnlyAuth: boolean) {
  return await api.post<CreateQuizResponse>('/quiz/create', {name, onlyAuthUsers: isOnlyAuth});
}
