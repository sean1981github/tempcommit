import React from "react";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import App from "../App";
import ProblemForm from "../components/ProblemForm";
import Axios from "../utils/axiosInstance";

const mockAxios = new MockAdapter(Axios);

const mockProblemSet = [
  {
    _id: "5ed8bdc889b6ab46b5da7420",
    id: "af929e9a-6241-4410-b3c3-df13663b1e13",
    categoryCode: "Agile-Medium",
    score: 5,
    durationInMins: 5,
    __v: 0,
  },
  {
    _id: "5ed8bdd489b6ab46b5da7421",
    id: "abe50c9d-0b49-409e-a804-f8e8a6ab303f",
    categoryCode: "Agile-Medium-Rare",
    score: 5,
    durationInMins: 5,
    __v: 0,
  },
];

describe("Problem Form Test", () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  const renderProblemForm = () => {
    const renderedForm = render(<ProblemForm />);
    mockAxios.onGet("problem-set").reply(200, mockProblemSet);
    return renderedForm;
  };

  it("should redirect to create problem page from navlink", () => {
    const { getByText, getByTestId } = render(<App />);
    const createProblemButton = getByTestId("create-problem-link");
    fireEvent.click(createProblemButton);
    expect(getByText("Add Problem")).toBeInTheDocument();
  });

  it("should render input textfield for question", () => {
    const { getByTestId } = render(<ProblemForm />);
    expect(getByTestId("question-textfield")).toBeInTheDocument();
  });

  it("should render input textfield for new answer option", () => {
    const { getByTestId } = render(<ProblemForm />);
    expect(getByTestId("option-textfield")).toBeInTheDocument();
  });

  it("should render button to add new answer option", () => {
    const { getByTestId } = render(<ProblemForm />);
    expect(getByTestId("add-option-button")).toBeInTheDocument();
  });

  it("should render dropmenu to choose correct answer", () => {
    const { getByTestId } = render(<ProblemForm />);
    expect(getByTestId("options-select")).toBeInTheDocument();
  });

  it("should render dropmenu to choose problem set code", () => {
    const { getByTestId } = render(<ProblemForm />);
    expect(getByTestId("problemSetCode-select")).toBeInTheDocument();
  });

  it("should render button to go back", () => {
    const { getByTestId } = render(<ProblemForm />);
    expect(getByTestId("back-button")).toBeInTheDocument();
  });

  it("should render button to submit problem", () => {
    const { getByTestId } = render(<ProblemForm />);
    expect(getByTestId("submit-button")).toBeInTheDocument();
  });

  it("should display error messages when submit without inputs", () => {
    const { getByTestId, getByText } = render(<ProblemForm />);
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
    const { getByTestId, queryByText } = render(<ProblemForm />);
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
    const { getByTestId, getByText } = render(<ProblemForm />);
    const addOptionButton = getByTestId("add-option-button");
    fireEvent.click(addOptionButton);
    expect(
      getByText("Answer cannot empty and needs to be 5 characters or longer")
    ).toBeInTheDocument();
  });

  it("should display newly added option after clicking Add Option Button", () => {
    const { getByTestId, getByText } = render(<ProblemForm />);
    const optionTextField = getByTestId("option-textfield");
    const addOptionButton = getByTestId("add-option-button");
    fireEvent.change(optionTextField, {
      target: { value: "First Option" },
    });

    fireEvent.click(addOptionButton);
    expect(getByText("1. First Option")).toBeInTheDocument();
  });

  it("should remove the only answer option added after clicking on its delete icon", () => {
    const { getByTestId, queryByText } = render(<ProblemForm />);
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
    const { getByTestId, queryByText } = render(<ProblemForm />);
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
    const { getByTestId, queryByText } = render(<ProblemForm />);
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

  it.only("should show newly added option when clicking on answer dropdown menu", async () => {
    const renderedForm = await renderProblemForm();
    const { getByTestId, queryByText, getByText } = renderedForm;
    const problemSetCodeSelect = getByTestId("problemSetCode-select");
    fireEvent.mouseDown(problemSetCodeSelect);
    expect(getByText("Agile-Medium")).toBeInTheDocument();
    // expect(queryByText("Option 2")).not.toBeInTheDocument();
  });

  it("should not show deleted answer option in answer dropdown menu", () => {
    const { getByTestId, queryByText } = render(<ProblemForm />);
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
    const { getByTestId, queryByText, getByText } = render(<ProblemForm />);
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

  it("should not display error message for missing problem set code when submit after choosing a problem set", () => {
    const { getByTestId, queryByText, getByText } = render(<ProblemForm />);
    const problemSetCodeSelect = getByTestId("problemSetCode-select");

    fireEvent.mouseDown(problemSetCodeSelect);
    const problemSetA = getByText("Problem Set A");
    fireEvent.click(problemSetA);

    const submitButton = getByTestId("submit-button");
    fireEvent.click(submitButton);
    expect(queryByText("Problem Set cannot be empty")).not.toBeInTheDocument();
  });

  it("should display error message when submitting with less than 2 answer options ", () => {
    const { getByTestId, getByText } = render(<ProblemForm />);
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

  it("should display not error message when submitting with less than 2 answer options ", () => {
    const { getByTestId, getByText, queryByText } = render(<ProblemForm />);
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
    const { getByTestId, getByText } = render(<ProblemForm />);
    const questionTextField = getByTestId("question-textfield");
    const optionTextField = getByTestId("option-textfield");
    const addOptionButton = getByTestId("add-option-button");
    const optionSelect = getByTestId("options-select");
    const problemSetCodeSelect = getByTestId("problemSetCode-select");

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
    const problemSetA = getByText("Problem Set A");
    fireEvent.click(problemSetA);

    const submitButton = getByTestId("submit-button");
    fireEvent.click(submitButton);

    mockAxios.onPost("problem/add").reply(203);

    await waitForElement(() => getByText(/Failed to add problem./));
    expect(getByText(/Failed to add problem./)).toBeInTheDocument();

    fireEvent.click(submitButton);

    mockAxios.onPost("problem/add").reply(400);
    await waitForElement(() => getByText(/Failed to add problem./));
    expect(getByText(/Failed to add problem./)).toBeInTheDocument();
  });
});
