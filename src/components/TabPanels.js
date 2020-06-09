import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Grid } from "@material-ui/core";
import tabIndices from "../data/TabIndices";
import TabBar from "./TabBar";
import CardFactory from "./CardFactory";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const BOX_NUM = 3;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={BOX_NUM}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const TabPanels = (props) => {
  const classes = useStyles();

  const value = 0;

  const tabGrid = (
    <Grid container justify="center" spacing="5">
      <CardFactory history={props.history} role={props.role} />
    </Grid>
  );

  return (
    <Box component="div" className={classes.root}>
      <TabBar role={props.role} />
      <TabPanel value={value} index={tabIndices.zero}>
        {tabGrid}
      </TabPanel>
      <TabPanel value={value} index={tabIndices.one}>
        {tabGrid}
      </TabPanel>
      <TabPanel value={value} index={tabIndices.two}>
        {tabGrid}
      </TabPanel>
      <TabPanel value={value} index={tabIndices.three}>
        <Typography data-testId="admin-menu-items">
          Placeholder for the menu items of Admin
        </Typography>
      </TabPanel>
    </Box>
  );
};

export default TabPanels;
