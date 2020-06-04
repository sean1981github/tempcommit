import React from "react";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";
import Axios from "../utils/axiosInstance";

const mockAxios = new MockAdapter(Axios);

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

describe("Problem Form Test", () => {
  const waitForPromises = () => new Promise((resolve) => setTimeout(resolve));

  beforeEach(() => {
    mockAxios.reset();
  });

  it("should display problem submit confirmation page ", async () => {
    const { getByText, getByTestId } = render(<App />);
    const createProblemButton = getByTestId("create-problem-link");
    fireEvent.click(createProblemButton);

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

    expect(getByText("Test Question")).toBeInTheDocument();
    expect(getByText("1. First Option")).toBeInTheDocument();
    expect(getByText("2. Second Option")).toBeInTheDocument();
    expect(getByText("First Option")).toBeInTheDocument();
    expect(getByText("Agile-Medium")).toBeInTheDocument();
    expect(getByTestId("back-button")).toBeInTheDocument();
  });
});
