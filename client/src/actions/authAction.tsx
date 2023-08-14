import axios from "axios";
import { AppDispatch } from "../components/store";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { registerData, loginData, tokenData } from "../utils/types";
import { BASE_URL, SET_CURRENT_USER } from "./types";
import setAuthToken from "../utils/setAuthToken";

export const register = (newUser: registerData) => (dispatch: AppDispatch) => {
  axios.post(`${BASE_URL}/api/users/register`, newUser).then((res) => {
    alert("success!");
  });
};

export const login = (loginData: loginData) => (dispatch: AppDispatch) => {
  axios.post(`${BASE_URL}/api/users/login`, loginData).then((res) => {
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    const decoded: tokenData = jwtDecode(token);
    dispatch(setCurrentUser(decoded));
  });
};

export const setCurrentUser = (decoded: tokenData) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const logout = () => (dispatch: AppDispatch) => {
  localStorage.removeItem("jwtToken");
  const init_value: tokenData = {
    name: "",
    id: "",
    exp: 0,
    iat: 0,
  };
  dispatch(setCurrentUser(init_value));
};
