import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Typography, Box, Grid } from "@material-ui/core";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    backgroundColor: theme.palette.primary.dark,
  },
  tab: {
    backgroundColor: theme.palette.primary.dark,
  },
  tabPanel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  gridContainer: {
    justify: "center",
    spacing: 10,
  },
}));

const TabPanels = (props) => {
  const role = props.history.location.state.role;
  let disableHRFlag = true;
  let disableQMFlag = true;
  let disableAssessorFlag = true;
  let disableAdminFlag = true;
  const TAB_INDICES = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
  };

  let defaultTabIndex = TAB_INDICES.zero;

  if (role === "QM") {
    disableQMFlag = false;
  } else if (role === "HR") {
    disableHRFlag = false;
    defaultTabIndex = TAB_INDICES.one;
  } else if (role === "ASSESSOR") {
    disableAssessorFlag = false;
    defaultTabIndex = TAB_INDICES.two;
  } else {
    disableAdminFlag = false;
    defaultTabIndex = TAB_INDICES.three;
  }

  const classes = useStyles();

  const [value, setValue] = React.useState(defaultTabIndex);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tabGrid = (
    <Grid
      container
      justify="center"
      spacing="5"
      className={classes.gridContainer}
    >
      <CardFactory
        history={props.history}
        role={props.history.location.state.role}
      />
    </Grid>
  );

  return (
    <Box component="div" className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Tabs
          className={classes.tab}
          value={value}
          onChange={handleChange}
          aria-label="simple tabs"
          centered
          variant="fullWidth"
        >
          <Tab
            label="QUIZ MASTER"
            {...a11yProps(0)}
            disabled={disableQMFlag}
            data-testid="qm-tab"
            className={classes.tab}
          />
          <Tab
            label="HR"
            {...a11yProps(1)}
            disabled={disableHRFlag}
            data-testid="hr-tab"
            className={classes.tab}
          />
          <Tab
            label="ASSESSOR"
            {...a11yProps(2)}
            disabled={disableAssessorFlag}
            data-testid="asessor-tab"
            className={classes.tab}
          />
          <Tab
            label="ADMIN"
            {...a11yProps(3)}
            disabled={disableAdminFlag}
            data-testid="admin-tab"
            className={classes.tab}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={TAB_INDICES.zero}>
        {tabGrid}
      </TabPanel>
      <TabPanel value={value} index={TAB_INDICES.one}>
        {tabGrid}
      </TabPanel>
      <TabPanel value={value} index={TAB_INDICES.two}>
        {tabGrid}
      </TabPanel>
      <TabPanel value={value} index={TAB_INDICES.three}>
        <Typography data-testId="admin-menu-items">
          Placeholder for the menu items of Admin
        </Typography>
      </TabPanel>
    </Box>
  );
};

export default TabPanels;
