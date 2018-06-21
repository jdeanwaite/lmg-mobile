import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";
import MarkdownViewer from "../components/MarkdownViewer";
import Colors from "../constants/Colors";
import RoundedButton from "../components/RoundedButton";

export default class PracticeTeachingInstructionsScreen extends Component {
  static navigationOptions = {
    title: "Practice Teaching"
  };

  render() {
    const {
      pointsToTeachMarkdown
    } = this.props.navigation.state.params.principle;

    if (!pointsToTeachMarkdown) {
      const placeholderInstructions = `There are not yet teaching points added for this principle. Check back later!`;
      return <MarkdownViewer markdown={placeholderInstructions} />;
    }

    const markdown = `# Practice teaching with the following points in mind
${pointsToTeachMarkdown}
`
    return (
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.container}
      >
        <MarkdownViewer markdown={markdown} />
        <RoundedButton
          style={styles.button}
          block
          onPress={this.beginPracticeTeaching}
        >
          Begin recording
        </RoundedButton>
      </ScrollView>
    );
  }

  beginPracticeTeaching = () => {
    const { principle } = this.props.navigation.state.params;
    this.props.navigation.navigate("PracticeTeaching", { principle });
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  contentContainer: {
    padding: 11
  },
  step: {
    fontSize: 20,
    color: "#fff",
    padding: 11,
    backgroundColor: Colors.tintColorLight
  },
  button: {
    marginTop: 16
  }
});
