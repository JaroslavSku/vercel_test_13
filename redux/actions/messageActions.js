import axios from "axios";
import { RESET_MESSAGES } from "../constants/messageConstants";

let messageTimer;

const createServiceMessage = (message, messageType, type) => {
  return {
    type: type,
    message: message,
    messageType: messageType,
  };
};

const resetMessages = () => {
  return {
    type: RESET_MESSAGES,
  };
};

export const serviceMessage =
  ({ message, messageType, type }) =>
  (dispatch) => {
    if (messageTimer) {
      clearTimeout(messageTimer);
    }
    dispatch(createServiceMessage(message, messageType, type));
    messageTimer = setTimeout(() => {
      dispatch(resetMessages());
    }, 10000);
  };

export const messageToOwner = (values) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/email-room/contactOwner`,
        values
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const messageUs = (values) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/email-room/contactUs`,
        values
      );
    } catch (error) {
      console.log(error);
    }
  };
};
