import React from "react";
import PropTypes from "prop-types";
import {
  View,
  ViewPropTypes,
  ColorPropType,
  StyleSheet,
  Platform
} from "react-native";

const hairline = StyleSheet.hairlineWidth;

/**
 * Separator components, typically used for list separators.
 */
export default class Separator extends React.Component {
  _createContainerStyles = () => {
    return {
      backgroundColor: this.props.containerBackgroundColor,
      paddingLeft: this.props.leftInset,
      paddingRight: this.props.rightInset
    };
  };

  _createSeparatorStyles = () => {
    return {
      height: hairline,
      backgroundColor: this.props.separatorColor
    };
  };

  render() {
    const containerStyles = this._createContainerStyles();
    const separatorStyles = this._createSeparatorStyles();

    return (
      <View style={StyleSheet.flatten([containerStyles, this.props.style])}>
        <View style={separatorStyles} />
      </View>
    );
  }
}

Separator.propTypes = {
  leftInset: PropTypes.number,
  rightInset: PropTypes.number,
  containerBackgroundColor: ColorPropType,
  separatorColor: ColorPropType,
  style: ViewPropTypes.style
};

Separator.defaultProps = {
  leftInset: 0,
  rightInset: 0,
  containerBackgroundColor: "#fff",
  separatorColor: "#C7C7CC",
  style: null
};

/**
 * Some default separator insets.
 */
export const SeparatorInsets = {
  ...Platform.select({
    ios: {
      text: 14
    },
    android: {
      text: 16
    }
  })
};
