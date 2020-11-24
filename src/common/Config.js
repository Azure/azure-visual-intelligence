export const config = {
    appId: "2ad0e3b2-8a7a-4b23-b670-0975771be43a",
    authority:
      "https://login.microsoftonline.com/2b0d1330-312c-497a-a034-f2374ee0be2a",
    redirectUri: "http://localhost:3000",
    scopes: [
      "https://graph.microsoft.com/user.read",
      "https://graph.microsoft.com/calendars.read",
    ],
    argscopes:[
      "https://management.core.windows.net/user_impersonation",
    ],
    storageAccount: "https://demostorageaccount.blob.core.windows.net",
  };
