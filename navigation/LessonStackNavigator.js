import React from "react";
import LessonsScreen from "../screens/LessonsScreen";
import { createStackNavigator } from "react-navigation";
import PrinciplesScreen from "../screens/PrinciplesScreen";
import PrincipleDrawerNavigator from "./PrincipleDrawerNavigator";
import Colors from "../constants/Colors";
import { Platform } from "react-native";
import TabBarIcon from "../components/TabBarIcon";
import PracticeTeachingStackNavigator from "./PracticeTeachingStackNavigator";

const LessonStack = createStackNavigator(
  {
    Lessons: LessonsScreen,
    Principles: PrinciplesScreen,
    Principle: PrincipleDrawerNavigator,
    PracticeTeaching: {
      screen: PracticeTeachingStackNavigator,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: Colors.tintColor
      },
      headerTintColor: "#fff"
    }
  }
);

LessonStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = navigation.state.index === 0;
  return {
    tabBarVisible,
    tabBarLabel: "Lessons",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === "ios"
            ? `ios-home${focused ? "" : "-outline"}`
            : "md-home"
        }
      />
    )
  };
};

export default LessonStack;
