import React from "react";
import { Route, Router } from "react-router-dom";
import { connect } from "react-redux";

import { initialApp } from "../actions";
import Products from "./Products";
import Confirm from "./Confirm";
import Account from "./Account";
import Complete from "./Complete";
import { history } from "../history";
import { PrivateRoute } from "../PrivateRoute";

import Login from "./Login";
import Register from "./Register";

import "../css/App.css";

class App extends React.Component {
  componentDidMount() {
    this.props.initialApp();
  }
  render() {
    return (
      <div className="component-app">
        <Router history={history}>
          <React.Fragment>
            <Route exact path={`/products`} component={Products} />
            <Route exact path={`/confirm`} component={Confirm} />
            <PrivateRoute exact path={`/account`} component={Account} />
            <Route exact path={`/login`} component={Login} />
            <Route exact path={`/register`} component={Register} />
            <Route exact path={`/complete`} component={Complete} />
            <Route exact path={`/`} component={Products} />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default connect(
  null,
  { initialApp }
)(App);
