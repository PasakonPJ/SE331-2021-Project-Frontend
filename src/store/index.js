import { reactive } from "vue";
export default reactive({
  flashMessage: "",
  patient: null,
  user: null,

  currentUser: JSON.parse(localStorage.getItem("user")),
});
