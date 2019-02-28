import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      history.push("/login");
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login user
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Set localStorage
      const { token } = res.data;
      console.log(token);
      localStorage.setItem("jwtToken", token);
      // Set token to auth header
      setAuthToken(token);
      // Set state user
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Logout user
export const logoutUser = () => dispatch => {
  // Remove localStorage of jwtToken
  localStorage.removeItem("jwtToken");
  // Delete axios defaults headers
  setAuthToken();
  // Log out current user
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});
