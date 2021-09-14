import React from "react";
import AzureExistingResourcesList from "./azureexistingresourceslist/AzureExistingResourcesList";
import CommonResourcesList from "./CommonResourcesList";
import AzureResourcesList from "./AzureResourcesList";

import { Grid, Typography } from "@material-ui/core";

const Toolboxes = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      wrap="nowrap"
      style={{ height: "inherit", overflow: "auto" }} // --> add scrollbar when overflow }}
    >
      <Grid item>
        <Typography variant="h5">Toolboxes</Typography>
      </Grid>
      <Grid item style={{ width: "100%" }}>
        <AzureExistingResourcesList />
      </Grid>
      <Grid item style={{ width: "100%" }}>
        <CommonResourcesList />
      </Grid>
      <Grid item style={{ width: "100%" }}>
        <AzureResourcesList />
      </Grid>
    </Grid>
  );
};
export default Toolboxes;
