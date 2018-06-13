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

export default class PrincipleList extends Component {
  renderItem = ({ item }) => {
    return (
      <ListItem
        title={item.name}
        // subtitle={`${item.principles.length} principles`}
        // subtitleStyle={styles.subtitle}
        onPress={this.onPrinciplePressed(item.id)}
        chevron
      />
    );
  };

  keyExtractor = item => item.id;

  render() {
    const { lesson } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          data={lesson.principles}
          ItemSeparatorComponent={() => (
            <Separator leftInset={SeparatorInsets.text} />
          )}
        />
      </View>
    );
  }

  onPrinciplePressed = id => {
    return () => {
      if (this.props.onPrincipleSelected) {
        this.props.onPrincipleSelected(
          this.props.lesson.principles.find(p => p.id === id)
        );
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

PrincipleList.propTypes = {
  lesson: PropTypes.object,
  onPrincipleSelected: PropTypes.func
};
PrincipleList.defaultProps = {
  lesson: {
    id: "",
    name: "",
    principles: []
  }
};
