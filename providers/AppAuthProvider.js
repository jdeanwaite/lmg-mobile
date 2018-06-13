import React from "react";
import { Auth, Logger } from "aws-amplify";
import RootNavigation from "../navigation/RootNavigation";
import { ActivityIndicator, View } from "react-native";
import NavigationService from "../api/NavigationService";
import AuthService from "../api/AuthService";

const logger = new Logger("AppAuthProvider");

export default class AppAuthProvider extends React.Component {
  state = {
    authState: "loading",
    authData: null
  };

  constructor(props) {
    super(props);
    AuthService.setAuthStateCallback(this.handleStateChange);
  }

  componentDidMount() {
    this.checkUser();
  }

  checkUser() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        const state = user ? "signedIn" : "signIn";
        // this.setState({ authState: state, authData: user });
        this.handleStateChange(state, user);
      })
      .catch(err => {
        // this.setState({ authState: "signIn", authData: null });
        this.handleStateChange("signIn", null);
        logger.error(err);
      });
  }

  // componentDidUpdate = (prevProps, prevState) => {
  //   const { authState, authData } = this.state || {};
  //   if (authState !== prevState.authState) {
  //     this.handleStateChange(authState, authData);
  //   }
  // };

  /**
   * Updates the authState in the Redux store.
   * @param {string} state
   * @param data
   */
  handleStateChange = (state, data) => {
    console.log("state change");
    logger.debug(`authenticator state change ${state}`);
    let computedState = state;

    if (state === "signedOut") {
      computedState = "signIn";
    }
    // this.props.updateAuthState(computedState);
    this.setState({
      authState: computedState,
      authData: data
    });
    console.log("navigating to:", mapAuthStateToAuthRouteName(computedState));
    NavigationService.navigate(mapAuthStateToAuthRouteName(computedState), {
      authData: data
    });
  };

  render() {
    console.log("rendering");
    if (this.state.authState === "loading") {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator
            screenProps={{ onAuthStateChange: this.handleStateChange }}
            animating
            color="rgba(0, 0, 0, .4)"
          />
        </View>
      );
    }
    return <RootNavigation />;
  }
}

// const mapStateToProps = state => ({
//   authState: state.authState,
//   authData: state.authData
// });

// const mapDispatchToProps = dispatch => ({
//   updateAuthState: (authState, authData = null) =>
//     dispatch(updateAuthState(authState, authData))
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(AppAuthProvider);

const mapAuthStateToAuthRouteName = authState => {
  switch (authState) {
    case "signIn":
      return "SignIn";
    case "signUp":
      return "SignUp";
    case "confirmSignUp":
      return "ConfirmSignUp";
    case "forgotPassword":
      return "ForgotPassword";
    case "requireNewPassword":
      return "RequireNewPassword";
    case "signedUp":
    case "signedIn":
      return "Main";
    case "loading":
      return "Loading";
    default:
      return "Loading";
  }
};
