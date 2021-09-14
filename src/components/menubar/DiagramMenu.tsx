import React from "react";
import { useDispatch } from "react-redux";
//UI
import {
  IconButton,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

//Icons
import AddIcon from "@material-ui/icons/Add";
import PublishIcon from "@material-ui/icons/Publish";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import EditIcon from "@material-ui/icons/Edit";
import GetAppIcon from "@material-ui/icons/GetApp";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

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
      <Typography variant="body1">Diagrams</Typography>
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
    </Grid>
  );
};

export default DiagramMenu;
