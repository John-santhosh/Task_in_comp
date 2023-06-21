import {
  SELECT_USERS,
  SET_ALL_TASK,
  TASK_LOADING,
  TASK_LOADING_SUCCESS,
} from "../actions";

export const reducer = (state, { type, payload }) => {
  if (type === SELECT_USERS) {
    return { ...state, users: payload };
  }
  if (type === SET_ALL_TASK) {
    return { ...state, allTask: payload };
  }
  if (type === TASK_LOADING) {
    return { ...state, task_loading: false };
  }
  if (type === TASK_LOADING_SUCCESS) {
    return { ...state, task_loading: false };
  }
  throw new Error(`no action type : ${type} specified `);
};
