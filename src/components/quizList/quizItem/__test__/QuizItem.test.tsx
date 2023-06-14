import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { QuizItem } from "../QuizItem";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Quiz item", function () {
  test("renders title correctly", () => {
    render(
      <QuizItem
        iconURL={""}
        title={"Math test"}
        closed={false}
        authOnly={false}
        id={"034903 910394"}
        code={"sdSfd3"}
      />
    );
    const title = screen.getByText("Math test");
    expect(title).toBeInTheDocument();
  });

  test("renders icon correctly", async () => {
    render(
      <QuizItem
        iconURL={""}
        title={"Math test"}
        closed={false}
        authOnly={false}
        id={"034903 910394"}
        code={"sdSfd3"}
      />
    );
    //const title = await screen.;
  });
});
