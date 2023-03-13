import { map } from "lodash";
import {
  SAVE_ALL_ARTICLES,
  SAVE_ARTICLE,
  UPDATE_ARTICLE,
} from "../constants/articleConstants";

const articleReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case SAVE_ARTICLE:
      return {
        data: [...state.data, action.payload],
      };

    case SAVE_ALL_ARTICLES:
      return {
        ...state,
        data: action.payload,
      };

    case UPDATE_ARTICLE:
      const id = action.payload._id;
      const newData = map(state.data, (item) => {
        return item._id === id ? action.payload : item;
      });

      return {
        ...state,
        data: newData,
      };

    default:
      return state;
  }
};

export default articleReducer;
