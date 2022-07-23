import axios from "axios";

const BaseURL = "http://localhost:8000";

export const BaseApi = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
