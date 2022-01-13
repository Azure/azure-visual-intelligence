import React from "react";
import AzureExistingResourcesList from "./azureexistingresourceslist/AzureExistingResourcesList";
import { Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ResourcesMenu = () => {
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
