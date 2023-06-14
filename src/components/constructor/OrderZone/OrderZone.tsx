import styles from "./OrderZone.module.scss";
import { type FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { isNumber } from "lodash";
import api from "../../../api";
import {
  setQuestions,
  type TQuestion,
} from "../../../store/reducer/quizConstructor/quizSlice";
import axios from "axios";
import Swal from "sweetalert2";

interface propTypes {
  index: number;
  show: boolean;
}

export const OrderZone: FC<propTypes> = ({ index, show }) => {
  const { changeQuestionOrder, currentQuiz } = useAppSelector(
    (state) => state.quizzes
  );
  const dispatch = useAppDispatch();
  return (
    <div
      className={styles.container}
      style={{
        visibility:
          show &&
          isNumber(changeQuestionOrder) &&
          !(index === changeQuestionOrder + 1 || index === changeQuestionOrder)
            ? "visible"
            : "hidden",
      }}
      onMouseUp={async () => {
        if (!isNumber(changeQuestionOrder) || currentQuiz == null) return;
        const newIndex = changeQuestionOrder > index ? index : index - 1;
        const question = currentQuiz.questions.find(
          (question) => question.index === changeQuestionOrder
        );
        if (question == null) return;
        const questionId = question.id;
        const updateQuestionsOrder = await api.patch<TQuestion[]>(
          "/question/change-order",
          { quizId: currentQuiz.id, questionId, questionNewIndex: newIndex }
        );
        if (axios.isAxiosError(updateQuestionsOrder)) {
          Swal.fire("Error!", "Please, reload page and try again", "error");
        } else {
          dispatch(setQuestions(updateQuestionsOrder.data));
        }
      }}
    >
      Click here to change question position!
    </div>
  );
};
