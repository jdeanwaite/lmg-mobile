import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";
import { MarkdownView } from "react-native-markdown-view";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";

export default class MarkdownViewer extends Component {
  render() {
    return (
      <MarkdownView
        style={styles.markdownContainer}
        styles={markdownStyles}
        rules={{ text: { render: undefined } }}
      >
        {this.props.markdown}
      </MarkdownView>
    );
  }
}

const styles = StyleSheet.create({
  markdownContainer: {
    padding: 20
  }
});

const markdownStyles = {
  heading: {
    fontWeight: "500",
    color: Colors.tintColor
  },
  heading1: {
    fontSize: 24
  },
  heading2: {
    fontSize: 20,
    fontWeight: "500"
  },
  paragraph: { ...Fonts.defaultCopyFont },
  listItem: { marginBottom: 16 },
  listItemNumber: { ...Fonts.defaultCopyFont },
  listItemBullet: { ...Fonts.defaultCopyFont },
  listItemOrderedContent: {
    ...Fonts.defaultCopyFont,
  },
  listItemUnorderedContent: {
    ...Fonts.defaultCopyFont,
  }
};

MarkdownViewer.propTypes = {
  markdown: PropTypes.string
};
MarkdownViewer.defaultProps = {
  markdown: ""
};
