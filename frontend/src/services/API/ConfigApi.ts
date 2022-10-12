import axios from "axios";

const BaseURL = process.env.REACT_APP_SERVER;

export const BaseApi = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
