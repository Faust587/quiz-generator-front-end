import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {QUESTION_TYPES} from "../../types/questionTypes";
import api from "../../api";
import axios from "axios";

export type TQuiz = {
  id: string,
  name: string,
  closed: boolean,
  onlyAuthUsers: boolean,
  code: string,
  author: string,
  iconURL: string,
  lastUpdated: number,
  questions: TQuestion[]
}

export type TQuestion = {
  id: string,
  type: QUESTION_TYPES,
  value: string[],
  index: number,
  isRequired: boolean,
  isFileUploaded: boolean,
  name: string;
}

type TParameters = {
  name: string,
  closed: boolean,
  onlyAuthUsers: boolean,
}

export type TDeleteResponse = {
  acknowledged: boolean;
  deletedCount: number;
}

export type TError = {
  statusCode: number;
  message: string[] | string;
}

type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';

type TInitialState = {
  changeQuestionOrder: number | null;
  isQuestionMoves: boolean;
  quizLoading: TLoading;
  parametersLoading: TLoading;
  questionLoading: TLoading;
  codeLoading: TLoading;
  quizDeletingLoading: TLoading;
  questionCreatingLoading: TLoading;
  questionEditingLoading: TLoading;
  questionDeletingLoading: TLoading;
  questionDeletingError: TError | null;
  questionEditingError: TError | null;
  questionCreatingError: TError | null;
  quizDeletingError: TError | null;
  quizError: TError | null;
  parametersError: TError | null;
  questionError: TError | null;
  codeError: TError | null;
  currentQuiz: TQuiz | null;
  focusedQuestion: string | null;
  unfocusedQuestion: string | null;
}

const initialState: TInitialState = {
  changeQuestionOrder: null,
  isQuestionMoves: false,
  quizLoading: 'idle',
  parametersLoading: 'idle',
  questionLoading: 'idle',
  codeLoading: 'idle',
  quizDeletingLoading: 'idle',
  questionCreatingLoading: 'idle',
  questionEditingLoading: 'idle',
  questionDeletingLoading: 'idle',
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
}

function compare( a: TQuestion, b: TQuestion ) {
  if ( a.index < b.index ){
    return -1;
  }
  if ( a.index > b.index ){
    return 1;
  }
  return 0;
}

export const fetchQuizById = createAsyncThunk<TQuiz, string, { rejectValue: TError }>(
  "quiz/fetchQuizById",
  async function (quizId: string, thunkAPI) {
    const response = await api.get<TQuiz>(`/quiz/constructor/${quizId}`);
    if (!axios.isAxiosError(response)) return response.data;
    if (!response.response?.data) {
      return thunkAPI.rejectWithValue({
        statusCode: 0,
        message: ["Unknown error, please write to out support"]
      });
    }
    const errorData = response.response?.data as TError;
    return thunkAPI.rejectWithValue(errorData);
  }
);

export const updateQuizParametersById = createAsyncThunk<TQuiz, { parameters: TParameters, quizId: string }, { rejectValue: TError }>(
  "quiz/updateQuizParametersById",
  async function (data, thunkAPI) {
    const {quizId, parameters} = data;
    const response = await api.put<TQuiz>('/quiz/update-quiz-parameters', {quizId, ...parameters});
    if (!axios.isAxiosError(response)) return response.data;
    if (!response.response?.data) {
      return thunkAPI.rejectWithValue({
        statusCode: 0,
        message: ["Unknown error, please write to out support"]
      });
    }
    const errorData = response.response?.data as TError;
    return thunkAPI.rejectWithValue(errorData);
  }
);

export const refreshQuizCode = createAsyncThunk<TQuiz, string, { rejectValue: TError }>(
  'quiz/refreshQuizCode',
  async function (code, thunkAPI) {
    const params = new URLSearchParams([['code', code]]);
    const response = await api.get<TQuiz>('/quiz/refresh-quiz-code', { params });
    if (!axios.isAxiosError(response)) return response.data;
    if (!response.response?.data) {
      return thunkAPI.rejectWithValue({
        statusCode: 0,
        message: ["Unknown error, please write to out support"]
      });
    }
    const errorData = response.response?.data as TError;
    return thunkAPI.rejectWithValue(errorData);
  }
);

