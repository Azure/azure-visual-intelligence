import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, IconButton, Typography, Grid, Box } from "@material-ui/core";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
//Icons
import LockOpenIcon from "@material-ui/icons/LockOpen";

const DiagramHeader = () => {
  const dispatch = useDispatch();
  const diagramName = useSelector((state: any) => state.diagram.name);
  const layouts = useSelector((state: any) => state.settings.layout);
  const currentLayout = useSelector(
    (state: any) => state.settings.diagram.CurrentLayout
  );

  const handleChange = (event: any) => {
    console.log(event.target.value);
    //Implement Set curent layout
  };
  const handleClearDiagram = (event: any) => {
    dispatch({
      type: "CLEAR_DIAGRAM",
    });
    //Implement Set curent layout
  };

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
            <Button onClick={handleClearDiagram}> Clear All</Button>
            <Button> Redraw</Button>
            <FormControlLabel
              control={<Switch />}
              label="Azure Security Center Overlay"
            />{" "}
            <TextField
              id="Layout"
              select
              label="Layout"
              value={currentLayout}
              onChange={handleChange}
            >
              {layouts.map((option: any) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default DiagramHeader;
