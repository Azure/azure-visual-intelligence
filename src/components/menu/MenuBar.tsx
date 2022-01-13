import React from "react";
import DiagramMenu from "./diagramMenu/DiagramMenu";
import ResourcesMenu from "./resourcesMenu/ResourcesMenu";
import DisplayMenu from "./displayMenu/DisplayMenu";
import AuthenticationMenu from "./authenticationMenu/AuthenticationMenu";
import SettingsMenu from "./settingsMenu/SettingsMenu";
import { IconButton, Typography, Divider, Grid } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const MenuBar = (props: any) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      style={{
        height: "100vh",
        background: "#f3f2f1",
        padding: "0px 0px 0px 0px",
      }}
    >
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <IconButton onClick={() => props.toggleSideBarRef()}>
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  style={{
                    ...(!props.sideBarMinimized && {
                      display: "none",
                    }),
                    ...(props.sideBarMinimized && {
                      display: "block",
                    }),
                  }}
                >
                  Azure Visual Intelligence
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Divider />
          </Grid>
          <Grid
            item
            style={{
              ...(!props.sideBarMinimized && {
                display: "none",
              }),
              ...(props.sideBarMinimized && {
                display: "block",
              }),
            }}
          >
            <AuthenticationMenu />
          </Grid>

          <Grid
            item
            style={{
              ...(!props.sideBarMinimized && {
                display: "none",
              }),
              ...(props.sideBarMinimized && {
                display: "block",
              }),
            }}
          >
            <DiagramMenu />
          </Grid>
          <Grid
            item
            style={{
              ...(!props.sideBarMinimized && {
                display: "none",
              }),
              ...(props.sideBarMinimized && {
                display: "block",
              }),
            }}
          >
            <ResourcesMenu />
          </Grid>
          <Grid
            item
            style={{
              ...(!props.sideBarMinimized && {
                display: "none",
              }),
              ...(props.sideBarMinimized && {
                display: "block",
              }),
            }}
          >
            <DisplayMenu />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        style={{
          ...(!props.sideBarMinimized && {
            display: "none",
          }),
          ...(props.sideBarMinimized && {
            display: "block",
          }),
        }}
      >
        <SettingsMenu />
      </Grid>
    </Grid>
  );
};
export default MenuBar;
