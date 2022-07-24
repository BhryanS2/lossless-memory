import axios from "axios";

const BaseURL = "https://lossless-memory.herokuapp.com/";

export const BaseApi = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
