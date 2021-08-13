import React from "react";
import {
  Stack,
  PrimaryButton,
  ActionButton,
  Label,
  MessageBar,
  MessageBarType,
  IStackTokens,
  IIconProps,
} from "@fluentui/react";
import { useIsAuthenticated } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../common/Config";
import { Icon } from "@fluentui/react/lib/Icon";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfileData } from "../../store/graphSlice";

const horizontalGapStackTokens = {
  childrenGap: 5,
  padding: 5,
};

const ContactIcon = { iconName: "Contact" };

const AuthenticationMenu = () => {
  const dispatch = useDispatch();
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const graphmail = useSelector((state) => state.graph.graphmail);

  if (isAuthenticated) {
    return (
      <Stack>
        <Label>{graphmail}</Label>
        <PrimaryButton
          text="Sign Out"
          onClick={() =>
            instance.logoutPopup({
              postLogoutRedirectUri: "/",
              mainWindowRedirectUri: "/",
            })
          }
        />
        <ActionButton
          iconProps={ContactIcon}
          text="Get Graph Data"
          onClick={() => dispatch(fetchProfileData())}
        />
      </Stack>
    );
  } else {
    return (
      <Stack>
        <Stack horizontal tokens={horizontalGapStackTokens}>
          <Icon iconName="Permissions" />
          <span> Authentication</span>
        </Stack>
        <MessageBar messageBarType={MessageBarType.warning} isMultiline={true}>
          {" "}
          You are currently using a sample account. Sign in to access your own
          data.
        </MessageBar>
        <ActionButton
          iconProps={ContactIcon}
          text="Sign in to Azure Visual Intelligence"
          onClick={() => instance.loginPopup(loginRequest)}
        />
      </Stack>
    );
  }
};

export default AuthenticationMenu;
