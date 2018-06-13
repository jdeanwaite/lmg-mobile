import React from "react";
import { View, Text, Item, Input, Button, Content } from "native-base";
import { Auth, I18n, Logger } from "aws-amplify";
import AuthScreen from "./AuthScreen";

const logger = new Logger("RequireNewPassword");

const Footer = props => {
  const { onAuthStateChange } = props;
  return (
    <View style={styles.footer}>
      <Button transparent primary onPress={() => onAuthStateChange("signIn")}>
        <Text>{I18n.get("Back to Sign In")}</Text>
      </Button>
    </View>
  );
};

export default class RequireNewPasswordScreen extends AuthScreen {
  state = {
    password: null
  };

  change = () => {
    console.log("props", this.props);
    const user = this.props.navigation.state.params.authData;
    const { password } = this.state;
    logger.debug(`Require new password for ${user.username}`);
    Auth.completeNewPassword(user, password, {
      gender: "male",
      firstName: "Doe",
      lastName: "John"
    })
      .then(() => {
        if (user.challengeName === "SMS_MFA") {
          this.onAuthStateChange("confirmSignIn", user);
        } else {
          this.onAuthStateChange("signedIn");
        }
      })
      .catch(err => this.error(err));
  };

  render() {
    return (
      <Content padder>
        <Item>
          <Input
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.password}
            secureTextEntry
            onChangeText={text => this.setState({ password: text })}
          />
        </Item>
        <View>
          <Button
            block
            primary
            disabled={!this.state.password}
            onPress={this.change}
            style={styles.button}
          >
            <Text>Change Password</Text>
          </Button>
        </View>
        {this.state.error && (
          <Text style={styles.error}>{this.state.error}</Text>
        )}
        <Footer onAuthStateChange={this.onAuthStateChange} />
      </Content>
    );
  }
}

const styles = {
  button: {
    marginTop: 16
  },
  footer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  error: {
    color: "red",
    marginTop: 16,
    textAlign: "center"
  }
};
