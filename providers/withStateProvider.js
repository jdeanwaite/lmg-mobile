import React, { Component } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../state/reducer";

const store = createStore(reducer);

export default function withStateProvider(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <Provider store={store}>
          <WrappedComponent {...this.props} />
        </Provider>
      );
    }
  };
}
