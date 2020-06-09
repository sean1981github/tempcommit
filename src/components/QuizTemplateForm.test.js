import React from "react";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { QuizTemplateForm } from "../components/QuizTemplateForm";
import Axios from "../utils/axiosInstance";

const mockAxios = new MockAdapter(Axios);

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

const mockHistory = {
  push: jest.fn(),
  goBack: jest.fn(),
  location: {
    state: { username: "qm", role: "QM" },
  },
};

describe("Quiz Template Test", () => {
  const waitForPromises = () => new Promise((resolve) => setTimeout(resolve));

  beforeEach(() => {
    mockAxios.reset();
  });

  it("should render create quiz template page with no issue", () => {
    const { getByText } = render(<QuizTemplateForm history={mockHistory} />);
    expect(getByText("Create Quiz Template")).toBeInTheDocument();
  });

  it("should render input textfield for Quiz Template Code", () => {
    const { getByTestId } = render(<QuizTemplateForm history={mockHistory} />);
    expect(getByTestId("quiztemplate-code-textfield")).toBeInTheDocument();
  });

  it("should render dropmenu to choose problem set code", () => {
    const { getByTestId } = render(<QuizTemplateForm history={mockHistory} />);
    expect(getByTestId("problemSetCode-select")).toBeInTheDocument();
  });

  it("should render input textfield for number of questions to choose from problem set", () => {
    const { getByTestId } = render(<QuizTemplateForm history={mockHistory} />);
    expect(getByTestId("problemset-number-textfield")).toBeInTheDocument();
  });

  it("should render button to add new problem set option", () => {
    const { getByTestId } = render(<QuizTemplateForm history={mockHistory} />);
    expect(getByTestId("add-problemset-button")).toBeInTheDocument();
  });

  it("should render passing score text field", () => {
    const { getByTestId } = render(<QuizTemplateForm history={mockHistory} />);
    expect(getByTestId("passing-score-textfield")).toBeInTheDocument();
  });

  it("should render total score text field", () => {
    const { getByTestId } = render(<QuizTemplateForm history={mockHistory} />);
    expect(getByTestId("total-score-textfield")).toBeInTheDocument();
    expect(getByTestId("total-score-textfield")).toBeDisabled();
  });

  it("should render total duration text field", () => {
    const { getByTestId } = render(<QuizTemplateForm history={mockHistory} />);
    expect(getByTestId("total-duration-textfield")).toBeInTheDocument();
  });

  it("should render button to go back", () => {
    const { getByTestId } = render(<QuizTemplateForm history={mockHistory} />);
    expect(getByTestId("back-button")).toBeInTheDocument();
  });

  it("should render button to submit problem", () => {
    const { getByTestId } = render(<QuizTemplateForm history={mockHistory} />);
    expect(getByTestId("submit-button")).toBeInTheDocument();
  });

  it("should display error messages when submit without inputs", async () => {
    const { getByTestId, getByText, queryByText } = render(
      <QuizTemplateForm history={mockHistory} />
    );

    mockAxios.onGet("/problem-set").reply(200, mockGetProblemSetsResponse);
    await waitForPromises();

    const submitButton = getByTestId("submit-button");
    fireEvent.click(submitButton);
    expect(
      getByText(
        "Quiz Template Code cannot be empty and needs to be 3 characters or longer"
      )
    ).toBeInTheDocument();
    expect(getByText("Please add at least 1 Problem Sets")).toBeInTheDocument();
    expect(
      getByText("Passing score cannot be empty and needs to be >= 1 and <= 100")
    ).toBeInTheDocument();
    expect(
      getByText(
        "Total duration cannot be empty and needs to be >= 1 and <= 180"
      )
    ).toBeInTheDocument();

    const quizTemplateCodeTextField = getByTestId(
      "quiztemplate-code-textfield"
    );
    fireEvent.change(quizTemplateCodeTextField, {
      target: { value: "Agile-easy-quiz-template2" },
    });
    fireEvent.click(submitButton);
    expect(
      queryByText(
        "Quiz Template Code cannot be empty and needs to be 3 characters or longer"
      )
    ).not.toBeInTheDocument();

    const addProblemSetButton = getByTestId("add-problemset-button");
    fireEvent.click(addProblemSetButton);
    expect(
      getByText("Problem set number cannot empty and needs to be > 0")
    ).toBeInTheDocument();

    const problemSetNumber = getByTestId("problemset-number-textfield");
    fireEvent.change(problemSetNumber, {
      target: { value: "30" },
    });
    fireEvent.click(addProblemSetButton);
    mockAxios
      .onGet("/problem/Agile-easy/countproblem")
      .reply(200, mockProblemSetCount);
    await waitForPromises();
    expect(
      getByText(
        "Number of questions should not exceed the maximum number in Problem Set"
      )
    ).toBeInTheDocument();

    fireEvent.change(problemSetNumber, {
      target: { value: "10" },
    });
    fireEvent.click(addProblemSetButton);
    mockAxios
      .onGet("/problem/Agile-easy/countproblem")
      .reply(200, mockProblemSetCount);
    await waitForPromises();
    expect(
      queryByText(
        "Number of questions should not exceed the maximum number in Problem Set"
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText("Problem set number cannot empty and needs to be > 0")
    ).not.toBeInTheDocument();

    fireEvent.change(problemSetNumber, {
      target: { value: "10" },
    });
    fireEvent.click(addProblemSetButton);
    expect(getByText("Please select a Problem Set")).toBeInTheDocument();

    fireEvent.change(quizTemplateCodeTextField, {
      target: { value: "" },
    });
    const passingScore = getByTestId("passing-score-textfield");
    fireEvent.change(passingScore, {
      target: { value: "80" },
    });
    fireEvent.click(submitButton);
    expect(
      queryByText(
        "Passing score cannot be empty and needs to be >= 1 and <= 100"
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText(
        "Total duration cannot be empty and needs to be >= 1 and <= 180"
      )
    ).not.toBeInTheDocument();
  }, 200000);

  it("should show error message when API call to retrieve problem sets returns with non-200 status codes", async () => {
    const { getByText } = render(<QuizTemplateForm history={mockHistory} />);

    mockAxios.onGet("/problem-set").reply(203);
    await waitForPromises();

    expect(
      getByText(
        /Failed to retrieve problem set. Please refresh page and try again./
      )
    ).toBeInTheDocument();
  });

  it("should show error message when API call to retrieve problem sets encounters network error", async () => {
    const { getByText } = render(<QuizTemplateForm history={mockHistory} />);

    mockAxios.onGet("/problem-set").networkError();
    await waitForPromises();

    expect(
      getByText(
        /Failed to retrieve problem set. Please refresh page and try again./
      )
    ).toBeInTheDocument();
  });

  it("should show error message when saving to Quiz Template encounters network error", async () => {
    const { getByText, getByTestId } = render(
      <QuizTemplateForm history={mockHistory} />
    );

    mockAxios.onGet("/problem-set").reply(200, mockGetProblemSetsResponse);
    await waitForPromises();

    const quizTemplateCodeTextField = getByTestId(
      "quiztemplate-code-textfield"
    );
    const problemSetCodeSelect = getByTestId("problemSetCode-select");
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

    fireEvent.change(passingScore, {
      target: { value: "80" },
    });

    fireEvent.change(totalDuration, {
      target: { value: "50" },
    });

    const submitButton = getByTestId("submit-button");

    fireEvent.click(submitButton);
    mockAxios.onPost("quiz-template/create").reply(500, { data: "Any error" });
    await waitForPromises();

    expect(
      getByText(
        /Failed to add quiz template. Something is wrong, please try again later./
      )
    ).toBeInTheDocument();
  });

  it("should show error message when API call to retrieve problem sets encounters network error", async () => {
    const { getByText } = render(<QuizTemplateForm history={mockHistory} />);

    mockAxios.onGet("/problem-set").networkError();
    await waitForPromises();

    expect(
      getByText(
        /Failed to retrieve problem set. Please refresh page and try again./
      )
    ).toBeInTheDocument();
  });

  it("should show duplicate error message when saving to Quiz Template encounters existing Quiz Template Code", async () => {
    const { getByText, getByTestId } = render(
      <QuizTemplateForm history={mockHistory} />
    );

    mockAxios.onGet("/problem-set").reply(200, mockGetProblemSetsResponse);
    await waitForPromises();

    const quizTemplateCodeTextField = getByTestId(
      "quiztemplate-code-textfield"
    );
    const problemSetCodeSelect = getByTestId("problemSetCode-select");
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

    fireEvent.change(passingScore, {
      target: { value: "80" },
    });

    fireEvent.change(totalDuration, {
      target: { value: "50" },
    });

    const submitButton = getByTestId("submit-button");

    fireEvent.click(submitButton);
    mockAxios.onPost("quiz-template/create").reply(500, { data: "E11000" });
    await waitForPromises();

    expect(
      getByText(
        /Quiz Template Code already exists. Please enter another Template Code./
      )
    ).toBeInTheDocument();
  });

  it("should show error message when saving to Quiz Template encounters network error", async () => {
    const { getByText, getByTestId } = render(
      <QuizTemplateForm history={mockHistory} />
    );

    mockAxios.onGet("/problem-set").reply(200, mockGetProblemSetsResponse);
    await waitForPromises();

    const quizTemplateCodeTextField = getByTestId(
      "quiztemplate-code-textfield"
    );
    const problemSetCodeSelect = getByTestId("problemSetCode-select");
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

    fireEvent.change(passingScore, {
      target: { value: "80" },
    });

    fireEvent.change(totalDuration, {
      target: { value: "100" },
    });

    const submitButton = getByTestId("submit-button");

    fireEvent.click(submitButton);
    mockAxios.onPost("quiz-template/create").reply(500, { data: "Any error" });
    await waitForPromises();

    expect(
      getByText(
        /Failed to add quiz template. Something is wrong, please try again later./
      )
    ).toBeInTheDocument();
  });

  it("should show error message when saving to Quiz Template encounters non 200 error code", async () => {
    const { getByText, getByTestId } = render(
      <QuizTemplateForm history={mockHistory} />
    );

    mockAxios.onGet("/problem-set").reply(200, mockGetProblemSetsResponse);
    await waitForPromises();

    const quizTemplateCodeTextField = getByTestId(
      "quiztemplate-code-textfield"
    );
    const problemSetCodeSelect = getByTestId("problemSetCode-select");
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

    fireEvent.change(passingScore, {
      target: { value: "80" },
    });

    fireEvent.change(totalDuration, {
      target: { value: "100" },
    });

    const submitButton = getByTestId("submit-button");

    fireEvent.click(submitButton);
    mockAxios.onPost("quiz-template/create").reply(203, { data: "Any error" });
    await waitForPromises();

    expect(
      getByText(
        /Failed to add quiz template. Something is wrong, please try again later./
      )
    ).toBeInTheDocument();
  });

  it("should show error message when getting problem count encounters network error", async () => {
    const { getByText, getByTestId } = render(
      <QuizTemplateForm history={mockHistory} />
    );

    mockAxios.onGet("/problem-set").reply(200, mockGetProblemSetsResponse);
    await waitForPromises();

    const quizTemplateCodeTextField = getByTestId(
      "quiztemplate-code-textfield"
    );
    const problemSetCodeSelect = getByTestId("problemSetCode-select");
    const problemSetNumber = getByTestId("problemset-number-textfield");
    const addProblemSetButton = getByTestId("add-problemset-button");

    fireEvent.change(quizTemplateCodeTextField, {
      target: { value: "Agile-easy-quiz-template2" },
    });

    fireEvent.change(problemSetNumber, {
      target: { value: "10" },
    });
    fireEvent.click(addProblemSetButton);
    mockAxios
      .onGet("/problem/Agile-easy/countproblem")
      .reply(500, { data: "Any error" });
    await waitForPromises();

    expect(
      getByText(
        /Failed to retrieve problem count. Please refresh page and try again./
      )
    ).toBeInTheDocument();
  });

  it("should show error message when getting problem count encounters non 200 status code", async () => {
    const { getByText, getByTestId } = render(
      <QuizTemplateForm history={mockHistory} />
    );

    mockAxios.onGet("/problem-set").reply(200, mockGetProblemSetsResponse);
    await waitForPromises();

    const quizTemplateCodeTextField = getByTestId(
      "quiztemplate-code-textfield"
    );
    const problemSetCodeSelect = getByTestId("problemSetCode-select");
    const problemSetNumber = getByTestId("problemset-number-textfield");
    const addProblemSetButton = getByTestId("add-problemset-button");

    fireEvent.change(quizTemplateCodeTextField, {
      target: { value: "Agile-easy-quiz-template2" },
    });

    fireEvent.change(problemSetNumber, {
      target: { value: "10" },
    });
    fireEvent.click(addProblemSetButton);
    mockAxios
      .onGet("/problem/Agile-easy/countproblem")
      .reply(203, { data: "20" });
    await waitForPromises();

    expect(
      getByText(
        /Failed to retrieve problem count. Please refresh page and try again./
      )
    ).toBeInTheDocument();
  });

  it("should allow deletion of problem set and the problem set will be available back in the problem set dropdown", async () => {
    const { getByText, getByTestId, queryByText } = render(
      <QuizTemplateForm history={mockHistory} />
    );

    mockAxios.onGet("/problem-set").reply(200, mockGetProblemSetsResponse);
    await waitForPromises();

    const quizTemplateCodeTextField = getByTestId(
      "quiztemplate-code-textfield"
    );
    const problemSetCodeSelect = getByTestId("problemSetCode-select");
    const problemSetNumber = getByTestId("problemset-number-textfield");
    const addProblemSetButton = getByTestId("add-problemset-button");

    fireEvent.change(quizTemplateCodeTextField, {
      target: { value: "Agile-easy-quiz-template2" },
    });

    fireEvent.change(problemSetNumber, {
      target: { value: "10" },
    });
    fireEvent.click(addProblemSetButton);
    mockAxios
      .onGet("/problem/Agile-easy/countproblem")
      .reply(200, { data: "20" });
    await waitForPromises();

    expect(getByText("1. Agile-easy - 10")).toBeInTheDocument();

    const deleteOptionIcon1 = getByTestId("delete-option-icon-1");
    fireEvent.click(deleteOptionIcon1);

    fireEvent.mouseDown(problemSetCodeSelect);
    expect(getByText("Agile-easy")).toBeInTheDocument();
    expect(queryByText("1. Agile-easy - 10")).not.toBeInTheDocument();
  });
});
