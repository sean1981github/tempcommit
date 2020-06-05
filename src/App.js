import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import Router from "./components/Router";
import theme from "./theme";

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
