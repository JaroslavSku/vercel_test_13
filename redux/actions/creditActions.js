import axios from "axios";
import {
  UPDATE_MESSAGE_SERVICES,
  UPDATE_AMOUNT,
  UPDATE_MESSAGE_ERROR,
} from "../constants/creditConstaints";

const updateCreditAmount = ({ credit }) => {
  return {
    type: UPDATE_AMOUNT,
    credit,
  };
};

export const buyCredit = (amount) => {
  return async (dispatch) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_REACT_BE_API}/credit/add`, { amount })
      .then(({ data }) => {
        console.log(data);
        dispatch(updateCreditAmount(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const spendCredit = (amount, tenantId, serviceId) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_REACT_BE_API}/credit/delete`, {
        amount,
        tenantId,
        serviceId,
      })
      .then(({ data }) => {
        dispatch(updateCreditAmount(data));
        resolve(data);
      })
      .catch(({ response }) => {
        dispatch({
          type: UPDATE_MESSAGE_ERROR,
          message: response.data?.message,
        });
        dispatch({
          type: UPDATE_MESSAGE_SERVICES,
          message: response.data?.message,
          messageType: "errorg",
        });
        reject(response);
      });
  });
};

export const getCreditStatus = () => {
  return async (dispatch) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_BE_API}/credit/get`)
      .then(({ data }) => {
        dispatch(updateCreditAmount(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
