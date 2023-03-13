import axios from "axios";
import { filter } from "lodash";
import {
  SAVE_ADVERT_SEARCH,
  SAVE_GEO,
} from "../constants/searchAdvertsConstants";

const saveAdvertSearchResult = (payload) => {
  return {
    type: "SAVE_ADVERT_SEARCH",
    payload,
  };
};

export const saveSearchValues = (values) => (dispatch) => {
  const lat = values?.geodataSouthwestLat || 50.089048941953116;
  const lng = values?.geodataSouthwestLong || 14.415119223347185;
  const point = values.point;
  console.log("save search values", lat, lng, point);
  dispatch({
    type: SAVE_GEO,
    lat: lat,
    lng: lng,
    point: point,
  });
};

export const searchAdverts = (params) => {
  console.log(params);
  return async (dispatch) => {
    try {
      const {
        data: { adverts },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/adverts/search`,
        {
          params: params,
        }
      );
      console.log(adverts);
      dispatch(saveAdvertSearchResult(adverts));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllSearchAdverts = () => {
  return (dispatch) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_BE_API}/adverts/all`)
      .then(({ data }) => {
        console.log("user data lessors get", data);
        const filteredData = filter(data, (item) => item.paid);
        dispatch(getAdvertsSuccess(filteredData));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getAdvertsSuccess = ({ adverts }) => {
  return {
    type: SAVE_ADVERT_SEARCH,
    payload: adverts,
  };
};
