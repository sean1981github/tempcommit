import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./components/myRouter";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
