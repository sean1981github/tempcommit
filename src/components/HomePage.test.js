import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import HomePage from "../components/HomePage";

describe("HomePage", () => {
  describe("Already login as Assessor", () => {
    it("should load ASSESSOR homepage with required tabs", () => {
      const { getByText } = render(
        <HomePage setLoggedIn={true} username={"username"} role={"ASSESSOR"} />
      );
      expect(getByText("QUIZ MASTER")).toBeInTheDocument();
      expect(getByText("HR")).toBeInTheDocument();
      expect(getByText("ASSESSOR")).toBeInTheDocument();
      expect(getByText("ADMIN")).toBeInTheDocument();
    });

    it("should disable tabs other then ASSESSOR", () => {
      const { getByText, getByTestId } = render(
        <HomePage setLoggedIn={true} username={"username"} role={"ASSESSOR"} />
      );
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
      const { getByText } = render(
        <HomePage setLoggedIn={true} username={"username"} role={"ASSESSOR"} />
      );
      const assessorTab = getByText("ASSESSOR");
      fireEvent.click(assessorTab);
      expect(getByText("RESULTS")).toBeInTheDocument();
      expect(getByText("View Results")).toBeInTheDocument();
    });
  });

  describe("Already login as HR", () => {
    it("should load homepage with username displayed", async () => {
      const { getByText } = render(
        <HomePage setLoggedIn={true} username={"username"} role={"HR"} />
      );
      await waitForElement(() => getByText(/username/));
      expect(getByText(/username/)).toBeInTheDocument();
    });

    it("should load HR homepage with required tabs", () => {
      const { getByText } = render(
        <HomePage setLoggedIn={true} username={"username"} role={"HR"} />
      );
      expect(getByText("QUIZ MASTER")).toBeInTheDocument();
      expect(getByText("HR")).toBeInTheDocument();
      expect(getByText("ASSESSOR")).toBeInTheDocument();
      expect(getByText("ADMIN")).toBeInTheDocument();
    });

    it("should disable tabs other then HR", () => {
      const { getByText, getByTestId } = render(
        <HomePage setLoggedIn={true} username={"username"} role={"HR"} />
      );
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
      const { getByText } = render(
        <HomePage setLoggedIn={true} username={"username"} role={"HR"} />
      );
      const hrTab = getByText("HR");
      fireEvent.click(hrTab);
      expect(getByText("CREATE QUIZ")).toBeInTheDocument();
      expect(getByText("Create New Quiz")).toBeInTheDocument();
      expect(getByText("Delete Existing Quiz")).toBeInTheDocument();
      expect(getByText("QUIZ RESULTS")).toBeInTheDocument();
      expect(getByText("View Results")).toBeInTheDocument();
    });
  });

  describe("Already login as Quiz Master ", () => {
    it("should load QM homepage with required tabs", () => {
      const { getByText } = render(
        <HomePage setLoggedIn={true} username={"username"} role={"QM"} />
      );
      expect(getByText("QUIZ MASTER")).toBeInTheDocument();
      expect(getByText("HR")).toBeInTheDocument();
      expect(getByText("ASSESSOR")).toBeInTheDocument();
      expect(getByText("ADMIN")).toBeInTheDocument();
    });

    it("should disable tabs other then QM", () => {
      const { getByText, getByTestId } = render(
        <HomePage setLoggedIn={true} username={"username"} role={"QM"} />
      );
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
      const { getByText } = render(
        <HomePage setLoggedIn={true} username={"username"} role={"QM"} />
      );
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

  describe("Already login as Admin", () => {
    it("should load ADMIN homepage with required tabs", () => {
      const { getByText } = render(
        <HomePage setLoggedIn={true} username={"username"} role={"ADMIN"} />
      );
      expect(getByText("QUIZ MASTER")).toBeInTheDocument();
      expect(getByText("HR")).toBeInTheDocument();
      expect(getByText("ASSESSOR")).toBeInTheDocument();
      expect(getByText("ADMIN")).toBeInTheDocument();
    });

    it("should disable tabs other then ADMIN", () => {
      const { getByText, getByTestId } = render(
        <HomePage setLoggedIn={true} username={"username"} role={"ADMIN"} />
      );
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
      const { getByTestId } = render(
        <HomePage setLoggedIn={true} username={"username"} role={"ADMIN"} />
      );
      const adminTab = getByTestId("admin-tab");
      fireEvent.click(adminTab);
    });
  });
});
