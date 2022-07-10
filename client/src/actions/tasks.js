import axios from "axios";
import { setAlert } from "./alert";

import {
  FETCH_TASK,
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  TASK_ERROR,
} from "./types";

export const fetchTasks = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/tasks`, {
      withCredentials: true,
    });
    dispatch({
      type: FETCH_TASK,
      payload: res.data.tasks,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: TASK_ERROR,
    });
  }
};
export const addTask = (task) => async (dispatch) => {
  try {

    const res = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/tasks`,
      task,
      { withCredentials: true }
    );
    dispatch({
      type: ADD_TASK,
      payload: res.data.tasks,
    });
    dispatch(setAlert("Task added"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: TASK_ERROR,
      payload: errors,
    });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {

    const res = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/tasks/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: DELETE_TASK,
      payload: res.data.tasks,
    });
    dispatch(setAlert("Task deleted"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: TASK_ERROR,
    });
  }
};
export const toggleTask = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/tasks/${id}`,
      config,
      { withCredentials: true }
    );
    dispatch({
      type: TOGGLE_TASK,
      payload: res.data.tasks,
    });
    dispatch(setAlert("Task updated"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: TASK_ERROR,
    });
  }
};
