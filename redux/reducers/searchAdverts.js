import {
  SAVE_ADVERT_SEARCH,
  SAVE_GEO,
} from "../constants/searchAdvertsConstants";

const initialState = {
  data: [],
  lat: 50.089048941953116,
  lng: 14.415119223347185,
  point: [50.089048941953116, 14.415119223347185],
};

const searchAdvertsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ADVERT_SEARCH:
      return {
        ...state,
        data: action.payload,
      };
    case SAVE_GEO:
      return {
        ...state,
        lat: action.lat,
        lng: action.lng,
        point: action.point,
      };
    default:
      return state;
  }
};

export default searchAdvertsReducer;
