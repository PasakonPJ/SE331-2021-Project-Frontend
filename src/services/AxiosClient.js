import axios from "axios";
const apiClient = axios.create({
  baseURL: "http://20.212.9.168:8080:8999",

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default apiClient;
