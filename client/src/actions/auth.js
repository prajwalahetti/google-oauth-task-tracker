import axios from "axios";
import { setAlert } from "./alert";

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
  LOAD_USER,
} from "./types";
export const login = () => (dispatch) => {
  try {
    window.open(`${process.env.REACT_APP_SERVER_URL}/auth/google`, "_self");
    dispatch({
      type: LOGIN_SUCCESS,
    });
    dispatch(setAlert("login success", "success"));

  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch(setAlert("login fail", "danger"));
  }
};
export const logout = () => (dispatch) => {
  try {
    window.open(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, "_self");
    dispatch({
      type: LOGOUT,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const loadUser = () => async (dispatch) => {
  // check for cookie
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/auth/current_user`,
      { withCredentials: true }
    );
    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: AUTH_ERROR,
    });
  }
};
