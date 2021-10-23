import axios from "axios";
const patient_api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  get_all_patient(page, limit) {
    return patient_api.get("/patients?_limit=" + limit + "&_page=" + page);
  },
  get_patient_id(id) {
    return patient_api.get("/patients/" + id);
  },
  getData() {
    return patient_api.get("/over_all");
  },
};
