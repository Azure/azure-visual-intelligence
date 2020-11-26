import React, { Component }  from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import NavBar from "../NavBar";
import './App.css';
import { Container} from "reactstrap";
import Welcome from "./home/Welcome";
import Graph from "./graph/Graph";
import ErrorMessage from "../ErrorMessage";
import withAuthProvider, { AuthComponentProps } from "../api/azure/azauth";
import "bootstrap/dist/css/bootstrap.css";

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
    <div>
      <NavBar
        isAuthenticated={this.props.isAuthenticated}
        authButtonMethod={
          this.props.isAuthenticated ? this.props.logout : this.props.login
        }
        user={this.props.user}
      />
        {error}
        <Route
          exact
          path="/"
          render={(props) => (
            <Container>
                <Welcome
                {...props}
                isAuthenticated={this.props.isAuthenticated}
                user={this.props.user}
                authButtonMethod={this.props.login}
               />
            </Container>
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
  </Router>
  );
  }
}

/*              {...props}
isAuthenticated={this.props.isAuthenticated}*/

export default withAuthProvider(App);
