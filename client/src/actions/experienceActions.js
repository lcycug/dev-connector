import { GET_ERRORS, CREATE_EXPERIENCE } from "./types";
import axios from "axios";

export const createExperience = (experienceData, history) => dispatch => {
  axios
    .post("/api/profile/education", experienceData)
    .then(res => {
      dispatch({
        type: CREATE_EXPERIENCE,
        payload: res.data
      });
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
