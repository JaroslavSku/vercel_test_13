import { CREATE_POST } from "../constants/postConstants";
import { UPDATE_POST } from "../constants/postConstants";
import { SAVE_TENANTS } from "../constants/tenantConstants";
import { map } from "lodash";

const tenantReducer = (state = { data: [] }, action) => {
  if (action.payload?._id) {
    console.log(action.payload._id);
    const id = action.payload._id;
    const newData = state.data.map((item) =>
      item._id === id ? action.payload : item
    );
    console.log(newData);
  }
  switch (action.type) {
    case SAVE_TENANTS:
      return {
        data: action.payload.posts,
      };
    case UPDATE_POST: {
      const tenantId = action.payload._id;
      const newData = map(state.data, (item) => {
        return item._id === tenantId ? action.payload : item;
      });

      return {
        ...state,
        data: newData,
      };
    }
    case CREATE_POST:
      return {
        ...state,
        data: [...state.data, action.post],
      };

    default:
      return state;
  }
};

export default tenantReducer;
