import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { ProblemConfirmation } from "./ProblemConfirmation";
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
    problem: {
      question: "Test Question",
      options: [
        {
          option: "First Option",
          id: "d38d149b-bc71-4b0e-8158-f3ddf7adc15f",
        },
        {
          option: "Second Option",
          id: "f0f61aae-b12c-4b8c-9600-9f2c4633f883",
        },
      ],
      answer: "f0f61aae-b12c-4b8c-9600-9f2c4633f883",
      problemSetCode: "Agile-Medium",
      id: "6a0c4bdb-5769-48d3-9ef7-e0aee022e225",
    },
  },
};

describe("Problem Creation Confirmation Test", () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it("should display problem correctly with props passed from problem add page", () => {
    const { getByText, getByTestId } = render(
      <ProblemConfirmation history={mockHistory} location={mockLocation} />
    );

    expect(getByText("Test Question")).toBeInTheDocument();
    expect(getByText("1. First Option")).toBeInTheDocument();
    expect(getByText("2. Second Option")).toBeInTheDocument();
    expect(getByText("Second Option")).toBeInTheDocument();
    expect(getByText("Agile-Medium")).toBeInTheDocument();
    expect(getByTestId("back-button")).toBeInTheDocument();
  });

  it("should trigger redirect back to home page if back to home button is clicked ", () => {
    const { getByTestId } = render(
      <ProblemConfirmation history={mockHistory} location={mockLocation} />
    );

    const backButton = getByTestId("back-button");
    fireEvent.click(backButton);
    expect(mockHistory.push).toHaveBeenCalled();
  });
});
