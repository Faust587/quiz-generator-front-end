import api from "../api";
import {AxiosResponse} from "axios";
import { TQuiz } from "../store/reducer/quizSlice";

export async function getQuizList(): Promise<AxiosResponse<TQuiz[]>> {
  return await api.get<TQuiz[]>('/quiz/list');
}

export async function getQuizByCode(code: string): Promise<AxiosResponse<TQuiz>> {
  return await api.get<TQuiz>('/quiz', { params: { code } });
}

export async function createNewQuiz(name: string, isOnlyAuth: boolean) {
  return await api.post<TQuiz>('/quiz/create', { name, onlyAuthUsers: isOnlyAuth });
}

export async function refreshQuizCode(code: string) {
  const params = new URLSearchParams([['code', code]]);
  return await api.get<TQuiz>('/quiz/refresh-quiz-code', { params });
}

export async function updateQuizParameters(code: string, closed: boolean, onlyAuthUsers: boolean, name: string) {
  const params = new URLSearchParams([['code', code]]);
  return await api.put<TQuiz>('/quiz/update-quiz-parameters', { closed, onlyAuthUsers, name }, { params });
}

export async function deleteQuizById(id: string) {
}
