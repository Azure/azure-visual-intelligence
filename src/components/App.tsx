import React from "react";
import MenuBar from "./menubar/MenuBar";
import Welcome from "./Welcome";
import Graph from "./graph/Graph";
import ErrorMessage from "../ErrorMessage";
import "office-ui-fabric-react/dist/css/fabric.css";

const App = () => {
  return (
    <div className="ms-Grid" dir="ltr">
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg2">
          <MenuBar />
        </div>
        <div className="ms-Grid-col ms-sm6 ms-md8 ms-lg10">
          <Welcome />
        </div>
      </div>
    </div>
  );
};

export default App;
