import React from "react";
import { Switch, Route, NavLink, BrowserRouter } from "react-router-dom";
import Problem from "./problem";
import DummyOtherPage from "./dummyOtherPage";
import ProblemConfirmation from "./problemConfirmation";

const sampleProblem = {
  question: "What is the best approach to Agile?",
  options: [
    {
      option: "option 1",
      id: "770ed78d-971e-4098-ae58-38c06dfb03a5",
    },
    {
      option: "option 2",
      id: "55d0148b-b20a-476c-a73f-7aac3fa19b3d",
    },
    {
      option: "option 3",
      id: "37b3fa16-ab69-43e0-92c3-a418b3b50e75",
    },
    {
      option: "option 4",
      id: "3be9193e-03cc-4201-9e58-355f3d6bfbd0",
    },
  ],
  answer: "770ed78d-971e-4098-ae58-38c06dfb03a5",
  problemSetCode: "ProblemSetCodeA",
  id: "5df87510-d963-4027-aa72-3b8683c316dc",
};

const DummyRouter = () => {
  return (
    <BrowserRouter>
      <NavLink exact to="/problem/add">
        Create New Problem
      </NavLink>
      <NavLink exact to="/problem/confirmation">
        Problem Confirmation
      </NavLink>
      <Switch>
        <Route exact path="/problem/add" component={Problem} />
        <Route exact path="/problem/" component={DummyOtherPage} />
        <Route
          exact
          path="/problem/confirmation"
          render={(props) => (
            <ProblemConfirmation key={"new"} savedProblem={sampleProblem} />
          )}
        ></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default DummyRouter;
