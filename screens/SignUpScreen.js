import React from "react";
import { View, Text, Item, Input, Content, Picker } from "native-base";
import { Auth, I18n, Logger } from "aws-amplify";
import { Platform } from "react-native";
import AuthScreen from "./AuthScreen";
import RoundedButton from "../components/RoundedButton";

const logger = new Logger("SignUp");

const Footer = props => {
  const { onAuthStateChange } = props;
  return (
    <View style={styles.footer}>
      <RoundedButton clear onPress={() => onAuthStateChange("confirmSignUp")}>
        {I18n.get("Confirm a Code")}
      </RoundedButton>
      <RoundedButton clear onPress={() => onAuthStateChange("signIn")}>
        {I18n.get("Sign In")}
      </RoundedButton>
    </View>
  );
};

export default class SignUpScreen extends AuthScreen {
  static navigationOptions = {
    title: 'Sign Up'
  }

  state = {
    email: null,
    password: null,
    error: null,
    loading: false
  };

  signUp = () => {
    const { email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      return this.error(new Error("Passwords do not match!"));
    }

    this.setState({ loading: true });

    logger.debug(`Sign Up for ${email}`);
    logger.debug(this.state);
    Auth.signUp({
      username: email.toLowerCase().trim(),
      password,
      attributes: {
        email: email.toLowerCase().trim()
      }
    })
      .then(data => {
        this.setState({ loading: false });
        logger.debug(data);
        this.onAuthStateChange("confirmSignUp", {email, password});
      })
      .catch(err => {
        this.setState({ loading: false });
        this.error(err);
      });
  };

  // updateGender = gender => {
  //   this.setState({ gender });
  // };

  render() {
    const disabled =
      !this.state.email ||
      // !this.state.lastName ||
      // !this.state.gender ||
      // !this.state.firstName ||
      !this.state.password;

    return (
      <Content padder>
        <Item>
          <Input
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />
        </Item>
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
        <Item>
          <Input
            placeholder="Confirm password"
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.confirmPassword}
            secureTextEntry
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
          />
        </Item>
        <View>
          <RoundedButton
            block
            disabled={disabled}
            loading={this.state.loading}
            style={styles.signUp}
            onPress={this.signUp}
          >
            Sign Up
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
  signUp: {
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
