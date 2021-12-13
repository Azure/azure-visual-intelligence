import React from "react";
import AuthenticationMenu from "./AuthenticationMenu";
import DiagramMenu from "./DiagramMenu";
import { Button, IconButton, Typography, Divider, Grid } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";

const MenuBar = (props: any) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      style={{
        height: "100vh",
        background: "#f3f2f1",
        padding: "0px 10px 10px 10px",
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

          <Grid item>
            <AuthenticationMenu />
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
            <DiagramMenu />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Button
          startIcon={<SettingsIcon />}
          onClick={() => console.log("settings")}
        >
          Settings
        </Button>
      </Grid>
    </Grid>
  );
};
export default MenuBar;
