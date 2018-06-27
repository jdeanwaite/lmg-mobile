import React from "react";
import { Auth, Logger } from "aws-amplify";
import { StyleSheet } from "react-native";
import { Container, Content, Item, Input, View, Text } from "native-base";
import AuthScreen from "./AuthScreen";
import RoundedButton from "../components/RoundedButton";
import Colors from '../constants/Colors'

const logger = new Logger("SignIn");

export default class SignInScreen extends AuthScreen {
  static navigationOptions = {
    title: "Sign in",
    headerStyle: {
      elevation: 0,
      backgroundColor: Colors.tintColor
    }
  };

  state = {
    username: null,
    password: null,
    error: null,
    loading: false
  };

  componentDidMount() {
    console.log("Did mount");
    const { params } = this.props.navigation.state || {};
    const email = (params && params.authData) || null;
    console.log('Email', email);
    if (email && typeof email === "string") {
      this.setState({ email: email });
    }
  }

  checkContact = user => {
    Auth.verifiedContact(user).then(data => {
      logger.debug("verified user attributes", data);
      if (data.verified) {
        this.onAuthStateChange("signedIn", user);
      } else {
        const userWithData = Object.assign({}, user, data);
        this.onAuthStateChange("verifyContact", userWithData);
      }
    });
  };

  signIn = () => {
    const { username, password } = this.state;
    logger.debug(`Sign In for ${username}`);
    this.setState({ loading: true });
    Auth.signIn(username.toLowerCase().trim(), password)
      .then(user => {
        this.setState({ loading: false });
        logger.debug(user);
        if (user.challengeName === "SMS_MFA") {
          this.onAuthStateChange("confirmSignIn", user);
        } else if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
          logger.debug("require new password", user.challengeParam);
          this.onAuthStateChange("requireNewPassword", user);
        } else {
          this.checkContact(user);
        }
      })
      .catch(err => {
        this.setState({ loading: false });
        this.error(err);
      });
  };

  render() {
    return (
      <Container>
        <Content padder contentContainerStyle={{ flex: 1, width: "100%" }}>
          <View>
            <Item>
              <Input
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
                value={this.state.username}
                onChangeText={text => this.setState({ username: text })}
              />
            </Item>
            <Item>
              <Input
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus
                secureTextEntry
                value={this.state.password}
                onChangeText={text => this.setState({ password: text })}
              />
            </Item>
          </View>
          <View style={{ paddingTop: 16 }}>
            <RoundedButton
              block
              onPress={this.signIn}
              disabled={!this.state.username || !this.state.password}
              loading={this.state.loading}
            >
              Sign In
            </RoundedButton>
          </View>
          {this.state.error && (
            <Text style={styles.error}>{this.state.error}</Text>
          )}
          <View style={styles.footer}>
            <RoundedButton
              clear
              onPress={() => this.onAuthStateChange("signUp")}
              disabled={this.state.loading}
            >
              Create Account
            </RoundedButton>
            <RoundedButton
              clear
              onPress={() => this.onAuthStateChange("forgotPassword")}
              disabled={this.state.loading}
            >
              Forgot Password?
            </RoundedButton>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  error: {
    marginTop: 16,
    color: "red",
    textAlign: "center"
  },
  footer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

// const mapStateToProps = () => ({});
//
// const mapDispatchToProps = dispatch => ({
//   updateAuthState: (authState, authData = null) =>
//     dispatch(updateAuthState(authState, authData))
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
