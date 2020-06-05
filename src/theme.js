import { createMuiTheme } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors/";

export default createMuiTheme({
  MuiTab: {
    root: {
      backgroundColor: "#336699",
      "&$selected": {
        backgroundColor: "#4080bf",
      },
    },
  },

  palette: {
    primary: {
      main: "#336699",
    },

    secondary: {
      main: "#ffffff",
    },
  },
  status: {
    danger: orange,
  },

  overrides: {
    MuiTab: {
      root: {
        backgroundColor: "#336699",
        "&$selected": {
          backgroundColor: "#4080bf",
        },
      },
    },
  },
});
