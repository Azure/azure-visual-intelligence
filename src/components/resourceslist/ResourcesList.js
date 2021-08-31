import React from "react";
import { useSelector } from "react-redux";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

const ResourcesList = () => {
  const resources = useSelector((state) => state.resources);

  const renderedListItems = (
    <TreeItem nodeId="Tenant Root Group" label="Tenant Root Group">
      {resources &&
        resources.map((subscription) => {
          return (
            <TreeItem
              nodeId={subscription.subscriptionId}
              label={subscription.displayName}
            />
          );
        })}
    </TreeItem>
  );

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      multiSelect
    >
      {renderedListItems}
    </TreeView>
  );
};
export default ResourcesList;

/*       {resources.map((subscription) => {
          return (
            <TreeItem
              nodeId={subscription.subscriptionId}
              label={subscription.displayName}
            >
              {subscription.resourceGroups &&
                subscription.resourceGroups.map((resourceGroup) => {
                  return (
                    <TreeItem
                      nodeId={resourceGroup.id}
                      label={resourceGroup.name}
                    ></TreeItem>
                  );
                })}
            </TreeItem>
          );
        })}
        */
