import React from "react";
import MenuBar from "./menubar/MenuBar";
import ResourcesList from "./resourceslist/ResourcesList";
import CytoScape from "./diagram/Cytoscape";
import { Grid } from "@material-ui/core";

const App = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="stretch"
      style={{ height: "100vh" }}
    >
      <Grid item xs={2}>
        <MenuBar />
      </Grid>
      <Grid
        item
        xs={2}
        style={{
          height: "100vh",
        }}
      >
        <ResourcesList />
      </Grid>
      <Grid
        item
        xs={8}
        style={{
          height: "100vh",
          width: "100%",
        }}
      >
        <CytoScape />
      </Grid>
    </Grid>
  );
};

export default App;
