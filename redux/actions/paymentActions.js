import axios from "axios";
import { UPDATE_ADVERT } from "../constants/advertConstants";

export const payAdverts = (values) => {
  console.log("this is our advertId", values);
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/adverts-room/paid`,
        values
      );
      console.log(data);
      dispatch(editAdvertSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const editAdvertSuccess = ({ advert }) => {
  return {
    type: UPDATE_ADVERT,
    payload: advert,
  };
};

export const payAgreement = (values) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/agreement/paid`,
        values
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const payVerifyNoRegistration = (values) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/tenants/verify-noreg`,
        values
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};
