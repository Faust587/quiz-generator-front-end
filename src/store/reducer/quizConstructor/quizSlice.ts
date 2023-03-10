import { createSlice } from '@reduxjs/toolkit';

import { type QUESTION_TYPES } from '../../../types/questionTypes';
import { quizExtraReducers } from './quizExtraReducers';
import { quizReducers } from './quizReducers';

export interface TQuiz {
  id: string
  name: string
  closed: boolean
  onlyAuthUsers: boolean
  code: string
  author: string
  iconURL: string
  lastUpdated: number
  questions: TQuestion[]
}

export interface TQuestion {
  id: string
  type: QUESTION_TYPES
  value: string[]
  index: number
  isRequired: boolean
  isFileUploaded: boolean
  attachmentName: string | undefined
  name: string
}

export interface TParameters {
  name: string
  closed: boolean
  onlyAuthUsers: boolean
}

export interface TDeleteResponse {
  acknowledged: boolean
  deletedCount: number
}

export interface TError {
  statusCode: number
  message: string[] | string
}

export type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';

export interface TInitialQuizState {
  changeQuestionOrder: number | null
  isQuestionMoves: boolean
  quizLoading: TLoading
  parametersLoading: TLoading
  codeLoading: TLoading
  quizDeletingLoading: TLoading
  questionCreatingLoading: TLoading
  questionEditingLoading: TLoading
  questionDeletingLoading: TLoading
  questionAttachmentLoading: TLoading
  questionDeletingError: TError | null
  questionEditingError: TError | null
  questionCreatingError: TError | null
  quizDeletingError: TError | null
  quizError: TError | null
  parametersError: TError | null
  questionError: TError | null
  codeError: TError | null
  currentQuiz: TQuiz | null
  focusedQuestion: string | null
  unfocusedQuestion: string | null
}

const initialState: TInitialQuizState = {
  changeQuestionOrder: null,
  isQuestionMoves: false,
  quizLoading: 'idle',
  parametersLoading: 'idle',
  codeLoading: 'idle',
  quizDeletingLoading: 'idle',
  questionCreatingLoading: 'idle',
  questionEditingLoading: 'idle',
  questionDeletingLoading: 'idle',
  questionAttachmentLoading: 'idle',
  questionDeletingError: null,
  questionEditingError: null,
  questionCreatingError: null,
  quizDeletingError: null,
  codeError: null,
  questionError: null,
  quizError: null,
  parametersError: null,
  currentQuiz: null,
  focusedQuestion: null,
  unfocusedQuestion: null
};

export function compare (a: TQuestion, b: TQuestion): (1 | -1 | 0) {
  if (a.index < b.index) {
    return -1;
  }
  if (a.index > b.index) {
    return 1;
  }
  return 0;
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: quizReducers,
  extraReducers: quizExtraReducers
});

export const {
  clearParametersLoading,
  clearQuizStatus,
  clearParametersError,
  clearQuizError,
  setActiveQuestion,
  updateCode,
  updateParameters,
  setQuestions,
  setQuizForChangingOrder,
  setCurrentQuiz,
  clearCodeError,
  clearCodeLoading,
  clearQuizDeleteError,
  clearQuizDeleteLoading,
  clearQuestionCreatingLoading,
  clearQuestionCreatingError,
  clearQuestionEditingError,
  clearQuestionEditingLoading,
  clearQuestionDeletingLoading,
  clearQuestionDeletingError,
  removeQuestionFromState,
  setQuestionMoving
} = quizSlice.actions;
export default quizSlice.reducer;
