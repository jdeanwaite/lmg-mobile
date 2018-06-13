import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";

export default class StudyPromptsScreen extends Component {
  static navigationOptions = {
    title: "Study Prompts"
  };

  render() {
    const { reflectPrompts } = this.props.navigation.state.params.principle;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.instructions}>
          Answer the following prompts in your study journal:
        </Text>
        {reflectPrompts &&
          reflectPrompts.map((prompt, index) => (
            <Text key={index} style={styles.prompt}>
              {index + 1}. {prompt}
            </Text>
          ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    padding: 16
  },
  instructions: {
    fontSize: 18,
    marginBottom: 32
  },
  prompt: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 32
  }
});
