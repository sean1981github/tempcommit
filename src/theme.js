import { createMuiTheme } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors/";

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
});
