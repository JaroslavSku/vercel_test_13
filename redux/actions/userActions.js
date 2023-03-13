import axios from "axios";
import jwt from "jsonwebtoken";
import { filter, includes } from "lodash";
import {
  ADD_HEART,
  DELETE_HEART,
  FACEBOOK_VERIFIED,
  GOOGLE_VERIFIED,
  LOGIN,
  LOGOUT,
  SAVE_TENANT_DATA,
  UPDATE_MESSAGE_CONFIRM,
  UPDATE_MESSAGE_ERROR,
  UPDATE_USER_DATA,
  UPLOAD_PICTURE,
  RESET_MESSAGES,
  ADD_FAVORITES,
  DELETE_ALL,
} from "../constants/userConstants";
let logoutTimer;
let messageTimer;

const setTokenHeader = (jwtToken) => {
  console.log("commong token header set");
  axios.defaults.headers.common = {
    Authorization: `Bearer ${jwtToken}`,
  };
};

export const logOut = () => (dispatch) => {
  console.log("Logout really called");
  dispatch(logoutSuccess());
};

const authSucces = (data) => (dispatch) => {
  const token = data?.token;
  const { exp = "" } = jwt.decode(token);
  const remainingTime = calculateRemainingTime(exp);
  console.log(remainingTime);
  logoutTimer = setTimeout(() => {
    dispatch(logoutSuccess());
  }, remainingTime);
  console.log("auth data", data);
  dispatch({
    type: LOGIN,
    payload: data,
  });
};

const logoutSuccess = () => {
  localStorage.removeItem("rdUser");
  if (localStorage.hasOwnProperty("emailForSignIn")) {
    localStorage.removeItem("emailForSignIn");
  }
  if (localStorage.hasOwnProperty("renewCode")) {
    localStorage.removeItem("renewCode");
  }
  if (logoutTimer) {
    clearTimeout(logoutTimer);
  }
  return {
    type: LOGOUT,
  };
};

const calculateRemainingTime = (exp) => {
  const expirationDate = new Date(exp * 1000);
  const actualDate = new Date();
  return expirationDate - actualDate;
};

