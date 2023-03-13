import { SAVE_MY_TENANTS } from "../constants/myTenantsConstants";

const myTenatsReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case SAVE_MY_TENANTS:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default myTenatsReducer;
