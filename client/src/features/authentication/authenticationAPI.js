import axios from "axios";

const URL = process.env.SERVER_PORT;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function loginAPI(params) {
  return axios.post(`${URL}/auth/login`, params, config);
}
