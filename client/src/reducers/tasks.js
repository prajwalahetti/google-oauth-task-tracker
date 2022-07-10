import {
  FETCH_TASK,
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  TASK_ERROR,
} from "../actions/types";

const initialState = {
  tasks: [],
  loading: true,
  error: [],
};
export default function f(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_TASK:
      return {
        ...state,
        tasks: payload,
        loading: false,
      };
    case TOGGLE_TASK:
    case ADD_TASK:
      return {
        ...state,
        tasks: payload,
        loading: false,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: payload,
        loading: false,
      };
    case TASK_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
