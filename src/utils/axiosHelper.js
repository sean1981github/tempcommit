import axios from "axios";

const ProblemAPI = axios.create({
  baseURL: `${process.env.REACT_APP_BACK_END_URL}/problem`,
});
ProblemAPI.defaults.headers.post["Content-Type"] = "application/json";

export { ProblemAPI };
