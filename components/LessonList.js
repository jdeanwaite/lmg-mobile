import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  SectionList,
  FlatList
} from "react-native";
import PropTypes from "prop-types";
import { ListItem } from "react-native-elements";
import Separator, { SeparatorInsets } from "./Separator";

export default class LessonList extends Component {
  renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.name}
        subtitle={`${item.principles.length} principles`}
        subtitleStyle={styles.subtitle}
        onPress={this.onLessonPressed(item.id)}
        chevron
      />
    );
  };

  keyExtractor = item => item.id;

  render() {
    const { lessons } = this.props;
    const filteredLessons = lessons.filter(l => l.principles.length > 0);

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          data={filteredLessons}
          ItemSeparatorComponent={() => (
            <Separator leftInset={SeparatorInsets.text} />
          )}
        />
      </View>
    );
  }

  onLessonPressed = id => {
    return () => {
      if (this.props.onLessonSelected) {
        this.props.onLessonSelected(id);
      }
    };
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  subtitle: {
    color: "rgba(0, 0, 0, .54)"
  }
});

LessonList.propTypes = {
  lessons: PropTypes.array,
  onLessonSelected: PropTypes.func
};
LessonList.defaultProps = {
  lessons: []
};
