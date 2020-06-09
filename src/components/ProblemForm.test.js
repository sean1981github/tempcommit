import React from "react";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { ProblemForm } from "../components/ProblemForm";

import Axios from "../utils/axiosInstance";

const mockAxios = new MockAdapter(Axios);

const mockProblemSet = [
  {
    categoryCode: "Agile-Medium",
    score: 5,
    durationInMins: 5,
  },
  {
    categoryCode: "Agile-Medium-Rare",
    score: 5,
    durationInMins: 5,
  },
];

const mockAxiosResponse = {
  question: "Test Question",
  options: [
    {
      option: "First Option",
      id: "82792c1a-4ec4-4b38-9b8d-c853c8b602f5",
    },
    {
      option: "Second Option",
      id: "95ff8632-a8fc-4463-a047-b85cafa38f79",
    },
  ],
  answer: "82792c1a-4ec4-4b38-9b8d-c853c8b602f5",
  problemSetCode: "Agile-Medium",
  id: "71dbb9b1-a1a3-48ca-a79b-2920128cf158",
};

const mockHistory = {
  push: jest.fn(),
  goBack: jest.fn(),
  location: {
    state: { username: "qm", role: "QM" },
  },
};

describe("Problem Form Test", () => {
  const waitForPromises = () => new Promise((resolve) => setTimeout(resolve));

  beforeEach(() => {
    mockAxios.reset();
  });

  it("should render create problem page with no issue", () => {
    const { getByText } = render(<ProblemForm history={mockHistory} />);
    expect(getByText("Create New Problem")).toBeInTheDocument();
  });

  it("should render input textfield for question", () => {
    const { getByTestId } = render(<ProblemForm history={mockHistory} />);
    expect(getByTestId("question-textfield")).toBeInTheDocument();
  });

  it("should render input textfield for new answer option", () => {
    const { getByTestId } = render(<ProblemForm history={mockHistory} />);
    expect(getByTestId("option-textfield")).toBeInTheDocument();
  });

  it("should render button to add new answer option", () => {
    const { getByTestId } = render(<ProblemForm history={mockHistory} />);
    expect(getByTestId("add-option-button")).toBeInTheDocument();
  });

  it("should render dropmenu to choose correct answer", () => {
    const { getByTestId } = render(<ProblemForm history={mockHistory} />);
    expect(getByTestId("options-select")).toBeInTheDocument();
  });

  it("should render dropmenu to choose problem set code", () => {
    const { getByTestId } = render(<ProblemForm history={mockHistory} />);
    expect(getByTestId("problemSetCode-select")).toBeInTheDocument();
  });

  it("should render button to go back", () => {
    const { getByTestId } = render(<ProblemForm history={mockHistory} />);
    expect(getByTestId("back-button")).toBeInTheDocument();
  });

  it("should render button to submit problem", () => {
    const { getByTestId } = render(<ProblemForm history={mockHistory} />);
    expect(getByTestId("submit-button")).toBeInTheDocument();
  });

  it("should display error messages when submit without inputs", () => {
    const { getByTestId, getByText } = render(
      <ProblemForm history={mockHistory} />
    );
    const submitButton = getByTestId("submit-button");
    fireEvent.click(submitButton);
    expect(
      getByText("Question cannot empty and needs to be 5 characters or longer")
    ).toBeInTheDocument();
    expect(getByText("Please add at least 2 answers")).toBeInTheDocument();
    expect(getByText("Correct Answer cannot be empty")).toBeInTheDocument();
    expect(getByText("Problem Set cannot be empty")).toBeInTheDocument();
  });

  it("should display error messages when submit without inputs", () => {
    const { getByTestId, queryByText } = render(
      <ProblemForm history={mockHistory} />
    );
    const questionTextField = getByTestId("question-textfield");
    fireEvent.change(questionTextField, {
      target: { value: "Test Question" },
    });
    const submitButton = getByTestId("submit-button");
    fireEvent.click(submitButton);
    expect(
      queryByText(
        "Question cannot empty and needs to be 5 characters or longer"
      )
    ).not.toBeInTheDocument();
  });

  it("should display error message when add option without input", () => {
    const { getByTestId, getByText } = render(
      <ProblemForm history={mockHistory} />
    );
    const addOptionButton = getByTestId("add-option-button");
    fireEvent.click(addOptionButton);
    expect(
      getByText("Answer cannot empty and needs to be 5 characters or longer")
    ).toBeInTheDocument();
  });

  it("should display newly added option after clicking Add Option Button", () => {
    const { getByTestId, getByText } = render(
      <ProblemForm history={mockHistory} />
    );
    const optionTextField = getByTestId("option-textfield");
    const addOptionButton = getByTestId("add-option-button");
    fireEvent.change(optionTextField, {
      target: { value: "First Option" },
    });

    fireEvent.click(addOptionButton);
    expect(getByText("1. First Option")).toBeInTheDocument();
  });

  it("should remove the only answer option added after clicking on its delete icon", () => {
    const { getByTestId, queryByText } = render(
      <ProblemForm history={mockHistory} />
    );
    const optionTextField = getByTestId("option-textfield");
    const addOptionButton = getByTestId("add-option-button");
    fireEvent.change(optionTextField, {
      target: { value: "First Option" },
    });

    fireEvent.click(addOptionButton);

    const deleteOptionIcon = getByTestId("delete-option-icon-1");
    fireEvent.click(deleteOptionIcon);
    expect(queryByText("1. First Option")).not.toBeInTheDocument();
  });

  it("should remove the the correct answer option added after clicking on its delete icon", () => {
    const { getByTestId, queryByText } = render(
      <ProblemForm history={mockHistory} />
    );
    const optionTextField = getByTestId("option-textfield");
    const addOptionButton = getByTestId("add-option-button");
    fireEvent.change(optionTextField, {
      target: { value: "First Option" },
    });

    fireEvent.click(addOptionButton);

    fireEvent.change(optionTextField, {
      target: { value: "Second Option" },
    });

    fireEvent.click(addOptionButton);

    expect(queryByText("1. First Option")).toBeInTheDocument();
    expect(queryByText("2. Second Option")).toBeInTheDocument();

    const deleteOptionIcon1 = getByTestId("delete-option-icon-1");
    fireEvent.click(deleteOptionIcon1);

    expect(queryByText("1. First Option")).not.toBeInTheDocument();
    expect(queryByText("1. Second Option")).toBeInTheDocument();
  });

  it("should show newly added option when clicking on answer dropdown menu", () => {
    const { getByTestId, queryByText } = render(
      <ProblemForm history={mockHistory} />
    );
    const optionTextField = getByTestId("option-textfield");
    const addOptionButton = getByTestId("add-option-button");
    const optionSelect = getByTestId("options-select");
    fireEvent.change(optionTextField, {
      target: { value: "First Option" },
    });
    fireEvent.click(addOptionButton);
    fireEvent.mouseDown(optionSelect);
    expect(queryByText("Option 1")).toBeInTheDocument();
    expect(queryByText("Option 2")).not.toBeInTheDocument();
  });

  it("should show available problem sets retrieved by API when clicking on problem set dropdown menu", async () => {
    const { getByTestId, getByText } = render(
      <ProblemForm history={mockHistory} />
    );

    mockAxios.onGet("/problem-set").reply(200, mockProblemSet);
    await waitForPromises();

    const problemSetCodeSelect = getByTestId("problemSetCode-select");
    fireEvent.mouseDown(problemSetCodeSelect);

    expect(getByText("Agile-Medium")).toBeInTheDocument();
    expect(getByText("Agile-Medium-Rare")).toBeInTheDocument();
  });

  it("should show error message when API call to retrieve problem sets returns with non-200 status codes", async () => {
    const { getByText } = render(<ProblemForm history={mockHistory} />);

    mockAxios.onGet("/problem-set").reply(203);
    await waitForPromises();

    expect(
      getByText(
        /Failed to retrieve problem set. Please refresh page and try again./
      )
    ).toBeInTheDocument();
  });

  it("should show error message when API call to retrieve problem sets encounters network error", async () => {
    const { getByText } = render(<ProblemForm history={mockHistory} />);

    mockAxios.onGet("/problem-set").networkError();
    await waitForPromises();

    expect(
      getByText(
        /Failed to retrieve problem set. Please refresh page and try again./
      )
    ).toBeInTheDocument();
  });

  it("should not show deleted answer option in answer dropdown menu", () => {
    const { getByTestId, queryByText } = render(
      <ProblemForm history={mockHistory} />
    );
    const optionTextField = getByTestId("option-textfield");
    const addOptionButton = getByTestId("add-option-button");
    const optionSelect = getByTestId("options-select");
    fireEvent.change(optionTextField, {
      target: { value: "First Option" },
    });
    fireEvent.click(addOptionButton);

    const deleteOptionIcon1 = getByTestId("delete-option-icon-1");
    fireEvent.click(deleteOptionIcon1);

    fireEvent.mouseDown(optionSelect);
    expect(queryByText("Option 1")).not.toBeInTheDocument();
  });

  it("should not display error message for missing answer when submit after choosing an answer", () => {
    const { getByTestId, queryByText, getByText } = render(
      <ProblemForm history={mockHistory} />
    );
    const optionTextField = getByTestId("option-textfield");
    const addOptionButton = getByTestId("add-option-button");
    const optionSelect = getByTestId("options-select");
    fireEvent.change(optionTextField, {
      target: { value: "First Option" },
    });
    fireEvent.click(addOptionButton);
    fireEvent.mouseDown(optionSelect);
    const option1 = getByText("Option 1");
    fireEvent.click(option1);

    const submitButton = getByTestId("submit-button");
    fireEvent.click(submitButton);
    expect(
      queryByText("Correct Answer cannot be empty")
    ).not.toBeInTheDocument();
  });

  it("should not display error message for missing problem set code when submit after choosing a problem set", async () => {
    const { getByTestId, queryByText, getByText } = render(
      <ProblemForm history={mockHistory} />
    );

    mockAxios.onGet("/problem-set").reply(200, mockProblemSet);
    await waitForPromises();

    const problemSetCodeSelect = getByTestId("problemSetCode-select");
    fireEvent.mouseDown(problemSetCodeSelect);

    const problemSetAgileMedium = getByText("Agile-Medium");
    fireEvent.click(problemSetAgileMedium);

    const submitButton = getByTestId("submit-button");
    fireEvent.click(submitButton);
    expect(queryByText("Problem Set cannot be empty")).not.toBeInTheDocument();
  });

  it("should display error message when submitting with less than 2 answer options", () => {
    const { getByTestId, getByText } = render(
      <ProblemForm history={mockHistory} />
    );
    const optionTextField = getByTestId("option-textfield");
    const addOptionButton = getByTestId("add-option-button");
    fireEvent.change(optionTextField, {
      target: { value: "First Option" },
    });

    fireEvent.click(addOptionButton);

    const submitButton = getByTestId("submit-button");
    fireEvent.click(submitButton);
    expect(getByText("Please add at least 2 answers")).toBeInTheDocument();
  });

  it("should display not error message when submitting more than one answer option", () => {
    const { getByTestId, queryByText } = render(
      <ProblemForm history={mockHistory} />
    );
    const optionTextField = getByTestId("option-textfield");
    const addOptionButton = getByTestId("add-option-button");
    fireEvent.change(optionTextField, {
      target: { value: "First Option" },
    });

    fireEvent.click(addOptionButton);

    fireEvent.change(optionTextField, {
      target: { value: "Second Option" },
    });

    fireEvent.click(addOptionButton);

    const submitButton = getByTestId("submit-button");
    fireEvent.click(submitButton);
    expect(
      queryByText("Please add at least 2 answers")
    ).not.toBeInTheDocument();
  });

  it("should display error when submission failed due to non-200 status code", async () => {
    const { getByTestId, getByText } = render(
      <ProblemForm history={mockHistory} />
    );
    const questionTextField = getByTestId("question-textfield");
    const optionTextField = getByTestId("option-textfield");
    const addOptionButton = getByTestId("add-option-button");
    const optionSelect = getByTestId("options-select");
    const problemSetCodeSelect = getByTestId("problemSetCode-select");

    mockAxios.onGet("/problem-set").reply(200, mockProblemSet);
    await waitForPromises();

    fireEvent.change(questionTextField, {
      target: { value: "Test Question" },
    });

    fireEvent.change(optionTextField, {
      target: { value: "First Option" },
    });
    fireEvent.click(addOptionButton);

    fireEvent.change(optionTextField, {
      target: { value: "Second Option" },
    });
    fireEvent.click(addOptionButton);

    fireEvent.mouseDown(optionSelect);
    const option1 = getByText("Option 1");
    fireEvent.click(option1);

    fireEvent.mouseDown(problemSetCodeSelect);
    const problemSetAgileMedium = getByText("Agile-Medium");
    fireEvent.click(problemSetAgileMedium);

    const submitButton = getByTestId("submit-button");

    fireEvent.click(submitButton);
    mockAxios.onPost("problem/add").reply(203);

    await waitForPromises();
    expect(getByText(/Failed to add problem./)).toBeInTheDocument();

    fireEvent.click(submitButton);
    mockAxios.onPost("problem/add").networkError();

    await waitForPromises();
    expect(getByText(/Failed to add problem./)).toBeInTheDocument();
  });

  it("should trigger redirect to confirmation page when clicking submit button if all validations passes", async () => {
    const { getByTestId, getByText } = render(
      <ProblemForm history={mockHistory} />
    );
    const questionTextField = getByTestId("question-textfield");
    const optionTextField = getByTestId("option-textfield");
    const addOptionButton = getByTestId("add-option-button");
    const optionSelect = getByTestId("options-select");
    const problemSetCodeSelect = getByTestId("problemSetCode-select");

    mockAxios.onGet("/problem-set").reply(200, mockProblemSet);
    await waitForPromises();

    fireEvent.change(questionTextField, {
      target: { value: "Test Question" },
    });

    fireEvent.change(optionTextField, {
      target: { value: "First Option" },
    });
    fireEvent.click(addOptionButton);

    fireEvent.change(optionTextField, {
      target: { value: "Second Option" },
    });
    fireEvent.click(addOptionButton);

    fireEvent.mouseDown(optionSelect);
    const option1 = getByText("Option 1");
    fireEvent.click(option1);

    fireEvent.mouseDown(problemSetCodeSelect);
    const problemSetAgileMedium = getByText("Agile-Medium");
    fireEvent.click(problemSetAgileMedium);

    const submitButton = getByTestId("submit-button");

    fireEvent.click(submitButton);
    mockAxios.onPost("problem/add").reply(200, mockAxiosResponse);
    await waitForPromises();

    expect(mockHistory.push).toHaveBeenCalled();
  });

  it("should trigger redirect back to home page if back button is clicked", () => {
    const { getByTestId } = render(<ProblemForm history={mockHistory} />);

    const backButton = getByTestId("back-button");
    fireEvent.click(backButton);

    expect(mockHistory.goBack).toHaveBeenCalled();
  });
});
