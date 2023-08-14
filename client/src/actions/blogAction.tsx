import axios from "axios";
import { AppDispatch } from "../components/store";
import { newBlodData, likesSign, updateBlodData } from "../utils/types";
import {
  BASE_URL,
  GET_ALL_BLOGS,
  GET_MY_BLOGS,
  ADD_ONE_BLOG,
  GET_SPECI_BLOGS,
} from "./types";

export const addBlog = (newBlog: newBlodData) => (dispatch: AppDispatch) => {
  axios.post(`${BASE_URL}/api/blogs/`, newBlog).then((res) => {
    dispatch({
      type: ADD_ONE_BLOG,
      payload: res.data,
    });
  });
};

export const getBlogs = () => (dispatch: AppDispatch) => {
  axios.get(`${BASE_URL}/api/blogs/all`).then((res) => {
    dispatch({
      type: GET_ALL_BLOGS,
      payload: res.data,
    });
  });
};

export const myBlog = (user_id: String) => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_MY_BLOGS,
    payload: user_id,
  });
};

export const getSpeciBlog = (blog_id: String) => (dispatch: AppDispatch) => {
  axios.get(`${BASE_URL}/api/blogs/speci/${blog_id}`).then((res) => {
    dispatch({
      type: GET_SPECI_BLOGS,
      payload: res.data,
    });
  });
};

export const increaseLikes =
  (updateData: likesSign) => (dispatch: AppDispatch) => {
    axios.put(`${BASE_URL}/api/blogs/LikesUp/`, updateData).then((res) => {});
  };

export const increaseWatches = (blog_id: String) => (dispatch: AppDispatch) => {
  axios.put(`${BASE_URL}/api/blogs/WatchesUp/${blog_id}`).then((res) => {
    dispatch({
      type: GET_SPECI_BLOGS,
      payload: res.data,
    });
  });
};

export const updateBlog =
  (updateBlog: updateBlodData) => (dispatch: AppDispatch) => {
    console.log("comee hrer", updateBlog);
    axios.put(`${BASE_URL}/api/blogs/`, updateBlog).then((res) => {
      dispatch({
        type: GET_MY_BLOGS,
        payload: res.data,
      });
    });
  };

export const get_as_latest = () => (dispatch: AppDispatch) => {
  axios.get(`${BASE_URL}/api/blogs/latest`).then((res) => {
    dispatch({
      type: GET_ALL_BLOGS,
      payload: res.data,
    });
  });
};

export const get_as_likes = () => (dispatch: AppDispatch) => {
  axios.get(`${BASE_URL}/api/blogs/likes`).then((res) => {
    dispatch({
      type: GET_ALL_BLOGS,
      payload: res.data,
    });
  });
};

export const get_as_watches = () => (dispatch: AppDispatch) => {
  axios.get(`${BASE_URL}/api/blogs/watches`).then((res) => {
    dispatch({
      type: GET_ALL_BLOGS,
      payload: res.data,
    });
  });
};
