import React, { Component }  from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import './App.css';
import { Container } from "reactstrap";
import Welcome from "./Welcome";
import ErrorMessage from "./ErrorMessage";
import withAuthProvider, { AuthComponentProps } from "./AuthProvider";
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
      <Container>
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
      </Container>
    </div>
  </Router>
  );
  }
}

export default withAuthProvider(App);
