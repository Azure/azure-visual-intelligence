import React from "react";
import {Container, Row, Col} from "reactstrap";
import { Button } from "reactstrap";


interface GraphProps {
  refreshResourcesButtonMethod:any;
  user: {
    displayName: string,
    email: string,
    subscriptions : any[],
  };
}

interface SubscriptionsProps {
  user: {
    displayName: string,
    email: string,
    subscriptions : any[],
  };
}

interface GraphState {
  isOpen: boolean;
}

export default class Graph extends React.Component<
GraphProps,
GraphState
>{
  render() {
    //if (this.props.isAuthenticated) {
      return (
        <Container className="themed-container" fluid={true}>
            <Row>
                <Col xs="2">
                  <Browser
                    user={this.props.user}
                    refreshResourcesButtonMethod={this.props.refreshResourcesButtonMethod}
                  />
               </Col>
                <Col>GRAPH</Col>
            </Row>
        </Container>
      );
   // }
  }
}

function Browser(props: GraphProps) {
  return (
    <div>
      <p>
        Resources
        <Button color="primary" onClick={props.refreshResourcesButtonMethod}>
          Refresh
        </Button>
        <Subscriptions user={props.user}/>
      </p>
    </div>
  );
}

function Subscriptions(props: SubscriptionsProps){
  ////if (props.user.subscriptions.length > 0){
  if (props.user.subscriptions !== undefined){
    return (  
      <div>
        {props.user.subscriptions.map((subscription) => {
          return (
            <div>{subscription.displayName}</div>
          );
        })}
      </div>   
    );
  }
  return (<div>No Subscriptions</div>);
}