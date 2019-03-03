import { GET_POSTS } from "../actions/types";

const initialState = {
  post: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        post: action.payload
      };
    default:
      return state;
  }
};
