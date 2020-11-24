import React, { Component } from "react";
import {Container, Row, Col} from "reactstrap";
import Browser from "./Browser"
//import withArgProvider, { ArgComponentProps } from "../../api/azure/azarg";

/*interface GraphProps {
  isAuthenticated: boolean;
  //subscriptions: any;
}

interface GraphState {
  isOpen: boolean;
}*/

export default class Graph extends React.Component {
  render() {
    //if (this.props.isAuthenticated) {
      return (
        <Container className="themed-container" fluid={true}>
            <Row>
                <Col xs="2">
                  <Browser/>
               </Col>
                <Col>GRAPH</Col>
            </Row>
        </Container>
      );
   // }
  }
}

//subscriptions={this.props.getSubscriptions}
                 