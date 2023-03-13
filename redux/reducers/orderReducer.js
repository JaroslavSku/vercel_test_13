import { SAVE_ORDERS } from "../constants/orderConstants";

export const orderReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case SAVE_ORDERS:
      return {
        data: action.data,
      };

    default:
      return state;
  }
};
