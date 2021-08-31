import React from "react";
import MenuBar from "./menubar/MenuBar";
import ResourcesList from "./resourceslist/ResourcesList";
import CytoScape from "./graph/Cytoscape";
import { Grid } from "@material-ui/core";

const App = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      xs={12}
    >
      <Grid item>
        <MenuBar />
      </Grid>
      <Grid item>
        <ResourcesList />
      </Grid>
      <Grid item xs={3}>
        <span>toto</span>
        <CytoScape />
      </Grid>
    </Grid>
  );
};

export default App;
