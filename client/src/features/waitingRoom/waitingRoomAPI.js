import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
};

export function createWaitingRoomAPI(params) {
  return axios.post(`${URL}/waiting-room`, params, config);
}

export function getWaitingRoomAPI(params) {
  if (!params.manager) {
    return axios.get(`${URL}/waiting-room/?receptionist=${params.receptionist}`, config);
  }

  if (!params.receptionist) {
    return axios.get(`${URL}/waiting-room/?manager=${params.manager}&falculty=${params.falculty}`, config);
  }

  return axios.get(`${URL}/waiting-room/?receptionist=${params.receptionist}&manager=${params.manager}`, config);
}

export function deleteWaitingRoomAPI(params) {
  return axios.delete(`${URL}/waiting-room/${params.id}`, config);
}
