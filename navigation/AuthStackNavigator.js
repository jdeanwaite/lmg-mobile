import React from "react";
import { createStackNavigator } from "react-navigation";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ConfirmSignUpScreen from "../screens/ConfirmSignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
// import LoadingScreen from '../screens/AuthLoadingScreen'
import RequireNewPasswordScreen from "../screens/RequireNewPasswordScreen";
import Colors from "../constants/Colors";

const AuthStackNavigator = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    ConfirmSignUp: ConfirmSignUpScreen,
    ForgotPassword: ForgotPasswordScreen,
    // Loading: LoadingScreen,
    RequireNewPassword: RequireNewPasswordScreen
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
      headerTintColor: "#fff"
    }
  }
);

export default AuthStackNavigator;
