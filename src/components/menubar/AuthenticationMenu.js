import React from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../common/Config";
import { useSelector } from "react-redux";
//UI
import { Alert } from "@material-ui/lab";
import { Button, Typography, Grid } from "@material-ui/core";
//Icons
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const AuthenticationMenu = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const username = useSelector((state) => state.user.account.username);

  if (isAuthenticated) {
    return (
      <Grid container direction="column">
        <Grid item>
          <Typography variant="body1">{username}</Typography>
        </Grid>
        <Grid item>
          <Button
            //variant="contained"
            //color="primary"
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
    );
  } else {
    return (
      <Grid container direction="column">
        <Grid item>
          <Grid container alignItems="center">
            <VpnKeyIcon />
            <Typography variant="body1"> Authentication</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Alert severity="warning">
            You are currently using a sample account. Sign in to access your own
            data.
          </Alert>
        </Grid>

        <Grid item>
          <Button
            //variant="contained"
            //color="primary"
            startIcon={<PersonIcon />}
            onClick={() => instance.loginPopup(loginRequest)}
          >
            Sign in to Azure Visual Intelligence
          </Button>
        </Grid>
      </Grid>
    );
  }
};

export default AuthenticationMenu;
