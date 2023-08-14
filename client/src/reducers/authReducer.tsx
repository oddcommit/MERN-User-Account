import { SET_CURRENT_USER } from "../actions/types";
import { tokenData } from "../utils/types";
import { Action, AnyAction } from "@reduxjs/toolkit";

interface State {
  isAuthenticated: boolean;
  user: tokenData;
}
const initialState: State = {
  isAuthenticated: false,
  user: {
    name: "",
    id: "",
    exp: 0,
    iat: 0,
  },
};

export default function Reducer(
  state: State = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: action.payload.name !== "",
        user: action.payload,
      };
    default:
      return state;
  }
}
