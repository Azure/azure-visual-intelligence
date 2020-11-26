// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as msal from "msal";
import React from "react";
import { UserAgentApplication } from "msal";
import { AccessToken, GetTokenOptions } from "@azure/core-http";

import { config } from "../../common/Config";
import { getUserDetails } from "./azgraph";
import { azGetResources } from "./azarm";

export interface AuthComponentProps {
  error: any;
  isAuthenticated: boolean;
  user: {
    displayName: string,
    email: string,
    subscriptions : any[],
  };
  login: Function;
  logout: Function;
  refreshResources:Function;
  getAccessToken: Function;
  getToken: Function;
  setError: Function;
}

interface AuthProviderState {
  error: any;
  isAuthenticated: boolean;
  user: any;
}

export default function withAuthProvider<
  T extends React.Component<AuthComponentProps>
>(
  WrappedComponent: new (props: AuthComponentProps, context?: any) => T
): React.ComponentClass {
  return class extends React.Component<any, AuthProviderState> {
    private userAgentApplication: UserAgentApplication;

    constructor(props: any) {
      super(props);
      this.state = {
        error: null,
        isAuthenticated: false,
        user: {},
      };

      // Initialize the MSAL application object
      this.userAgentApplication = new UserAgentApplication({
        auth: {
          clientId: config.appId,
          redirectUri: config.redirectUri,
          authority: config.authority,
        },
        cache: {
          cacheLocation: "sessionStorage",
          storeAuthStateInCookie: true,
        },
      });
    }

    componentDidMount() {
      // If MSAL already has an account, the user
      // is already logged in
      var account = this.userAgentApplication.getAccount();

      if (account) {
        // Enhance user object with data from Graph
        this.getUserProfile();
      }
    }

    render() {
      return (
        <WrappedComponent
          login={() => this.login()}
          logout={() => this.logout()}
          refreshResources={() => this.refreshResources()}
          getAccessToken={(scopes: string[]) => this.getAccessToken(scopes)}
          getToken={(scopes: string[]) => this.getToken(scopes)}
          setError={(message: string, debug: string) =>
            this.setErrorMessage(message, debug)
          }
          {...this.props}
          {...this.state}
        />
      );
    }

    async login() {
      try {
        // Login via popup
        await this.userAgentApplication.loginPopup({
          scopes: config.scopes,
          prompt: "select_account",
        });
        // After login, get the user's profile
        await this.getUserProfile();
        await this.getResources();
      } catch (err) {
        this.setState({
          isAuthenticated: false,
          user: {},
          error: this.normalizeError(err),
        });
      }
    }

    async refreshResources(){
      try {
        await this.getResources();
      } catch (err) {
        this.setState({
          isAuthenticated: false,
          user: {},
          error: this.normalizeError(err),
        });
      }
    }

    logout() {
      this.userAgentApplication.logout();
    }

    async getAccessToken(scopes: string[]): Promise<string> {
      try {
        var silentResult = await this.userAgentApplication.acquireTokenSilent({
          scopes: scopes,
        });

        return silentResult.accessToken;
      } catch (err) {
        if (this.isInteractionRequired(err)) {
          var interactiveResult = await this.userAgentApplication.acquireTokenPopup(
            {
              scopes: scopes,
            }
          );

          return interactiveResult.accessToken;
        } else {
          throw err;
        }
      }
    }

    //test
    //added to comply with Storage api
    async getToken(
      scopes: string | string[],
      options?: GetTokenOptions
    ): Promise<AccessToken | null> {
      /*const { span } = createSpan(
        "InteractiveBrowserCredential-getToken",
        options
      );*/
      try {
        if (!this.userAgentApplication.getAccount()) {
          await this.login();
        }

        const authResponse = await this.acquireToken({
          scopes: Array.isArray(scopes) ? scopes : scopes.split(","),
        });

        if (authResponse) {
          return {
            token: authResponse.accessToken,
            expiresOnTimestamp: authResponse.expiresOn.getTime(),
          };
        } else {
          return null;
        }
      } catch (err) {
        /* span.setStatus({
          code: CanonicalCode.UNKNOWN,
          message: err.message,
        });*/
        throw err;
      } finally {
        //span.end();
      }
    }

    private async acquireToken(
      authParams: msal.AuthenticationParameters
    ): Promise<msal.AuthResponse | undefined> {
      let authResponse: msal.AuthResponse | undefined;
      try {
        //logger.info("InteractiveBrowserCredential: attempting to acquire token silently");
        authResponse = await this.userAgentApplication.acquireTokenSilent(
          authParams
        );
      } catch (err) {
        if (err instanceof msal.AuthError) {
          switch (err.errorCode) {
            case "consent_required":
            case "interaction_required":
            case "login_required":
              /*logger.warning(
                `InteractiveBrowserCredential: authentication returned errorCode ${err.errorCode}`
              );*/
              break;
            default:
              // logger.warning(`InteractiveBrowserCredential: failed to acquire token: ${err}`);
              throw err;
          }
        }
      }

      let authPromise: Promise<msal.AuthResponse> | undefined;
      if (authResponse === undefined) {
        authPromise = this.userAgentApplication.acquireTokenPopup(authParams);
        authResponse = authPromise && (await authPromise);
      }
      return authResponse;
    }

    // <getUserProfileSnippet>
    async getUserProfile() {
      try {
        var accessToken = await this.getAccessToken(config.scopes);

        if (accessToken) {
          // Get the user's profile from Graph
          var user = await getUserDetails(accessToken);
          this.setState({
            isAuthenticated: true,
            user: {
              displayName: user.displayName,
              email: user.mail || user.userPrincipalName,
            },
            error: null,
          });
        }
      } catch (err) {
        this.setState({
          isAuthenticated: false,
          user: {},
          error: this.normalizeError(err),
        });
      }
    }
    // </getUserProfileSnippet>

    setErrorMessage(message: string, debug: string) {
      this.setState({
        error: { message: message, debug: debug },
      });
    }

    normalizeError(error: string | Error): any {
      var normalizedError = {};
      if (typeof error === "string") {
        var errParts = error.split("|");
        normalizedError =
          errParts.length > 1
            ? { message: errParts[1], debug: errParts[0] }
            : { message: error };
      } else {
        normalizedError = {
          message: error.message,
          debug: JSON.stringify(error),
        };
      }
      return normalizedError;
    }

    isInteractionRequired(error: Error): boolean {
      if (!error.message || error.message.length <= 0) {
        return false;
      }

      return (
        error.message.indexOf("consent_required") > -1 ||
        error.message.indexOf("interaction_required") > -1 ||
        error.message.indexOf("login_required") > -1
      );
    }

    async getResources() {
      try {
        var accessToken = await this.getAccessToken(config.argscopes);

        if (accessToken) {
          var subscriptions = await azGetResources(accessToken);
          this.setState({
            user: {
              ...this.state.user,
              subscriptions: subscriptions,
            },
            error: null,
          });
        }
      } catch (err) {
        this.setState({
          isAuthenticated: false,
          user: {},
          error: this.normalizeError(err),
        });
      }
    }
  };
}