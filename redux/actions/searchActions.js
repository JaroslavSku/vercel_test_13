import axios from "axios";
import { SAVE_SEARCH_RESULT } from "../constants/searchConstants";

const saveSearchResult = (payload) => {
  return {
    type: SAVE_SEARCH_RESULT,
    payload,
  };
};

export const searchPost = (fullName) => {
  return async (dispatch) => {
    try {
      const {
        data: { tenants },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/tenants/find`,
        {
          params: {
            fullName,
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
