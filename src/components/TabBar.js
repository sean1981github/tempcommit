import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Box } from "@material-ui/core";
import tabIndices from "../data/TabIndices";

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
}));

const TabBar = (props) => {
  const role = props.role;
  let disableHRFlag = true;
  let disableQMFlag = true;
  let disableAssessorFlag = true;
  let disableAdminFlag = true;

  let defaultTabIndex = tabIndices.zero;

  if (role === "QM") {
    disableQMFlag = false;
  } else if (role === "HR") {
    disableHRFlag = false;
    defaultTabIndex = tabIndices.one;
  } else if (role === "ASSESSOR") {
    disableAssessorFlag = false;
    defaultTabIndex = tabIndices.two;
  } else {
    disableAdminFlag = false;
    defaultTabIndex = tabIndices.three;
  }

  const classes = useStyles();

  const [value, setValue] = React.useState(defaultTabIndex);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            {...a11yProps(tabIndices.zero)}
            disabled={disableQMFlag}
            data-testid="qm-tab"
            className={classes.tab}
          />
          <Tab
            label="HR"
            {...a11yProps(tabIndices.one)}
            disabled={disableHRFlag}
            data-testid="hr-tab"
            className={classes.tab}
          />
          <Tab
            label="ASSESSOR"
            {...a11yProps(tabIndices.two)}
            disabled={disableAssessorFlag}
            data-testid="asessor-tab"
            className={classes.tab}
          />
          <Tab
            label="ADMIN"
            {...a11yProps(tabIndices.three)}
            disabled={disableAdminFlag}
            data-testid="admin-tab"
            className={classes.tab}
          />
        </Tabs>
      </AppBar>
    </Box>
  );
};

export default TabBar;
