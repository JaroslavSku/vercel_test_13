import axios from "axios";
import { SAVE_HISTORY, SAVE_ITEM } from "../constants/historyConstants";

export const saveHistory = (data, title) => {
  return (dispatch) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_REACT_BE_API}/history/create`, {
        data,
        title,
      })
      .then((res) => {
        console.log("This is the response status", res.status);
        if (res.status == 200 || res.status == 304) {
          dispatch(saveHistoryItem(res));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const saveHistoryInfo = ({ history }) => {
  return {
    type: SAVE_HISTORY,
    history,
  };
};

const saveHistoryItem = ({ data }) => {
  const { item } = data;
  console.log("Hisotry item", data);
  return {
    type: SAVE_ITEM,
    item,
  };
};

export const loadHistory = (page) => {
  return (dispatch) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_BE_API}/history/all`, {
        params: { page },
      })
      .then(({ data }) => {
        dispatch(saveHistoryInfo(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
