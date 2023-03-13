import axios from "axios";

export const saveAgreement = (data) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/adverts/detail`,
        data
      );
    } catch (error) {}
  };
};
