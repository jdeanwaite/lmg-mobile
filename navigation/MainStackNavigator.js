import React from "react";
import { createStackNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import ProfileSetupStackNavigator from "./ProfileSetupStackNavigator";
import PrincipleDrawerNavigator from "./PrincipleDrawerNavigator";
import Colors from "../constants/Colors";

const MainStackNavigator = createStackNavigator(
  {
    MainTabs: {
      screen: MainTabNavigator,
      navigationOptions: {
        header: null,
      }
    },
    ProfileSetup: {
      screen: ProfileSetupStackNavigator,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    }
  },
  {
    initialRouteName: "MainTabs",
    navigationOptions: {
      headerStyle: {
        backgroundColor: Colors.tintColor
      },
      headerTintColor: "#fff"
    }
  }
);

export default MainStackNavigator;
