import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import SettingsScreen from "../screens/SettingsScreen";
import LessonStack from "./LessonStackNavigator";
import Colors from "../constants/Colors";

// LessonStack.navigationOptions = {
//
// };
//
// const LinksStack = createStackNavigator({
//   Links: LinksScreen,
// });
//
// LinksStack.navigationOptions = {
//   tabBarLabel: 'Links',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
//     />
//   ),
// };

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
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

SettingsStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-contact${focused ? "" : "-outline"}`
          : "md-contact"
      }
    />
  ),
  tabBarInactiveColor: 'red'
};

const MainTabNavigator = createBottomTabNavigator(
  {
    LessonStack,
    // LinksStack,
    SettingsStack
  },
  {
    tabBarOptions: {
      style: { backgroundColor: Colors.tintColor },
      activeTintColor: "#fff",
      inactiveTintColor: Colors.tabIconDefault
    }
  }
);

// MainTabNavigator.navigationOptions = ({ navigation }) => ({
//   header: null
// });

export default MainTabNavigator;
