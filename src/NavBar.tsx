// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <NavBarSnippet>
import React from "react";
import { Link as RouterLink, NavLink as RouterNavLink } from "react-router-dom";
import { DefaultButton, Stack, Separator,PrimaryButton, Nav, Link, DefaultPalette, IStackStyles, IStackTokens, INavLink, INavStyles, INavLinkGroup } from '@fluentui/react';

const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.neutralLighter       ,
  },
};

const themedSmallStackTokens: IStackTokens = {
  childrenGap: 's1',
  padding: 's1',
};

interface NavBarProps {
  isAuthenticated: boolean;
  authButtonMethod: any;
  user: any;
}

interface NavBarState {
  isOpen: boolean;
}

function UserAvatar(props: any) {
  // If a user avatar is available, return an img tag with the pic
  if (props.user.avatar) {
    return (
      <img
        src={props.user.avatar}
        alt="user"
        className="rounded-circle align-self-center mr-2"
        style={{ width: "32px" }}
      ></img>
    );
  }

  // No avatar available, return a default icon
  return (
    <i
      className="far fa-user-circle fa-lg rounded-circle align-self-center mr-2"
      style={{ width: "32px" }}
    ></i>
  );
}

function AuthNavItem(props: NavBarProps) {
  // If authenticated, return a dropdown with the user's info and a
  // sign out button
  if (props.isAuthenticated) {
    return (
      <div>
            {props.user.email}
      </div>
    );
  }

  // Not authenticated, return a sign in link
  return (
      <DefaultButton text="Sign In" onClick={props.authButtonMethod}/>
  );
}

function Authentication() {
  // If authenticated, return a dropdown with the user's info and a
  // sign out button
  //if (props.isAuthenticated) {
   // return (
  //    <div>

  //    </div>
  //  );
  //}

  // Not authenticated, return a sign in link
  return (
      <Stack tokens={themedSmallStackTokens}>
       <span> Authentication</span>
       <span>You are currently using a sample account. Sign in to access your own data. </span>
       <PrimaryButton text="Sign in to Azure Visual Intelligence"/>
      </Stack>
  );
  //<DefaultButton text="Sign In" onClick={props.authButtonMethod}/>
}

export default class NavBar extends React.Component<NavBarProps, NavBarState> {
  constructor(props: NavBarProps) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    // Only show calendar nav item if logged in
    let GraphsLink = null;
    let GraphLink = null;
    if (this.props.isAuthenticated) {
      GraphsLink = (
          <Link as={RouterLink} to="/graphs" exact>
            Graphs
          </Link>
      );
      GraphLink = (
          <Link as={RouterLink} to="/graph" exact>
            Graph
          </Link>
      );
    }

    return (
      <Stack styles={stackStyles}>
        <span>Azure Visual Intelligence</span>
        <Separator/>
        <Authentication/>
        <Separator/>
        <Link as={RouterLink} to="/" exact>
          Home
        </Link>
        {GraphsLink}
        {GraphLink}
        <AuthNavItem
                isAuthenticated={this.props.isAuthenticated}
                authButtonMethod={this.props.authButtonMethod}
                user={this.props.user}
              />
      </Stack>
    );
  }
}