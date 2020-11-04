import * as actionType from "./types";

export const setToken = (token, username) => {
  return {
    type: actionType.SET_TOKEN,
    data: { token, username },
  };
};

export const logOut = () => {
  return {
    type: actionType.LOGOUT,
  };
};

export const setComments = (data) => {
  return {
    data,
    type: actionType.SET_COMMENTS,
  };
};

export const addComment = (data) => {
  return {
    data,
    type: actionType.APPEND_COMMENT,
  };
};

export const deleteComment = (index) => {
  return {
    data: index,
    type: actionType.DELETE_COMMENT,
  };
};
