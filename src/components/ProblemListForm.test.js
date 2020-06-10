import React from "react";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import { ProblemListForm } from "./ProblemListForm";
import Axios from "../utils/axiosInstance";

const mockAxios = new MockAdapter(Axios);

const mockProblems = [
  {
    question: "This is a sample question",
    options: [
      {
        option: "This is a wrong option 1",
        id: "17f41d76-db8b-4f4d-a238-dc2e04c33408",
      },
      {
        option: "This is a correct option 3",
        id: "4f6d5a2b-c3e5-4919-a854-35a11848e90f",
      },
    ],
    answer: "4f6d5a2b-c3e5-4919-a854-35a11848e90f",
    problemSetCode: "Agile-easy",
    version: 1,
    lastActionBy: "qm",
    id: "f11423d4-58d5-4b8a-ad23-7fae5d67e93e",
    isDeleted: false,
  },
  {
    isDeleted: false,
    question: "This is a sample question 2",
    options: [
      {
        option: "This is a wrong option 1",
        id: "e35283af-28aa-4f45-b589-484a90518481",
      },
      {
        option: "This is a correct option 3",
        id: "9ca51f64-67da-47dc-909e-0d01f435c9c8",
      },
    ],
    answer: "9ca51f64-67da-47dc-909e-0d01f435c9c8",
    problemSetCode: "Agile-easy",
    version: 1,
    lastActionBy: "qm",
    id: "7f70d6c8-284e-4283-9ea2-d5d4325e6f7d",
  },
];

const mockHistory = {
  push: jest.fn(),
  goBack: jest.fn(),
  location: {
    state: { username: "qm", role: "QM" },
  },
};

describe("Problem List Form Test", () => {
  const waitForPromises = () => new Promise((resolve) => setTimeout(resolve));

  beforeEach(() => {
    mockAxios.reset();
  });

  it("should render edit problem page with no issue", () => {
    const { getByText } = render(<ProblemListForm history={mockHistory} />);
    expect(getByText("Select Problem to Edit")).toBeInTheDocument();
  });

  it("should render question text of all problems upon rendering problem list form page", async () => {
    const { getByText } = render(
      <ProblemListForm
        setLoggedIn={jest.fn()}
        username={"qm"}
        role={"QM"}
        history={mockHistory}
      />
    );
    mockAxios.onGet("/problem").reply(200, mockProblems);
    await waitForElement(() => getByText("This is a sample question"));
    expect(getByText("This is a sample question")).toBeInTheDocument();
    expect(getByText("This is a sample question 2")).toBeInTheDocument();
  });

  it("should render button to go back", () => {
    const { getByTestId } = render(<ProblemListForm history={mockHistory} />);
    expect(getByTestId("back-button")).toBeInTheDocument();
  });

  it("should show error message when API call to retrieve problem sets returns with non-200 status codes", async () => {
    const { getByText } = render(<ProblemListForm history={mockHistory} />);

    mockAxios.onGet("/problem").reply(203);
    await waitForPromises();

    expect(
      getByText(
        /Failed to retrieve problems. Please refresh page and try again./
      )
    ).toBeInTheDocument();

    mockAxios.onGet("/problem").networkError();
    await waitForPromises();

    expect(
      getByText(
        /Failed to retrieve problems. Please refresh page and try again./
      )
    ).toBeInTheDocument();
  });

  it("should trigger redirect back to home page if back button is clicked", () => {
    const { getByTestId } = render(<ProblemListForm history={mockHistory} />);

    const backButton = getByTestId("back-button");
    fireEvent.click(backButton);

    expect(mockHistory.goBack).toHaveBeenCalled();
  });
});
