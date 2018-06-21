import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import {
  TouchableOpacity,
  ColorPropType,
  StyleSheet,
  Platform
} from "react-native";
import PropTypes from "prop-types";

export default class HeaderIconButton extends React.Component {
  render() {
    const { iconName, onPress, color, disabled, outline, size } = this.props;
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Ionicons
          name={`${Platform.OS === "ios" ? "ios" : "md"}-${iconName}${
            Platform.OS === "ios" && outline ? "-outline" : ""
          }`}
          size={size}
          style={StyleSheet.flatten([styles.icon, this.props.style])}
          color={disabled ? disabledColor : color}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    paddingHorizontal: 11
  }
});

const disabledColor = "rgba(0, 0, 0, .26)";

HeaderIconButton.propTypes = {
  iconName: PropTypes.string,
  onPress: PropTypes.func,
  color: ColorPropType,
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  size: PropTypes.number
};

HeaderIconButton.defaultProps = {
  iconName: "",
  onPress: null,
  color: "#fff",
  disabled: false,
  outline: false,
  size: 24
};
