import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator
} from "react-native";
import { Query } from "react-apollo";
import AllLessonsQuery from "../queries/AllLessonsQuery";
import LessonList from "../components/LessonList";
import LoadingScreen from "./LoadingScreen";
import AuthService from "../api/AuthService";
import { Auth } from "aws-amplify/lib/index";
import { isProfileComplete } from "../api/profile";

export default class LessonsScreen extends Component {
  static navigationOptions = {
    title: "Lessons"
  };

  componentDidMount = async () => {
    await this.checkProfileStatus();
  };

  checkProfileStatus = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const { attributes } = user || {};
      console.log("checking", attributes);
      if (!isProfileComplete(attributes)) {
        console.log("not complete");
        this.props.navigation.navigate("ProfileSetup");
      }
    } catch (err) {
      logger.error(err);
      AuthService.setAuthState("signedOut", null);
    }
  };

  render() {
    return (
      <Query query={AllLessonsQuery} fetchPolicy="cache-and-network">
        {({ data, loading, error }) => {
          if (
            loading &&
            (!data || !data.allLessons || !data.allLessons.length)
          ) {
            console.log('loading data still')
            return <LoadingScreen />;
          } else if (error) {
            console.log("Error in LessonsScreen", error);
            return <Text>error!</Text>;
          } else {
            const { allLessons } = data;
            return (
              <LessonList
                lessons={allLessons}
                onLessonSelected={this.navigateToLesson}
              />
            );
          }
        }}
      </Query>
    );
  }

  navigateToLesson = id => {
    this.props.navigation.navigate("Principles", { lessonId: id });
  };
}

const styles = StyleSheet.create({});
