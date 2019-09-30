import React from "react";
import "./App.css";
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import Main from "./components/Main";
import Result from "./components/Result";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main}></Route>
        <Route path="/result" component={Result}></Route>
      </Switch>
    </Router>
  );
}

export default App;
