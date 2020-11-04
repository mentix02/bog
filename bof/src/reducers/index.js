import { combineReducers } from "redux";

import * as actionType from "../actions/types";

const initialCommentState = {
  comments: [],
};

const initialAuthState = {
  token: null,
  username: null,
  isAuthenticated: false,
};

const comments = (state = initialCommentState, action) => {
  switch (action.type) {
    case actionType.SET_COMMENTS:
      return { comments: action.data };
    case actionType.APPEND_COMMENT:
      return { comments: [action.data, ...state.comments] };
    case actionType.DELETE_COMMENT:
      return {
        comments: [
          ...state.comments.slice(0, action.data),
          ...state.comments.slice(action.data + 1),
        ],
      };
    default:
      return state;
  }
};

const auth = (state = initialAuthState, action) => {
  switch (action.type) {
    case actionType.SET_TOKEN:
      return {
        token: action.data.token,
        username: action.data.username,
        isAuthenticated: true,
      };
    case actionType.LOGOUT:
      return { token: null, username: null, isAuthenticated: false };
    default:
      return state;
  }
};

const appReducer = combineReducers({ auth, comments });
const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
