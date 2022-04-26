import React from "react";
import MenuBar from "./menu/MenuBar";
import DiagramEcosystem from "./diagramEcosystem/DiagramEcosystem";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";

const App = () => {
  const [open, setOpen] = React.useState(true);
  const toggleSideBar = () => {
    setOpen(!open);
  };

  const sideBarMax = 350;
  const sideBarMin = 55;

  //Initialize config
  const dispatch = useDispatch();
  dispatch({type: "LOAD_CONFIG"});


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
          width: open ? `${sideBarMax}px` : `${sideBarMin}px`,
        }}
      >
        <MenuBar toggleSideBarRef={toggleSideBar} sideBarMinimized={open} />
      </Grid>
      <Grid
        item
        style={{
          height: "100vh",
          width: open
            ? `calc(100% - ${sideBarMax}px)`
            : `calc(100% - ${sideBarMin}px)`,
        }}
      >
        <DiagramEcosystem />
      </Grid>
    </Grid>
  );
};

export default App;
/*          ...(open && {
            width: `calc(100% - ${sideBarMax}px)`,
          }),
          ...(!open && {
            width: `calc(100% - ${sideBarMin}px)`,
          }),*/
