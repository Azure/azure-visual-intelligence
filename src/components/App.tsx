import React from "react";
import MenuBar from "./menubar/MenuBar";
import Welcome from "./Welcome";
import ResourcesList from "./resourceslist/ResourcesList";
import CytoScape from "./graph/Cytoscape";
import {
  DefaultPalette,
  Stack,
  IStackStyles,
  IStackTokens,
  IStackItemStyles,
} from "@fluentui/react";
//import Graph from "./graph/Graph";
//import ErrorMessage from "../ErrorMessage";
//import "office-ui-fabric-react/dist/css/fabric.css";

const stackStyles: IStackStyles = {
  root: {
    //background: DefaultPalette.themeTertiary,
    height: "100%",
    //align: "stretch",
    //verticalFill: true,
    //maxHeight: "inherit",
  },
};
/*const stackItemStyles: IStackItemStyles = {
  root: {
    alignItems: "center",
    background: DefaultPalette.themePrimary,
    //color: DefaultPalette.white,
    display: "flex",
    height: "100%",
    justifyContent: "center",
  },
};*/

// Tokens definition
const stackTokens: IStackTokens = {
  //childrenGap: 5,
  //padding: 10,
};

const App = () => {
  return (
    <Stack horizontal styles={stackStyles} tokens={stackTokens}>
      <MenuBar />
      <ResourcesList />
      <CytoScape />
    </Stack>
  );
};

export default App;
