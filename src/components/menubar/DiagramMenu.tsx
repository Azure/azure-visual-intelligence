import React from "react";
import {
  IStyleSet,
  Label,
  ILabelStyles,
  Pivot,
  PivotItem,
} from "@fluentui/react";
import { useIsAuthenticated } from "@azure/msal-react";

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

const DiagramMenu = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Pivot>
      <PivotItem headerText="Samples">
        <Label styles={labelStyles}>3 tier application</Label>
      </PivotItem>
      {isAuthenticated ? (
        <PivotItem headerText="My Diagrams">
          {" "}
          <Label styles={labelStyles}>Infra</Label>{" "}
        </PivotItem>
      ) : (
        <></>
      )}
    </Pivot>
  );
};

export default DiagramMenu;
