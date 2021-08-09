import React, { useState } from "react";
import {
  Stack,
  PrimaryButton,
  ActionButton,
  MessageBar,
  MessageBarType,
  IStackTokens,
  IIconProps,
} from "@fluentui/react";
//import { RootState } from '../../store/store'
//import { useSelector, useDispatch } from 'react-redux'
//import { Counter } from '../Counter';
import { useIsAuthenticated } from "@azure/msal-react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../common/Config";
import { Icon } from "@fluentui/react/lib/Icon";
import { getUserDetails } from "../../api/azure/azgraph";

const horizontalGapStackTokens: IStackTokens = {
  childrenGap: 5,
  padding: 5,
};

const ContactIcon: IIconProps = { iconName: "Contact" };

const ProfileData = (props: any) => {
  console.log(props.graphData);

  return (
    <div id="profile-div">
      <p> {props.graphData.mail || props.graphData.userPrincipalName}</p>
    </div>
  );
};

const UserInfo = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  function RequestProfileData() {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        //callMsGraph(response.accessToken).then(response => setGraphData(response));
        getUserDetails(response.accessToken).then((response) =>
          setGraphData(response)
        );
      });
  }

  //CAREFUL AUTO LOOP
  //RequestProfileData();
  return <>{graphData ? <ProfileData graphData={graphData} /> : <></>}</>;
};
//<h5 >{graphData ? graphData.name : " test"} </h5>
//{graphData ? UserAvatar(graphData) : <></>}

const AuthenticationMenu = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return (
      <Stack>
        <UserInfo />
        <PrimaryButton
          text="Sign Out"
          onClick={() =>
            instance.logoutPopup({
              postLogoutRedirectUri: "/",
              mainWindowRedirectUri: "/",
            })
          }
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