export const deleteQuizByCode = createAsyncThunk<TDeleteResponse, string, { rejectValue: TError }>(
  "quiz/deleteQuizByCode",
  async function (code, thunkAPI) {
    const params = new URLSearchParams([['code', code]]);
    const response = await api.delete<TDeleteResponse>('/quiz', { params });
    if (!axios.isAxiosError(response)) return response.data;
    if (!response.response?.data) {
      return thunkAPI.rejectWithValue({
        statusCode: 0,
        message: ["Unknown error, please write to out support"]
      });
    }
    const errorData = response.response?.data as TError;
    return thunkAPI.rejectWithValue(errorData);
  }
);

export const createQuestion = createAsyncThunk<TQuestion, Omit<TQuestion, 'id' | "index"> & {quizId: string}, { rejectValue: TError }>(
  'quiz/createQuestion',
  async function (question, thunkAPI) {
    const response = await api.post<TQuestion>('/question', question);
    if (!axios.isAxiosError(response)) return response.data;
    if (!response.response?.data) {
      return thunkAPI.rejectWithValue({
        statusCode: 0,
        message: ["Unknown error, please write to out support"]
      });
    }
    const errorData = response.response?.data as TError;
    return thunkAPI.rejectWithValue(errorData);
  }
);

export const updateQuestion = createAsyncThunk<TQuestion, Omit<TQuestion, "id"> & {questionId: string, quizId: string}, { rejectValue: TError }>(
  'quiz/updateQuestion',
  async function (question, thunkAPI) {
    if (question.type !== "TEXT" && !question.value.length) {
      question.value = ["Variant"];
    } else if (question.type === "TEXT") {
      question.value = [];
    }
    const response = await api.patch<TQuestion>('/question', question);
    if (!axios.isAxiosError(response)) return response.data;
    if (!response.response?.data) {
      return thunkAPI.rejectWithValue({
        statusCode: 0,
        message: ["Unknown error, please write to out support"]
      });
    }
    const errorData = response.response?.data as TError;
    return thunkAPI.rejectWithValue(errorData);
  }
);

