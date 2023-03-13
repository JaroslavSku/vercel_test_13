import axios from "axios";
import {
  ADD_HOUSE_DATA,
  ADD_TO_FLOOR,
  DELETE_HOUSE,
  SAVE_HOUSES,
  SAVE_HOUSE_DATA,
  UPDATE_FLOOR,
  UPDATE_HOUSE,
  UPDATE_POSITIONS,
} from "../constants/propertyConstants.js";

export const updateProperties = (newState) => (dispatch) => {
  const floors = newState?.floors || {};
  if (floors) {
    dispatch({
      type: UPDATE_POSITIONS,
      payload: floors,
    });
  }
  axios
    .put(`${process.env.NEXT_PUBLIC_REACT_BE_API}/house/update`, { floors })
    .then(({ data }) => {})
    .catch((err) => console.log(err));
};

const getMyPostsSuccess = ({ properties }) => {
  return {
    type: SAVE_HOUSES,
    payload: properties,
  };
};

export const getMyPostsById = () => {
  return (dispatch) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_BE_API}/house/postById`)
      .then(({ data }) => {
        dispatch(getMyPostsSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const getHouseSuccess = ({ properties }) => {
  return {
    type: SAVE_HOUSE_DATA,
    payload: properties,
  };
};

export const getHouseById = (houseId) => {
  return (dispatch) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_BE_API}/house/find`, {
        params: {
          houseId,
        },
      })
      .then(({ data }) => {
        dispatch(getHouseSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const addHouseSuccess = ({ house }) => {
  return {
    type: ADD_HOUSE_DATA,
    payload: house,
  };
};

export const addHouse = (values) => {
  return (dispatch) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_REACT_BE_API}/house/add`, values)
      .then(({ data }) => {
        dispatch(addHouseSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const addTenantToFloorSuccess = ({ floors }) => {
  console.log("adding with success", floors);
  return {
    type: ADD_TO_FLOOR,
    payload: floors,
  };
};

export const addTenantToFloor = (floorId, houseId, tenantId) => {
  return (dispatch) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_REACT_BE_API}/house/addToFloor`, {
        floorId,
        houseId,
        tenantId,
      })
      .then(({ data }) => {
        dispatch(addTenantToFloorSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const deleteHouseSuccess = ({ houses }) => {
  return {
    type: DELETE_HOUSE,
    payload: houses,
  };
};
export const deleteHouse = (houseId) => {
  return (dispatch) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_REACT_BE_API}/house/delete/` + houseId)
      .then(({ data }) => {
        dispatch(deleteHouseSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const updateHouseSuccess = ({ houses }) => {
  return {
    type: UPDATE_HOUSE,
    payload: houses,
  };
};

export const updateHouse = (values, houseId) => {
  return (dispatch) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/house/updateHouse/` + houseId,
        values
      )
      .then(({ data }) => {
        dispatch(updateHouseSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const updateFloorSuccess = ({ floors }) => {
  return {
    type: UPDATE_FLOOR,
    payload: floors,
  };
};

export const updateFloorName = (floorName, floorId, houseId) => {
  return (dispatch) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_REACT_BE_API}/house/updateFloorName`, {
        floorName,
        floorId,
        houseId,
      })
      .then(({ data }) => {
        dispatch(updateFloorSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addNewFloor = (houseId) => {
  return (dispatch) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_REACT_BE_API}/house/addFloor`, {
        houseId,
      })
      .then(({ data }) => {
        dispatch(updateFloorSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteFloor = (houseId, floorId) => {
  return (dispatch) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_REACT_BE_API}/house/deleteFloor`, {
        houseId,
        floorId,
      })
      .then(({ data }) => {
        dispatch(updateFloorSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteTenant = (houseId, floorId, tenantId) => {
  return (dispatch) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_REACT_BE_API}/house/deleteUser`, {
        houseId,
        floorId,
        tenantId,
      })
      .then(({ data }) => {
        dispatch(updateFloorSuccess(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
