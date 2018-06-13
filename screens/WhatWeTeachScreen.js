import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Button,
  ScrollView
} from "react-native";
import { MarkdownView } from "react-native-markdown-view";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";
import MarkdownViewer from "../components/MarkdownViewer";

export default class WhatWeTeachScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "What We Teach"
    };
  };

  render() {
    const { teachingMarkdown } = this.props.navigation.state.params.principle;
    return (
      <ScrollView style={styles.container}>
        <MarkdownViewer markdown={teachingMarkdown} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  }
});
