import axios from "axios";
import { SAVE_ORDERS } from "../constants/orderConstants";

export const saveOrder = (title, amount, paid) => {
  const userId = localStorage.getItem("userId");
  return (dispatch) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_REACT_BE_API}/orders/create`, {
        title,
        amount,
        userId,
      })
      .then((res) => {
        console.log(res);
      });
  };
};

export const getOrders = () => {
  return (dispatch) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_BE_API}/orders/all`)
      .then(({ data }) => {
        dispatch(saveOrderData(data));
      });
  };
};

const saveOrderData = ({ data }) => {
  return {
    type: SAVE_ORDERS,
    data,
  };
};

export const saveOrderPaid = (title, amount) => {
  const userId = localStorage.getItem("userId");
  return (dispatch) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_REACT_BE_API}/orders/create-paid`, {
        title,
        amount,
        userId,
      })
      .then((res) => {
        console.log(res);
      });
  };
};
