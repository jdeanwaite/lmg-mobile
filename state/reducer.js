export const UPDATE_AUTH_STATE = '[Auth] UPDATE_AUTH_STATE';

export default function reducer(state = { authState: 'loading' }, action) {
  switch (action.type) {
    case UPDATE_AUTH_STATE: {
      const { authState, authData } = action.payload;
      return { ...state, authState, authData };
    }
    default:
      return state;
  }
}

export function updateAuthState(authState, authData = null) {
  return {
    type: UPDATE_AUTH_STATE,
    payload: {
      authState,
      authData,
    },
  };
}
