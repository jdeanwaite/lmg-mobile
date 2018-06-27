import React from "react";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import { Button, View } from "react-native";
import { compose, graphql } from "react-apollo";
import DoctrineScreen from "../screens/DoctrineScreen";
import HeaderIconButton from "../components/HeaderIconButton";
import Colors from "../constants/Colors";
import WhatWeTeachScreen from "../screens/WhatWeTeachScreen";
import ScripturesScreen from "../screens/ScripturesScreen";
import VideosScreen from "../screens/VideosScreen";
import StudyPromptsScreen from "../screens/StudyPromptsScreen";
import PracticeTeachingInstructionsScreen from "../screens/PracticeTeachingInstructionsScreen";
import { apolloClient } from "../api/apolloClient";
import UpdateScoreMutation from "../queries/UpdateScoreMutation";
import AllScoresQuery from "../queries/AllScoresQuery";
import { RefetchQueriesProviderFn } from "react-apollo/types";

const DrawerNavigator = createDrawerNavigator(
  {
    Doctrine: DoctrineScreen,
    ["What We Teach"]: WhatWeTeachScreen,
    Scriptures: ScripturesScreen,
    Videos: VideosScreen,
    ["Study Prompts"]: StudyPromptsScreen,
    ["Practice Teaching"]: PracticeTeachingInstructionsScreen
  },
  {
    drawerPosition: "right",
    backBehavior: "none",
    order: [
      "Doctrine",
      "What We Teach",
      "Scriptures",
      "Videos",
      "Study Prompts",
      "Practice Teaching"
    ],
    contentOptions: {
      activeTintColor: Colors.tintColor
    }
  }
);

// DrawerNavigator.navigationOptions = ({ navigation }) => {
//   const { index, routes } = navigation.state;
//   const title = routes[index].routeName;
//
//   return {
//     title,
//     headerRight: (
//       <HeaderIconButton
//         iconName="menu"
//         onPress={() => navigation.toggleDrawer()}
//       />
//     ),
//     headerStyle: {
//       backgroundColor: Colors.tintColor
//     },
//     headerTintColor: "#fff"
//   };
// };

// export default DrawerNavigator;

class PrincipleDrawerNavigator extends React.Component {
  static router = {
    ...DrawerNavigator.router,
    getStateForAction: (action, lastState) => {
      // check for custom actions and return a different navigation state.
      return DrawerNavigator.router.getStateForAction(action, lastState);
    }
  };

  static navigationOptions = ({ navigation }) => {
    const { index, routes } = navigation.state;
    const title = routes[index].routeName;

    return {
      title,
      headerRight: (
        <HeaderIconButton
          iconName="menu"
          onPress={() => navigation.toggleDrawer()}
        />
      ),
      headerStyle: {
        backgroundColor: Colors.tintColor
      },
      headerTintColor: "#fff"
    };
  };

  state = {
    latestScore: 0,
    lastUpdated: new Date()
  };

  render() {
    const { navigation } = this.props;

    return <DrawerNavigator navigation={navigation} />;
  }

  componentDidMount() {
    const { principle } = this.props.navigation.state.params;
    this.timeTrackingInterval = setInterval(async () => {
      const now = new Date();
      const lastUpdated = this.state.lastUpdated;
      const dif = lastUpdated.getTime() - now.getTime();
      const minutes = Math.abs(dif / 1000 / 60);

      // If we've been away too long, don't add up the time.
      console.log("It's been", minutes, "minutes");
      if (minutes < 5) {
        return;
      }

      this.setState({
        lastUpdated: new Date()
      });

      if (minutes > 30) {
        return;
      }

      // Get the number of updates we are supposed to do since our last successful update.
      // This will be > 1 if they left the app to go to Gospel Library or watch videos.
      const numUpdates = parseInt(minutes / 5, 10);

      console.log("Doing", numUpdates, "updates");

      for (let i = 0; i < numUpdates; i++) {
        try {
          console.log("Updating score.");
          const updatedAt = new Date().toISOString();
          const newScore = (this.state.latestScore || principle.scoreValue) + 5;

          const variables = {
            principleId: principle.id,
            updatedAt
          };

          console.log(JSON.stringify(variables, null, 2));

          await this.props.updateScore(variables, newScore);
          this.setState({ latestScore: newScore });
        } catch (err) {
          console.log("Error updating:", err);
        }
      }
    }, 10000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timeTrackingInterval);
  }
}

export default compose(
  graphql(UpdateScoreMutation, {
    props: ({ mutate }) => ({
      updateScore: (variables, newScore) => {
        mutate({
          variables,
          optimisticResponse: {
            updateScore: {
              ...variables,
              ...{
                value: newScore,
                id: variables.principleId
              },
              __typename: "Score"
            }
          },
          errorPolicy: "all",
          refetchQueries: [{query: AllScoresQuery}]
          // update: (cache, { data: { updateScore } }) => {
          //   const { allScores } = cache.readQuery({
          //     query: AllScoresQuery
          //   });
          //   const scores = [...allScores];
          //
          //   console.log('scores:', scores);
          //
          //   const index = allScores.findIndex(
          //     score => score.principleId === updateScore.principleId
          //   );
          //   if (index >= 0) {
          //     scores[index] = updateScore;
          //   } else {
          //     scores.push(updateScore);
          //   }
          //
          //   cache.writeQuery({
          //     query: AllScoresQuery,
          //     data: {
          //       allScores: scores
          //     }
          //   });
          // }
        });
      }
    })
  })
)(PrincipleDrawerNavigator);
