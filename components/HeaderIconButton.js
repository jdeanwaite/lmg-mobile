import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { TouchableOpacity, ColorPropType, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default class HeaderIconButton extends React.Component {
  render() {
    const { iconName, onPress, color, disabled } = this.props;
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <MaterialIcons
          name={iconName}
          size={24}
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
  disabled: PropTypes.bool
};

HeaderIconButton.defaultProps = {
  iconName: "",
  onPress: null,
  color: "#fff",
  disabled: false
};
