import React from "react";
import AzureExistingResourcesList from "./azureexistingresourceslist/AzureExistingResourcesList";
import CommonResourcesList from "./CommonResourcesList";
import AzureResourcesList from "./AzureResourcesList";

import { Grid, Typography, Box } from "@mui/material";

const Toolboxes = () => {
  return (
    <Box
      border={1}
      borderColor="#808080"
      style={{
        height: "inherit",
        overflow: "auto",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        wrap="nowrap"
        style={{
          height: "inherit",
          overflow: "auto",
          boxShadow: "2px 2px 4px 4px rgba(0, 0, 0, 0.2)",
        }} // --> add scrollbar when overflow }}
      >
        <Grid item>
          <Typography variant="h5">Toolboxes</Typography>
        </Grid>
        <Grid item style={{ width: "100%" }}>
          <Typography variant="h5" style={{ padding: "0 0 0 2px" }}>
            Azure
          </Typography>
        </Grid>
        <Grid item style={{ width: "100%" }}>
          <AzureExistingResourcesList />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Toolboxes;

/*
        <Grid item style={{ width: "100%" }}>
          <AzureResourcesList />
        </Grid>
                <Grid item style={{ width: "100%" }}>
          <CommonResourcesList />
        </Grid>
        */
