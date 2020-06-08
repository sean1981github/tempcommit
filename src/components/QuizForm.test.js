import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import QuizForm from "../components/QuizForm";

describe("QuizForm", () => {
  it("Should render a form with requried input fields to create quiz", () => {
    const { getByTestId, getByText } = render(<QuizForm />);

    expect(getByTestId("candidate-name")).toBeInTheDocument();
    expect(getByTestId("candidate-email")).toBeInTheDocument();
    expect(getByText("Quiz Template:")).toBeInTheDocument();
    expect(getByTestId("create-quiz-back")).toBeInTheDocument();
    expect(getByTestId("create-quiz-submit")).toBeInTheDocument();
  });
});
