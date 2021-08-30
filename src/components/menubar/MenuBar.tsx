import React from "react";
import {
  Stack,
  Separator,
  ISeparatorStyles,
  DefaultPalette,
  IStackTokens,
  IStackStyles,
  ActionButton,
  IStackItemStyles,
  Label,
} from "@fluentui/react";
import AuthenticationMenu from "./AuthenticationMenu";
import DiagramMenu from "./DiagramMenu";
import { Icon } from "@fluentui/react/lib/Icon";

const SettingsIcon = { iconName: "Settings" };
const GlobalNavIcon = { iconName: "GlobalNavButton" };

const topStackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.neutralLighter,
    marginTop: 10,
    margin: 0,
    padding: 8,
    height: "auto",
    align: "stretch",
    verticalFill: true,
  },
};

const separatorStyles: ISeparatorStyles = {
  content: {},
  root: [
    {
      //marginLeft: 10,
      //marginRight: 10,
      selectors: {
        "::before": {
          background: "black",
        },
      },
    },
  ],
};

const MenuBar = () => {
  return (
    <Stack verticalAlign="space-between" styles={topStackStyles}>
      <Stack>
        <ActionButton
          iconProps={GlobalNavIcon}
          text="Azure Visual Intelligence"
          onClick={() => console.log("Crop")}
        />
        <Separator styles={separatorStyles} />
        <AuthenticationMenu />
        <Separator styles={separatorStyles} />
        <DiagramMenu />
      </Stack>

      <ActionButton
        iconProps={SettingsIcon}
        text="Settings"
        onClick={() => console.log("settings")}
      />
    </Stack>
  );
};
export default MenuBar;
