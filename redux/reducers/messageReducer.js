import {
  RESET_MESSAGES,
  UPDATE_MESSAGE_CONFIRM,
  UPDATE_MESSAGE_ERROR,
  UPDATE_MESSAGE_LOGIN,
  UPDATE_MESSAGE_SERVICES,
} from "../constants/userConstants";

const initialState = {
  services: {
    message: null,
    messageType: null,
  },
  password: { message: null, messageType: null },
  paymentModal: { message: null, messageType: null },
  login: { message: null, messageType: null },
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_MESSAGE_CONFIRM:
      return {
        ...state,
        password: {
          message: action.message,
          messageType: "confirm",
        },
      };
    case UPDATE_MESSAGE_ERROR:
      return {
        ...state,
        password: {
          message: action.message,
          messageType: "errorg",
        },
      };
    case UPDATE_MESSAGE_SERVICES:
      return {
        ...state,
        services: {
          message: action.message,
          messageType: action.messageType,
        },
      };
    case UPDATE_MESSAGE_LOGIN:
      return {
        ...state,
        login: {
          message: action.message,
          messageType: action.messageType,
        },
      };
    case RESET_MESSAGES:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default messageReducer;
