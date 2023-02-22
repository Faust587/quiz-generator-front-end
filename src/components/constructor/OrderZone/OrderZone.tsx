import styles from './OrderZone.module.scss';
import {FC} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {isNumber} from "lodash";
import api from "../../../api";
import {setQuestions, TQuestion} from "../../../store/reducer/quiz/quizSlice";
import axios from "axios";
import Swal from "sweetalert2";

type propTypes = {
  index: number,
  show: boolean
}

export const OrderZone: FC<propTypes> = (
  {
    index,
    show
  }
) => {

  const {changeQuestionOrder, currentQuiz} = useAppSelector(state => state.quizzes);
  const dispatch = useAppDispatch();
  return (
    <div
      className={styles.container}
      style={{
        visibility: (
          show &&
          isNumber(changeQuestionOrder) &&
          !(index === changeQuestionOrder + 1 || index === changeQuestionOrder))
          ? "visible" : "hidden"
      }}
      onMouseUp={async () => {
        if (!isNumber(changeQuestionOrder) || !currentQuiz) return;
        const newIndex = (changeQuestionOrder > index) ? index : index - 1;
        const question = currentQuiz.questions.find(question => question.index === changeQuestionOrder);
        if (!question) return;
        const questionId = question.id;
        const updateQuestionsOrder = await api.patch<TQuestion[]>("/question/change-order", {quizId: currentQuiz.id, questionId, questionNewIndex: newIndex});
        if (axios.isAxiosError(updateQuestionsOrder)) {
          Swal.fire(
            'Error!',
            'Please, reload page and try again',
            'error'
          );
        } else {
          dispatch(setQuestions(updateQuestionsOrder.data));
        }
      }}
    >
      Click here to change question position!
    </div>
  );
}
