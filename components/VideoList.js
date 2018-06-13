import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  FlatList
} from "react-native";
import PropTypes from "prop-types";
import Colors from "../constants/Colors";
import { tryOpenLink } from "../api/linking";
import { ListItem } from "react-native-elements";
import Separator, { SeparatorInsets } from './Separator'

/*
{videoRefs.map(videoRef => (
          <TouchableOpacity key={videoRef.id} onPress={this.openLink(videoRef.link)}>
            <Text style={styles.link}>{videoRef.title}</Text>
          </TouchableOpacity>
        ))}
 */

export default class VideoList extends Component {
  renderItem = ({ item }) => {
    console.log("render item", item);
    return (
      <ListItem title={item.title} onPress={this.openLink(item.link)} chevron />
    );
  };

  keyExtractor = item => item.id;

  render() {
    const { videoRefs } = this.props;
    return (
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        renderItem={this.renderItem}
        data={videoRefs}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={() => <Separator leftInset={SeparatorInsets.text}/>}
      />
    );
  }

  openLink = link => {
    return async () => {
      try {
        await tryOpenLink(link);
      } catch (err) {
        console.log("Error opening link:", err);
      }
    };
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    padding: 16
  },
  link: {
    fontSize: 18,
    color: Colors.tintColor,
    marginBottom: 16
  }
});

VideoList.propTypes = {
  videoRefs: PropTypes.array
};
VideoList.defaultProps = {
  videoRefs: []
};
