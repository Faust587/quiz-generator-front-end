import "./QuestionGeneratorStyles.scss";
import { CreateQuestion } from "../fixed/createQuestion/CreateQuestion";
import { QuestionConstructor } from "../questions/questionConstructor/QuestionConstructor";

export const QuestionGenerator = () => {

  return (
    <div className="question-generator">
      <div className="question-generator__wrapper">
        <div className="question-generator__inner">
          <QuestionConstructor children={<></>}/>
        </div>
      </div>
      <CreateQuestion />
    </div>
  );
};
