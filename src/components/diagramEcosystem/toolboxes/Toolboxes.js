import React from "react";
import AzureExistingResourcesList from "./azureexistingresourceslist/AzureExistingResourcesList";
import CommonResourcesList from "./CommonResourcesList";
import AzureResourcesList from "./AzureResourcesList";

import { Grid, Typography, Box } from "@mui/material";

const Toolboxes = () => {
  return <AzureExistingResourcesList />;
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
