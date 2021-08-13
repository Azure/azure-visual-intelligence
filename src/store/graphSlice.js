import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserDetails } from "../api/azure/azgraph";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../common/Config";

const initialState = {
  graph: [],
  mail: "",
  status: "idle",
  error: null,
};

export const fetchProfileData = createAsyncThunk(
  "graph/fetchProfileData",
  async () => {
    const msalInstance = new PublicClientApplication(msalConfig);
    const activeAccount = msalInstance.getActiveAccount(); // This will only return a non-null value if you have logic somewhere else that calls the setActiveAccount API
    const accounts = msalInstance.getAllAccounts();

    /*if (!activeAccount && accounts.length === 0) {
      /*
       * User is not signed in. Throw error or wait for user to login.
       * Do not attempt to log a user in outside of the context of MsalProvider
       
    }*/
    const request = {
      scopes: ["User.Read"],
      account: activeAccount || accounts[0],
    };
    const authResult = await msalInstance.acquireTokenSilent(request);

    const graphData = getUserDetails(authResult.accessToken);

    return graphData;
  }
);

const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProfileData.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProfileData.fulfilled]: (state, action) => {
      state.status = "succeeded";
      //state.graph.push(action.payload);
      state.mail = action.payload.mail;
    },
    [fetchProfileData.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      console.log(action.error);
    },
  },
});

export default graphSlice.reducer;
