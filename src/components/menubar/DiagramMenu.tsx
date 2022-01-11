import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Toolboxes from "../diagramEcosystem/toolboxes/Toolboxes";
import AuthenticationMenu from "./AuthenticationMenu";
//UI
import {
  IconButton,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

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

//Icons
import AddIcon from "@mui/icons-material/Add";
import PublishIcon from "@mui/icons-material/Publish";

const DiagramMenu = () => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const diagramName = useSelector((state: any) => state.diagram.name);
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
    <div>
      <Accordion defaultExpanded={true} style={{ background: "#f3f2f1" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Authentication</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AuthenticationMenu />
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={true} style={{ background: "#f3f2f1" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Diagrams</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true} style={{ background: "#f3f2f1" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Resources</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Toolboxes />
        </AccordionDetails>
      </Accordion>
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
    </div>
  );
};

export default DiagramMenu;
