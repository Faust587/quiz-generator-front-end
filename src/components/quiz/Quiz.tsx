import styles from './Quiz.module.scss';
import {useAppSelector} from "../../hooks/redux";
import {Question} from "./question/Question";
import {SimpleButton} from "../../UI/buttonElement/SimpleButton/SimpleButton";
import {isNumber} from "lodash";

export const Quiz = () => {
  const {quiz, answer} = useAppSelector(state => state.enteredQuiz);
  if (!quiz || !answer) return <p>Loading</p>;
  const submitQuizAnswer = () => {
    answer.answers.forEach((answer, index) => {
      const {isRequired, type} = quiz.questions[index];
      if (isRequired) {
        switch (type) {
          case "OPTION": {
            if (!isNumber(answer.answerInt)) {
              alert(`ERROR ${index} NOT ANSWERED`);
            }
            break;
          }
          case "SELECT": {
            if (!answer.answerInt) {
              alert(`ERROR ${index} NOT ANSWERED`);
            } else if (answer.answerInt === -1) {
              alert(`ERROR ${index} NOT ANSWERED`);
            }
            break;
          }
          case "FLAG": {
            if (!answer.answerArrInt) {
              alert(`ERROR ${index} NOT ANSWERED`);
            } else if (answer.answerArrInt.length === 0) {
              alert(`ERROR ${index} NOT ANSWERED`);
            }
            break;
          }
          case "TEXT": {
            if (!answer.answerText) {
              alert(`ERROR ${index} NOT ANSWERED`);
            } else if(answer.answerText.trim().length === 0) {
              alert(`ERROR ${index} NOT ANSWERED`);
            }
            break;
          }
          default:
            alert("UNKNOWN ERROR");
        }
      }
    });
  }

  return (
    <div className={styles['question-list__container']}>
      {
        quiz.questions.map((question => {
          return <Question key={question.id} quizId={quiz.id} question={question} />;
        }))
      }
      <SimpleButton text='Submit' onClick={submitQuizAnswer} />
    </div>
  );
}
