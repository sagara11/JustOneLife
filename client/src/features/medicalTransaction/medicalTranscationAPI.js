import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
};

export function getTransactionByHashAPI(params) {
  return axios.get(`${URL}/medical-transaction/${params.ipfsHash}`, config);
}
