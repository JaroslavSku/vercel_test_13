import { UPDATE_AMOUNT } from "../constants/creditConstaints";
import {
  ADD_HEART,
  DELETE_HEART,
  FACEBOOK_VERIFIED,
  GOOGLE_VERIFIED,
  LOGIN,
  LOGOUT,
  SAVE_TENANT_DATA,
  UPDATE_USER_DATA,
  UPLOAD_PICTURE,
  ADD_FAVORITES,
  DELETE_ALL,
} from "../constants/userConstants";

const initialState = {
  token: null,
  userType: null,
  userId: null,
  userName: null,
  imageUrl: null,
  credit: null,
  facebook: null,
  google: null,
  updatedAt: null,
  userData: {},
  likesAds: [],
  verified: null,
};

const AuthReducer = (state = initialState, action) => {
  const {
    token,
    userType,
    id,
    userName,
    imageUrl,
    userData,
    credit,
    facebook,
    google,
    level,
    verified,
  } = action?.payload || {};
  const likesAds = action?.payload?.likesAds || [];
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: token,
        userType: userType,
        userId: id,
        userName: userName,
        imageUrl: imageUrl,
        userData: userData,
        credit: credit,
        facebook: facebook,
        google: google,
        level: level,
        verified: verified,
        // likesAds: likesAds,
      };
    case SAVE_TENANT_DATA:
      return {
        ...state,
        token: token,
        userType: userType,
        userId: id,
        userName: userName,
        imageUrl: imageUrl,
        userData: userData,
        credit: credit,
        facebook: facebook,
        google: google,
        level: level,
        verified: verified,
        // likesAds: likesAds,
      };
    case UPDATE_AMOUNT:
      return {
        ...state,
        credit: action.credit,
      };

    case UPDATE_USER_DATA:
      return {
        ...state,
        userData: action.user,
        userName: action.userName,
      };
    case GOOGLE_VERIFIED:
      return {
        ...state,
        google: action.data,
      };
    case FACEBOOK_VERIFIED:
      return {
        ...state,
        facebook: action.data,
      };
    case UPLOAD_PICTURE:
      return {
        ...state,
        imageUrl: action.url,
        updatedAt: action.updatedAt,
      };
    case ADD_HEART:
      return {
        ...state,
        likesAds: [...state.likesAds, action.payload],
      };
    case ADD_FAVORITES:
      return {
        ...state,
        likesAds: [...action.payload],
      };
    case DELETE_ALL:
      return {
        ...state,
        likesAds: [],
      };
    case DELETE_HEART:
      return {
        ...state,
        likesAds: state.likesAds.filter((item) => item !== action.payload),
      };
    case LOGOUT:
      return {
        token: null,
        userType: null,
        userId: null,
        userName: null,
        imageUrl: null,
        credit: null,
        facebook: null,
        google: null,
        updatedAt: null,
        userData: {},
        likesAds: [],
        verified: null,
      };

    default:
      return state;
  }
};

export default AuthReducer;
