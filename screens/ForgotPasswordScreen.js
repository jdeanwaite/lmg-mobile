import React from "react";
import { View, Text, Item, Input, Button, Content } from "native-base";
import { Auth, I18n, Logger } from "aws-amplify";
import AuthScreen from "./AuthScreen";

const logger = new Logger("ForgotPassword");

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

export default class ForgotPasswordScreen extends AuthScreen {
  state = {
    delivery: null,
    email: null,
    code: null,
    password: null
  };

  send = () => {
    const { email } = this.state;
    if (!email) {
      this.error("Email cannot be empty");
      return;
    }
    Auth.forgotPassword(email)
      .then(data => {
        logger.debug(data);
        this.setState({ delivery: data.CodeDeliveryDetails });
      })
      .catch(err => this.error(err));
  };

  submit = () => {
    const { email, code, password } = this.state;
    Auth.forgotPasswordSubmit(email, code, password)
      .then(data => {
        logger.debug(data);
        this.onAuthStateChange("signIn");
      })
      .catch(err => this.error(err));
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
        <Button
          block
          primary
          disabled={!this.state.email}
          onPress={this.send}
          style={styles.button}
        >
          <Text>Submit</Text>
        </Button>
      </View>
    );
  }

  submitBody() {
    return (
      <View>
        <Item>
          <Input
            placeholder="Confirmation Code"
            value={this.state.code}
            onChangeText={text => this.setState({ code: text })}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Item>
        <Item>
          <Input
            placeholder="New Password"
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
        </Item>
        <Button
          block
          primary
          onPress={this.submit}
          disabled={!this.state.code || !this.state.password}
          style={styles.button}
        >
          <Text>Submit</Text>
        </Button>
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
