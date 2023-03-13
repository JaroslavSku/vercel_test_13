import axios from "axios";
import {
  SAVE_ALL_ARTICLES,
  SAVE_ARTICLE,
  UPDATE_ARTICLE,
} from "../constants/articleConstants";

export const saveArticleImage = (file) => async (dispatch) => {
  const formData = new FormData();
  formData.append("articleImage", file);
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_BE_API}/articles/image`,
      formData
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createArticle = (values) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/articles/create`,
        values
      );
      dispatch(saveArticleSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const saveArticleSuccess = ({ article }) => {
  return {
    payload: article,
    type: SAVE_ARTICLE,
  };
};

const saveAllArticlesSuccess = ({ articles }) => {
  return {
    payload: articles,
    type: SAVE_ALL_ARTICLES,
  };
};

export const getArticles = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/articles/all`
      );
      dispatch(saveAllArticlesSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
};

const updateArticleSuccess = ({ article }) => {
  return {
    payload: article,
    type: UPDATE_ARTICLE,
  };
};

export const updateArticle = (values) => {
  console.log("sending values", values);
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/articles/update`,
        values
      );
      console.log("updated article", data);
      dispatch(updateArticleSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
};

//update badge type and update article
export const updateBadgeTypeArticle = (badgeType, articleId) => {
  console.log("updating article with values", badgeType, articleId);
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_REACT_BE_API}/articles/badge`,
        { badgeType, articleId }
      );
      dispatch(updateArticleSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
};
