import React from "react";
import { Auth, Logger, I18n } from "aws-amplify";
import { Content, Item, Input, Text, View } from "native-base";
import AuthScreen from "./AuthScreen";
import RoundedButton from "../components/RoundedButton";

const logger = new Logger("ConfirmSignUp");

const Footer = props => {
  const { onAuthStateChange } = props;
  return (
    <View style={styles.footer}>
      <RoundedButton clear onPress={() => onAuthStateChange("signIn")}>
        {I18n.get("Back to Sign In")}
      </RoundedButton>
      <RoundedButton clear onPress={props.resend}>
        Resend Code
      </RoundedButton>
    </View>
  );
};

export default class ConfirmSignUpScreen extends AuthScreen {
  static navigationOptions = {
    title: "Confirm Email"
  };

  state = {
    email: null,
    password: null,
    code: null,
    loading: false
  };

  constructor(props) {
    super(props);
    const { authData } = props.navigation.state.params || {};
    const { email, password } = authData || {};
    this.state.email = email || null;
    this.state.password = password || null;
  }

  confirm = async () => {
    const { email, code, password } = this.state;
    this.setState({ loading: true });
    logger.debug(`Confirm Sign Up for ${email}`);
    try {
      await Auth.confirmSignUp(email, code);
      this.onAuthStateChange("signedUp", email);
      if (password) {
        await this.signIn();
      }
    } catch (err) {
      this.setState({ loading: false });
      this.error(err);
    }
  };

  checkContact = async user => {
    try {
      const data = await Auth.verifiedContact(user);
      logger.debug("verified user attributes", data);
      if (data.verified) {
        this.onAuthStateChange("signedIn", user);
      } else {
        const userWithData = Object.assign({}, user, data);
        this.onAuthStateChange("verifyContact", userWithData);
      }
    } catch (err) {
      console.log("Unable to check contact upon signup -> signin");
    }
  };

  signIn = async () => {
    const { email, password } = this.state;
    logger.debug(`Sign In for ${email}`);
    this.setState({ loading: true });
    try {
      const user = await Auth.signIn(email.toLowerCase().trim(), password);
      this.setState({ loading: false });
      logger.debug(user);
      if (user.challengeName === "SMS_MFA") {
        this.onAuthStateChange("confirmSignIn", user);
      } else if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
        logger.debug("require new password", user.challengeParam);
        this.onAuthStateChange("requireNewPassword", user);
      } else {
        await this.checkContact(user);
      }
    } catch (err) {
      this.setState({ loading: false });
      this.error(err);
    }
  };

  resend = () => {
    const { email } = this.state;
    this.setState({ loading: true });
    logger.debug(`Resend Sign Up for ${email}`);
    Auth.resendSignUp(email)
      .then(() => {
        this.setState({ loading: false });
        logger.debug("code sent");
      })
      .catch(err => {
        this.setState({ loading: false });
        this.error(err);
      });
  };

  render() {
    return (
      <Content padder>
        <Item>
          <Input
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />
        </Item>
        <Item>
          <Input
            placeholder="Confirmation Code"
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.code}
            onChangeText={text => this.setState({ code: text })}
          />
        </Item>
        <RoundedButton
          block
          loading={this.state.loading}
          onPress={this.confirm}
          style={styles.confirm}
        >
          Confirm
        </RoundedButton>
        {this.state.error && (
          <Text style={styles.error}>{this.state.error}</Text>
        )}
        <Footer
          onAuthStateChange={this.onAuthStateChange}
          resend={this.resend}
        />
      </Content>
    );
  }
}

const styles = {
  confirm: {
    marginTop: 16
  },
  footer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: 16
  }
};
