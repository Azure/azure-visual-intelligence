import React from "react";
import { useSelector } from "react-redux";
import { arrayToTree } from "../../common/arrayToTree";
//UI
import { Grid, Typography } from "@material-ui/core";
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
    <Grid
      container
      direction="column"
      style={{
        height: "100%",
        width: "100%",
        margin: "0px 0px 0px 5px",
        background: "#f3f2f1",
        padding: "5px 5px 5px 5px",
      }}
    >
      <Grid item>
        <Typography variant="body1">Azure Existing resources</Typography>
      </Grid>
      <Grid item>
        <TreeView
          style={{
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            overflow: "auto",
          }}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          multiSelect
        >
          {renderedListItems}
        </TreeView>
      </Grid>
    </Grid>
  );
};
export default ResourcesList;
