import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator
} from "react-native";

export default class LoadingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
