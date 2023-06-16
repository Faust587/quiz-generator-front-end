import { type AxiosResponse } from "axios";

import api from "../api";
import { type TQuiz } from "../store/reducer/quizConstructor/quizSlice";

export async function getQuizList(): Promise<AxiosResponse<TQuiz[]>> {
  return await api.get<TQuiz[]>("/quiz/list");
}

export async function createNewQuiz(
  name: string,
  isOnlyAuth: boolean,
  icon: string
): Promise<AxiosResponse<TQuiz>> {
  return await api.post<TQuiz>("/quiz/create", {
    name,
    onlyAuthUsers: isOnlyAuth,
    iconURL: icon,
  });
}
