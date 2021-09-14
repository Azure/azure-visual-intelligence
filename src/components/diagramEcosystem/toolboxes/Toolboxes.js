import React from "react";
import AzureExistingResourcesList from "./azureexistingresourceslist/AzureExistingResourcesList";
import CommonResourcesList from "./CommonResourcesList";
import AzureResourcesList from "./AzureResourcesList";

import { Grid } from "@material-ui/core";

const Toolboxes = () => {
  return (
    <Grid container direction="column" justifyContent="space-between">
      <Grid item>
        <AzureExistingResourcesList />
      </Grid>
      <Grid item>
        <CommonResourcesList />
      </Grid>
      <Grid item>
        <AzureResourcesList />
      </Grid>
    </Grid>
  );
};
export default Toolboxes;
