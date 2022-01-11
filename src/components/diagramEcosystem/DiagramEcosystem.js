import React from "react";
import Toolboxes from "./toolboxes/Toolboxes";
import Graph from "./diagram/Graph";
import DetailPan from "./detailPan/DetailPan";
import DiagramHeader from "./diagramHeader/DiagramHeader";

import {
  IconButton,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const DiagramEcosystem = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      style={{ height: "100vh", background: "#ffffff" }}
    >
      <Grid
        item
        style={{
          height: "10vh",
          padding: "5px 20px 5px 20px",
        }}
      >
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
            xs={10}
            style={{
              height: "90vh",
              width: "100%",
            }}
          >
            <Graph />
          </Grid>
          <Grid
            item
            xs={2}
            style={{
              height: "100%",
              padding: "0px 20px 5px 0px",
            }}
          >
            <DetailPan />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default DiagramEcosystem;
