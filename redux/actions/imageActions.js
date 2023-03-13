import axios from "axios";
import { SAVE_IMAGE } from "../constants/imageConstants";

export const saveImage = (images) => {
  return (dispatch) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_REACT_BE_API}/temp/images`, images)
      .then(({ data }) => {
        dispatch(saveImageSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const saveImageSuccess = ({ images }) => {
  return {
    type: SAVE_IMAGE,
    images,
  };
};
