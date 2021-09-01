import React from "react";
import { useSelector } from "react-redux";
import { arrayToTree } from "../../common/arrayToTree";
//UI
import { TreeView, TreeItem } from "@material-ui/lab";
//Icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const ResourcesList = () => {
  const resources = useSelector((state) => state.resources);

  const tree = arrayToTree(resources, {
    id: "TreeID",
    parentId: "TreeParentID",
    childrenField: "children",
  });

  const cb = (e) => {
    return (
      <TreeItem nodeId={e.data.TreeID} label={e.data.TreeName}>
        {e.children && e.children.map(cb)}
      </TreeItem>
    );
  };

  const renderedListItems = tree.map(cb);

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
