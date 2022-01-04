import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function loginAPI(params) {
  return axios.post(`${URL}/auth/login`, params, config);
}
