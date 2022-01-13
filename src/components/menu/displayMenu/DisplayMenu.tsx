import React from "react";
import { useDispatch, useSelector } from "react-redux";
//UI
import { Typography, ListItemText, Button } from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";

const DiagramMenu = () => {
  const dispatch = useDispatch();
  const layouts = useSelector((state: any) => state.settings.layout);
  const overlays = useSelector((state: any) => state.settings.overlay);
  const currentLayout = useSelector(
    (state: any) => state.settings.diagram.CurrentLayout
  );

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 500,
        width: 250,
      },
    },
  };
  var [personName, setPersonName] = React.useState<any>([]);

  const handleLayoutChange = (event: any) => {
    dispatch({
      type: "CHANGE_LAYOUT",
      payload: event.target.value,
    });
  };

  const handleOverlayChange = (event: any) => {
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

  const handleClearDiagram = (event: any) => {
    dispatch({
      type: "CLEAR_DIAGRAM",
    });
  };

  //const isAuthenticated = useIsAuthenticated();
  return (
    <Accordion defaultExpanded={true} style={{ background: "#f3f2f1" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3a-content"
        id="panel3a-header"
      >
        <Typography>Display</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Button onClick={handleClearDiagram}> Clear All</Button>
        <TextField
          sx={{ m: 0.5, width: 300 }}
          id="Layout"
          select
          label="Layout"
          value={currentLayout}
          onChange={handleLayoutChange}
        >
          {layouts.map((option: any) => (
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
            {overlays.map((overlay: any) => (
              <MenuItem key={overlay.name} value={overlay.name}>
                <Checkbox checked={personName.indexOf(overlay.name) > -1} />
                <ListItemText primary={overlay.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};

export default DiagramMenu;
