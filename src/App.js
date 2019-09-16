import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import Result from "./components/Result";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main}></Route>
        <Route path="/result" component={Result}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
