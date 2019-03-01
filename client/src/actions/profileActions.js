import axios from "axios";

import {
  SET_PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE
} from "./types";

export const getCurrentProfile = () => dispatch => {
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

export const setProfileLoading = () => dispatch => {
  dispatch({
    type: SET_PROFILE_LOADING
  });
};

export const clearCurrentProfile = () => dispatch => {
  dispatch({
    type: CLEAR_CURRENT_PROFILE
  });
};
