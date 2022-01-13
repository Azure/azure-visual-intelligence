import React from "react";

//UI
import { Typography } from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SettingsMenu = () => {
  return (
    <Accordion style={{ background: "#f3f2f1" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Advanced Settings</Typography>
      </AccordionSummary>
      <AccordionDetails></AccordionDetails>
    </Accordion>
  );
};

export default SettingsMenu;