export const loginUser = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_REACT_BE_API}/user-room/login`, values)
      .then(({ data }) => {
        const token = data?.token;
        setTokenHeader(token);
        localStorage.setItem("rdUser", JSON.stringify(data));
        dispatch(authSucces(data));
        resolve(data);
      })
      .catch(({ response }) => {
        console.log(response);
        reject(response);
      });
  });
};

const setTenantDataSuccess = (data) => {
  return {
    type: SAVE_TENANT_DATA,
    payload: data,
  };
};

export const getTenantData = () => {
  return (dispatch) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_BE_API}/tenants/findOne`)
      .then(({ data: { tenant } }) => {
        console.log("These are tenant data", tenant);
        dispatch(setTenantDataSuccess(tenant));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const registerUser = (values) => (dispatch) => {
  const emailId = localStorage.getItem("emailId");
  const data = Object.assign(values, { emailId: emailId });
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_REACT_BE_API}/user-room/create`, data)
      .then(({ data }) => {
        const token = data?.token;
        setTokenHeader(token);
        localStorage.setItem("rdUser", JSON.stringify(data));
        dispatch(authSucces(data));
        resolve(data);
      })
      .catch(({ response }) => {
        console.log(response);
        reject(response);
      });
  });
};

export const autoLogin = () => (dispatch) => {
  if (localStorage.getItem("rdUser") !== null) {
    const token = JSON.parse(localStorage.getItem("rdUser"))?.token || null;
    const { exp = 0 } = jwt.decode(token);
    const remainingTime = calculateRemainingTime(exp);
    if (token && remainingTime > 30000) {
      setTokenHeader(token);
      dispatch(authSucces(JSON.parse(localStorage.getItem("rdUser"))));
    } else {
      dispatch(logoutSuccess());
    }
  }
};

const uploadPictureSuccess = (url, updatedAt) => {
  return {
    type: UPLOAD_PICTURE,
    url,
    updatedAt,
  };
};

export const uploadPicture = (formData) => {
  return (dispatch) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/user-room/picture`,
        formData
      )
      .then(({ data }) => {
        const { imageUrl = null, updatedAt = null } = data;
        if (localStorage.getItem("rdUser") !== null) {
          let userData = JSON.parse(localStorage.getItem("rdUser"));
          userData.imageUrl = imageUrl;
          localStorage.setItem("rdUser", JSON.stringify(userData));
        }
        dispatch(uploadPictureSuccess(imageUrl, updatedAt));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const updateUser = (user) => {
  const userName = user?.userName;
  if (localStorage.getItem("rdUser") !== null) {
    let rdUser = JSON.parse(localStorage.getItem("rdUser"));
    rdUser.userName = user?.userName;
    rdUser.userData.firstName = user?.firstName;
    rdUser.userData.surname = user?.surname;
    rdUser.userData.recaptchaToken = user?.recaptchaToken;
    rdUser.userData.titleBefore = user?.titleBefore;
    rdUser.userData.titleAfter = user?.titleAfter;
    rdUser.userData.phone = user?.phone;
    localStorage.setItem("rdUser", JSON.stringify(rdUser));
  }
  return {
    type: UPDATE_USER_DATA,
    user,
    userName,
  };
};

export const updateUserInfo = (data) => {
  return (dispatch) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_REACT_BE_API}/user-room/update`, data)
      .then(({ data }) => {
        dispatch(updateUser(data));
      });
  };
};

const facebookVerified = (facebook) => {
  console.log("sending to red", facebook);
  return {
    type: FACEBOOK_VERIFIED,
    data: facebook,
  };
};

const googleVerified = (google) => {
  console.log("sending to red", google);
  return {
    type: GOOGLE_VERIFIED,
    data: google,
  };
};

export const updateFacebookVerification = (payload) => {
  console.log("fcb data", payload);
  return (dispatch) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/user-room/facebook/`,
        payload
      )
      .then(({ data }) => {
        if (localStorage.getItem("rdUser") !== null) {
          let rdUser = JSON.parse(localStorage.getItem("rdUser"));
          rdUser.facebook = data;
          localStorage.setItem("rdUser", JSON.stringify(rdUser));
        }
        dispatch(facebookVerified(data));
      });
  };
};

export const updateGoogleVerification = (payload) => {
  return (dispatch) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_REACT_BE_API}/user-room/google/`, payload)
      .then(({ data }) => {
        if (localStorage.getItem("rdUser") !== null) {
          let rdUser = JSON.parse(localStorage.getItem("rdUser"));
          rdUser.google = data;
          localStorage.setItem("rdUser", JSON.stringify(rdUser));
        }
        dispatch(googleVerified(data));
      });
  };
};

export const setConfirmationMessage = ({ message }) => {
  console.log("confirmation message set", message);
  return {
    type: UPDATE_MESSAGE_CONFIRM,
    message,
  };
};

export const setErrorMessage = ({ message }) => {
  console.log("reducer message", message);
  return {
    type: UPDATE_MESSAGE_ERROR,
    message,
  };
};

export const updatePassword = (password) => {
  let renewCode;
  let email;
  if (localStorage.getItem("emailForSignIn")) {
    renewCode = localStorage.getItem("renewCode");
    email = localStorage.getItem("emailForSignIn");
  }
  console.log("redux actions update psw", renewCode, email, password);
  return (dispatch) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_REACT_BE_API}/user-room/password/`, {
        password,
        renewCode,
        email,
      })
      .then(({ data }) => {
        console.log(data);
        dispatch(setConfirmationMessage(data));
      })
      .catch(({ response }) => {
        console.log(response);
        const data = response?.data;
        dispatch(setErrorMessage(data));
      })
      .finally(() => {
        messageTimer = setTimeout(() => {
          dispatch(resetMessages());
        }, 10000);
      });
  };
};

