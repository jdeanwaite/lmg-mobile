import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import Amplify from "aws-amplify";
import { Ionicons } from "@expo/vector-icons";
import awsExports from "./aws-exports";
import withStateProvider from "./providers/withStateProvider";
import AppAuthProvider from "./providers/AppAuthProvider";
import { Rehydrated } from "aws-appsync-react";
import { ApolloProvider } from "react-apollo";
import { apolloClient } from "./api/apolloClient";

Amplify.configure(awsExports);
Amplify.Logger.LOG_LEVEL = "INFO";

class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <ApolloProvider client={apolloClient}>
          <Rehydrated>
            <View style={styles.container}>
              {Platform.OS === "ios" && <StatusBar barStyle="light-content" />}
              <AppAuthProvider />
            </View>
          </Rehydrated>
        </ApolloProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        // require("./assets/images/robot-dev.png"),
        // require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        "Merriweather": require("./assets/fonts/Merriweather-Regular.ttf"),
      })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

const withState = withStateProvider(App);

export default withState;
