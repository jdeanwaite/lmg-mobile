import React from "react";
import { View, Text, Item, Input, Content } from "native-base";
import { Auth, I18n, Logger } from "aws-amplify";
import AuthScreen from "./AuthScreen";
import RoundedButton from '../components/RoundedButton'

const logger = new Logger("RequireNewPassword");

const Footer = props => {
  const { onAuthStateChange } = props;
  return (
    <View style={styles.footer}>
      <RoundedButton clear onPress={() => onAuthStateChange("signIn")}>
        {I18n.get("Back to Sign In")}
      </RoundedButton>
    </View>
  );
};

export default class RequireNewPasswordScreen extends AuthScreen {
  state = {
    password: null,
    loading: false
  };

  change = () => {
    const user = this.props.navigation.state.params.authData;
    const { password } = this.state;
    console.log(`Require new password for ${user}`);
    Auth.completeNewPassword(user, password)
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
          <RoundedButton
            block
            loading={this.state.loading}
            disabled={!this.state.password}
            onPress={this.change}
            style={styles.button}
          >
            Change Password
          </RoundedButton>
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
