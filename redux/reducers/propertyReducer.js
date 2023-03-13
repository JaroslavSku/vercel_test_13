import { first } from "lodash";
import {
  ADD_HOUSE_DATA,
  ADD_TO_FLOOR,
  DELETE_HOUSE,
  SAVE_HOUSES,
  SAVE_HOUSE_DATA,
  UPDATE_FLOOR,
  UPDATE_HOUSE,
  UPDATE_POSITIONS,
} from "../constants/propertyConstants";

const initialState = {
  tasks: {},
  floors: {},
  userHouses: [],
  firstHouseId: "",
};

const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_POSITIONS:
      return {
        ...state,
        floors: action.payload,
      };

    case SAVE_HOUSES:
      return {
        ...state,
        tasks: action.payload["tasks"],
        floors: action.payload["floors"],
        userHouses: action.payload["houses"],
        firstHouseId: action.payload["firstHouseId"],
      };

    case SAVE_HOUSE_DATA:
      const houseId = action.payload?._id || state.firstHouseId;
      return {
        ...state,
        floors: action.payload["floors"],
        firstHouseId: houseId,
      };

    case ADD_HOUSE_DATA:
      return {
        ...state,
        userHouses: [...state.userHouses, action.payload],
        floors: action.payload["floors"],
        firstHouseId: action.payload._id,
      };

    case ADD_TO_FLOOR:
      return {
        ...state,
        floors: action.payload,
      };

    case DELETE_HOUSE:
      return {
        ...state,
        floors: action.payload["floors"],
        userHouses: action.payload["houses"],
        firstHouseId: action.payload["firstHouseId"],
      };

    case UPDATE_FLOOR:
      return {
        ...state,
        floors: action.payload,
      };

    case UPDATE_HOUSE:
      return {
        ...state,
        userHouses: action.payload,
      };

    default:
      return state;
  }
};

export default propertyReducer;
