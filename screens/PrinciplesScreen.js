import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import { Query } from "react-apollo";
import LessonQuery from "../queries/LessonQuery";
import LoadingScreen from "./LoadingScreen";
import PrincipleList from "../components/PrincipleList";

export default class PrinciplesScreen extends Component {
  static navigationOptions = {
    title: "Principles",
  };

  render() {
    const { lessonId } = this.props.navigation.state.params || {};
    if (!lessonId) {
      this.props.navigation.pop();
      return null;
    }
    console.log("lessonId", lessonId);
    return (
      <Query
        query={LessonQuery}
        variables={{ id: lessonId }}
        fetchPolicy="cache-first"
      >
        {({ data, loading, error }) => {
          if (loading) {
            return <LoadingScreen />;
          } else if (error) {
            console.log("error", error);
            return <Text>An error occurred.</Text>;
          } else {
            return (
              <PrincipleList
                lesson={data.lesson}
                onPrincipleSelected={this.navigateToPrinciple}
              />
            );
          }
        }}
      </Query>
    );
  }

  navigateToPrinciple = principle => {
    this.props.navigation.navigate("Principle", {
      title: principle.name,
      principle
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
