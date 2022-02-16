import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
};

export function getUser(params) {
  return axios.get(`${URL}/users/${params.address}`, config);
}

export async function sendAuthorizeManagerMail(params) {
  return axios.post(`${URL}/authorization/updateManagerRole`, {account: params}, config);
}
