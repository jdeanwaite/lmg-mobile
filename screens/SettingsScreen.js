import React from "react";
import { ExpoConfigView } from "@expo/samples";
import { Button, View, Text, StyleSheet } from "react-native";
import { Auth } from "aws-amplify";
import AuthService from "../api/AuthService";
import Separator from "../components/Separator";
import { ListItem } from "react-native-elements";
import { isProfileComplete } from "../api/profile";
import { apolloClient} from '../api/apolloClient';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Profile",
    gender: "",
    lastName: ""
  };

  constructor(props) {
    super(props);
    this.checkUser();
  }

  checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const { attributes } = user || {};
      const { family_name, gender } = attributes || {};
      this.setState({
        lastName: family_name || "",
        gender: gender || ""
      });
    } catch (err) {
      console.log("error", err);
    }
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    console.log(this.props);
    const { lastName, gender } = this.state || {};
    return (
      <View>
        {lastName &&
          gender && (
            <Text style={styles.greeting}>
              Welcome, {gender === "male" ? "Elder" : "Sister"} {lastName}!
            </Text>
          )}

        <Separator />
        <ListItem title="Sign out" onPress={this.signOut} chevron />
        <Separator />
      </View>
    );
  }

  signOut = async () => {
    await apolloClient.resetStore();
    await apolloClient.cache.reset();
    await Auth.signOut();
    AuthService.setAuthState("signedOut", null);
  };
}

const styles = StyleSheet.create({
  greeting: {
    padding: 16
  }
})
