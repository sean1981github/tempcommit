import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CategoryCard from "./CategoryCard";
import ProblemSetCard from "./ProblemSetCard";
import ProblemCard from "./ProblemCard";
import QuizTemplateCard from "./QuizTemplateCard";
import CreateQuizCard from "./CreateQuizCard";
import QuizResultsCard from "./QuizResultsCard";
import ResultsCard from "./ResultsCard";

import "./HomePage.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const BOX_NUM = 3;

  return (
    <div
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
    </div>
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
}));

const SimpleTabs = (props) => {
  const role = props.history.location.state.role;
  let disableHRFlag = true;
  let disableQMFlag = true;
  let disableAssessorFlag = true;
  let disableAdminFlag = true;
  const TAB_INDEX_ZERO = 0;
  const TAB_INDEX_ONE = 1;
  const TAB_INDEX_TWO = 2;
  const TAB_INDEX_THREE = 3;

  let defaultTabIndex = TAB_INDEX_ZERO;

  if (role === "QM") {
    disableQMFlag = false;
  } else if (role === "HR") {
    disableHRFlag = false;
    defaultTabIndex = TAB_INDEX_ONE;
  } else if (role === "ASSESSOR") {
    disableAssessorFlag = false;
    defaultTabIndex = TAB_INDEX_TWO;
  } else {
    disableAdminFlag = false;
    defaultTabIndex = TAB_INDEX_THREE;
  }

  const classes = useStyles();

  const [value, setValue] = React.useState(defaultTabIndex);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="QUIZ MASTER" {...a11yProps(0)} disabled={disableQMFlag} />
          <Tab label="HR" {...a11yProps(1)} disabled={disableHRFlag} />
          <Tab
            label="ASSESSOR"
            {...a11yProps(2)}
            disabled={disableAssessorFlag}
          />
          <Tab
            label="ADMIN"
            {...a11yProps(3)}
            disabled={disableAdminFlag}
            data-testid="admin-tab"
          />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <div className="tab-panel-items">
          <CategoryCard />
          <ProblemSetCard />
          <ProblemCard />
          <QuizTemplateCard />
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="tab-panel-items">
          <CreateQuizCard />
          <QuizResultsCard />
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="tab-panel-items" data-testId="assessor-menu-items">
          <ResultsCard />
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div className="tab-panel-items" data-testId="admin-menu-items">
          Placeholder for the menu items of Admin
        </div>
      </TabPanel>
    </div>
  );
};

export default SimpleTabs;
