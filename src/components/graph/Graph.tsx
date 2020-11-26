import React from "react";
import {Container, Row, Col} from "reactstrap";
import { Button } from "reactstrap";
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';


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
    subscriptions : subscription[]
  };
}

interface subscription {
  subscriptionId : string,
  displayName: string,
  resourceGroups : resourceGroup[],
}

interface resourceGroup{
  id :string,
  name:string
  resources : any[],
}

interface GraphState {
  isOpen: boolean;
}

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

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
  const classes = useStyles();
  if (props.user.subscriptions !== undefined){
    return (  
      <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      multiSelect
    >
        {props.user.subscriptions.map((subscription) => {
          return (
            <TreeItem nodeId={subscription.subscriptionId} label={subscription.displayName}>
              {subscription.resourceGroups && subscription.resourceGroups.map((resourceGroup) => {
                return (<TreeItem nodeId={resourceGroup.id} label={resourceGroup.name}>
                      {resourceGroup.resources && resourceGroup.resources.map((resource) => {
                        return (<TreeItem nodeId={resource.id} label={resource.name}/>)
                      })}
                </TreeItem>
                )
              })}
            </TreeItem>
            
          );
        })}
      </TreeView>
    );
  }
  return (<div>No Subscriptions</div>);
}
/*
              {subscription.resourceGroups && subscription.resourceGroups.map((resourceGroup) => {
                return <TreeItem nodeId={resourceGroup.id} label={resourceGroup.name}/>
              })}
              */
//<Subscription key={subscription.subscriptionId} props={subscription}/>
/*function Subscription(props :any){
    return (  
        <TreeItem nodeId={props.subscriptionId} label={props.displayName}>

      </TreeItem>
    );
}*/


/*        {props.resourceGroups.map((resourceGroup) => {
          return (
              <TreeItem nodeId={resourceGroup.subscriptionId+2} label="Calendar" />
          );
        })}*/