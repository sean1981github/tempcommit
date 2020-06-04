import React from "react";
import ButtonAppBar from "./ButtonAppBar";
import TabPanel from "./TabPanel";

const HomePage = (props) => {
  return (
    <div>
      <ButtonAppBar history={props.history} setLoggedIn={props.setLoggedIn} />
      <TabPanel history={props.history} />
    </div>
  );
};
export default HomePage;
