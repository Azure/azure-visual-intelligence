import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { arrayToTree } from "../../common/arrayToTree";
import { DragPreviewImage, useDrag } from "react-dnd";
//UI
import { Grid, Typography, Button, withStyles } from "@material-ui/core";
import { TreeView } from "@material-ui/lab";
import MuiTreeItem from "@material-ui/lab/TreeItem";
//Icons
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { knightImage } from "./knightImage";

const ResourcesList = () => {
  const resources = useSelector((state) => state.resources);
  const dispatch = useDispatch();

  const tree = arrayToTree(resources, {
    id: "TreeID",
    parentId: "TreeParentID",
    childrenField: "children",
  });

  const TreeItem = withStyles({
    root: {},
    selected: {},
    content: {},
    label: {
      userSelect: "none", // This is to prevent text selection within the treeview item
    },
  })(MuiTreeItem);

  const Box = (e) => {
    const treeId = e.data.TreeID;
    const [{ isDragging }, drag, preview] = useDrag(
      {
        type: "TREEVIEW",
        item: { treeId },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      },
      []
    );
    return (
      <>
        <DragPreviewImage connect={preview} src={knightImage} />
        <TreeItem
          nodeId={e.data.TreeID}
          label={e.data.TreeName}
          ref={drag}
          style={{ isDragging }}
        >
          {e.children && e.children.map(Box)}
        </TreeItem>
      </>
    );
  };

  const renderedListItems = tree.map(Box);

  const testsubscriptions = {
    id: "/subscriptions/3bfaafd1-b638-4262-8794-370d23b971d7",
    name: "MCT",
    type: "microsoft.resources/subscriptions",
    tenantId: "2b0d1330-312c-497a-a034-f2374ee0be2a",
    kind: "",
    location: "",
    resourceGroup: "",
    subscriptionId: "3bfaafd1-b638-4262-8794-370d23b971d7",
    managedBy: "",
    sku: null,
    plan: null,
    properties: {
      managementGroupAncestorsChain: [
        {
          displayName: "mendacorp",
          name: "mendacorp",
        },
        {
          displayName: "Tenant Root Group",
          name: "2b0d1330-312c-497a-a034-f2374ee0be2a",
        },
      ],
      subscriptionPolicies: {
        locationPlacementId: "Public_2014-09-01",
        spendingLimit: "On",
        quotaId: "MSDN_2014-09-01",
      },
      managedByTenants: [
        {
          tenantId: "2f4a9838-26b7-47ee-be60-ccc1fdec5953",
        },
      ],
      state: "Enabled",
    },
    tags: null,
    identity: null,
    zones: null,
    extendedLocation: null,
    TreeParentID: "mendacorp",
    TreeID: "3bfaafd1-b638-4262-8794-370d23b971d7",
    TreeName: "MCT",
  };
  const test = {
    type: "DRAG_FROM_AZURE_EXISTING_RESOURCES",
    payload: { ...testsubscriptions },
  };

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
      <Button onClick={() => dispatch(test)}>
        ADD subscription to Diagram
      </Button>
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
