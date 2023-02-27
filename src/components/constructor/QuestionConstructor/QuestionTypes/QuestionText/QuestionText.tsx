import React, { type FC } from 'react';
import styles from '../QuestionType.module.scss';

export const QuestionText: FC<{ isFocused: boolean }> = () => {
  return (
    <input
      disabled={true}
      className={styles.textInput}
      placeholder="Answer to your question"
      type="text"/>
  );
};
