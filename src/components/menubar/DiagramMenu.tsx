import React from "react";
//UI
import { IconButton, Typography, Grid } from "@material-ui/core";

//Icons
import AddIcon from "@material-ui/icons/Add";
import PublishIcon from "@material-ui/icons/Publish";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import EditIcon from "@material-ui/icons/Edit";
import GetAppIcon from "@material-ui/icons/GetApp";

const DiagramMenu = () => {
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
        <IconButton aria-label="Duplicate">
          <FileCopyIcon />
        </IconButton>
        <IconButton aria-label="Rename">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="Download">
          <GetAppIcon />
        </IconButton>
      </Grid>
      <Typography variant="body1">Demo Diagrams</Typography>
    </Grid>
  );
};

export default DiagramMenu;
