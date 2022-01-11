import React from "react";
import { useDispatch } from "react-redux";
import Toolboxes from "../diagramEcosystem/toolboxes/Toolboxes";
//UI
import {
  IconButton,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

//Icons
import AddIcon from "@mui/icons-material/Add";
import PublishIcon from "@mui/icons-material/Publish";

const DiagramMenu = () => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    diagramIndex: string
  ) => {
    setSelectedIndex(index);
    dispatch({
      type: "LOAD_DIAGRAM",
      payload: diagramIndex,
    });
  };

  //const isAuthenticated = useIsAuthenticated();
  return (
    <Grid container direction="column">
      <Typography variant="h5">Diagrams</Typography>
      <Grid>
        <IconButton aria-label="New">
          <AddIcon />
        </IconButton>
        <IconButton aria-label="Upload">
          <PublishIcon />
        </IconButton>
      </Grid>
      <List>
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0, "DemoDiagram")}
        >
          <ListItemText primary="Demo Diagram" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1, "EmptyDiagram")}
        >
          <ListItemText primary="Empty Diagram" />
        </ListItem>
      </List>
      <Grid
        item
        xs={2}
        style={{
          height: "100%",
          background: "#ffffff",
          padding: "5px 5px 5px 20px",
        }}
      >
        <Toolboxes />
      </Grid>
    </Grid>
  );
};

export default DiagramMenu;
