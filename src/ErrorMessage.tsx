// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// <ErrorMessageSnippet>
import React from "react";
import {
  MessageBar,
  MessageBarType,
} from '@fluentui/react';

interface ErrorMessageProps {
  debug: string;
  message: string;
}

export default class ErrorMessage extends React.Component<ErrorMessageProps> {
  render() {
    let debug = null;
    if (this.props.debug) {
      debug = (
        <pre className="alert-pre border bg-light p-2">
          <code>{this.props.debug}</code>
        </pre>
      );
    }
    return (
      <MessageBar
      messageBarType={MessageBarType.error}
      isMultiline={false}
      dismissButtonAriaLabel="Close"
    >
      {this.props.message}, {debug}
    </MessageBar>
    );
  }
}
// </ErrorMessageSnippet>