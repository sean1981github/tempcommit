import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { QuizTemplateConfirmation } from "./QuizTemplateConfirmation";

import Axios from "../utils/axiosInstance";
import MockAdapter from "axios-mock-adapter";

const mockAxios = new MockAdapter(Axios);

const mockHistory = {
  push: jest.fn(),
  location: {
    state: { username: "qm", role: "QM" },
  },
};

const mockLocation = {
  state: {
    quizTemplate: {
      id: "6a0c4bdb-5769-48d3-9ef7-e0aee022e225",
      quizTemplateCode: "Agile-easy-quiz-template1",
      passingScore: 80,
      totalScore: 100,
      totalDurationInMins: 120,
      problemSetsNumber: [
        { categoryCode: "Agile-easy", numberOfQuestions: 20 },
      ],
    },
  },
};

describe("Quiz Template Creation Confirmation Test", () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it("should display Quiz Template Confirmation correctly with props passed from Quiz Template add page", () => {
    const { getByText, getByTestId } = render(
      <QuizTemplateConfirmation history={mockHistory} location={mockLocation} />
    );

    expect(getByText("Agile-easy-quiz-template1")).toBeInTheDocument();
    expect(getByText("1. Agile-easy (20 questions)")).toBeInTheDocument();
    expect(getByText("80")).toBeInTheDocument();
    expect(getByText("100")).toBeInTheDocument();
    expect(getByText("120")).toBeInTheDocument();
    expect(getByTestId("back-button")).toBeInTheDocument();
  });

  it("should trigger redirect back to home page if back to home button is clicked ", () => {
    const { getByTestId } = render(
      <QuizTemplateConfirmation history={mockHistory} location={mockLocation} />
    );

    const backButton = getByTestId("back-button");
    fireEvent.click(backButton);
    expect(mockHistory.push).toHaveBeenCalled();
  });
});
