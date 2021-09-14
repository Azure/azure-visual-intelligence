import React from "react";
import Toolboxes from "./toolboxes/Toolboxes";
import CytoScape from "./diagram/Cytoscape";
import DiagramHeader from "./diagramHeader/DiagramHeader";
import { Grid } from "@material-ui/core";

const DiagramEcosystem = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      style={{ height: "100vh", background: "#f3f2f1" }}
    >
      <Grid item style={{ height: "10vh" }}>
        <DiagramHeader />
      </Grid>
      <Grid item style={{ height: "90vh" }}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          style={{ height: "90vh" }}
        >
          <Grid
            item
            xs={2}
            style={{
              height: "90vh",
            }}
          >
            <Toolboxes />
          </Grid>
          <Grid
            item
            xs={10}
            style={{
              height: "90vh",
              width: "100%",
            }}
          >
            <CytoScape />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default DiagramEcosystem;
