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
  get_paient_doctor() {
    return patient_api.get("/patients/doctor");
  },
  save_vaccine_doctor(A, data) {
    console.log(data);
    return patient_api.post("/patients/vaccine/" + A, {
      id: data.doctor,
      vaccine: data.vaccines,
    });
  },
  get_patient_id(id) {
    return patient_api.get("/patients/" + id);
  },

  get_patient_doctor(){
    return patient_api.get("/patients/doctor");
  },
  get_Doctors(){
    return patient_api.get("/doctors");
  },
  getData() {
    return patient_api.get("/over_all");
  },
  get_User() {
    return patient_api.get("/users");
  },

  get_user_id(id) {
    return patient_api.get("/user/"+ id);
  },
  saveRole(user, id) {
    return patient_api.put("/user/" + id, {
      role: [user]
    });

  },
};
