import { SAVE_LESSORS, UPDATE_LESSORS } from "../constants/adminConstants";

export const adminReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case SAVE_LESSORS:
      return {
        data: action.payload,
      };

    case UPDATE_LESSORS:
      const id = action.payload._id;
      const newData = state.data.map((item) =>
        item._id === id ? action.payload : item
      );

      return {
        data: newData,
      };
    default:
      return state;
  }
};
