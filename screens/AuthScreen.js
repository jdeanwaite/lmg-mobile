import React from "react";
import { I18n, Logger } from "aws-amplify";
import { AmplifyMessageMapEntries } from "aws-amplify-react-native";
import AuthService from "../api/AuthService";

const logger = new Logger("AuthPage");

// eslint-disable-next-line react/require-render-return
export default class AuthScreen extends React.Component {
  state = {
    error: null // eslint-disable-line react/no-unused-state
  };

  onAuthStateChange = (state, data = null) => {
    AuthService.setAuthState(state, data);
  };

  error = err => {
    logger.debug(err);

    let msg = "";
    if (typeof err === "string") {
      msg = err;
    } else if (err.message) {
      msg = err.message;
    } else {
      msg = JSON.stringify(err);
    }

    const map = MessageMap;
    msg = typeof map === "string" ? map : map(msg);
    this.setState({ error: msg }); // eslint-disable-line react/no-unused-state
  };

  render() {
    throw new Error("Render not implemented.");
  }
}

const MessageMap = message => {
  const match = AmplifyMessageMapEntries.filter(entry =>
    entry[1].test(message)
  );
  if (match.length === 0) {
    return message;
  }

  const entry = match[0];
  const msg = entry.length > 2 ? entry[2] : entry[0];

  return I18n.get(entry[0], msg);
};
