import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

export default class PrincipleScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state || {};
    const { title } = params || {};
    return {
      title: title || "",
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> page!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
