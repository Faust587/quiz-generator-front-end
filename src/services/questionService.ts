import {TQuestion} from "../store/reducer/quizConstructor/quizSlice";
import api from "../api";

export async function createQuestion(question: Omit<TQuestion, "id">, quizId: string) {
  return await api.post<TQuestion>("/question", {...question, quizId});
}
