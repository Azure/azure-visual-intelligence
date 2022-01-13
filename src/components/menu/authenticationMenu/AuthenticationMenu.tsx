import React from "react";
//UI

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useIsAuthenticated } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../../common/Config";
import { useSelector } from "react-redux";
//UI
import { Button, Typography, Grid, Alert } from "@mui/material";
//Icons
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const AuthenticationMenu = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const username = useSelector((state: any) => state.user.account.username);

  if (isAuthenticated) {
    return (
      <Accordion defaultExpanded={true} style={{ background: "#f3f2f1" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Authentication</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="body1">{username}</Typography>
            </Grid>
            <Grid item>
              <Button
                startIcon={<ExitToAppIcon />}
                onClick={() =>
                  instance.logoutPopup({
                    postLogoutRedirectUri: "/",
                    mainWindowRedirectUri: "/",
                  })
                }
              >
                Sign out
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  } else {
    return (
      <Accordion defaultExpanded={true} style={{ background: "#f3f2f1" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Authentication</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {" "}
          <Grid container direction="column">
            <Grid item>
              <Alert severity="warning">
                You are currently using a sample account. Sign in to access your
                own data.
              </Alert>
            </Grid>

            <Grid item>
              <Button
                startIcon={<PersonIcon />}
                onClick={() => instance.loginPopup(loginRequest)}
              >
                Sign in
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
};

export default AuthenticationMenu;
