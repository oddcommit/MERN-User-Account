import {
  ADD_ONE_BLOG,
  GET_ALL_BLOGS,
  GET_MY_BLOGS,
  GET_SPECI_BLOGS,
} from "../actions/types";
import { Action, AnyAction } from "@reduxjs/toolkit";

interface State {
  blogs: Array<any>;
  detailBlog: Object;
}
const initialState: State = {
  blogs: [],
  detailBlog: {},
};

export default function Reducer(
  state: State = initialState,
  action: AnyAction
) {
  let tmp: Array<any> = [];
  switch (action.type) {
    case ADD_ONE_BLOG:
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
      };
    case GET_ALL_BLOGS:
      return {
        ...state,
        blogs: action.payload,
      };
    case GET_MY_BLOGS:
      tmp = [];
      for (let i = 0; i < state.blogs.length; i++) {
        if (state.blogs[i].user === action.payload) tmp.push(state.blogs[i]);
      }
      return {
        ...state,
        blogs: [...tmp],
      };
    case GET_SPECI_BLOGS:
      return {
        ...state,
        detailBlog: action.payload,
      };

    default:
      return state;
  }
}
