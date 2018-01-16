import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "./common/Header";
import ReportsPage from "./components/ReportsPage/ReportsPage";
import CreateReportPage from "./components/CreateReportPage/CreateReportPage";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div>
            <Header />
            <Switch>
                <Redirect exact from='/' to='/reports' />
                <Route path='/reports' component={ReportsPage} />
                <Route path='/create' component={CreateReportPage} />
            </Switch>
      </div>
    );
  }
}
