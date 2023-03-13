import { SAVE_IMAGE } from "../constants/imageConstants";

const imageReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case SAVE_IMAGE:
      return {
        data: action.images,
      };

    default:
      return state;
  }
};

export default imageReducer;
