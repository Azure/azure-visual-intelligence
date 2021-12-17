import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, IconButton, Typography, Grid, Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
//Icons
import LockOpenIcon from "@mui/icons-material/LockOpen";

const DiagramHeader = () => {
  const dispatch = useDispatch();
  const diagramName = useSelector((state) => state.diagram.name);
  const layouts = useSelector((state) => state.settings.layout);
  const overlays = useSelector((state) => state.settings.overlay);
  const currentLayout = useSelector(
    (state) => state.settings.diagram.CurrentLayout
  );

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 500,
        width: 250,
      },
    },
  };
  const [personName, setPersonName] = React.useState([]);

  const handleLayoutChange = (event) => {
    dispatch({
      type: "CHANGE_LAYOUT",
      payload: event.target.value,
    });
  };

  const handleOverlayChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    dispatch({
      type: "CHANGE_OVERLAY",
      payload: event.target.value,
    });
  };

  const handleClearDiagram = (event) => {
    dispatch({
      type: "CLEAR_DIAGRAM",
    });
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
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Button onClick={handleClearDiagram}> Clear All</Button>
              <Button> Recenter</Button>
              <Button> Redraw</Button>
            </Grid>
            <Grid item>
              <TextField
                sx={{ m: 0.5, width: 300 }}
                id="Layout"
                select
                label="Layout"
                value={currentLayout}
                onChange={handleLayoutChange}
              >
                {layouts.map((option) => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <FormControl sx={{ m: 0.5, width: 300 }}>
                <InputLabel>Overlays</InputLabel>
                <Select
                  multiple
                  value={personName}
                  onChange={handleOverlayChange}
                  input={<OutlinedInput label="Overlays" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {overlays.map((overlay) => (
                    <MenuItem key={overlay.name} value={overlay.name}>
                      <Checkbox
                        checked={personName.indexOf(overlay.name) > -1}
                      />
                      <ListItemText primary={overlay.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button> Export As...</Button>
              <Button> Save</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default DiagramHeader;