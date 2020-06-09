import React from "react";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom/extend-expect";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Router from "./Router";
import { MemoryRouter } from "react-router";
import { render } from "@testing-library/react";
import Axios from "../utils/axiosInstance";

const mockAxios = new MockAdapter(Axios);

const mockUserResponse = {
  data: {
    username: "username",
    role: "QM",
  },
};

configure({ adapter: new Adapter() });

const props = {
  setLoggedIn: jest.fn(),
  setUsername: jest.fn(),
  setRole: jest.fn(),
  homepageData: [{ cards: [{ key: "1", title: "1" }] }],
};
describe("Router", () => {
  beforeEach(() => {
    mockAxios.reset();
    mockAxios.onPost("users/checkRefreshLogin").reply(200, mockUserResponse);
  });

  it("test Login Route for Router Test Method 3 with Props", () => {
    const wrapper = render(
      <MemoryRouter initialEntries={["/login"]} initialIndex={0}>
        <Router {...props} />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("test /problem/add Route", () => {
    const wrapper = render(
      <MemoryRouter initialEntries={["/problem/add"]} initialIndex={0}>
        <Router {...props} />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("test /quiz/add Route", () => {
    const wrapper = render(
      <MemoryRouter initialEntries={["/quiz/add"]} initialIndex={0}>
        <Router {...props} />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("test /quiz-template/add Route", () => {
    const wrapper = render(
      <MemoryRouter initialEntries={["/quiz-template/add"]} initialIndex={0}>
        <Router {...props} />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });

  //   it.only("test /home Route", () => {
  //     const wrapper = render(
  //       <MemoryRouter initialEntries={["/home"]} initialIndex={0}>
  //         <Router {...props} />
  //       </MemoryRouter>
  //     );
  //     expect(wrapper).toMatchSnapshot();
  //   });
});

//   it("test /problem/confirmation Route", () => {
//     const wrapper = render(
//       <MemoryRouter initialEntries={["/problem/confirmation"]} initialIndex={0}>
//         <Router history={mockHistory} location={mockLocation} />
//       </MemoryRouter>
//     );
//     expect(wrapper).toMatchSnapshot();
//   });

//   it("test Login Route for Router Test Method 1 with Props", () => {
//     const wrapper = render(
//       <MemoryRouter initialEntries={["/login"]} initialIndex={0}>
//         <Router {...props} />
//       </MemoryRouter>
//     );
//     expect(wrapper.getByText(/WELCOME/)).toBeInTheDocument();
//   });

//   it("test Login Route for Router Test Method 1 without Props", () => {
//     const wrapper = render(
//       <MemoryRouter initialEntries={["/login"]} initialIndex={0}>
//         <Router />
//       </MemoryRouter>
//     );
//     expect(wrapper.getByText(/WELCOME/)).toBeInTheDocument();
//   });

//   it("test Login Route for Router Test Method 2 with Props", () => {
//     const wrapper = shallow(
//       <MemoryRouter initialEntries={["/login"]} initialIndex={0}>
//         <Router {...props} />
//       </MemoryRouter>
//     );
//     expect(wrapper.find(LoginHandle)).toHaveLength(1);
//   });
