import React from "react";
import ButtonAppBar from "./ButtonAppBar";

const mockHomePage = (props) => {
  return (
    <div>
      <ButtonAppBar history={props.history} setLoggedIn={props.setLoggedIn} />
      Login as {props.location.state.role} successfully
    </div>
  );
};
export default mockHomePage;
