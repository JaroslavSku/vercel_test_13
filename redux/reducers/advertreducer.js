import { map, filter } from "lodash";
import {
  DELETE_ADVERT,
  DELETETE_ADVERT_IMAGE,
  SAVE_ADVERTS,
  SAVE_ADVERT_BADGE,
  UPDATE_ADVERT,
} from "../constants/advertConstants";

export const advertReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case SAVE_ADVERTS:
      return {
        ...state,
        data: action.payload,
      };
    case SAVE_ADVERT_BADGE: {
      const advertId = action.payload._id;
      const newAds = map(state.data, (item) => {
        return item._id === advertId ? action.payload : item;
      });
      return {
        ...state,
        data: newAds,
      };
    }
    case DELETETE_ADVERT_IMAGE:
      return {
        ...state,
        data: action.payload,
      };
    case DELETE_ADVERT:
      return {
        ...state,
        data: filter(state.data, (item) => {
          return item._id !== action.payload;
        }),
      };
    case UPDATE_ADVERT: {
      const advertId = action.payload._id;
      const newAds = map(state.data, (item) => {
        return item._id === advertId ? action.payload : item;
      });
      return {
        ...state,
        data: newAds,
      };
    }
    default:
      return state;
  }
};
