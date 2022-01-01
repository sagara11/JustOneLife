import axios from "axios";

const URL = process.env.SERVER_PORT;

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
};

export function fetchCurrentUserAPI() {
  return axios.get(`${URL}/auth/getCurrentUser`, config);
}
