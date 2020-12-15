import React from "react";
import {Container, Row, Col} from "reactstrap";
import { Button } from "reactstrap";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import CytoScape from "./Cytoscape";


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

export default class Graph extends React.Component<
GraphProps,
GraphState
>{
  render() {
      return (
        <Container className="themed-container" fluid={true} style={{height:'100%'}}>
            <Row> 
                <Col xs="2" className="py-2 border rounded">
                  <Browser
                    user={this.props.user}
                    refreshResourcesButtonMethod={this.props.refreshResourcesButtonMethod}
                  />
               </Col>
                <Col className="py-2 border rounded">
                    <div style={{height:'92vh'}}>
                      <CytoScape />
                      </div>
                </Col>
            </Row>
        </Container>
      );
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
  if (props.user.subscriptions !== undefined){
    return (  
      <TreeView
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