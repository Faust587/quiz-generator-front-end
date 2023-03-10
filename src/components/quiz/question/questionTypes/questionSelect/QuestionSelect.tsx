import styles from '../../../Quiz.module.scss';
import {FC, useState, KeyboardEvent} from "react";
import {SelectOption} from "./SelectOption";
import {useAppSelector} from "../../../../../hooks/redux";

type PropTypes = {
  questionId: string;
  values: string[];
}

export const QuestionSelect: FC<PropTypes> = (
  {questionId, values}
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {answer} = useAppSelector(state => state.enteredQuiz);
  const questionAnswer = answer?.answers.find(({id}) => id === questionId);
  if (!questionAnswer) return <p>Error...</p>;

  const activeIndex = questionAnswer.answerInt ?? -1;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(prevState => !prevState);
    }
  }

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{overflow: isOpen ? 'visible' : 'hidden'}}
      className={styles['select']}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(prevState => !prevState)}
    >
      <div>
        {[' -select option- ', ...values].map(value => <div>{value}</div>)}
      </div>
      <div
        style={{top: `-${40 * (activeIndex + 1)}px`}}
        className={styles['select__popup']}
      >
        {[' -select option- ', ...values].map((value, index) => {
          return <SelectOption
            isQuestionOpen={isOpen}
            value={value}
            index={index}
            questionId={questionId}
          />;
        })}
      </div>
    </div>
  );
}
