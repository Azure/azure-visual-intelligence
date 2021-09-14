import React from "react";
import { useSelector } from "react-redux";
import {
  Button,
  IconButton,
  Typography,
  Grid,
  Box,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
//Icons
import LockOpenIcon from "@material-ui/icons/LockOpen";

const DiagramHeader = () => {
  //const classes = useStyles();
  const diagramName = useSelector((state: any) => state.diagram.name);
  return (
    <Box border={1} borderColor="#808080">
      <Grid
        container
        direction="column"
        style={{
          height: "inherit",
        }}
      >
        <Grid item>
          <Grid container justifyContent="center" alignItems="center">
            <Typography variant="h3"> {diagramName}</Typography>
            <IconButton aria-label="Edit Mode">
              <LockOpenIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container>
            <Button> Clear All</Button>
            <Button> Redraw</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default DiagramHeader;
