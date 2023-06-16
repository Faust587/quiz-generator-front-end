import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { AuthHeader } from "../AuthHeader";

test("AuthHeader shows title", () => {
  const title = "TITLE";
  const subtitle = "SUBTITLE";
  render(<AuthHeader title={title} subtitle={subtitle} />);
  const screenTitle = screen.getByText(title);
  const screenSubtitle = screen.getByText(subtitle);
  expect(screenTitle).toBeInTheDocument();
  expect(screenSubtitle).toBeInTheDocument();
});
