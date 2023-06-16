import { QUESTION_TYPES } from "../../../../types/questionTypes";
import { FC } from "react";
import { QuestionText } from "./questionText/QuestionText";
import { QuestionOption } from "./questionOption/QuestionOption";
import { QuestionFlag } from "./questionFlag/QuestionFlag";
import { QuestionSelect } from "./questionSelect/QuestionSelect";

type PropsType = {
  questionId: string;
  type: QUESTION_TYPES;
  values: string[];
};

export const QuestionType: FC<PropsType> = ({ type, values, questionId }) => {
  return (
    <>
      {type === "TEXT" && <QuestionText questionId={questionId} />}
      {type === "OPTION" && (
        <QuestionOption questionId={questionId} values={values} />
      )}
      {type === "FLAG" && (
        <QuestionFlag values={values} questionId={questionId} />
      )}
      {type === "SELECT" && (
        <QuestionSelect values={values} questionId={questionId} />
      )}
    </>
  );
};
