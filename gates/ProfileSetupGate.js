import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Auth, Logger } from "aws-amplify/lib/index";

const logger = new Logger("ProfileSetupGate");

export default class ProfileSetupGate extends Component {
  static navigationOptions = {
    title: ""
  };

  constructor(props) {
    super(props);
    this.checkProfileStatus();
  }

  checkProfileStatus = () => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        logger.info('got user:', user);
      })
      .catch(err => {
        // this.setState({ authState: "signIn", authData: null });
        this.props.navigation.state.params.onAuthStateChange("signedOut", null);
        logger.error(err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
