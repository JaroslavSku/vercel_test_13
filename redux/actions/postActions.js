import axios from "axios";
import {
  CREATE_POST,
  SAVE_TENANTS,
  UPDATE_POST,
} from "../constants/postConstants";

const saveTenants = (data) => {
  return { type: SAVE_TENANTS, payload: data };
};

const updatePostData = ({ post }) => {
  console.log("post to be updated", post);
  return { type: UPDATE_POST, payload: post };
};

export const getAllPosts = (page) => {
  console.log("REQUEST STARTED");
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/posts/all`,
        {
          params: {
            page,
          },
        }
      );
      console.log(data);
      dispatch(saveTenants(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatePost = (data, postId) => {
  return async (dispatch) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/posts/update/` + postId,
        data
      )
      .then(({ data }) => {
        dispatch(updatePostData(data));
      })
      .catch((err) => console.log(err));
  };
};

const postCreated = ({ post }) => {
  console.log("post created", post);
  return {
    type: CREATE_POST,
    post,
  };
};

export const createPost = (values) => {
  return async (dispatch) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_REACT_BE_API}/posts/create`, values)
      .then(({ data }) => {
        dispatch(postCreated(data));
      })
      .catch((err) => console.log(err));
  };
};
