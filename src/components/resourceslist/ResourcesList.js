import React from "react";
import {
  Stack,
  Separator,
  ISeparatorStyles,
  DefaultPalette,
  IStackTokens,
  IStackStyles,
  Label,
} from "@fluentui/react";
import { Icon } from "@fluentui/react/lib/Icon";
import { useSelector } from "react-redux";

import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

const ResourcesList = () => {
  const resources = useSelector((state) => state.resources);
  console.log("here");
  console.log(resources);
  console.log(resources.type);
  //return <div>"hello"</div>;
  const renderedListItems = resources.map((subscription) => {
    return (
      <TreeItem
        nodeId={subscription.subscriptionId}
        label={subscription.displayName}
      />
    );
  });

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
