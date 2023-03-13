import axios from "axios";
import { SAVE_MY_TENANTS } from "../constants/myTenantsConstants";

const saveSearchResult = (payload) => {
  return {
    type: SAVE_MY_TENANTS,
    payload,
  };
};

export const searchMyTenants = (name) => {
  return async (dispatch) => {
    try {
      const {
        data: { tenants },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/tenants/findByUser`,
        {
          params: {
            name,
          },
        }
      );
      console.log("Search data", tenants);
      dispatch(saveSearchResult(tenants));
    } catch (error) {
      console.log(error);
    }
  };
};
