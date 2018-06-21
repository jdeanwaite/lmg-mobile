import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Linking,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Alert
} from "react-native";
import { Video, Constants } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { NavigationActions } from "react-navigation";
import MarkdownViewer from "../components/MarkdownViewer";
import RoundedButton from "../components/RoundedButton";
import Colors from "../constants/Colors";
import HeaderIconButton from "../components/HeaderIconButton";

export default class PracticeTeachingReviewInstructionsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Review",
    headerTintColor: Colors.tintColor,
    headerRight: (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingRight: Platform.OS === "ios" ? 0 : 8
        }}
      >
        <HeaderIconButton
          iconName={"share"}
          color={Colors.tintColor}
          outline
          size={Platform.OS === "ios" ? 32 : 24}
          onPress={navigation.state.params.onSharePress}
        />
        <Button
          color={Colors.tintColor}
          title={Platform.OS === "ios" ? "Done" : "DONE"}
          onPress={() => {
            navigation.navigate("Principle");
          }}
        />
      </View>
    )
  });

  state = {
    opening: false
  };

  componentDidMount() {
    this.props.navigation.setParams({
      onSharePress: this.showShareOptions
    });
  }

  render() {
    const { principle, videoAsset } = this.props.navigation.state.params;

    const markdown = `# Now critique your teaching with the following points in mind
${principle.pointsToTeachMarkdown}
`;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <StatusBar barStyle="dark-content" />
        <MarkdownViewer markdown={markdown} />
        <TouchableOpacity
          onPress={this.playVideo}
          disabled={this.state.opening}
        >
          <Video
            source={{ uri: videoAsset.uri }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            style={styles.videoPlayer}
            ref={ref => (this.videoPlayer = ref)}
          />
          <View style={styles.overlayContainer}>
            {this.state.opening ? (
              <ActivityIndicator animating />
            ) : (
              <Ionicons
                color="#fff"
                size={64}
                name={Platform.OS === "ios" ? "ios-play" : "md-play"}
              />
            )}
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  playVideo = async () => {
    this.setState({ opening: true });
    try {
      await this.videoPlayer.presentFullscreenPlayer();
    } catch (err) {
      console.log("Unable to open video in fullscreen.");
    }
    this.setState({ opening: false });
  };

  showShareOptions = async () => {
    Alert.alert(
      "Share your video",
      "Your video has been saved to your Photo Library. Open up Messenger to share it with others.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Open Messenger",
          onPress: async () => {
            const link = `fb-messenger://share`;
            const canOpen = await Linking.canOpenURL(link);
            if (Constants.appOwnership === "expo" || canOpen) {
              console.log("opening", link);
              await Linking.openURL(link);
            }
          }
        }
      ]
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    padding: 11
  },
  videoPlayer: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    overflow: "hidden"
  },
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, .2)",
    justifyContent: "center",
    alignItems: "center"
  }
});
