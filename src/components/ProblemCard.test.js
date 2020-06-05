import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { ProblemCard } from "./ProblemCard";

describe("Problem Card Test", () => {
  const mockHistory = {
    push: jest.fn(),
    location: {
      state: { username: "qm", role: "QM" },
    },
  };

  it("should trigger redirect to Problem Create Page when Create Problem button is clicked", () => {
    const { getByTestId } = render(<ProblemCard history={mockHistory} />);

    const createProblemButton = getByTestId("create-problem-button");
    fireEvent.click(createProblemButton);
    expect(mockHistory.push).toHaveBeenCalled();
  });
});
