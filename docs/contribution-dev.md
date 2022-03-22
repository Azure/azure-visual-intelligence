## Dev environment setup

### Prerequisites

- Azure AD admin to create app registrations
- Visual Studio Code - Node.js latest
- Typescript latest

### Steps

1. Create an App registration
   - SPA with Access tokens and ID tokens
   - Redirect URI : http://localhost:3000
   - Permissions :
     - delegated Azure Service Management / user_impersonation
     - delegated Microsoft Graph / Calendars.Read
     - delegated Microsoft Graph / User.Read
     - delegated Microsoft Graph / openid
     - delegated Microsoft Graph / profile
1. Retrieve the code from Github https://github.com/Azure/azure-visual-intelligence
1. Open in Visual Studio Code
1. Copy-paste /src/common/Config.env.ts to /src/common/Config._dev_.ts
1. Edit /src/common/Config._dev_.ts and fill in those 3 placeholders :
   ```
   clientId: "**_APP_ID_**",
   authority: "https://login.microsoftonline.com/___TENANT_ID___",
   redirectUri: "**_REDIRECT_URI_**",
   ```
1. Open a terminal and run `npm install`
1. Run `npm start`

## Contribute

Look at the issues here :
https://github.com/Azure/azure-visual-intelligence/issues
