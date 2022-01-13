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
} from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

  return (
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
  );
};

export default DiagramMenu;
