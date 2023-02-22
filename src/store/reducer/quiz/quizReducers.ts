import {PayloadAction} from '@reduxjs/toolkit';
import {compare, TInitialQuizState, TParameters, TQuestion, TQuiz} from './quizSlice';

export const quizReducers = {
  setQuestions: (state: TInitialQuizState, action: PayloadAction<TQuestion[]>) => {
    if (!state.currentQuiz) return;
    action.payload.sort( compare );
    state.currentQuiz.questions = action.payload;
  },
  setQuestionMoving: (state: TInitialQuizState, action: PayloadAction<boolean>) => {
    state.isQuestionMoves = action.payload;
  },
  setQuizForChangingOrder: (state: TInitialQuizState, action: PayloadAction<number | null>) => {
    state.changeQuestionOrder = action.payload;
  },
  setCurrentQuiz: (state: TInitialQuizState, action: PayloadAction<TQuiz | null>) => {
    state.currentQuiz = action.payload;
  },
  setActiveQuestion: (state: TInitialQuizState, action: PayloadAction<string | null>) => {
    if (state.focusedQuestion === action.payload) {
      state.unfocusedQuestion = null;
      return;
    }
    state.unfocusedQuestion = state.focusedQuestion;
    state.focusedQuestion = action.payload;
  },
  removeQuestionFromState: (state: TInitialQuizState, action: PayloadAction<string>) => {
    if (!state.currentQuiz) return;
    state.currentQuiz.questions = state.currentQuiz.questions.filter(question => {
      return question.id !== action.payload;
    });
  },
  updateParameters: (state: TInitialQuizState, action: PayloadAction<TParameters>) => {
    if (!state.currentQuiz) return;
    const {name, closed, onlyAuthUsers} = action.payload;
    state.currentQuiz = {...state.currentQuiz, closed, name, onlyAuthUsers};
  },
  updateCode: (state: TInitialQuizState, action: PayloadAction<string>) => {
    if (!state.currentQuiz) return;
    const code = action.payload;
    state.currentQuiz = {...state.currentQuiz, code};
  },
  clearQuizStatus: (state: TInitialQuizState) => {
    state.quizLoading = 'idle';
  },
  clearQuizError: (state: TInitialQuizState) => {
    state.quizError = null;
  },
  clearParametersError: (state: TInitialQuizState) => {
    state.parametersError = null;
  },
  clearParametersLoading: (state: TInitialQuizState) => {
    state.parametersLoading = 'idle';
  },
  clearCodeLoading: (state: TInitialQuizState) => {
    state.codeLoading = 'idle';
  },
  clearCodeError: (state: TInitialQuizState) => {
    state.codeError = null;
  },
  clearQuizDeleteLoading: (state: TInitialQuizState) => {
    state.quizDeletingLoading = 'idle';
  },
  clearQuizDeleteError: (state: TInitialQuizState) => {
    state.quizDeletingError = null;
  },
  clearQuestionCreatingLoading: (state: TInitialQuizState) => {
    state.questionCreatingLoading = 'idle';
  },
  clearQuestionCreatingError: (state: TInitialQuizState) => {
    state.questionCreatingError = null;
  },
  clearQuestionEditingLoading: (state: TInitialQuizState) => {
    state.questionEditingLoading = 'idle';
  },
  clearQuestionEditingError: (state: TInitialQuizState) => {
    state.questionEditingError = null;
  },
  clearQuestionDeletingLoading: (state: TInitialQuizState) => {
    state.questionDeletingLoading = 'idle';
  },
  clearQuestionDeletingError: (state: TInitialQuizState) => {
    state.questionDeletingError = null;
  }
}
