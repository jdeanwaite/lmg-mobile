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
// import Moment from 'react-moment';
import { ListItem } from "react-native-elements";
import Separator, { SeparatorInsets } from "./Separator";
import withScores from "../providers/withScores";
import Score from "./Score";
import { calculateActualValue } from "../api/scoreCalc";
import Moment from "moment";

class PrincipleList extends Component {
  renderItem = ({ item }) => {
    const percentage = item.scoreValue / 20;
    return (
      <ListItem
        title={item.name}
        titleStyle={styles.title}
        subtitle={
          "Last studied: " +
          ((item.scoreValue && item.lastStudied && Moment(item.lastStudied).fromNow()) || "Never")
        }
        subtitleStyle={styles.subtitle}
        // subtitle={`${item.principles.length} principles`}
        // subtitleStyle={styles.subtitle}
        onPress={this.onPrinciplePressed(item)}
        rightElement={<Score value={percentage} />}
        chevron
      />
    );
  };

  keyExtractor = item => item.id;

  render() {
    const { lesson, scores } = this.props;
    const principles = lesson.principles.map(p => {
      const score = scores.find(s => s.principleId === p.id);
      return {
        ...p,
        scoreValue: calculateActualValue(score) || 0,
        lastStudied: score && score.updatedAt
      };
    });

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          data={principles}
          ItemSeparatorComponent={() => (
            <Separator leftInset={SeparatorInsets.text} />
          )}
        />
      </View>
    );
  }

  onPrinciplePressed = principle => {
    return () => {
      if (this.props.onPrincipleSelected) {
        this.props.onPrincipleSelected(principle);
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
    color: "rgba(0, 0, 0, .38)",
    marginTop: 8
  },
  title: {
    fontWeight: "500"
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

export default withScores(PrincipleList);
