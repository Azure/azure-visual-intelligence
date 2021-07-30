import React from "react";
import {DefaultButton} from '@fluentui/react/lib/Button';

interface WelcomeProps {
  isAuthenticated: boolean;
  authButtonMethod: any;
  user: any;
}

interface WelcomeState {
  isOpen: boolean;
}

function WelcomeContent(props: WelcomeProps) {
  // If authenticated, greet the user
  if (props.isAuthenticated) {
    return (
      <div>
        <h4>Welcome {props.user.displayName}!</h4>
        <p>Use the navigation bar at the top of the page to get started.</p>
      </div>
    );
  }

  // Not authenticated, present a sign in button
  return (
    <DefaultButton text="Click here to sign in" onClick={props.authButtonMethod}/>
  );
}

export default class Welcome extends React.Component<
  WelcomeProps,
  WelcomeState
> {
  render() {
    return (
      <div>
        <h1>Azure Visual Intelligence</h1>
        <p className="lead"></p>
        This application allows you to :
        <ul>
          <li>visualize project-related resources in a graph.</li>
          <li>use it as a control pane</li>
        </ul>
        
        <WelcomeContent
          isAuthenticated={this.props.isAuthenticated}
          user={this.props.user}
          authButtonMethod={this.props.authButtonMethod}
        />
      </div>
    );
  }
}
