import axios from "axios";
import { SAVE_LESSORS, UPDATE_LESSORS } from "../constants/adminConstants";

const getLessorsSuccess = ({ data }) => {
  return { type: SAVE_LESSORS, payload: data };
};

export const getLessors = () => {
  return (dispatch) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_BE_API}/lessors/all`)
      .then(({ data }) => {
        dispatch(getLessorsSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const verifyLessorsSuccess = ({ data }) => {
  return { type: UPDATE_LESSORS, payload: data };
};

export const verifyLessor = (id) => (dispatch) => {
  axios
    .put(`${process.env.NEXT_PUBLIC_REACT_BE_API}/lessors/verified/`, {
      lessorId: id,
    })
    .then(({ data }) => {
      dispatch(verifyLessorsSuccess(data));
    })
    .catch((err) => {
      console.log(err);
    });
};
