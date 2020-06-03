import theme from "./theme";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import Router from "./components/Router";
require("dotenv").config();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
