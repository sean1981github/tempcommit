import React from "react";
import "@testing-library/jest-dom/extend-expect";
import ReactDOM from "react-dom";
import App from "./App";

describe("App, to test Router file", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
  });
});
