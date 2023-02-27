import {FC} from 'react';
import styles from './MoveQuestion.module.scss'
import {setQuestionMoving, setQuizForChangingOrder} from '../../../../store/reducer/quizConstructor/quizSlice';
import {useAppDispatch} from '../../../../hooks/redux';

type PropsType = {
  isQuestionMoves: boolean;
  questionIndex: number;
  isFocused: boolean;
}

export const MoveQuestion: FC<PropsType> = ({isQuestionMoves, questionIndex, isFocused}) => {
  const dispatch = useAppDispatch();
  if (!isFocused) return null;
  return (
    <div className={styles.movableContainer}>
      <button
        className={styles.moveOrderButton}
        onClick={(e) => {
          e.stopPropagation()
          dispatch(setQuizForChangingOrder(questionIndex));
          dispatch(setQuestionMoving(true))
        }}
      >
        Change order
      </button>
      {isQuestionMoves && 'Just click to another position'}
    </div>
  );
}
