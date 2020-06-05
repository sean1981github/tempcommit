import { createMuiTheme } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors/";

const overrides = {
  MuiTab: {
    root: {
      backgroundColor: "#215e31",
      "&$selected": {
        backgroundColor: "#37c479",
      },
    },
  },
};

export default createMuiTheme({
  palette: {
    primary: {
      main: "#248a3f",
    },

    secondary: {
      main: "#215e31",
    },
  },
  status: {
    danger: orange,
  },

  overrides,
});
