import axios from "axios";
import {
  ADD_ADVERT,
  DELETETE_ADVERT_IMAGE,
  DELETE_ADVERT,
  SAVE_ADVERTS,
  SAVE_ADVERT_BADGE,
  UPDATE_ADVERT,
} from "../constants/advertConstants";

export const getAdverts = () => {
  return (dispatch) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_BE_API}/adverts-room/my-ads`)
      .then(({ data }) => {
        dispatch(getAdvertsSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const loadAdvertsToCoverPage = () => {};

const getAdvertsSuccess = ({ adverts }) => {
  return {
    type: SAVE_ADVERTS,
    payload: adverts,
  };
};

const postAdvertsSuccess = ({ advert }) => {
  return {
    type: ADD_ADVERT,
    payload: advert,
  };
};

export const postAdvertsTest = (values) => {
  const userId = localStorage.getItem("rdUser")?.id;
  return (dispatch) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/adverts-room/create`,
        values,
        userId
      )
      .then(({ data }) => {
        dispatch(postAdvertsSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const editAdvert = (values) => {
  return (dispatch) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_REACT_BE_API}/adverts-room/edit`, values)
      .then(({ data }) => {
        dispatch(editAdvertSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const editAdvertSuccess = ({ advert }) => {
  return {
    type: UPDATE_ADVERT,
    payload: advert,
  };
};

export const postAdverts = (values) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/adverts-room/create`,
        values
      )
      .then(({ data }) => {
        dispatch(postAdvertsSuccess(data));
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

const deleteAdvertImageSuccess = ({ advert }) => {
  return {
    type: DELETETE_ADVERT_IMAGE,
    payload: advert,
  };
};

export const deleteAdvertImage = (params) => {
  return (dispatch) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_REACT_BE_API}/adverts/delete`, {
        params: params,
      })
      .then(({ data }) => {
        dispatch(deleteAdvertImageSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const setBadgeSuccess = ({ advert }) => {
  return {
    type: SAVE_ADVERT_BADGE,
    payload: advert,
  };
};

export const setAdvertBadge = (badgeType, advertId) => {
  return (dispatch) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_REACT_BE_API}/adverts/badge`, {
        badgeType,
        advertId,
      })
      .then(({ data }) => {
        dispatch(setBadgeSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteAdvert = (advertId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/adverts-room/delete/` +
          advertId
      );
      dispatch(deleteAdvertsSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const deleteAdvertsSuccess = ({ advertId }) => {
  return {
    type: DELETE_ADVERT,
    payload: advertId,
  };
};
