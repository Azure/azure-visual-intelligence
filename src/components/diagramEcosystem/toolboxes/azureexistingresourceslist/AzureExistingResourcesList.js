import { React } from "react";
import { useSelector } from "react-redux";
import { arrayToTree } from "../../../../common/arrayToTree";
import { DragPreviewImage, useDrag } from "react-dnd";
//UI
import { Grid, Typography, withStyles } from "@material-ui/core";
import { TreeView } from "@material-ui/lab";
import MuiTreeItem from "@material-ui/lab/TreeItem";
//Icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { knightImage } from "./knightImage";

const AzureExistingResourcesList = () => {
  //Getting Azure resources state from Redux
  const resources = useSelector((state) => state.resources);

  //Converting Azure Resources list to a tree
  const tree = arrayToTree(resources, {
    id: "TreeID",
    parentId: "TreeParentID",
    childrenField: "children",
  });

  //Styling for TreeItem so that text can't be selected
  const TreeItem = withStyles({
    root: {},
    selected: {},
    content: {},
    label: {
      userSelect: "none", // This is to prevent text selection within the treeview item, Thanks Doc
    },
  })(MuiTreeItem);

  //recurise function to generate TreeItem tree with Drag embedded
  function Box({ treeItem }) {
    const [{ isDragging }, drag, preview] = useDrag(() => ({
      type: "TREEVIEW",
      item: treeItem.data,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));
    return (
      <>
        <DragPreviewImage connect={preview} src={knightImage} />
        <TreeItem
          nodeId={treeItem.data.TreeID}
          label={treeItem.data.TreeName}
          ref={drag}
          style={{ isDragging }}
        >
          {treeItem.children &&
            treeItem.children.map((treeItem) => <Box treeItem={treeItem} />)}
        </TreeItem>
      </>
    );
  }

  const renderedListItems = tree.map((treeItem) => <Box treeItem={treeItem} />);

  return (
    <Grid
      container
      direction="column"
      style={{
        height: "100%",
        width: "100%",
        margin: "0px 0px 0px 0px",
      }}
    >
      <Grid item>
        <Typography variant="h6">Azure existing resources</Typography>
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
export default AzureExistingResourcesList;
