import React, { Component } from "react";
import { Query } from "react-apollo";
import AllScoresQuery from "../queries/AllScoresQuery";
import { Logger } from 'aws-amplify';

const logger = new Logger('withScores');

export default function withScores(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <Query query={AllScoresQuery} fetchPolicy={"cache-and-network"}>
          {({ data, loading, error }) => {
            if (error) {
              logger.warn(error);
            }
            return (
              <WrappedComponent
                scores={(data && data.allScores) || []}
                scoresLoading={loading || false}
                {...this.props}
              />
            )
          }}
        </Query>
      );
    }
  };
}
