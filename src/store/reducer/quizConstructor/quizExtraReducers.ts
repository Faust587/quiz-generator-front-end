import { type ActionReducerMapBuilder } from '@reduxjs/toolkit';

import {
  type TInitialQuizState,
  compare
} from './quizSlice';
import {
  createQuestion, deleteQuestion, deleteQuestionAttachment,
  deleteQuizByCode,
  fetchQuizById,
  refreshQuizCode,
  updateQuestion,
  updateQuizParametersById, uploadQuestionAttachment
} from './quizThunks';

export const quizExtraReducers = (builder: ActionReducerMapBuilder<TInitialQuizState>): void => {
  builder.addCase(uploadQuestionAttachment.pending, state => {
    state.questionAttachmentLoading = 'pending';
  });
  builder.addCase(uploadQuestionAttachment.rejected, (state, action) => {
    state.questionAttachmentLoading = 'failed';
    state.questionError = {
      statusCode: action.payload?.statusCode ?? 0,
      message: action.payload?.message ?? ['unknown error']
    };
  });
  builder.addCase(uploadQuestionAttachment.fulfilled, (state, action) => {
    state.questionAttachmentLoading = 'succeeded';
    if (state.currentQuiz == null) return;
    const { id } = action.payload;
    state.currentQuiz.questions = state.currentQuiz.questions.map((question) => {
      if (question.id === id) return action.payload;
      return question;
    });
  });
  builder.addCase(deleteQuestionAttachment.pending, state => {
    state.questionAttachmentLoading = 'pending';
  });
  builder.addCase(deleteQuestionAttachment.rejected, (state, action) => {
    state.questionAttachmentLoading = 'failed';
    state.questionError = {
      statusCode: action.payload?.statusCode ?? 0,
      message: action.payload?.message ?? ['unknown error']
    };
  });
  builder.addCase(deleteQuestionAttachment.fulfilled, (state, action) => {
    state.questionAttachmentLoading = 'succeeded';
    if (state.currentQuiz == null) return;
    const { id } = action.payload;
    state.currentQuiz.questions = state.currentQuiz.questions.map((question) => {
      if (question.id === id) return action.payload;
      return question;
    });
  });
  builder.addCase(fetchQuizById.pending, (state) => {
    state.quizLoading = 'pending';
  });
  builder.addCase(fetchQuizById.rejected, (state, action) => {
    state.quizLoading = 'failed';
    state.quizError = {
      statusCode: action.payload?.statusCode ?? 0,
      message: action.payload?.message ?? ['unknown error']
    };
  });
  builder.addCase(fetchQuizById.fulfilled, (state, { payload }) => {
    payload.questions.sort(compare);
    state.currentQuiz = payload;
    state.quizLoading = 'idle';
  });
  builder.addCase(updateQuizParametersById.rejected, (state, action) => {
    state.parametersLoading = 'failed';
    state.parametersError = {
      statusCode: action.payload?.statusCode ?? 0,
      message: action.payload?.message ?? ['unknown error']
    };
  });
  builder.addCase(updateQuizParametersById.fulfilled, (state, { payload }) => {
    if (state.currentQuiz == null) return;
    const { name, onlyAuthUsers, closed } = payload;
    state.currentQuiz.closed = closed;
    state.currentQuiz.name = name;
    state.currentQuiz.onlyAuthUsers = onlyAuthUsers;
    state.parametersLoading = 'succeeded';
  });
  builder.addCase(updateQuizParametersById.pending, (state) => {
    state.parametersLoading = 'pending';
  });
  builder.addCase(refreshQuizCode.pending, (state) => {
    state.codeLoading = 'pending';
  });
  builder.addCase(refreshQuizCode.fulfilled, (state, { payload }) => {
    if (state.currentQuiz == null) return;
    state.currentQuiz.code = payload.code;
    state.codeLoading = 'succeeded';
  });
  builder.addCase(refreshQuizCode.rejected, (state, action) => {
    state.codeLoading = 'failed';
    state.codeError = {
      statusCode: action.payload?.statusCode ?? 0,
      message: action.payload?.message ?? ['unknown error']
    };
  });
  builder.addCase(deleteQuizByCode.pending, (state) => {
    state.quizDeletingLoading = 'pending';
  });
  builder.addCase(deleteQuizByCode.fulfilled, (state) => {
    state.currentQuiz = null;
    state.quizDeletingLoading = 'succeeded';
  });
  builder.addCase(deleteQuizByCode.rejected, (state, action) => {
    state.quizDeletingLoading = 'failed';
    state.quizDeletingError = {
      statusCode: action.payload?.statusCode ?? 0,
      message: action.payload?.message ?? ['unknown error']
    };
  });
  builder.addCase(createQuestion.pending, state => {
    state.questionCreatingLoading = 'pending';
  });
  builder.addCase(createQuestion.fulfilled, (state, { payload }) => {
    if (state.currentQuiz == null) return;
    state.currentQuiz.questions.push(payload);
    state.focusedQuestion = payload.id;
    state.questionCreatingLoading = 'succeeded';
  });
  builder.addCase(createQuestion.rejected, (state, action) => {
    state.questionCreatingLoading = 'failed';
    state.questionCreatingError = {
      statusCode: action.payload?.statusCode ?? 0,
      message: action.payload?.message ?? ['unknown error']
    };
  });
  builder.addCase(updateQuestion.pending, state => {
    state.questionEditingLoading = 'pending';
  });
  builder.addCase(updateQuestion.fulfilled, (state, { payload }) => {
    if (state.currentQuiz == null) return;
    const { id } = payload;
    const questions = state.currentQuiz.questions;
    state.currentQuiz.questions = questions.map((question) => {
      if (question.id === id) return payload;
      return question;
    });
    state.questionEditingLoading = 'succeeded';
  });
  builder.addCase(updateQuestion.rejected, (state, action) => {
    state.questionEditingLoading = 'failed';
    state.questionEditingError = {
      statusCode: action.payload?.statusCode ?? 0,
      message: action.payload?.message ?? ['unknown error']
    };
  });
  builder.addCase(deleteQuestion.pending, state => {
    state.questionDeletingLoading = 'pending';
  });
  builder.addCase(deleteQuestion.rejected, (state, action) => {
    state.questionDeletingLoading = 'failed';
    state.questionDeletingError = {
      statusCode: action.payload?.statusCode ?? 0,
      message: action.payload?.message ?? ['unknown error']
    };
  });
  builder.addCase(deleteQuestion.fulfilled, (state, { payload }) => {
    if (payload.acknowledged) {
      state.questionDeletingLoading = 'succeeded';
    } else {
      state.questionDeletingLoading = 'failed';
      state.questionDeletingError = {
        statusCode: 0,
        message: 'this question does not exist, reload page'
      };
    }
  });
};
