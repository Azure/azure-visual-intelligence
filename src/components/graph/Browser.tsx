import React from "react";
//import {Container, Row, Col} from "reactstrap";

interface BrowserProps {
  subscriptions: any;
}

interface BrowserState {
  isOpen: boolean;
}

export default class Browser extends React.Component {
  render() {
    return (
      <div>
        <p>Subscriptions</p>
        <p>{this.getSubscriptions()}</p>
    </div>
    );
  }

  //ARG
  getSubscriptions(){
        return 3;
  }
}
