import React, { Component }  from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import NavBar from "../NavBar";
import './App.css';
import Welcome from "./home/Welcome";
import Graph from "./graph/Graph";
import ErrorMessage from "../ErrorMessage";
import withAuthProvider, { AuthComponentProps } from "../api/azure/azauth";
import "bootstrap/dist/css/bootstrap.css";
import 'office-ui-fabric-react/dist/css/fabric.css';

class App extends Component<AuthComponentProps> {
  render() {
    let error = null;
    if (this.props.error) {
      error = (
        <ErrorMessage
          message={this.props.error.message}
          debug={this.props.error.debug}
        />
      );
    }
  return (
    <Router>
      <div className="ms-Grid" dir="ltr">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
          <NavBar
              isAuthenticated={this.props.isAuthenticated}
              authButtonMethod={
                this.props.isAuthenticated ? this.props.logout : this.props.login
              }
              user={this.props.user}
            />
          </div>

          <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">
            {error}
            <Route
              exact
              path="/"
              render={(props) => (
                    <Welcome
                    {...props}
                    isAuthenticated={this.props.isAuthenticated}
                    user={this.props.user}
                    authButtonMethod={this.props.login}
                  />
              )}
            />
            <Route
              exact
              path="/graph"
              render={(props) => (
                <Graph
                {...props}
                user={this.props.user}
                refreshResourcesButtonMethod={this.props.refreshResources}
                />
              )}
            />
          </div>
        </div>
      </div>
  </Router>
  );
  }
}

export default withAuthProvider(App);
