import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";
import ScriptureGroup from "../components/ScriptureGroup";

export default class ScripturesScreen extends Component {
  static navigationOptions = {
    title: "Scriptures"
  };

  render() {
    const { scriptureGroups } = this.props.navigation.state.params.principle;
    return (
      <ScrollView style={styles.container}>
        {scriptureGroups &&
          scriptureGroups.map(sg => (
            <ScriptureGroup key={sg.id} scriptureGroup={sg} />
          ))}
        {!scriptureGroups && (
          <Text>There are no scriptures for this section.</Text>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 11,
    flex: 1
  }
});
