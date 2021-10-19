import React from "react";
import MenuBar from "./menubar/MenuBar";
import DiagramEcosystem from "./diagramEcosystem/DiagramEcosystem";
import { Grid } from "@mui/material";

const App = () => {
  const [open, setOpen] = React.useState(true);
  const toggleSideBar = () => {
    console.log("rop");
    setOpen(!open);
  };

  const sideBarMax = 350;
  const sideBarMin = 55;

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="stretch"
      style={{ height: "100vh" }}
    >
      <Grid
        item
        style={{
          ...(open && {
            width: `${sideBarMax}px`,
          }),
          ...(!open && {
            width: `${sideBarMin}px`,
          }),
        }}
      >
        <MenuBar toggleSideBarRef={toggleSideBar} sideBarMinimized={open} />
      </Grid>
      <Grid
        item
        style={{
          height: "100vh",
          ...(open && {
            width: `calc(100% - ${sideBarMax}px)`,
          }),
          ...(!open && {
            width: `calc(100% - ${sideBarMin}px)`,
          }),
        }}
      >
        <DiagramEcosystem />
      </Grid>
    </Grid>
  );
};

export default App;
