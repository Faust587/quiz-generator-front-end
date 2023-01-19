import {Dispatch, FC, SetStateAction, ChangeEvent, useState} from "react";
import styles from "../QuestionType.module.scss";
import {TQuestion, updateQuestion} from "../../../../../store/reducer/quizSlice";
import {useAppDispatch} from "../../../../../hooks/redux";

type propTypes = {
  quizId: string,
  data: TQuestion,
  isFocused: boolean,
  value: string,
  values: string[]
  index: number,
  setValue: Dispatch<SetStateAction<string[]>>
}

export const QuestionOption: FC<propTypes> = (
  {
    isFocused, quizId, data, value, setValue, index, values
  }
) => {

  const [localValue, setLocalValue] = useState<string>(value);
  const dispatch = useAppDispatch();

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValues = [...values];
    newValues.splice(index, 1, e.target.value);
    dispatch(updateQuestion({questionId: data.id, type: data.type, name: data.name, isRequired: data.isRequired, value: newValues, quizId}));
    setValue(newValues);
  }

  const deleteVariant = () => {
    const newValues = [...values];
    newValues.splice(index, 1);
    dispatch(updateQuestion({questionId: data.id, type: data.type, name: data.name, isRequired: data.isRequired, value: newValues, quizId}));
    setValue(newValues);
  }

  return (
    <label className={styles.radioButtonItem}>
      <div className={styles.radioButtonContainer}>
        <div className={styles.radioButton}/>
      </div>
      <input
        onBlur={onValueChange}
        onChange={event => setLocalValue(event.target.value)}
        className={styles.descriptionInput}
        value={localValue}
        type="text"/>
      <div className={styles.removeItemButtonContainer}>
        {isFocused ? <button
          className={styles.removeItemButton}
          onClick={deleteVariant}
        >
          ×
        </button> : null}
      </div>
    </label>
  );
}
