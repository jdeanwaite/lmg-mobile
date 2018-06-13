import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import VideoList from '../components/VideoList'

export default class VideosScreen extends Component {
  static navigationOptions = {
    title: "Videos"
  };

  render() {
    const { videoRefs } = this.props.navigation.state.params.principle;
    return (
      <View style={styles.container}>
        <VideoList videoRefs={videoRefs || []}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
