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
  const resources = useSelector((state) => state.AvailableResources);
  if (resources !== undefined) {
    //Converting Azure Resources list to a tree
    const tree = arrayToTree(resources, {
      id: "TreeID",
      parentId: "TreeParentID",
      childrenField: "children",
    });

    //flattening the tree to pass all childs of the selected resource to the diagram
    let flatten = (children, extractChildren, level, parent) =>
      Array.prototype.concat.apply(
        children.map((x) => ({
          ...x.data,
          level: level || 1,
          parent: parent || null,
        })),
        children.map((x) =>
          flatten(
            extractChildren(x) || [],
            extractChildren,
            (level || 1) + 1,
            x.id
          )
        )
      );

    let extractChildren = (x) => x.children;

    //recursive function to generate TreeItem tree with Drag embedded
    function Box({ treeItem }) {
      const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: "TREEVIEW",
        item: !treeItem.children.length //if the resource has no child
          ? treeItem.data // we provide only the resource data
          : [
              treeItem.data,
              ...flatten(extractChildren(treeItem), extractChildren).map(
                //other wise we provide resource + child resources
                (x) => delete x.children && x
              ),
            ],
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }));

      return (
        <>
          <DragPreviewImage
            connect={preview}
            src={knightImage}
            key={"image".concat("", treeItem.data.TreeID)}
          />
          <TreeItem
            key={treeItem.data.TreeID}
            nodeId={treeItem.data.TreeID}
            label={treeItem.data.TreeName}
            ref={drag}
            style={{ isDragging }}
            onFocusCapture={(e) => e.stopPropagation()}
          >
            {treeItem.children &&
              treeItem.children.map((treeItem) => (
                <Box
                  treeItem={treeItem}
                  key={"box".concat("", treeItem.data.TreeID)}
                />
              ))}
          </TreeItem>
        </>
      );
    }

    const renderedListItems = tree.map((treeItem) => (
      <Box treeItem={treeItem} key={"box".concat("", treeItem.data.TreeID)} />
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
