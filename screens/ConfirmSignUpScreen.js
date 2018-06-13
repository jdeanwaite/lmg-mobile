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
    title: 'Confirm Email'
  }

  state = {
    email: null,
    code: null,
    loading: false
  };

  constructor(props) {
    super(props);
    this.state.email = props.navigation.state.params.authData || null;
  }

  confirm = () => {
    const { email, code } = this.state;
    this.setState({ loading: true });
    logger.debug(`Confirm Sign Up for ${email}`);
    Auth.confirmSignUp(email, code)
      .then(() => this.onAuthStateChange("signedUp", email))
      .catch(err => {
        this.setState({ loading: false });
        this.error(err);
      });
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
