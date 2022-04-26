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