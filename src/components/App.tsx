import React from "react";
import MenuBar from "./menubar/MenuBar";
import DiagramEcosystem from "./diagramEcosystem/DiagramEcosystem";
import { Grid } from "@mui/material";

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
        xs={10}
        style={{
          height: "100vh",
        }}
      >
        <DiagramEcosystem />
      </Grid>
    </Grid>
  );
};

export default App;
