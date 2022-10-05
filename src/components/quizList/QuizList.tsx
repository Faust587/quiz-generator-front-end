import "./QuizListStyles.scss";
import { QuizItem } from "./quizItem/QuizItem";

// TODO: refactor icons stuff
import quizIcon1 from "../../assets/icons/quiz-icon-1.svg";

export const QuizList = () => {

  //TODO: remove mock data and fetch real data from api
  const mockData = [
    {
      id: "id(240285sdf23)",
      name: "Math test",
      questionsNumber: 4,
      iconURL: quizIcon1
    },
    {
      id: "id(240562sdf23)",
      name: "Math test",
      questionsNumber: 4,
      iconURL: quizIcon1
    },
    {
      id: "id(240243sdf23)",
      name: "Math test",
      questionsNumber: 4,
      iconURL: quizIcon1
    },
    {
      id: "id(240243sdf25)",
      name: "Math test Math test",
      questionsNumber: 4,
      iconURL: quizIcon1
    },
    {
      id: "id(243243sdf25)",
      name: "Math test Math test",
      questionsNumber: 4,
      iconURL: quizIcon1
    },
    {
      id: "id(2402s3sdf25)",
      name: "Math test Math test",
      questionsNumber: 4,
      iconURL: quizIcon1
    },
    {
      id: "id(s40243sdf25)",
      name: "Math test Math test",
      questionsNumber: 4,
      iconURL: quizIcon1
    },
  ];

  return (
    <section className="quiz-list-container">
      <header className="quiz-list-header">
        <h1 className="quiz-list-title">
          Your quizzes
        </h1>
        <button className="quiz-generator-button">
          +
        </button>
      </header>
      <div className="quiz-list">
        {
          mockData.map((
            {
              name,
              questionsNumber,
              iconURL,
              id
            }
          ) => {
            return <QuizItem
              key={ id }
              title={ name }
              iconURL={ iconURL }
              subtitle={ questionsNumber }
            />;
          })
        }
      </div>
    </section>
  );
};
