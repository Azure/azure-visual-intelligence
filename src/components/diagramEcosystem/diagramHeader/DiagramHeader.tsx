import React from "react";
import { useSelector } from "react-redux";
import {
  Button,
  IconButton,
  Typography,
  Grid,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
//Icons
import LockOpenIcon from "@material-ui/icons/LockOpen";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      textAlign: "center",
      color: theme.palette.text.secondary,
      padding: theme.spacing(2),
    },
  })
);

const DiagramHeader = () => {
  //const classes = useStyles();
  const diagramName = useSelector((state: any) => state.diagram.name);
  return (
    <div>
      <Grid container direction="column">
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
    </div>
  );
};
export default DiagramHeader;
