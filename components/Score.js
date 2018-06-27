import React, { Component } from "react";
import PropTypes from "prop-types";
import { Svg } from "expo";
import Colors from "../constants/Colors";

export default class Score extends Component {
  render() {
    const { value, numBars, maxHeight, barWidth } = this.props;
    const svgWidth = numBars * barWidth + (numBars - 1) * 5;
    const indices = [];

    for (let i = 0; i < numBars; i++) {
      indices[i] = i;
    }

    return (
      <Svg width={svgWidth} height={maxHeight}>
        {indices.map(i => {
          const height = maxHeight / numBars * (i + 1);
          let highlighted;
          if (i === 0 && value > 0) {
            highlighted = true;
          } else {
            highlighted = value >= (i + 1) / numBars;
          }

          return (
            <Svg.Rect
              key={i}
              x={i * (barWidth + 5)}
              y={maxHeight - height}
              width={barWidth}
              height={height}
              fill={highlighted ? Colors.secondary : "rgba(0, 0, 0, .12)"}
            />
          );
        })}
      </Svg>
    );
  }
}

Score.propTypes = {
  value: PropTypes.number,
  numBars: PropTypes.number,
  maxHeight: PropTypes.number,
  barWidth: PropTypes.number
};
Score.defaultProps = {
  value: 0,
  numBars: 4,
  maxHeight: 25,
  barWidth: 10
};