const resetMessages = () => {
  return {
    type: RESET_MESSAGES,
  };
};

export const saveRecaptcha = (recaptchaToken) => (dispatch) => {
  try {
    if (recaptchaToken) {
      axios.defaults.headers.common["Recapture-Token"] = recaptchaToken;
    } else {
      const data = { message: "Chybný kód pro verifikaci Vaši identity." };
      dispatch(setErrorMessage(data));
    }
  } catch (error) {
    console.log("recaptcha err", error);
  }
};

export const deleteAccount = () => (dispatch) => {
  axios
    .put(`${process.env.NEXT_PUBLIC_REACT_BE_API}/user-room/delete/`)
    .then(() => {
      dispatch(logoutSuccess());
    });
};

const deleteHeartSuccess = ({ advertId }) => {
  return {
    type: DELETE_HEART,
    payload: advertId,
  };
};

// export const deleteHeart = (advertId) => (dispatch) => {
//   axios
//     .put(`${process.env.NEXT_PUBLIC_REACT_BE_API}/user-room/deleteHeart/`, {
//       advertId,
//     })
//     .then(({ data }) => {
//       if (localStorage.getItem("rdUser")) {
//         const rdUser = JSON.parse(localStorage.getItem("rdUser"));
//         const newLikes = filter(
//           rdUser.likesAds,
//           (item) => item !== data.advertId
//         );
//         rdUser.likesAds = newLikes;
//         localStorage.setItem("rdUser", JSON.stringify(rdUser));
//       }
//       dispatch(deleteHeartSuccess(data));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

const addHeartSuccess = ({ advertId }) => {
  return {
    type: ADD_HEART,
    payload: advertId,
  };
};

// export const addHeart = (advertId) => (dispatch) => {
//   axios
//     .post(`${process.env.NEXT_PUBLIC_REACT_BE_API}/user-room/addHeart/`, {
//       advertId,
//     })
//     .then(({ data }) => {
//       console.log("add heart data", data);
//       if (localStorage.getItem("rdUser")) {
//         const rdUser = JSON.parse(localStorage.getItem("rdUser"));
//         const likesAds = rdUser?.likesAds || [];
//         const newLikes = [...likesAds, data.advertId];
//         rdUser.likesAds = newLikes;
//         localStorage.setItem("rdUser", JSON.stringify(rdUser));
//       }
//       dispatch(addHeartSuccess(data));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

export const addHeartUnregistered = (advertId) => (dispatch) => {
  if (localStorage.getItem("favorites")) {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    console.log(favorites, includes(favorites, advertId), advertId);
    if (!includes(favorites, advertId)) {
      console.log(favorites, advertId);
      favorites.push(advertId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  } else {
    console.log("storage created", advertId);
    localStorage.setItem("favorites", JSON.stringify([advertId]));
  }

  dispatch(addHeartSuccess({ advertId }));
};

export const deleteHeartUnregistered = (advertId) => (dispatch) => {
  if (localStorage.getItem("favorites")) {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    const newLikes = filter(favorites, (item) => item !== advertId);
    localStorage.setItem("favorites", JSON.stringify(newLikes));
  }
  dispatch(deleteHeartSuccess({ advertId }));
};

export const autoLoginFavorites = () => (dispatch) => {
  if (localStorage.getItem("favorites") !== null) {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    dispatch(addFavorites(favorites));
  }
};

const addFavorites = (favorites) => {
  return {
    type: ADD_FAVORITES,
    payload: favorites,
  };
};

export const deleteAllHearts = (advertId) => (dispatch) => {
  if (localStorage.getItem("favorites")) {
    localStorage.removeItem("favorites");
  }
  dispatch(deleteAllHeartsSuccess());
};

const deleteAllHeartsSuccess = () => {
  return {
    type: DELETE_ALL,
  };
};
