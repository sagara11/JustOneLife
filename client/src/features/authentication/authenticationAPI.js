import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
};

export function signinAPI(params) {
  return axios.post(`${URL}/auth/signin`, params, config);
}

export function signupAPI(params) {
  return axios.post(`${URL}/auth/signup`, params, config);
}

export function updateAccountAPI(params) {
  return axios.put(`${URL}/users/${params.publicAddress}`, params.data, config);
}
