import { SAVE_HISTORY, SAVE_ITEM } from "../constants/historyConstants";

export const historyReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case SAVE_HISTORY:
      return {
        data: action.history,
      };
    case SAVE_ITEM:
      return {
        ...state,
        data: [...state.data, action.item],
      };

    default:
      return state;
  }
};
