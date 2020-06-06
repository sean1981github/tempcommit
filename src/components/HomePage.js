import React from "react";
import { Box } from "@material-ui/core";
import ButtonAppBar from "./ButtonAppBar";
import TabPanel from "./TabPanels";

const HomePage = (props) => {
  return (
    <Box>
      <ButtonAppBar history={props.history} setLoggedIn={props.setLoggedIn} />
      <TabPanel history={props.history} setLoggedIn={props.setLoggedIn} />
    </Box>
  );
};
export default HomePage;
