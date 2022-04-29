import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
};

export function createMedicalTransactionAPI(params) {
  return axios.post(`${URL}/medical-transaction`, params, config);
}

export function authenticateIPFSAPI(params) {
  return axios.post(`${URL}/IPFS/check`, params, config);
}

export function getKeyAPI(params) {
  return axios.get(`${URL}/users/getKey`, {...config, params});
}
