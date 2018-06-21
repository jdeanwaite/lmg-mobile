import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Camera, Permissions, MediaLibrary, FileSystem } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { NavigationActions, SafeAreaView } from "react-navigation";
import _ from "lodash";

export default class PracticeTeachingRecordScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    hasCameraPermission: null,
    hasAudioPermission: null,
    hasCameraRollPermission: null,
    type: Camera.Constants.Type.front,
    recording: false,
    ratio: null,
    secondsRemaining: 120,
    saving: false
  };

  async componentDidMount() {
    const cameraStatus = (await Permissions.askAsync(Permissions.CAMERA))
      .status;
    this.setState({ hasCameraPermission: cameraStatus === "granted" });

    const audioStatus = (await Permissions.askAsync(
      Permissions.AUDIO_RECORDING
    )).status;
    this.setState({ hasAudioPermission: audioStatus === "granted" });

    const cameraRollStatus = (await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    )).status;
    this.setState({ hasCameraRollPermission: cameraRollStatus === "granted" });
  }

  render() {
    const { hasCameraPermission, hasAudioPermission } = this.state;
    if (hasCameraPermission === null || hasAudioPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false || hasAudioPermission === false) {
      return (
        <Text>
          Camera and audio recording permissions are required. Please grant
          these permissions to Learn My Gospel through your device settings.
        </Text>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.container}>
            <View style={styles.statusBar}>
              <Text style={styles.statusBarText}>
                {this.state.recording
                  ? `Time remaining: ${convertSecondsToTimeStamp(
                      this.state.secondsRemaining
                    )}`
                  : `Time limit: ${convertSecondsToTimeStamp(
                      this.state.secondsRemaining
                    )}`}
              </Text>
            </View>
            <Camera
              style={styles.camera}
              type={this.state.type}
              ref={ref => (this.camera = ref)}
              onCameraReady={this.onCameraReady}
              ratio={this.state.ratio || undefined}
            />

            {/* Anything that needs to be displayed over the camera */}
            <View style={styles.overlayContainer}>
              <View
                style={[
                  styles.actionBar,
                  {
                    backgroundColor: this.state.recording
                      ? "transparent"
                      : "rgba(0, 0, 0, .2)"
                  }
                ]}
              >
                <VideoActionButton
                  iconName="arrow-round-back"
                  mdIconName="arrow-back"
                  onPress={this.goBack}
                  disabled={this.state.recording}
                />
                {!this.state.saving || this.state.recording ? (
                  <RecordButton
                    onPress={this.toggleRecording}
                    recording={this.state.recording}
                  />
                ) : (
                  <ActivityIndicator animating />
                )}
                <VideoActionButton
                  iconName="reverse-camera-outline"
                  mdIconName="reverse-camera"
                  onPress={this.toggleCameraSide}
                  disabled={this.state.recording}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      );
    }
  }

  onCameraReady = async () => {
    if (Platform.OS !== "ios" && this.camera) {
      try {
        const supportedRatios = await this.camera.getSupportedRatiosAsync();
        if (supportedRatios && supportedRatios.length) {
          this.setState({ ratio: supportedRatios[supportedRatios.length - 1] });
        }
      } catch (err) {
        console.log("Error getting supported ratios:", err);
      }
    }
  };

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

  toggleRecording = () => {
    if (this.state.recording) {
      this.camera.stopRecording();
    } else {
      this.startRecording();
    }
  };

  startRecording = async () => {
    const interval = setInterval(() => {
      if (this.state.secondsRemaining > 0) {
        this.setState({ secondsRemaining: this.state.secondsRemaining - 1 });
      }
    }, 1000);
    this.setState({ recording: true, saving: true });
    const videoUri = await this.camera.recordAsync({
      maxDuration: this.state.secondsRemaining
    });
    window.clearInterval(interval);
    this.setState({
      recording: false,
      secondsRemaining: 120
    });
    const asset = await MediaLibrary.createAssetAsync(videoUri.uri);
    await FileSystem.deleteAsync(videoUri.uri);
    this.setState({
      saving: false
    });
    const { principle } = this.props.navigation.state.params
    this.props.navigation.navigate("PracticeTeachingReviewInstructions", {
      videoAsset: asset,
      principle
    });
  };

  toggleCameraSide = () => {
    this.setState({
      type:
        this.state.type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };
}

class RecordButton extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            borderWidth: 6,
            borderColor: "#fff",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              width: this.props.recording ? 36 : 60,
              height: this.props.recording ? 36 : 60,
              borderRadius: this.props.recording ? 6 : 30,
              backgroundColor: "red"
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

class VideoActionButton extends React.PureComponent {
  render() {
    const { iconName, mdIconName, ...rest } = this.props;
    return (
      <TouchableOpacity {...rest}>
        <Ionicons
          style={{
            width: Platform.OS === "ios" ? 48 : 32,
            height: Platform.OS === "ios" ? 48 : 32,
            opacity: this.props.disabled ? 0 : 1
          }}
          size={Platform.OS === "ios" ? 48 : 32}
          color="#fff"
          name={
            Platform.OS === "ios"
              ? `ios-${iconName}`
              : `md-${mdIconName || iconName}`
          }
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1
  },
  statusBar: {
    alignItems: "center",
    backgroundColor: "#000",
    padding: 11
  },
  statusBarText: {
    color: "#fff",
    fontSize: 18
  },
  camera: {
    flex: 1
  },
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "flex-end"
  },
  actionBar: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center"
  }
});

function convertSecondsToTimeStamp(seconds) {
  const displayMinutes = parseInt(seconds / 60);
  const displaySeconds = seconds % 60 || 0;
  return `${displayMinutes}:` + _.padStart(displaySeconds.toString(), 2, "0");
}
