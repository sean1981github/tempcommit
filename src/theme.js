import { createMuiTheme } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors/";

// const overrides = {
//   MuiTab: {
//     root: {
//       backgroundColor: "#336699",
//       "&$selected": {
//         backgroundColor: "#4080bf",
//       },
//     },
//   },
// };

export default createMuiTheme({
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

  MuiTab: {
    root: {
      backgroundColor: "#336699",
      "&$selected": {
        backgroundColor: "#4080bf",
      },
    },
  },
});
