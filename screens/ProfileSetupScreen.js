import React, { Component } from "react";
import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import { Content, Input, Item, Picker } from "native-base";
import { Auth } from "aws-amplify";
import { NavigationActions } from "react-navigation";
import RoundedButton from "../components/RoundedButton";

export default class ProfileSetupScreen extends Component {
  static navigationOptions = {
    title: "Profile Setup",
    gesturesEnabled: false
  };

  state = {
    firstName: "",
    lastName: "",
    gender: "male",
    loading: false
  };

  componentDidMount = async () => {
    const user = await Auth.currentAuthenticatedUser();
    this.setState({
      firstName: user.attributes.given_name || "",
      lastName: user.attributes.family_name || "",
      gender: user.attributes.gender || "male"
    });

    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("dark-content");
    });
  };

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return (
      <Content padder style={styles.container}>
        <Text>Complete your profile by entering the information below.</Text>
        <Item>
          <Input
            placeholder="First name"
            autoCapitalize="words"
            autoCorrect={false}
            value={this.state.firstName}
            onChangeText={text => this.setState({ firstName: text })}
          />
        </Item>
        <Item>
          <Input
            placeholder="Last name"
            autoCapitalize="words"
            autoCorrect={false}
            value={this.state.lastName}
            onChangeText={text => this.setState({ lastName: text })}
          />
        </Item>
        <Item>
          <Picker
            mode="dropdown"
            placeholder="Gender"
            selectedValue={this.state.gender}
            onValueChange={this.setGender}
            placeholderStyle={Platform.OS === "ios" ? { paddingLeft: 5 } : {}}
            textStyle={Platform.OS === "ios" ? { paddingLeft: 5 } : {}}
            headerTitleStyle={{ color: "#fff" }}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </Item>
        <RoundedButton
          block
          onPress={this.onSavePressed}
          loading={this.state.loading}
        >
          <Text>Save Profile</Text>
        </RoundedButton>
      </Content>
    );
  }

  setGender = (gender) => {
    this.setState({gender});
  }

  onSavePressed = async () => {
    const { firstName, lastName, gender } = this.state;
    if (!firstName || !lastName || !gender) {
      return false;
    }

    this.setState({ loading: true });
    const user = await Auth.currentAuthenticatedUser();
    try {
      await Auth.updateUserAttributes(user, {
        given_name: firstName,
        family_name: lastName,
        gender
      });
    } catch(err) {
      console.log('Error saving profile:', err);
    }
    this.setState({ loading: false });

    this.props.navigation.dispatch(NavigationActions.back());
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  }
});
