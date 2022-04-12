import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
};

export function fetchDoctorListAPI(params) {
  return axios.post(`${URL}/users/getUserList`, params, config);
}

export function fetchReceptionistListAPI(params) {
  return axios.get(`${URL}/users/getReceptionist/${params}`, config);
}

export function fetchUserInSystem(params) {
  return axios.post(`${URL}/users/index`, params, config);
}
