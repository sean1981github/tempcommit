import React from "react";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import App from "../App";
import Axios from "../utils/axiosInstance";

const mockAxios = new MockAdapter(Axios);

describe("HomePage", () => {
  describe("After Assssor Login", () => {
    beforeEach(async () => {
      mockAxios.reset();
      const { getByTestId } = render(<App />);
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
        .reply(200, { role: "ASSESSOR", username: "username" });
    });
    it("should load homepage with username displayed", async () => {
      const { getByText } = render(<App />);
      await waitForElement(() => getByText("username"));
      expect(getByText("username")).toBeInTheDocument();
    });
    it("should load ASSESSOR homepage with required tabs", () => {
      const { getByText } = render(<App />);
      expect(getByText("QUIZ MASTER")).toBeInTheDocument();
      expect(getByText("HR")).toBeInTheDocument();
      expect(getByText("ASSESSOR")).toBeInTheDocument();
      expect(getByText("ADMIN")).toBeInTheDocument();
    });
    it("should disable tabs other then ASSESSOR", () => {
      const { getByText, getByTestId } = render(<App />);
      const qmTab = getByText("QUIZ MASTER");
      fireEvent.click(qmTab);
      expect(() => getByText("PROBLEM")).toThrowError();
      const hrTab = getByText("HR");
      fireEvent.click(hrTab);
      expect(() => getByText("CATEGORY")).toThrowError();
      const adminTab = getByText("ADMIN");
      fireEvent.click(adminTab);
      expect(() => getByTestId("admin-menu-items")).toThrowError();
    });
    it("should render menu items for Assessor", () => {
      const { getByText } = render(<App />);
      const assessorTab = getByText("ASSESSOR");
      fireEvent.click(assessorTab);
      expect(getByText("RESULTS")).toBeInTheDocument();
      expect(getByText("View Results")).toBeInTheDocument();
    });
  });
  describe("After HR Login", () => {
    beforeEach(async () => {
      mockAxios.reset();
      const { getByTestId } = render(<App />);
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
    });
    it("should load homepage with username displayed", async () => {
      const { getByText } = render(<App />);
      await waitForElement(() => getByText("username"));
      expect(getByText("username")).toBeInTheDocument();
    });
    it("should load HR homepage with required tabs", () => {
      const { getByText } = render(<App />);
      expect(getByText("QUIZ MASTER")).toBeInTheDocument();
      expect(getByText("HR")).toBeInTheDocument();
      expect(getByText("ASSESSOR")).toBeInTheDocument();
      expect(getByText("ADMIN")).toBeInTheDocument();
    });
    it("should disable tabs other then HR", () => {
      const { getByText, getByTestId } = render(<App />);
      const qmTab = getByText("QUIZ MASTER");
      fireEvent.click(qmTab);
      expect(() => getByText("PROBLEM")).toThrowError();
      const assessorTab = getByText("ASSESSOR");
      fireEvent.click(assessorTab);
      expect(() => getByTestId("assessor-menu-items")).toThrowError();
      const adminTab = getByText("ADMIN");
      fireEvent.click(adminTab);
      expect(() => getByTestId("admin-menu-items")).toThrowError();
    });
    it("should render menu items for HR", () => {
      const { getByText } = render(<App />);
      const hrTab = getByText("HR");
      fireEvent.click(hrTab);
      expect(getByText("CREATE QUIZ")).toBeInTheDocument();
      expect(getByText("Create New Quiz")).toBeInTheDocument();
      expect(getByText("Delete Existing Quiz")).toBeInTheDocument();
      expect(getByText("QUIZ RESULTS")).toBeInTheDocument();
      expect(getByText("View Results")).toBeInTheDocument();
    });
  });
  describe("After Quiz Master Login", () => {
    beforeEach(async () => {
      mockAxios.reset();
      const { getByTestId } = render(<App />);
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
        .reply(200, { role: "QM", username: "username" });
    });
    it("should load homepage with username displayed", async () => {
      const { getByText } = render(<App />);
      await waitForElement(() => getByText("username"));
      expect(getByText("username")).toBeInTheDocument();
    });
    it("should load QM homepage with required tabs", () => {
      const { getByText } = render(<App />);
      expect(getByText("QUIZ MASTER")).toBeInTheDocument();
      expect(getByText("HR")).toBeInTheDocument();
      expect(getByText("ASSESSOR")).toBeInTheDocument();
      expect(getByText("ADMIN")).toBeInTheDocument();
    });
    it("should disable tabs other then QM", () => {
      const { getByText, getByTestId } = render(<App />);
      const hrTab = getByText("HR");
      fireEvent.click(hrTab);
      expect(() => getByText("CREATE QUIZ")).toThrowError();
      const assessorTab = getByText("ASSESSOR");
      fireEvent.click(assessorTab);
      expect(() => getByTestId("assessor-menu-items")).toThrowError();
      const adminTab = getByText("ADMIN");
      fireEvent.click(adminTab);
      expect(() => getByTestId("admin-menu-items")).toThrowError();
    });
    it("should render menu items for QM", () => {
      const { getByText } = render(<App />);
      const qmTab = getByText("QUIZ MASTER");
      fireEvent.click(qmTab);
      expect(getByText("CATEGORY")).toBeInTheDocument();
      expect(getByText("Create New Category")).toBeInTheDocument();
      expect(getByText("Edit Existing Category")).toBeInTheDocument();
      expect(getByText("PROBLEM SET")).toBeInTheDocument();
      expect(getByText("Create New Set")).toBeInTheDocument();
      expect(getByText("Edit Existing Set")).toBeInTheDocument();
      expect(getByText("PROBLEM")).toBeInTheDocument();
      expect(getByText("Create New Problem")).toBeInTheDocument();
      expect(getByText("Edit Existing Problem")).toBeInTheDocument();
      expect(getByText("QUIZ TEMPLATE")).toBeInTheDocument();
      expect(getByText("Create New Template")).toBeInTheDocument();
      expect(getByText("Edit Existing Template")).toBeInTheDocument();
    });
  });
  describe("After HR Login", () => {
    beforeEach(async () => {
      mockAxios.reset();
      const { getByTestId } = render(<App />);
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
    });
    it("should load homepage with username displayed", async () => {
      const { getByText } = render(<App />);
      await waitForElement(() => getByText("username"));
      expect(getByText("username")).toBeInTheDocument();
    });
    it("should load HR homepage with required tabs", () => {
      const { getByText } = render(<App />);
      expect(getByText("QUIZ MASTER")).toBeInTheDocument();
      expect(getByText("HR")).toBeInTheDocument();
      expect(getByText("ASSESSOR")).toBeInTheDocument();
      expect(getByText("ADMIN")).toBeInTheDocument();
    });
    it("should disable tabs other then HR", () => {
      const { getByText, getByTestId } = render(<App />);
      const qmTab = getByText("QUIZ MASTER");
      fireEvent.click(qmTab);
      expect(() => getByText("PROBLEM")).toThrowError();
      const assessorTab = getByText("ASSESSOR");
      fireEvent.click(assessorTab);
      expect(() => getByTestId("assessor-menu-items")).toThrowError();
      const adminTab = getByText("ADMIN");
      fireEvent.click(adminTab);
      expect(() => getByTestId("admin-menu-items")).toThrowError();
    });
    it("should render menu items for HR", () => {
      const { getByText } = render(<App />);
      const hrTab = getByText("HR");
      fireEvent.click(hrTab);
      expect(getByText("CREATE QUIZ")).toBeInTheDocument();
      expect(getByText("Create New Quiz")).toBeInTheDocument();
      expect(getByText("Delete Existing Quiz")).toBeInTheDocument();
      expect(getByText("QUIZ RESULTS")).toBeInTheDocument();
      expect(getByText("View Results")).toBeInTheDocument();
    });
  });
  describe("After Admin Login", () => {
    beforeEach(async () => {
      mockAxios.reset();
      const { getByTestId } = render(<App />);
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
        .reply(200, { role: "ADMIN", username: "username" });
    });
    it("should load homepage with username displayed", async () => {
      const { getByText } = render(<App />);
      await waitForElement(() => getByText("username"));
      expect(getByText("username")).toBeInTheDocument();
    });
    it("should load ADMIN homepage with required tabs", () => {
      const { getByText } = render(<App />);
      expect(getByText("QUIZ MASTER")).toBeInTheDocument();
      expect(getByText("HR")).toBeInTheDocument();
      expect(getByText("ASSESSOR")).toBeInTheDocument();
      expect(getByText("ADMIN")).toBeInTheDocument();
    });
    it("should disable tabs other then ADMIN", () => {
      const { getByText, getByTestId } = render(<App />);
      const qmTab = getByText("QUIZ MASTER");
      fireEvent.click(qmTab);
      expect(() => getByText("PROBLEM")).toThrowError();
      const hrTab = getByText("HR");
      fireEvent.click(hrTab);
      expect(() => getByText("CATEGORY")).toThrowError();
      const assessorTab = getByText("ASSESSOR");
      fireEvent.click(assessorTab);
      expect(() => getByTestId("assessor-menu-items")).toThrowError();
    });
    it("should render menu items for ADMIN", () => {
      const { getByText } = render(<App />);
      const adminTab = getByText("ADMIN");
      fireEvent.click(adminTab);
    });
  });
});
