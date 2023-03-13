import axios from "axios";
import { SAVE_TENANTS } from "../constants/tenantConstants";

const saveTenants = (data) => {
  return { type: SAVE_TENANTS, payload: data };
};

export const getAllTenants = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_APP_URL_BE}/debitors/all`
      );
      console.log(data);
      dispatch(saveTenants(data));
    } catch (error) {}
  };
};