export const deleteQuestion = createAsyncThunk<TDeleteResponse, {questionId: string, quizId: string}, { rejectValue: TError }>(
  'quiz/deleteQuestion',
  async function (data, thunkAPI) {
    const response = await api.delete<TDeleteResponse>('/question', {data});
    if (!axios.isAxiosError(response)) return response.data;
    if (!response.response?.data) {
      return thunkAPI.rejectWithValue({
        statusCode: 0,
        message: ["Unknown error, please write to out support"]
      });
    }
    const errorData = response.response?.data as TError;
    return thunkAPI.rejectWithValue(errorData);
  }
)

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<TQuestion[]>) => {
      if (!state.currentQuiz) return;
      action.payload.sort( compare );
      state.currentQuiz.questions = action.payload;
    },
    setQuestionMoving: (state, action: PayloadAction<boolean>) => {
      state.isQuestionMoves = action.payload;
    },
    setQuizForChangingOrder: (state, action: PayloadAction<number | null>) => {
      state.changeQuestionOrder = action.payload;
    },
    setCurrentQuiz: (state, action: PayloadAction<TQuiz | null>) => {
      state.currentQuiz = action.payload;
    },
    setActiveQuestion: (state, action: PayloadAction<string | null>) => {
      if (state.focusedQuestion === action.payload) {
        state.unfocusedQuestion = null;
        return;
      }
      state.unfocusedQuestion = state.focusedQuestion;
      state.focusedQuestion = action.payload;
    },
    removeQuestionFromState: (state, action: PayloadAction<string>) => {
      if (!state.currentQuiz) return;
      state.currentQuiz.questions = state.currentQuiz.questions.filter(question => {
        return question.id !== action.payload;
      });
    },
    updateParameters: (state, action: PayloadAction<TParameters>) => {
      if (!state.currentQuiz) return;
      const {name, closed, onlyAuthUsers} = action.payload;
      state.currentQuiz = {...state.currentQuiz, closed, name, onlyAuthUsers};
    },
    updateCode: (state, action: PayloadAction<string>) => {
      if (!state.currentQuiz) return;
      const code = action.payload;
      state.currentQuiz = {...state.currentQuiz, code};
    },
    clearQuizStatus: (state) => {
      state.quizLoading = 'idle';
    },
    clearQuizError: (state) => {
      state.quizError = null;
    },
    clearParametersError: (state) => {
      state.parametersError = null;
    },
    clearParametersLoading: (state) => {
      state.parametersLoading = 'idle';
    },
    clearCodeLoading: (state) => {
      state.codeLoading = 'idle';
    },
    clearCodeError: (state) => {
      state.codeError = null;
    },
    clearQuizDeleteLoading: state => {
      state.quizDeletingLoading = 'idle';
    },
    clearQuizDeleteError: state => {
      state.quizDeletingError = null;
    },
    clearQuestionCreatingLoading: state => {
      state.questionCreatingLoading = 'idle';
    },
    clearQuestionCreatingError: state => {
      state.questionCreatingError = null;
    },
    clearQuestionEditingLoading: state => {
      state.questionEditingLoading = 'idle';
    },
    clearQuestionEditingError: state => {
      state.questionEditingError = null;
    },
    clearQuestionDeletingLoading: state => {
      state.questionDeletingLoading = 'idle';
    },
    clearQuestionDeletingError: state => {
      state.questionDeletingError = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchQuizById.pending, (state) => {
      state.quizLoading = 'pending';
    });
    builder.addCase(fetchQuizById.rejected, (state, action) => {
      state.quizLoading = 'failed';
      state.quizError = {
        statusCode: action.payload?.statusCode || 0,
        message: action.payload?.message || ["unknown error"],
      };
    });
    builder.addCase(fetchQuizById.fulfilled, (state, {payload}) => {
      payload.questions.sort( compare );
      state.currentQuiz = payload;
      state.quizLoading = 'idle';
    });
    builder.addCase(updateQuizParametersById.rejected, (state, action) => {
      state.parametersLoading = 'failed';
      state.parametersError = {
        statusCode: action.payload?.statusCode || 0,
        message: action.payload?.message || ["unknown error"],
      };
    });
    builder.addCase(updateQuizParametersById.fulfilled, (state, {payload}) => {
      if (!state.currentQuiz) return;
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
    builder.addCase(refreshQuizCode.fulfilled, (state, {payload}) => {
      if (!state.currentQuiz) return;
      state.currentQuiz.code = payload.code;
      state.codeLoading = 'succeeded';
    });
    builder.addCase(refreshQuizCode.rejected, (state, action) => {
      state.codeLoading = 'failed';
      state.codeError = {
        statusCode: action.payload?.statusCode || 0,
        message: action.payload?.message || ["unknown error"],
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
        statusCode: action.payload?.statusCode || 0,
        message: action.payload?.message || ["unknown error"],
      };
    });
    builder.addCase(createQuestion.pending, state => {
      state.questionCreatingLoading = 'pending';
    });
    builder.addCase(createQuestion.fulfilled, (state, {payload}) => {
      if (!state.currentQuiz) return;
      state.currentQuiz.questions.push(payload);
      state.focusedQuestion = payload.id;
      state.questionCreatingLoading = 'succeeded';
    });
    builder.addCase(createQuestion.rejected, (state, action) => {
      state.questionCreatingLoading = 'failed';
      state.questionCreatingError = {
        statusCode: action.payload?.statusCode || 0,
        message: action.payload?.message || ["unknown error"],
      };
    });
    builder.addCase(updateQuestion.pending, state => {
      state.questionEditingLoading = 'pending';
    });
    builder.addCase(updateQuestion.fulfilled, (state, {payload}) => {
      if (!state.currentQuiz) return;
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
        statusCode: action.payload?.statusCode || 0,
        message: action.payload?.message || ["unknown error"],
      };
    });
    builder.addCase(deleteQuestion.pending, state => {
      state.questionDeletingLoading = 'pending';
    });
    builder.addCase(deleteQuestion.rejected, (state, action) => {
      state.questionDeletingLoading = 'failed';
      state.questionDeletingError = {
        statusCode: action.payload?.statusCode || 0,
        message: action.payload?.message || ["unknown error"],
      };
    });
    builder.addCase(deleteQuestion.fulfilled, (state, {payload}) => {
      if (payload.acknowledged) {
        state.questionDeletingLoading = 'succeeded';
      } else {
        state.questionDeletingLoading = 'failed';
        state.questionDeletingError = {
          statusCode: 0,
          message: "this question does not exist, reload page",
        };
      }
    });
  }
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
