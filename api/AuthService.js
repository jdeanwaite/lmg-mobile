import { NavigationActions } from "react-navigation";

let _onAuthStateChange;

function setAuthStateCallback(callback) {
  _onAuthStateChange = callback;
}

function setAuthState(state, data) {
  _onAuthStateChange(state, data);
}

// add other navigation functions that you need and export them

export default {
  setAuthState,
  setAuthStateCallback
};
