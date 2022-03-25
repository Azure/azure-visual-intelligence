import React from "react";
import { useSelector } from "react-redux";
import { arrayToTree } from "../../../../common/arrayToTree";
import { DragPreviewImage, useDrag } from "react-dnd";
//UI
import { Grid } from "@mui/material";
import { TreeView } from "@mui/lab";
import TreeItem from "@mui/lab/TreeItem";

//Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { knightImage } from "./knightImage";

const AzureExistingResourcesList = () => {
  //Getting Azure resources state from Redux
  //const resources = useSelector((state) => state.AvailableResources);
  const resources = useSelector((state) => state.argEngine.resources);
  if (resources !== undefined) {
    //Converting Azure Resources list to a tree
    const tree = arrayToTree(resources, {
      id: "AVIresourceID",
      parentId: "enrichments.ARG.parent",
      childrenField: "children",
    });

    //recursive function to generate TreeItem tree with Drag embedded
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
          <DragPreviewImage
            connect={preview}
            src={knightImage}
            key={"image".concat("", treeItem.data.AVIresourceID)}
          />
          <TreeItem
            key={treeItem.data.AVIresourceID}
            nodeId={treeItem.data.AVIresourceID}
            label={treeItem.data.name}
            ref={drag}
            style={{ isDragging }}
            onFocusCapture={(e) => e.stopPropagation()}
          >
            {treeItem.children &&
              treeItem.children.map((treeItem) => (
                <Box
                  treeItem={treeItem}
                  key={"box".concat("", treeItem.data.AVIresourceID)}
                />
              ))}
          </TreeItem>
        </>
      );
    }

    const renderedListItems = tree.map((treeItem) => (
      <Box
        treeItem={treeItem}
        key={"box".concat("", treeItem.data.AVIresourceID)}
      />
    ));
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
  } else return <div></div>;
};
export default AzureExistingResourcesList;
