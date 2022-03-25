import React from "react";
import { useDispatch } from "react-redux";
import AzureExistingResourcesList from "./azureexistingresourceslist/AzureExistingResourcesList";
import { Typography, Button } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ResourcesMenu = () => {
  const dispatch = useDispatch();
  const handleClearDiagram = (event: any) => {
    dispatch({
      type: "CLEAR_DIAGRAM",
    });
  };

  return (
    <Accordion defaultExpanded={true} style={{ background: "#f3f2f1" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3a-content"
        id="panel3a-header"
      >
        <Typography>Resources</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <AzureExistingResourcesList />
      </AccordionDetails>
    </Accordion>
  );
};

export default ResourcesMenu;
