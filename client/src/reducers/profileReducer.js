import {
  SET_PROFILE_LOADING,
  GET_PROFILE,
  CLEAR_CURRENT_PROFILE,
  CREATE_PROFILE
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case SET_PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case CREATE_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
};
