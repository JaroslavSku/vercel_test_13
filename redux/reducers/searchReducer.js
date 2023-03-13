import { SAVE_SEARCH_RESULT } from "../constants/searchConstants";

const searchReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case SAVE_SEARCH_RESULT:
      return {
        data: action.payload,
      };

    default:
      return state;
  }
};

export default searchReducer;
