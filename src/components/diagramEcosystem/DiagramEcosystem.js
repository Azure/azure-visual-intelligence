import React from "react";
import Graph from "./diagram/Graph";
import DetailPan from "./detailPan/DetailPan";

const DiagramEcosystem = () => {
  return (
    <div style={{ display: "flex", flexflow: "row nowrap", height: "100vh" }}>
      <div
        style={{
          height: "100vh",
          width: "80%",
          position: "relative",
        }}
      >
        <Graph />
      </div>

      <div
        style={{
          height: "100vh",
          width: "20%",
          position: "relative",
          background: "#f3f2f1",
        }}
      >
        <DetailPan />
      </div>
    </div>
  );
};
export default DiagramEcosystem;
/*
      <div
        style={{
          position: "absolute",
          left: "50%",
        }}
      >
        <Typography variant="h3">Mendacorp Architecture </Typography>
      </div>

      */
/*
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

      </Grid>
    </Grid>*/
/*
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

        */
