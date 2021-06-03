import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login.js";
import Main from "./Main.js";
import Panel from "./Panel.js";
import RegisterForm from "./RegisterForm.js";

class StartComponent extends React.Component {
  render() {
    return (
      <div id="background">
        <BrowserRouter>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/register">
            <RegisterForm />
          </Route>
          <Route exact path="/main">
            <Main />
          </Route>
          <Route exact path="/make">
            <Panel />
          </Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default StartComponent;
