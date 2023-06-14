import { FC } from "react";
import styles from "../../../../../../../../components/quiz/Quiz.module.scss";
import { RadioOption } from "./components/RadioOption";
import { CheckBoxOption } from "./components/CheckBoxOption";

type PropsType = {
  type: "OPTION" | "FLAG" | "SELECT";
  variants: string[];
  chosenVariant: number | number[] | null;
};

export const ChoiceAnswer: FC<PropsType> = ({
  type,
  chosenVariant,
  variants,
}) => {
  return (
    <div className={styles["answer__variants-block"]}>
      {variants.map((value, index) => {
        return (
          <>
            {(type === "OPTION" || type === "SELECT") && (
              <RadioOption
                active={index === chosenVariant}
                key={`${value}_${index}`}
                value={value}
              />
            )}
            {type === "FLAG" && (
              <CheckBoxOption
                active={index === chosenVariant}
                key={`${value}_${index}`}
                value={value}
              />
            )}
          </>
        );
      })}
    </div>
  );
};
