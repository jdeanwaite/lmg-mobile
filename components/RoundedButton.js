import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewPropTypes,
  ColorPropType,
  Platform,
  ActivityIndicator
} from "react-native";
import PropTypes from "prop-types";
import Colors from "../constants/Colors";

export default class RoundedButton extends Component {
  render() {
    const { outline, clear, loading } = this.props;
    const TouchableElement =
      outline || clear ? TouchableOpacity : TouchableHighlight;
    return (
      <TouchableElement
        style={[
          styles.container,
          this.props.block ? styles.stretched : null,
          this.props.style
        ]}
        onPress={this.props.loading ? null : this.props.onPress}
      >
        <View
          style={[
            styles.container,
            styles.contentContainer,
            {
              backgroundColor: this.props.color || Colors.tintColor,
              borderColor: this.props.color || Colors.tintColor
            },
            this.props.block ? styles.contentContainerStretched : null,
            this.props.outline ? styles.outline : styles.solid,
            this.props.clear ? styles.clear : null
          ]}
        >
          {this.props.loading ? (
            <ActivityIndicator animating color="white" />
          ) : (
            <Text
              style={[
                styles.text,
                styles.lightText,
                outline || clear
                  ? { color: this.props.color || Colors.tintColor }
                  : null,
                this.props.textStyle
              ]}
            >
              {this.props.children}
            </Text>
          )}
        </View>
      </TouchableElement>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4
  },
  contentContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24
  },
  stretched: {
    alignSelf: "stretch"
  },
  contentContainerStretched: {
    flex: 1
  },
  text: {
    ...Platform.select({
      ios: {
        fontSize: 16,
        fontWeight: "600"
      },
      android: {
        fontSize: 17,
        fontWeight: "400"
      }
    })
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1
  },
  solid: {
    borderWidth: 0
  },
  lightText: {
    color: "rgba(255, 255, 255, .93)"
  },
  clear: {
    backgroundColor: "transparent",
    borderWidth: 0
  }
});

RoundedButton.propTypes = {
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
  color: ColorPropType,
  textStyle: Text.propTypes.style,
  block: PropTypes.bool,
  outline: PropTypes.bool,
  clear: PropTypes.bool,
  loading: PropTypes.bool,
};

RoundedButton.defaultProps = {
  color: Colors.tintColor,
  block: false,
  outline: false,
  clear: false,
  loading: false,
};
