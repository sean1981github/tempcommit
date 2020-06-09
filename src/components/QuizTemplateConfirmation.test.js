import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { QuizTemplateConfirmation } from "./QuizTemplateConfirmation";
import App from "../App";
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

const mockGetProblemSetsResponse = [
  {
    categoryCode: "Agile-easy",
    score: 5,
    durationInMins: 5,
  },
  {
    categoryCode: "Agile-medium",
    score: 5,
    durationInMins: 5,
  },
];

const mockProblemSetCount = "20";

const mockCreateQuizTemplateResponse = {
  id: "6a0c4bdb-5769-48d3-9ef7-e0aee022e225",
  quizTemplateCode: "Agile-easy-quiz-template1",
  passingScore: 80,
  totalScore: 100,
  totalDurationInMins: 120,
  problemSetsNumber: [{ categoryCode: "Agile-easy", numberOfQuestions: 20 }],
};

describe("Quiz Template Creation Confirmation Test", () => {
  const waitForPromises = () => new Promise((resolve) => setTimeout(resolve));

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

  it("full login -> create Quiz Template -> Confirm Quiz Template -> logout flow", async () => {
    const { getByTestId, getByText } = render(<App />);
    const username = getByTestId("username");
    const password = getByTestId("password");
    const signinButton = getByTestId("signin");

    fireEvent.change(username, {
      target: { value: "username" },
    });
    fireEvent.change(password, {
      target: { value: "password" },
    });
    fireEvent.click(signinButton);
    mockAxios.onPost("/users/login").reply(200, { role: "QM", username: "qm" });

    await waitForElement(() => getByText("Create New Template"));

    const createQuizTemplateButton = getByText("Create New Template");
    fireEvent.click(createQuizTemplateButton);

    expect(getByText("Create Quiz Template")).toBeInTheDocument();

    mockAxios.onGet("/problem-set").reply(200, mockGetProblemSetsResponse);
    await waitForPromises();

    const quizTemplateCodeTextField = getByTestId(
      "quiztemplate-code-textfield"
    );
    const problemSetNumber = getByTestId("problemset-number-textfield");
    const addProblemSetButton = getByTestId("add-problemset-button");
    const passingScore = getByTestId("passing-score-textfield");
    const totalDuration = getByTestId("total-duration-textfield");

    fireEvent.change(quizTemplateCodeTextField, {
      target: { value: "Agile-easy-quiz-template2" },
    });

    fireEvent.change(problemSetNumber, {
      target: { value: "10" },
    });
    fireEvent.click(addProblemSetButton);
    mockAxios
      .onGet("/problem/Agile-easy/countproblem")
      .reply(200, mockProblemSetCount);
    await waitForPromises();

    expect(getByText("1. Agile-easy - 10")).toBeInTheDocument();

    fireEvent.change(passingScore, {
      target: { value: "80" },
    });

    fireEvent.change(totalDuration, {
      target: { value: "100" },
    });

    const submitButton = getByTestId("submit-button");

    fireEvent.click(submitButton);
    mockAxios
      .onPost("quiz-template/create")
      .reply(200, mockCreateQuizTemplateResponse);

    await waitForElement(() => getByText("Agile-easy-quiz-template1"));

    const logoutButton = getByTestId("logoutButton");
    fireEvent.click(logoutButton);
    mockAxios.onPost("/users/logout").reply(200);

    expect(getByText("You have logged out")).toBeInTheDocument();
    expect(getByTestId("username")).toBeInTheDocument();
  }, 200000);
});
