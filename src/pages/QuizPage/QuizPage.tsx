import React from "react";
import { QuizPageHeader } from "../../components/headers/QuizPageHeader/QuizPageHeader";
import { Quiz } from "../../components/quiz/Quiz";

export const QuizPage = () => {
  return (
    <>
      <QuizPageHeader />
      <Quiz />
    </>
  );
};
