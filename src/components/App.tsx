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
const stackItemStyles: IStackItemStyles = {
  root: {
    alignItems: "center",
    background: DefaultPalette.themePrimary,
    //color: DefaultPalette.white,
    display: "flex",
    height: "100%",
    justifyContent: "center",
  },
};

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

/*    <div className="ms-Grid" dir="ltr">
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
          <MenuBar />
        </div>
        <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg2">
          <ResourcesList />
        </div>
        <div className="ms-Grid-col ms-sm5 ms-md5 ms-lg6">
          <Welcome />
        </div>
      </div>
    </div>
    */
