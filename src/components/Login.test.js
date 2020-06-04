import React from "react";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import App from "../App";
import Axios from "../utils/axiosInstance";

const mockAxios = new MockAdapter(Axios);

describe("LoginPage", () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it("should render input boxes for username and password and a signin button", () => {
    const { getByTestId } = render(<App />);

    expect(getByTestId("username")).toBeInTheDocument();
    expect(getByTestId("password")).toBeInTheDocument();
    expect(getByTestId("signin")).toBeInTheDocument();
  });

  it("should prompt error if both username and password are empty", () => {
    const { getByTestId, getByText } = render(<App />);
    const signinButton = getByTestId("signin");
    fireEvent.click(signinButton);
    expect(
      getByText("Username and password should not be empty")
    ).toBeInTheDocument();
  });

  it("should prompt error if username is empty", () => {
    const { getByTestId, getByText } = render(<App />);
    const password = getByTestId("password");
    const signinButton = getByTestId("signin");
    fireEvent.change(password, {
      target: { value: "password" },
    });
    fireEvent.click(signinButton);
    expect(getByText("Username should not be empty")).toBeInTheDocument();
  });

  it("should prompt error if password is empty", () => {
    const { getByTestId, getByText } = render(<App />);
    const username = getByTestId("username");
    const signinButton = getByTestId("signin");
    fireEvent.change(username, {
      target: { value: "username" },
    });
    fireEvent.click(signinButton);
    expect(getByText("Password should not be empty")).toBeInTheDocument();
  });

  it("should prompt error if timeout", async () => {
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
    mockAxios.onPost("/users/login").timeout();
    await waitForElement(() =>
      getByText("Something is wrong.Please try again.")
    );
    expect(
      getByText("Something is wrong.Please try again.")
    ).toBeInTheDocument();
  });

  it("should prompt error if username/password is wrong", async () => {
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
    mockAxios.onPost("http://localhost:5000/users/login").reply(400);

    await waitForElement(() =>
      getByText("Login failed. Username and/or password is incorrect")
    );
    expect(
      getByText("Login failed. Username and/or password is incorrect")
    ).toBeInTheDocument();
  });
  it("should prompt error if 203 status is returned", async () => {
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
    mockAxios.onPost("/users/login").reply(203);

    await waitForElement(() =>
      getByText("Something is wrong.Please try again")
    );
    expect(
      getByText("Something is wrong.Please try again")
    ).toBeInTheDocument();
  });
  it("should render mockpage if username and password are correct and logout successfully", async () => {
    const { getByTestId, getByText, getByLabelText } = render(<App />);
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
    mockAxios
      .onPost("/users/login")
      .reply(200, { role: "HR", username: "username" });
    await waitForElement(() => getByText("username"));
    expect(getByText("username")).toBeInTheDocument();
    const menu = getByLabelText("menu");
    expect(menu).toBeInTheDocument();
    fireEvent.click(menu);
    const logoutButton = getByTestId("logoutButton");
    fireEvent.click(logoutButton);
    mockAxios.onPost("/users/logout").reply(200);
    expect(getByText("You have logged out")).toBeInTheDocument();
    expect(getByTestId("username")).toBeInTheDocument();
  });
});
