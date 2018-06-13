import React from "react";
import { View, Text, Item, Input, Content } from "native-base";
import { Auth, I18n, Logger } from "aws-amplify";
import AuthScreen from "./AuthScreen";
import RoundedButton from "../components/RoundedButton";

const logger = new Logger("ForgotPassword");

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

export default class ForgotPasswordScreen extends AuthScreen {
  state = {
    delivery: null,
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
    loading: false
  };

  send = () => {
    const { email } = this.state;
    if (!email) {
      this.error("Email cannot be empty");
      return;
    }
    this.setState({ loading: true });
    Auth.forgotPassword(email)
      .then(data => {
        logger.debug(data);
        this.setState({ delivery: data.CodeDeliveryDetails, loading: false });
      })
      .catch(err => this.error(err));
  };

  submit = () => {
    const { email, code, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      return this.error("Passwords do not match!");
    }
    this.setState({ loading: true });
    Auth.forgotPasswordSubmit(email, code, password)
      .then(data => {
        logger.debug(data);
        this.onAuthStateChange("signIn");
      })
      .catch(err => {
        this.error(err);
        this.setState({ loading: false });
      });
  };

  forgotBody() {
    return (
      <View>
        <Item>
          <Input
            placeholder="Enter Your Email"
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Item>
        <RoundedButton
          block
          loading={this.state.loading}
          disabled={!this.state.email}
          onPress={this.send}
          style={styles.button}
        >
          Submit
        </RoundedButton>
      </View>
    );
  }

  submitBody() {
    return (
      <View>
        <Item>
          <Input
            placeholder="Confirmation code"
            value={this.state.code}
            onChangeText={text => this.setState({ code: text })}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Item>
        <Item>
          <Input
            placeholder="New password"
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
        </Item>
        <Item>
          <Input
            placeholder="Confirm password"
            value={this.state.confirmPassword}
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
        </Item>
        <RoundedButton
          block
          loading={this.state.loading}
          onPress={this.submit}
          disabled={!this.state.code || !this.state.password}
          style={styles.button}
        >
          Submit
        </RoundedButton>
      </View>
    );
  }

  render() {
    return (
      <Content padder>
        {!this.state.delivery && this.forgotBody()}
        {this.state.delivery && this.submitBody()}
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
