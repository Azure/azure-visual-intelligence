import React from "react";
import { useSelector } from "react-redux";
//UI
import { TreeView, TreeItem } from "@material-ui/lab";
//Icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

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
